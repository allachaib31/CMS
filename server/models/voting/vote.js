const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const voteSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    subject: {
        type: String,
        required: true,
    },
    votingStartDate: {
        type: Date,
        required: true,
    },
    votingEndDate: {
        type: Date,
        required: true,
    },
    choices: {
        type: Array,
        required: true,
    },
    numberOfChoices: {
        type: Number,
        required: true,
    },
    userVote: {
        type: Array,
        default: []
    },
    hijriDate: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const joiSchema = Joi.object({
    subject: Joi.string().required(),
    votingStartDate: Joi.date().required(),
    votingEndDate: Joi.date().required(),
    numberOfChoices: Joi.number().required(),
    choices: Joi.array()
});

const validateVote = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    voteModel: mongoose.model('vote', voteSchema),
    validateVote,
};