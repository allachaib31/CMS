const mongoose = require("mongoose");
const Joi = require('joi');
const { generateNextId } = require("../../utils/generateNextId");

const userContributionLoansSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    idLoans: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "loans"
    },
    previousBalance: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})
userContributionLoansSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("userContributionLoans", "UCL");
    }
    next();
});
module.exports = {
    userContributionLoansModel: mongoose.model('userContributionLoans', userContributionLoansSchema),
};