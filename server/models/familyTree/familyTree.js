const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const familyTreeSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    familyTree: {
        type: Object,
        required: true
    },
    hijriDate: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = {
    familyTreeModel: mongoose.model("familyTree", familyTreeSchema)
}