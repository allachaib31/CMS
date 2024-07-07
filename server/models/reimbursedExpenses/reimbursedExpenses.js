const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const reimbursedExpensesSchema = new mongoose.Schema({
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
    typeExpenses: {
        type: String,
        required: true
    },
    comments: {
        type: String,
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
    name: Joi.string().required(),
    amount: Joi.number().min(0).required(),
    typeExpenses: Joi.string().required(),
    comments: Joi.string().required(),

})

const validateReimbursedExpenses = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    reimbursedExpensesModel: mongoose.model('reimbursedExpenses', reimbursedExpensesSchema),
    validateReimbursedExpenses
}