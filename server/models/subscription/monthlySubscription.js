const mongoose = require("mongoose");
const Joi = require("joi");

const monthlySubscriptionSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    months: {
        type: Object,
        default: {
            "1": {
                name: "يناير",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "2": {
                name: "فبراير",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "3": {
                name: "مارس",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "4": {
                name: "أبريل",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "5": {
                name: "مايو",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "6": {
                name: "يونيو",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "7": {
                name: "يوليو",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "8": {
                name: "أغسطس",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "9": {
                name: "سبتمبر",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "10": {
                name: "أكتوبر",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "11": {
                name: "نوفمبر",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            },
            "12": {
                name: "ديسمبر",
                amount: 0,
                comments: "",
                pendingPayment: true,
                isInvoiceOverdue: false,
                dueDate: null,
                dueDateHijri: null,
                hijriDate: null,
                createdAt: null
            }

        },
        required: true
    },
    total: {
        type: Number,
        default: 0
    },
    year: {
        type: String,
        required: true
    },
    numberofArrears: {
        type: Number,
        default: 0
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

monthlySubscriptionSchema.methods.joiValidate = async function (obj) {
    const schema = Joi.object({
        _id: Joi.object(),
        idUser: Joi.object(),
        __v: Joi.number(),
        months: Joi.object().pattern(
            Joi.object({
                name: Joi.string().required(),
                amount: Joi.number().default(0),
                hijriDate: Joi.object().required(),
                comments: Joi.string().min(0).max(5000).default(""),
                isInvoiceOverdue: Joi.boolean().default(false),
                createdAt: Joi.date().default(Date.now),
            })
        ).required(),
        year: Joi.string().required(),
        numberofArrears: Joi.Number().required(),
        comments: Joi.string().min(0).max(5000),
        hijriDate: Joi.object(),
        createdAt: Joi.date().required(),
    });
    return schema.validate(obj);
}

const monthlySubscriptionModel = mongoose.model("monthlysubscription", monthlySubscriptionSchema);

module.exports = monthlySubscriptionModel;