const mongoose = require("mongoose");
const Joi = require('joi');
const { generateNextId } = require("../../utils/generateNextId");

const contributionIncomeSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true
    },
    dueDateHijri: {
        type: Object,
        required: true
    },
    contributionDate: {
        type: Date,
        required: true
    },
    amountAfterSale: {
        type: Number,
        required: true
    },
    profitAmount: {
        type: Number,
        required: true
    },
    /*idContributionIncome: {

    },*/
    comments: {
        type: String,
        required: true,
        default: ""
    }
})
contributionIncomeSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("contributionIncome", "CI");
    }
    next();
});
module.exports = {
    contributionIncomeModel: mongoose.model("contributionIncome",contributionIncomeSchema)
}