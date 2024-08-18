const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../utils/generateNextId");


const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  NationalIdentificationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  oneYear: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "not active"],
    default: "not active",
  },
  enableAccount: {
    type: Boolean,
    default: false,
  },
  loans: {
    type: Object,
    default: {
      number: 0,
      amount: 0
    },
    required: true,
  },
  subsidies: {
    type: Object,
    default: {
      number: 0,
      amount: 0
    },
    required: true,
  },
  commodityProfitsContributions: {
    type: Number,
    default: 0,
    required: true
  },
  admin: {
    type: {
      isAdmin: Boolean,
      userPermissions: [],
    },
    default: {
      isAdmin: false,
      userPermissions: [],
    },
  },
  comments: {
    type: String,
    default: ""
  },
  memberBalance: {
    type: Number,
    default: 0,
  },
  commentSubscribeHistory: {
    type: String,
    default: ""
  },
  cumulativeBalance: {
    type: Number,
    default: 0
  },
  disable: {
    type: Boolean,
    default: false,
  },
  subscriptionExpiryDate:{
    type: Date,
    required: false,
  },
  subscriptionExpiryDateHijri:{
    type: Object,
    required: false,
  },
  profileImage: {
    type: mongoose.Schema.Types.ObjectId,
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
userSchema.pre('save', async function(next) {
  if (this.isNew) { // Check if the document is new
      this.id = await generateNextId("users", "U");
  }
  next();
});
userSchema.methods.joiValidate = async function (obj) {
  const schema = Joi.object({
    id: Joi.string(),
    _id: Joi.object(),
    name: Joi.string().min(3).max(1024).required(),
    password: Joi.string().min(4).max(1024).required(),
    NationalIdentificationNumber: Joi.string()
      .pattern(/^[1-9]\d{9}$/)
      .required(),
    phoneNumber: Joi.string()
      .pattern(/^05\d{8}$/)
      .required(),
    oneYear: Joi.boolean().required(),
    status: Joi.string().valid("active", "not active").required(),
    admin: Joi.object().required(),
    loans:Joi.object().required(),
    subsidies:Joi.object().required(),
    commodityProfitsContributions: Joi.number(),
    enableAccount: Joi.boolean().required(),
    comments: Joi.string().min(0).max(5000),
    memberBalance: Joi.number(),
    commentSubscribeHistory: Joi.string().min(0).max(5000),
    cumulativeBalance: Joi.number(),
    disable: Joi.boolean().required(),
    hijriDate: Joi.object(),
    createdAt: Joi.date().required(),
  });
  return schema.validate(obj);
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
