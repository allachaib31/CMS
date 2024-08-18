const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const loansSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    premiumAmount: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    numberOfInstallments: {
        type: Number,
        required: true,
    },
    dateOfReceipt: {
        type: Date,
        required: true,
    },
    dateOfReceiptHijri: {
        type: Object,
        required: true,
    },
    paymentStartDate: {
        type: Date,
        required: true,
    },
    paymentStartDateHijri: {
        type: Object,
        required: true,
    },
    paymentEndDate: {
        type: Date,
        required: true,
    },
    paymentEndDateHijri: {
        type: Object,
        required: true,
    },
    comments: {
        type: String,
        default: ""
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
loansSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("loans", "L");
    }
    next();
});
const joiSchema = Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().min(0).required(),
    premiumAmount: Joi.number().min(0).required(),
    numberOfInstallments: Joi.number().min(0).required(),
    dateOfReceipt: Joi.date().required(),
    dateOfReceiptHijri: Joi.object().required(),
    paymentStartDate: Joi.date().required(),
    paymentStartDateHijri: Joi.object().required(),
    paymentEndDate: Joi.date().required(),
    paymentEndDateHijri: Joi.object().required(),
    comments: Joi.string().optional().allow(''),
})

const validateLoans = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    loansModel: mongoose.model('loans', loansSchema),
    validateLoans,
};