const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const userContestSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
    email: {
        type: String,
        required: true
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    idContest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contests"
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
    userContestModel: mongoose.model('userContest', userContestSchema)
}