const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const contestBrancheSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    idContest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contest",
        required: true,
    },
    name: {
        type: String,
        required: true,
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
    name: Joi.string().required(),
    idContest: Joi.string().required(),
})

const validateContestBranche = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    contestBrancheModel: mongoose.model('contestBranche', contestBrancheSchema),
    validateContestBranche,
};