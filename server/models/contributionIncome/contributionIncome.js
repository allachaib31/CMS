const mongoose = require("mongoose");
const Joi = require('joi');
const shortid = require("shortid");

const contributionIncomeSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
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

module.exports = {
    contributionIncomeModel: mongoose.model("contributionIncome",contributionIncomeSchema)
}