const mongoose = require("mongoose");
const Joi = require("joi");
const shortid = require("shortid");

const advertisingSchema = new mongoose.Schema({
    id:{
        type: String,
        default: shortid.generate,
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
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = {
    advertisingModel: mongoose.model('advertising', advertisingSchema),
    File: mongoose.model('File', new mongoose.Schema({
        filename: String,
        contentType: String,
        length: Number,
        id: mongoose.Schema.Types.ObjectId
    }))
    
}