const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const userStockSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    idStock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stocks' 
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
    },
    prevBalance: {
        type: Number,
        required: true,
    },
    contributionAmount: {
        type: Number,
        required: true,
    },
    contributionRate: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        default: 0,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        required: true,
    },
    amountProfitPercentage: {
        type: Number,
        required: true,
        default: 0
    },
    balanceAfterSale: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = {
    userStockModel: mongoose.model('userStock',userStockSchema)
}