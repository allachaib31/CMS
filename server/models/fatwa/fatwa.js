const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const FatwasSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false
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
FatwasSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("fatwas", "FA");
    }
    next();
});
const joiSchema = Joi.object({
    text: Joi.string().required(),
});

const validateFatwa = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    fatwasModel: mongoose.model('fatwas', FatwasSchema),
    validateFatwa,
};