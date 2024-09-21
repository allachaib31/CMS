const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../../utils/generateNextId");

const advertisingSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})
advertisingSchema.pre('save', async function(next) {
    if (this.isNew) { // Check if the document is new
        this.id = await generateNextId("advertising", "AD");
    }
    next();
});
module.exports = {
    advertisingModel: mongoose.model('advertising', advertisingSchema),
    File: mongoose.model('File', new mongoose.Schema({
        filename: String,
        contentType: String,
        length: Number,
        id: mongoose.Schema.Types.ObjectId
    }))
    
}