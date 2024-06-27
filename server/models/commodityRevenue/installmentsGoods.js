const mongoose = require("mongoose");
const Joi = require('joi');

const installmentsGoodsSchema = new mongoose.Schema({
    idCommodityRevenue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommodityRevenue',
        required: true,
    },
    itPaid: {
        type: Boolean,
        default: false,
        required: true,
    },
    premiumAmount: {
        type: Number,
        required: true,
    },
    requiredPaymentDate: {
        type: Date,
        required: true,
    },
    requiredPaymentDateHijri: {
        type: Object,
        required: true,
    },
    actualPaymentDate: {
        type: Date,
    },
    actualPaymentDateHijri: {
        type: Object,
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

const joiSchema = Joi.object({
    idCommodityRevenue: Joi.string().required(),
    premiumAmount: Joi.number().min(0).required(),
    requiredPaymentDate: Joi.date().required(),
    requiredPaymentDateHijri: Joi.object().required(),
    comments: Joi.string().optional().allow(''),
});


const validateInstallmentsGoods = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    installmentsGoodsModel: mongoose.model('InstallmentsGoods', installmentsGoodsSchema),
    validateInstallmentsGoods,
};