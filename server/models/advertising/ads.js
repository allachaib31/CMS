const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const adsSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

adsSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("ads", "ADS");
    }
    next();
});

module.exports = {
    adsModel: mongoose.model('ads', adsSchema)
}