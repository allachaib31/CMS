const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const mcqSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    question: {
        type: String,
        required: true,
    },
    numberOfResponse: {
        type: Number,
        required: true,
    },
    responses: {
        type: Array,
        required: true
    },
    correctResponse: {
        type: String,
        required: true
    },
    point: {
        type: Number,
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
mcqSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("mcq", "MC");
    }
    next();
});
const joiSchema = Joi.object({
    question: Joi.string().required(),
    numberOfResponse: Joi.number().required(),
    responses: Joi.array().required(),
    correctResponse: Joi.string().required(),
    point: Joi.number().required()
});
const validateMcq = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    mcqModel: mongoose.model("mcq", mcqSchema),
    validateMcq
}