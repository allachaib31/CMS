const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const familyMemberSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    idFamilyTree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'familyTree' 
    },
    data: {
        type: Object,
        required: true
    },
    /*title: {
        type: String,
        required: true
    },
    titleBgColor: {
        type: String,
        required: true
    },
    titleTextColor: {
        type: String,
        required: true
    },
    subtitles: {
        type: Array,
        required: true
    },
    sex: {
        type: String,
        enum: ["M", "F"],
        default: "M",
    },
    badges: {
        type: Array,
    },*/
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = {
    familyMemberModel: mongoose.model("familyMember", familyMemberSchema)
}