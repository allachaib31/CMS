const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const bloodMoneySchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    exchangeDateMiladi: {
        type: Date,
        required: true,
    },
    exchangeDateHijri: {
        type: Object,
        required: true,
    },
    paymentDateMiladi: {
        type: Date,
    },
    paymentDateHijri: {
        type: Object,
    },
    comments: {
        type: String,
        required: true
    },
    itPaid: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

bloodMoneySchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("bloodMoney", "BM");
    }
    next();
})

module.exports = {
    bloodMoneyModel: mongoose.model('bloodMoney', bloodMoneySchema)
}