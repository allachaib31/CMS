const mongoose = require("mongoose");
const Joi = require("joi");

const moneyBoxSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    cumulativeAmount: {
        type: Number,
        required: true,
        default: 0
    },
    source : {
        type: Object,
        default: {
            subscriptions: 0,
            commodityRevenue: 0,
            contributionRevenues: 0,
            loanIncome: 0,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

moneyBoxSchema.methods.joiValidate = async function (obj) {
    const schema = Joi.object({
        _id: Joi.object().required(),
        amount: Joi.number().required(),
        cumulativeAmount: Joi.number().required(),
        createdAt: Joi.date().required(),
    });
    return schema.validate(obj);
}

const moneyBoxModel = mongoose.model("moneyBox", moneyBoxSchema);

module.exports = moneyBoxModel;