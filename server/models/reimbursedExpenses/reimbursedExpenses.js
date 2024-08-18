const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const reimbursedExpensesSchema = new mongoose.Schema({
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
reimbursedExpensesSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("reimbursedExpenses", "RE");
    }
    next();
});
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