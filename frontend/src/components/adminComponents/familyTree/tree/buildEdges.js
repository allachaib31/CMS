import { Edge } from "reactflow";
import { InnerFamilyEdgeData, InnerFamilyTypeKey } from "../FamilyComponents/InnerFamilyEdge";
import { EDGE_YGAP_MODIFIER, GENERATION_HEIGHT } from "./constants";
import { isOddModifer, isRelationSharingKids as isRelationPossibleCouple } from "./utils";
import { EDGES_COLORS } from "./constants";
import { FamilyMember, FamilyRelation, Generation, OTHERS_GENERATION, ParentsChildrens } from "./types";
import uniq from "lodash/uniq";
import uniqWith from "lodash/uniqWith";
import { CoupleEdgeTypeKey } from "../FamilyComponents/CoupleEdge";

function buildEdge({ from, to, id, familyIndex, offsetY }) {
    const color = EDGES_COLORS[familyIndex % EDGES_COLORS.length];

    return {
        id,
        source: from,
        target: to,
        style: {
            stroke: color,
            strokeWidth: 2
        },
        data: {
            offsetY,
            familyIndex
        },
        type: InnerFamilyTypeKey
    };
}

export function buildEdgeId(from, to) {
    return `${from}-${to}`;
}

function buildPreEdge(from, to, familyIndex, generation) {
    return { id: buildEdgeId(from, to), from, to, familyIndex, generation };
}

function findGenerationById(generationsToFamilyMembers, id) {
    const rawGeneration = Object.entries(generationsToFamilyMembers).find(([, familyMembers]) =>
        familyMembers.find((member) => member.id == id)
    );
    if (!rawGeneration) return OTHERS_GENERATION;

    const generation = parseInt(rawGeneration[0]);
    return generation;
}

export function buildEdgesFromParentChildrenRelations(parentChildrenFamilies, generationsToFamilyMembers) {
    const preEdges = parentChildrenFamilies
        .flatMap((family, i) => {
            const parentsGeneration = findGenerationById(generationsToFamilyMembers, family.parentA);
            if (family.parentB && family.parentA) {
                return family.children.flatMap((child) => [
                    buildPreEdge(family.parentA, child, i, parentsGeneration),
                    buildPreEdge(family.parentB, child, i, parentsGeneration)
                ]);
            } else if (family.parentA) {
                return family.children.map((child) => buildPreEdge(family.parentA, child, i, parentsGeneration));
            }
        })
        .filter((edge) => !!edge);

    const edgesWithGap = preEdges.map((currentEdge) => {
        const edgesWithSameGeneration = preEdges
            .filter((edge) => currentEdge?.generation == edge?.generation)
            .map((edge) => edge.familyIndex);

        const uniqAndSortedEdges = uniq(edgesWithSameGeneration).sort();

        const thisEdgeIndex = uniqAndSortedEdges.findIndex((edge) => edge == currentEdge.familyIndex);

        const offsetY =
            GENERATION_HEIGHT / 2 +
            (thisEdgeIndex + (thisEdgeIndex % 2)) * isOddModifer(thisEdgeIndex) * EDGE_YGAP_MODIFIER;
        const limitedOffsetY = Math.max(Math.min(offsetY, GENERATION_HEIGHT - 30), 20);

        return buildEdge({ ...currentEdge, offsetY: limitedOffsetY });
    });

    return edgesWithGap;
}

function getChildrenFromCouple(parentA, parentB, parentChildrenFamilies) {
    return parentChildrenFamilies.find(
        (parentChildren) =>
            (parentChildren.parentA == parentA && parentChildren.parentB == parentB) ||
            (parentChildren.parentB == parentA && parentChildren.parentA == parentB)
    )?.children;
}

export function buildCouplesEdges(familyRelationsValues, parentChildEdges, parentChildrenFamilies) {
    const dupedCoupleEdges = familyRelationsValues
        .filter((relation) => isRelationPossibleCouple(relation.relationType))
        .map((relation) => {
            const children = getChildrenFromCouple(relation.from, relation.to, parentChildrenFamilies);
            const color = children
                ? parentChildEdges.find((edge) => children.includes(edge.target))?.style?.stroke
                : undefined;

            const edge = {
                id: relation.id,
                source: relation.from,
                target: relation.to,
                style: {
                    stroke: color,
                    strokeWidth: 3,
                    strokeDasharray: relation.relationType == "Partner" ? undefined : "5"
                },
                type: CoupleEdgeTypeKey
            };

            return edge;
        });

    const uniqCoupleEdges = uniqWith(dupedCoupleEdges, (edgeA, edgeB) => {
        const nodes = [edgeA.source, edgeA.target];
        return nodes.includes(edgeB.source) && nodes.includes(edgeB.target);
    });

    return uniqCoupleEdges;
}
