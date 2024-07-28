const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const userContestBrancheSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    idUserContest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userContest"
    },
    idBranche: {
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
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = {
    userContestBrancheModel: mongoose.model("userContestBranche", userContestBrancheSchema)
}