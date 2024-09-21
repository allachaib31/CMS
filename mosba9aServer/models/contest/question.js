const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const questionSchema = new mongoose.Schema({
    id: {
        type: String,
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
questionSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("question", "Q");
    }
    next();
});
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