const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const investmentBoxSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    nameContributingParty: {
        type: String,
        required: true
    },
    nameContributingBank: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    contributionDateMiladi: {
        type: Date,
        required: true
    },
    contributionDateHijri: {
        type: Object,
        required: true
    },
    contributionEndDateMiladi: {
        type: Date,
        required: true
    },
    contributionEndDateHijri: {
        type: Object,
        required: true
    },
    amountAfterEnd: {
        type: Number,
        required: true,
        default: 0,
    },
    previousFundBalance: {
        type: Number,
        required: true
    },
    contributionAmount: {
        type: Number,
        required: true
    },
    contributionRate: {
        type: Number,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false,
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
    nameContributingParty: Joi.string().required(),
    nameContributingBank: Joi.string().required(),
    amount: Joi.number().required(),
    duration: Joi.number().required(),
    contributionDateMiladi: Joi.date().required(),
    contributionDateHijri: Joi.object().required(),
    contributionEndDateMiladi: Joi.date().required(),
    contributionEndDateHijri: Joi.object().required(),
})
investmentBoxSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("investmentBox", "IV");
    }
    next();
});
const validateInvestment = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    investmentBoxModel: mongoose.model('investmentBox', investmentBoxSchema),
    validateInvestment,
};