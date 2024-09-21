const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const contestSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    competitionStartDate: {
        type: Date,
        required: true,
    },
    competitionEndDate: {
        type: Date,
        required: true,
    },
    numberOfAwards: {
        type: Number,
        required: true,
    },
    awards: {
        type: Array,
        required: true,
    },
    contestants: {
        type: Array,
        default: [],
    },
    winners: {
        type: Array,
        default: [],
    },
    open: {
        type: Boolean,
        default: true
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
contestSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("contest", "C");
    }
    next();
});
const joiSchema = Joi.object({
    name: Joi.string().required(),
    competitionStartDate: Joi.date().required(),
    competitionEndDate: Joi.date().required(),
    numberOfAwards: Joi.number().required(),
    awards: Joi.array()
})

const validateContest = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    contestModel: mongoose.model('contest', contestSchema),
    validateContest,
};