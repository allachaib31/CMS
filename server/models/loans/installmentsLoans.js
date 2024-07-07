const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const installmentsLoansSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    idLoans: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'loans',
        required: true,
    },
    itPaid: {
        type: Boolean,
        default: false,
        required: true,
    },
    premiumAmount: {
        type: Number,
        required: true,
    },
    requiredPaymentDate: {
        type: Date,
        required: true,
    },
    requiredPaymentDateHijri: {
        type: Object,
        required: true,
    },
    actualPaymentDate: {
        type: Date,
    },
    actualPaymentDateHijri: {
        type: Object,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})
const joiSchema = Joi.object({
    idLoans: Joi.string().required(),
    premiumAmount: Joi.number().min(0).required(),
    requiredPaymentDate: Joi.date().required(),
    requiredPaymentDateHijri: Joi.object().required(),
    comments: Joi.string().optional().allow(''),
});


const validateInstallmentsLoans= (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    installmentsLoansModel: mongoose.model('installmentsLoans', installmentsLoansSchema),
    validateInstallmentsLoans,
};