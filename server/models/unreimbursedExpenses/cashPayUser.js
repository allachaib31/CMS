const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const cashPayUserSchema = new mongoose.Schema({
    id: {
        type: String,
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
cashPayUserSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("cashPayUser", "CP");
    }
    next();
});

module.exports = {
    cashPayUserModel: mongoose.model('cashPayUser', cashPayUserSchema)
}