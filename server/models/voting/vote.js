const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const voteSchema = new mongoose.Schema({
    id: {
        type: String,
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
voteSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("vote", "V");
    }
    next();
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