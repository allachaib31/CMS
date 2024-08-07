const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const stockSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    nameContributingParty: {
        type: String,
        required: true
    },
    nameContributingBank: {
        type: String,
        required: true
    },
    numberStocks: {
        type: Number,
        required: true
    },
    costStocks: {
        type: Number,
        required: true
    },
    totalCostStocks: {
        type: Number,
        required: true
    },
    contributionDateMiladi: {
        type: Date,
        required: true
    },
    contributionDateHijri: {
        type: Object,
        required: true
    },
    freeStocks: {
        type: Number,
        required: true,
        default: 0
    },
    numberOfPreviousStockWithFreeStock: {
        type: Number,
        required: true,
        default: 0
    },
    previousStockCostWithFreeShare: {
        type: Number,
        required: true,
        default: 0
    },
    previousCostOfStockWithFreeStock: {
        type: Number,
        required: true,
        default: 0
    },
    buyAdditionalStock: {
        type: Number,
        required: true,
        default: 0
    },
    additionalStockCost: {
        type: Number,
        required: true,
        default: 0
    },
    additionalStocksCost: {
        type: Number,
        required: true,
        default: 0
    },
    previousStockCostWithAdditionalStock: {
        type: Number,
        required: true,
        default: 0
    },
    totalNumberOfStock: {
        type: Number,
        required: true,
        default: 0
    },
    currentValueOfStock: {
        type: Number,
        required: true,
        default: 0
    },
    totalCostOfStock: {
        type: Number,
        required: true,
        default: 0
    },
    stockSaleValue: {
        type: Number,
        required: true,
        default: 0
    },
    dateSaleMiladi: {
        type: Date,
    },
    dateSaleHijri: {
        type: Object,
    },
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
    },
    memberPercentage: {
        type: Number,
        required: true
    },
    amountPercentage: {
        type: Number,
        required: true
    },
    previousFundBalance: {
        type: Number,
        required: true
    },
    contributionAmount: {
        type: Number,
        required: true
    },
    contributionRate: {
        type: Number,
        required: true
    },
    balanceAfterSale: {
        type: Number,
        required: true,
        default: 0,
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
    nameContributingParty: Joi.string().required(),
    nameContributingBank: Joi.string().required(),
    numberStocks: Joi.number().required(),
    costStocks: Joi.number().required(),
    totalCostStocks: Joi.number().required(),
    contributionDateMiladi: Joi.date().required(),
    contributionDateHijri: Joi.object().required(),
    freeStocks: Joi.number().required(),
    numberOfPreviousStockWithFreeStock: Joi.number().required(),
    previousStockCostWithFreeShare: Joi.number().required(),
    previousCostOfStockWithFreeStock: Joi.number().required(),
    memberId: Joi.string().required(),
    memberPercentage: Joi.number().required(),
})

const validateStock = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    stocksModel: mongoose.model('stocks', stockSchema),
    validateStock,
};