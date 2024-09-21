const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const fillVoidSchema = new mongoose.Schema({
    id: {
        type: String,
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
fillVoidSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("fillVoid", "FV");
    }
    next();
});
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