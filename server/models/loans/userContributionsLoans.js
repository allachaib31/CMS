const mongoose = require("mongoose");
const Joi = require('joi');
const shortid = require("shortid");

const userContributionLoansSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    idLoans: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "loans"
    },
    previousBalance: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = {
    userContributionLoansModel: mongoose.model('userContributionLoans', userContributionLoansSchema),
};