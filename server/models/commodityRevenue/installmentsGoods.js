const mongoose = require("mongoose");
const Joi = require('joi');
const shortid = require("shortid");

const installmentsGoodsSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
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
    id: Joi.string(),
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