const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const agreementsSchema = new mongoose.Schema({
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
agreementsSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("agreements", "AG");
    }
    next();
});
const joiSchema = Joi.object({
    text: Joi.string().required(),
});

const validateAgreement = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    agreementsModel: mongoose.model('agreements', agreementsSchema),
    validateAgreement,
};