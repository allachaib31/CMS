const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const mcqSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
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