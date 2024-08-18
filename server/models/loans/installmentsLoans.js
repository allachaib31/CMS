const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const installmentsLoansSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    idLoans: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'loans',
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
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})
installmentsLoansSchema.pre('save', async function(next) {
    if (this.isNew) {
        let isUnique = false;
        while (!isUnique) {
            try {
                this.id = await generateNextId("installmentsLoans", "IL");
                await this.constructor.findOne({ id: this.id });
                isUnique = true;
            } catch (error) {
                if (error.code === 11000) { // Duplicate key error
                    await new Promise(res => setTimeout(res, Math.random() * 100)); // Délai aléatoire jusqu'à 100ms
                    isUnique = false;
                } else {
                    next(error);
                }
            }
        }
        next();
    } else {
        next();
    }
});


const joiSchema = Joi.object({
    idLoans: Joi.string().required(),
    premiumAmount: Joi.number().min(0).required(),
    requiredPaymentDate: Joi.date().required(),
    requiredPaymentDateHijri: Joi.object().required(),
    comments: Joi.string().optional().allow(''),
});


const validateInstallmentsLoans= (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    installmentsLoansModel: mongoose.model('installmentsLoans', installmentsLoansSchema),
    validateInstallmentsLoans,
};