const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const userFinancialSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    idFinancial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'financialCompany' 
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
    },
    prevBalance: {
        type: Number,
        required: true,
    },
    contributionAmount: {
        type: Number,
        required: true,
    },
    contributionRate: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        default: 0,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        required: true,
    },
    balanceAfterSale: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})


userFinancialSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("userFinancialCompany", "UF");
    }
    next();
});

module.exports = {
    userFinancialCompanyModel: mongoose.model('userFinancialCompany', userFinancialSchema),
};