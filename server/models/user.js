const mongoose = require("mongoose");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  status: {
    type: String,
    enum: ["active", "not active"],
    default: "not active",
  },
  enableAccount: {
    type: Boolean,
    default: false,
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
  hijriDate: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.joiValidate = async function (obj) {
  const schema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().min(3).max(1024).required(),
    email: Joi.string().email().max(1024).required(),
    password: Joi.string().min(8).max(1024).required(),
    NationalIdentificationNumber: Joi.string()
      .pattern(/^[1-9]\d{9}$/)
      .required(),
    phoneNumber: Joi.string()
      .pattern(/^05\d{8}$/)
      .required(),
    status: Joi.string().valid("active", "not active").required(),
    admin: Joi.object().required(),
    enableAccount: Joi.boolean().required(),
    comments: Joi.string().min(0).max(5000),
    hijriDate: Joi.object(),
    createdAt: Joi.date().required(),
  });
  return schema.validate(obj);
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
