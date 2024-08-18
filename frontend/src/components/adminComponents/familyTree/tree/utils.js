import { NODE_WIDTH, SPACING } from "./constants";
import { Generation, OTHERS_GENERATION, RelationTypes } from "./types";

export const isOddModifer = (i) => (i % 2 === 0 ? 1 : -1);
export const calcX = (i) => (((NODE_WIDTH + SPACING) * (i + (i % 2))) / 2) * isOddModifer(i);
export const calcCoupleEdgeYOffset = (i) => ((i + (i % 2)) / 2) * isOddModifer(i);

/**
 * @param {RelationTypes} relation
 * @returns {Generation}
 */
export const getGenerationFromRelation = (relation) => {
    switch (relation) {
        case "Grandparent":
        case "Grandparent (maybe step)":
            return 2;
        case "Uncle/aunt":
        case "Uncle/aunt (maybe step)":
        case "Parent":
        case "Parent (maybe step)":
        case "Step parent":
        case "Adoptive parent":
        case "Parent in law":
            return 1;
        case "Partner":
        case "Sibling":
        case "Sibling (maybe step)":
        case "Have shared kids":
        case "Sibling in law":
        case "Divorcee":
        case "Common-Law Partner":
        case "Cousin":
        case "Step sibling":
        case "Cousin (maybe step)":
            return 0;
        case "Child":
        case "Child (maybe step)":
        case "Child in law":
        case "Nephew/niece":
        case "Nephew/niece (maybe step)":
        case "Step child":
        case "Adopted child":
            return -1;
        case "Grandchild (maybe step)":
        case "Grandchild":
            return -2;
        case "Relative":
            return OTHERS_GENERATION;
        default:
            return OTHERS_GENERATION;
    }
};

/**
 * @param {RelationTypes} relation
 * @returns {boolean}
 */
export const isRelationSharingKids = (relation) => {
    return (
        relation === "Partner" ||
        relation === "Have shared kids" ||
        relation === "Divorcee" ||
        relation === "Common-Law Partner"
    );
};

/**
 * @param {RelationTypes} relation
 * @returns {boolean}
 */
export const isRelationAChild = (relation) => {
    return (
        relation === "Child" ||
        relation === "Child (maybe step)" ||
        relation === "Child in law" ||
        relation === "Step child" ||
        relation === "Adopted child"
    );
};
