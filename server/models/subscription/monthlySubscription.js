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
                name: "محرم",
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
                name: "صفر",
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
                name: "ربيع الاول",
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
                name: "ربيع الثاني",
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
                name: "جماد الأول",
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
                name: "جماد الثاني",
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
                name: "رجب",
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
                name: "شعبان",
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
                name: "رمضان",
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
                name: "شوال",
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
                name: "ذو القعدة",
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
                name: "ذو الحجة",
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