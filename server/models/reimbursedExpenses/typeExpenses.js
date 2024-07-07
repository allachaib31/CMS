const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const typeExpensesSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const joiSchema = Joi.object({
    name: Joi.string().required(),
});

const validateTypeExpenses = (data) => {
    return joiSchema.validate(data);
}

module.exports = {
    typeExpensesModel: mongoose.model("typeExpenses", typeExpensesSchema),
    validateTypeExpenses
}