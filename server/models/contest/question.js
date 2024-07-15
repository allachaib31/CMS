const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const questionSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    typeQuestion: {
        type: String,
        enum: ["عادي","املأ الفراغ","سحب"],
        required: true
    },
    idContest: {
        type: String,
        required: true
    },
    idBranche: {
        type: String,
        required: true
    },
    idQuestion: {
        type: String,
        required: true
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

const joiSchema = Joi.object({
    typeQuestion: Joi.string().valid("عادي","املأ الفراغ","سحب").required(),
    idContest: Joi.string().required(),
    idBranche: Joi.string().required(),
    idQuestion: Joi.string().required(),
})

const validateQuestion = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    questionModel: mongoose.model('question', questionSchema),
    validateQuestion
}