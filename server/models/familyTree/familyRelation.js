const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const familyRelationSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    idFamilyTree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'familyTree' 
    },
    relationType: {
        type: String,
        enum: ["Parent", "Parent in law", "Partner", "Child", "Sibling", "Nephew/niece","Cousin","Uncle/aunt","Grandparent", "Grandchild"],
    },
    prettyType: {
        type: String,
        enum: ["Parent", "Parent in law", "Partner", "Child", "Sibling", "Nephew/niece","Cousin","Uncle/aunt","Grandparent", "Grandchild"],
    },
    toId: {
        type: String,
        required: true,
    },
    fromId: {
        type: String,
        required: true,
    },
    isInnerFamily: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = {
    familyRelationModel: mongoose.model("familyRelation", familyRelationSchema)
}