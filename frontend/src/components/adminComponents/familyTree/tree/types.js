/**
 * @typedef {Object} ParentsChildrens
 * @property {string} parentA
 * @property {string} parentB
 * @property {string[]} children
 */

/**
 * @typedef {"Sibling" | "Sibling (maybe step)" | "Nephew/niece" | "Nephew/niece (maybe step)" | "Child" | "Child (maybe step)" | "Cousin" | "Cousin (maybe step)" | "Partner" | "Step child" | "Step sibling" | "Adopted child" | "Have shared kids" | "Sibling in law" | "Divorcee" | "Uncle/aunt" | "Uncle/aunt (maybe step)" | "Parent" | "Parent (maybe step)" | "Step parent" | "Adoptive parent" | "Parent in law" | "Child in law" | "Common-Law Partner" | "Grandchild" | "Grandchild (maybe step)" | "Grandparent" | "Grandparent (maybe step)" | "Relative"} RelationTypes
 */

/**
 * @typedef {Object} FamilyRelation
 * @property {string} id
 * @property {string} from
 * @property {string} to
 * @property {RelationTypes} relationType
 * @property {string} prettyType
 * @property {boolean} isInnerFamily
 */

/**
 * @typedef {Object} BadgeData
 * @property {string} bgColor
 * @property {string} label
 * @property {string} textColor
 */

/**
 * @typedef {Object} FamilyMember
 * @property {string} id
 * @property {Object} data
 * @property {BadgeData[]} data.badges
 * @property {string} data.title
 * @property {string} data.titleBgColor
 * @property {string} data.titleTextColor
 * @property {("M" | "F")} data.sex
 * @property {string[]} data.subtitles
 * @property {boolean} data.isHidden
 * @property {string} [data.imageUrl]
 * @property {(isVisible: boolean) => void} data.onVisibilityChange
 */

/**
 * @typedef {Record<string, FamilyMember>} FamilyMembers
 * @typedef {Record<string, FamilyRelation>} FamilyRelations
 */

/**
 * @typedef {Object} InnerFamily
 * @property {string[]} parents
 * @property {InnerFamily[]} children
 * @property {Generation} generation
 * @property {number} [width]
 * @property {number} [centerX]
 * @property {boolean} [couplePainted]
 */

/**
 * @type {const} GenerationsPossible
 */
export const GenerationsPossible = [-2, -1, 0, 1, 2];

/**
 * @type {3} OTHERS_GENERATION
 */
export const OTHERS_GENERATION = 3;

/**
 * @typedef {(typeof GenerationsPossible)[number] | typeof OTHERS_GENERATION} Generation
 */