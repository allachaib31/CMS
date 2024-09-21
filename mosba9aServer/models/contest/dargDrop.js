const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const dragDropSchema = new mongoose.Schema({
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
    falseResponse: {
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
dragDropSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("dragDrop", "DD");
    }
    next();
});
const joiSchema = Joi.object({
    question: Joi.string().required(),
    responses: Joi.array().required(),
    falseResponse: Joi.array().required(),
    point: Joi.number().required()
});
const validateDragDrop = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    dragDropModel: mongoose.model("dragDrop", dragDropSchema),
    validateDragDrop
}