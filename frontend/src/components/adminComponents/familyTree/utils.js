import { Node } from "reactflow";
import { FamilyMemberNodeData } from "./FamilyComponents/FamilyMemberNode";
import { FamilyMember, FamilyMembers, FamilyRelations, RelationTypes } from "./tree/types";

/**
 * @typedef {Object} RawFamilyMember
 * @property {string} id
 * @property {Object} data
 * @property {Array<Object>} data.badges
 * @property {string} data.badges.bgColor
 * @property {string} data.badges.label
 * @property {string} data.badges.textColor
 * @property {('M' | 'F')} data.sex
 * @property {Array<string>} data.subtitles
 * @property {string} data.title
 * @property {string} data.titleBgColor
 * @property {string} data.titleTextColor
 * @property {string|null} [data.imageUrl]
 */

/**
 * @typedef {Object} RawFamilyRelation
 * @property {string} fromId
 * @property {string} toId
 * @property {RelationTypes} relationType
 * @property {string} prettyType
 * @property {boolean} isInnerFamily
 */

/**
 * @param {RawFamilyMember[]} rawFamily
 * @param {RawFamilyRelation[]} rawRelation
 * @returns {[FamilyMembers, FamilyRelations]}
 */
export function buildFamilyAndRelations(rawFamily, rawRelation) {
    const familyMembers = Object.fromEntries(
        rawFamily.map((rawMember) => {
            return [
                rawMember.id,
                {
                    id: rawMember.id,
                    data: {
                        badges: rawMember.data.badges,
                        sex: rawMember.data.sex,
                        imageUrl: rawMember.data.imageUrl,
                        subtitles: rawMember.data.subtitles,
                        title: rawMember.data.title,
                        titleBgColor: rawMember.data.titleBgColor,
                        titleTextColor: rawMember.data.titleTextColor
                    }
                }
            ];
        })
    );

    const familyRelations = Object.fromEntries(
        rawRelation.map((rawMember) => {
            const id = `${rawMember.fromId}-${rawMember.toId}`;
            return [
                id,
                {
                    id,
                    to: rawMember.fromId,
                    from: rawMember.toId,
                    relationType: rawMember.relationType,
                    prettyType: rawMember.prettyType,
                    isInnerFamily: rawMember.isInnerFamily
                }
            ];
        })
    );

    return [familyMembers, familyRelations];
}

/**
 * @param {Node<FamilyMemberNodeData>} node
 * @returns {string}
 */
export function nodeColorForMinimap(node) {
    return node.data.titleBgColor;
}
