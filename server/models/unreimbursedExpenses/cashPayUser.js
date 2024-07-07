const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const cashPayUserSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    unReimbursedExpensesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'unReimbursedExpenses',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    itPaid: {
        type: Boolean,
        default: false
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

module.exports = {
    cashPayUserModel: mongoose.model('cashPayUser', cashPayUserSchema)
}