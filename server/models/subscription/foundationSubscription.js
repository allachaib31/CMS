const mongoose = require("mongoose");
const Joi = require("joi");

const foundationSubscriptionSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique: true
    },
    amount: {
        type: Number,
        required: true,
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

foundationSubscriptionSchema.methods.joiValidate = async function (obj) {
    const schema = Joi.object({
        _id: Joi.object().required(),
        idUser: Joi.object().required(),
        amount: Joi.number().required(),
        comments: Joi.string().min(0),
        hijriDate: Joi.object().required(),
        createdAt: Joi.date().required(),
    });
    return schema.validate(obj);
}

const foundationSubscriptionModel = mongoose.model("foundationsubscription", foundationSubscriptionSchema);

module.exports = foundationSubscriptionModel;