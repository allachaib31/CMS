const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const userStockSchema = new mongoose.Schema({
    id: {
        type: String,
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
userStockSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("userStock", "US");
    }
    next();
});
module.exports = {
    userStockModel: mongoose.model('userStock',userStockSchema)
}