const mongoose = require("mongoose");
const Joi = require('joi');

const userContributionGoodSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    idCommodityRevenue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommodityRevenue"
    },
    previousBalance: {
        type: Number,
        required: true,
    },
    contributionPercentage: {
        type: Number,
        required: true,
    },
    contributionAmount: {
        type: Number,
        required: true,
    },
    profitAmount: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    comments: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const validateUserContributionGood = (data) => {
    const schema = Joi.object({
        idUser: Joi.string().hex().length(24).required(),
        idCommodityRevenue: Joi.string().hex().length(24).required(),
        previousBalance: Joi.number().required(),
        contributionPercentage: Joi.number().required(),
        contributionAmount: Joi.number().required(),
        profitAmount: Joi.number().required(),
        balance: Joi.number().required(),
        comments: Joi.string().optional().allow(''),
    });
    
    return schema.validate(data);
};

module.exports = {
    userContributionGoodModel: mongoose.model('userContributionGood', userContributionGoodSchema),
    validateUserContributionGood
};