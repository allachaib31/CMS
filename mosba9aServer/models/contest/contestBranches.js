const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const contestBrancheSchema = new mongoose.Schema({
    id: {
        type: String,
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
    contestants: {
        type: Array,
        default: [],
    },
    winners: {
        type: Array,
        default: [],
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
contestBrancheSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("contestBranche", "CB");
    }
    next();
});
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