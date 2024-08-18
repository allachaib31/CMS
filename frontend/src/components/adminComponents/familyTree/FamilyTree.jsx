import { useState } from "react";
import ReactFlow, { MiniMap } from "reactflow";
import CoupleEdge, { CoupleEdgeTypeKey } from "./FamilyComponents/CoupleEdge";
import { FamilyMemberNodeComp } from "./FamilyComponents/FamilyMemberNode";
import InnerFamilyEdge, { InnerFamilyTypeKey } from "./FamilyComponents/InnerFamilyEdge";
import { buildDataStructure, buildGenerations, buildParentsChildrenStructs } from "./tree/buildDataStructure";
import { buildCouplesEdges, buildEdgesFromParentChildrenRelations } from "./tree/buildEdges";
import {
    addNodeSelection,
    addNodeVisibilityCallback,
    positionAndBuildFamilyTree,
    positionUnknownGeneration
} from "./tree/positionNodes";
import { FamilyMember, FamilyMembers, FamilyRelations, OTHERS_GENERATION } from "./tree/types";
import { nodeColorForMinimap } from "./utils";

const nodeTypes = { familyMember: FamilyMemberNodeComp };
const edgeTypes = {
    [InnerFamilyTypeKey]: InnerFamilyEdge,
    [CoupleEdgeTypeKey]: CoupleEdge
};

/**
 * @typedef {Object} FamilyTreeProps
 * @property {FamilyMembers} familyMembers
 * @property {FamilyRelations} familyRelations
 * @property {FamilyMember} rootMember
 * @property {(sfdcId: string) => void} [onDoubleClick]
 */

/**
 * @param {FamilyTreeProps} props
 */
export const FamilyTree = ({
    familyMembers: rawFamilyMembers,
    familyRelations,
    rootMember,
    onDoubleClick
}) => {
    const [selectedNode, setSelectedNode] = useState(rootMember.id);
    const [hiddenNodesIds, setHiddenNodesIds] = useState([]);

    const familyMembersWithVisibility = Object.fromEntries(
        Object.entries(rawFamilyMembers).map(([key, value]) => {
            value.data.isHidden = hiddenNodesIds.includes(key);
            return [key, value];
        })
    );

    const familyMembersValues = Object.values(familyMembersWithVisibility);
    const familyRelationsValues = Object.values(familyRelations);

    const familyGenerations = buildGenerations(familyMembersWithVisibility, familyRelations, rootMember.id);
    const innerFamiliesPerGeneration = buildDataStructure(familyGenerations, familyRelations);

    const familyNodes = positionAndBuildFamilyTree(innerFamiliesPerGeneration, familyMembersWithVisibility);
    const otherNodes = positionUnknownGeneration(familyGenerations[OTHERS_GENERATION]);

    const allNodes = [...familyNodes, ...otherNodes];
    const nodesWithSelectedInfo = addNodeSelection(familyRelations, allNodes, selectedNode);
    const nodesWithVizCallback = addNodeVisibilityCallback(nodesWithSelectedInfo, hiddenNodesIds, setHiddenNodesIds);

    const parentChildrenFamilies = buildParentsChildrenStructs(familyMembersValues, familyRelationsValues);
    const parentChildEdges = buildEdgesFromParentChildrenRelations(parentChildrenFamilies, familyGenerations);

    const couplesEdges = buildCouplesEdges(familyRelationsValues, parentChildEdges, parentChildrenFamilies);

    return (
        <div style={{ height: "100%", width: "100%", direction: "ltr" }} className="family-chart">
            <ReactFlow
                nodes={nodesWithVizCallback}
                edges={[...parentChildEdges, ...couplesEdges]}
                fitView
                fitViewOptions={{
                    padding: 5,
                    nodes: allNodes.filter((node) => node.id === selectedNode)
                }}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={{ type: "smoothstep" }}
                proOptions={{
                    hideAttribution: true
                }}
                onNodeClick={(_, node) => {
                    setSelectedNode(node.id);
                }}
                onNodeDoubleClick={(_, node) => onDoubleClick && onDoubleClick(node.id)}
            >
                <MiniMap nodeStrokeWidth={3} pannable zoomable nodeColor={nodeColorForMinimap} />
            </ReactFlow>
        </div>
    );
};
