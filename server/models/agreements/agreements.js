const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const agreementsSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
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