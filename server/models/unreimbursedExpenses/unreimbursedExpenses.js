const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const unReimbursedExpensesSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    balanceDistribution: {
        type: Number,
        required: true
    },
    typeExpenses: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    expensesPaidCash: {
        type: Array,
        required: true,
        default: [],
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
    name: Joi.string().required(),
    amount: Joi.number().min(0).required(),
    typeExpenses: Joi.string().required(),
    comments: Joi.string().required(),

})


const validateUnReimbursedExpenses = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    unReimbursedExpensesModel: mongoose.model('unReimbursedExpenses', unReimbursedExpensesSchema),
    validateUnReimbursedExpenses
}