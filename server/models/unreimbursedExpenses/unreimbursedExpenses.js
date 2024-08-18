const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const unReimbursedExpensesSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    expensememberbalance: {
        type: Number,
        required: true
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
unReimbursedExpensesSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("unReimbursedExpenses", "UR");
    }
    next();
});
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