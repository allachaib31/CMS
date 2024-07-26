const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const contestSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
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
    /*numberOfAwards: {
        type: Number,
        required: true,
    },
    awards: {
        type: Array,
        required: true,
    },*/
    /*open: {
        type: Boolean,
        default: true
    },*/
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
    name: Joi.string().required(),
    competitionStartDate: Joi.date().required(),
    competitionEndDate: Joi.date().required(),
    //numberOfAwards: Joi.number().required(),
    //awards: Joi.array()
})

const validateContest = (data) => {
    return joiSchema.validate(data);
};

module.exports = {
    contestModel: mongoose.model('contest', contestSchema),
    validateContest,
};