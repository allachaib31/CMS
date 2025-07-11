const mongoose = require("mongoose");
const Joi = require('joi');
const { generateNextId } = require("../../utils/generateNextId");

const commodityRevenueSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    customerData: {
        name: {
            type: String,
            required: true,
        },
        job: {
            type: String,
            required: true,
        },
        nationalIdentificationNumber: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true
        },
    },
    sponsorData: {
        name: {
            type: String,
            required: true,
        },
        nationalIdentificationNumber: {
            type: String,
            required: true,
        },
        sponsorRatio: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            default: 0
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        itPaid: {
            type: Boolean,
            default: false,
        }
    },
    commodityData: {
        itemType: {
            type: String,
            required: true,
        },
        purchaseAmount: {
            type: Number,
            required: true,
        },
        dateOfPurchase: {
            type: Date,
            required: true,
        },
        dateOfPurchaseHijri: {
            type: Object,
            required: true,
        },
        amountPaid: {
            type: Number,
            required: true,
        },
        amountItPaid: {
            type: Boolean,
            default: false
        },
        saleAmount: {
            type: Number,
            required: true,
        },
        saleDate: {
            type: Date,
            required: true,
        },
        saleDateHijri: {
            type: Object,
            required: true,
        },
        dateOfPayment: {
            type: Date,
            required: true,
        },
        dateOfPaymentHijri: {
            type: Object,
            required: true,
        },
        paymentExpiryDate: {
            type: Date,
            required: true,
        },
        paymentExpiryDateHijri: {
            type: Object,
            required: true,
        },
        premiumAmount: {
            type: Number,
            required: true,
        },
        numberOfInstallments: {
            type: Number,
            required: true,
        },
        currentBalanceFund: {
            type: Number,
            required: true
        },
        contributionAmount: {
            type: Number,
            required: true,
        },
        contributionPercentage: {
            type: Number,
            required: true,
        },
        profitRatio: {
            type: Number,
            required: true
        },
        profitAmount: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    comments: {
        type: String,
        default: ""
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
commodityRevenueSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("CommodityRevenue", "CR");
    }
    next();
});
const joiSchema = Joi.object({
    id: Joi.string(),
    customerData: Joi.object({
        name: Joi.string().min(3).max(30).required(),
        job: Joi.string().min(3).max(30).required(),
        nationalIdentificationNumber: Joi.string().pattern(/^[1-9]\d{9}$/).required(),
        phoneNumber: Joi.string().min(10).max(10).pattern(/^05\d{8}$/).required(),
        region: Joi.string().min(3).max(1024).required(),
        address: Joi.string().min(3).max(1024).required(),
    }).required(),
    sponsorData: Joi.object({
        name: Joi.string().min(3).max(30).required(),
        nationalIdentificationNumber: Joi.string().pattern(/^[1-9]\d{9}$/).required(),
        sponsorRatio: Joi.number().min(0).required(),
        amount: Joi.number().min(0).required(),
        balance: Joi.number().min(0),
        phoneNumber: Joi.string().min(10).max(10).pattern(/^05\d{8}$/).required(),
        region: Joi.string().min(3).max(1024).required(),
        address: Joi.string().min(3).max(1024).required(),
        itPaid: Joi.boolean()
    }).required(),
    commodityData: Joi.object({
        itemType: Joi.string().min(3).max(1024).required(),
        purchaseAmount: Joi.number().min(0).required(),
        dateOfPurchase: Joi.date().required(),
        dateOfPurchaseHijri: Joi.object().required(),
        amountPaid: Joi.number().min(0).required(),
        amountItPaid: Joi.boolean(),
        saleAmount: Joi.number().min(0).required(),
        saleDate: Joi.date().required(),
        saleDateHijri: Joi.object().required(),
        dateOfPayment: Joi.date().required(),
        dateOfPaymentHijri: Joi.object().required(),
        paymentExpiryDate: Joi.date().required(),
        paymentExpiryDateHijri: Joi.object().required(),
        premiumAmount: Joi.number().min(0).required(),
        numberOfInstallments: Joi.number().min(0).required(),
        currentBalanceFund: Joi.number().min(0).required(),
        contributionAmount: Joi.number().min(0).required(),
        contributionPercentage: Joi.number().min(0).required(),
        profitRatio: Joi.number().min(0).required(),
        profitAmount: Joi.number().min(0).required(),
        balance: Joi.number().min(0).required(),
    }).required(),
    comments: Joi.string().optional().allow(''),
    hijriDate: Joi.object().required(),
    createdAt: Joi.date().default(Date.now),
});

const validateCommodityRevenue = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    commodityRevenueModel: mongoose.model('CommodityRevenue', commodityRevenueSchema),
    validateCommodityRevenue,
};