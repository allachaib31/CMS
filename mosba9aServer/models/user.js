const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../utils/generateNextId");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    fakhidName: {
        type: String,
        required: true,
        enum: ["آل بالسعود", "آل الشميلة", "آل مفلح", "آل مليح", "آل ناجية", "آل يحمد"],
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
userSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("userContest", "UC");
    }
    next();
});
const joiSchema = Joi.object({
    id: Joi.string(),
    _id: Joi.object(),
    name: Joi.string().min(3).max(1024).required(),
    fakhidName: Joi.string().valid("آل بالسعود", "آل الشميلة", "آل مفلح", "آل مليح", "آل ناجية", "آل يحمد").required(),
    password: Joi.string().min(4).max(1024).required(),
    email: Joi.string()
        .email()
        .required(),
    phoneNumber: Joi.string()
        .pattern(/^05\d{8}$/)
        .required(),
});
const validateUserContest = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    userContestModel: mongoose.model('userContest', userSchema),
    validateUserContest,
};