const mongoose = require("mongoose");

const userBloodMoneySchema = new mongoose.Schema({
    idBloodMoney:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bloodMoney' 
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
    },
    prevBalance: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = {
    userBloodMoneyModel: mongoose.model('userBloodMoney', userBloodMoneySchema)
}