const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const fillVoidSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    question: {
        type: String,
        required: true,
    },
    responses: {
        type: Array,
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
})

const joiSchema = Joi.object({
    question: Joi.string().required(),
    responses: Joi.array().required(),
    point: Joi.number().required()
});
const validateFillVoid = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    fillVoidModel: mongoose.model("fillVoid", fillVoidSchema),
    validateFillVoid
}