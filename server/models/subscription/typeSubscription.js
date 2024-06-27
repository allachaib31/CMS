const mongoose = require("mongoose");
const Joi = require("joi");
const typeSubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

typeSubscriptionSchema.methods.joiValidate = async function (obj) {
    const schema = Joi.object({
        _id: Joi.object(),
        name: Joi.string().min(3).max(1024).required(),
        amount: Joi.number().min(0).required(),
        createdAt: Joi.date().required(),
        __v: Joi.number()
    })
    return schema.validate(obj);
}

const typeSubscriptionModel = mongoose.model("typeSubscription", typeSubscriptionSchema);

module.exports = typeSubscriptionModel;