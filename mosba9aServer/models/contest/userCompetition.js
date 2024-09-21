const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const userCompetitionSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userContest"
    },
    idContest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contests"
    },
    point: {
        type: Number,
        default: 0
    },
    totalTiming: {
        type: Number,
        default: 0
    },
    /*idBranche: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contestbranches"
    },
    point: {
        type: Number,
        default: 0
    },
    response: {
        type: Array,
        default: []
    },*/
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = {
    userCompetitionModel: mongoose.model('userCompetition', userCompetitionSchema)
}