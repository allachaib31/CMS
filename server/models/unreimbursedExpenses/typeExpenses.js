const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const typeExpensesSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
typeExpensesSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("typeUnreimbursedExpenses", "TUR");
    }
    next();
});
const joiSchema = Joi.object({
    name: Joi.string().required(),
});

const validateTypeExpenses = (data) => {
    return joiSchema.validate(data);
}

module.exports = {
    typeExpensesModel: mongoose.model("typeUnreimbursedExpenses", typeExpensesSchema),
    validateTypeExpenses
}