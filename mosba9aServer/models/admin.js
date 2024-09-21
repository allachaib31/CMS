const mongoose = require("mongoose");
const Joi = require("joi");
const { generateNextId } = require("../utils/generateNextId");

const adminSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

adminSchema.pre('save', async function (next) {
  if (this.isNew) { // Check if the document is new
      this.id = await generateNextId("adminContest", "AC");
  }
  next();
});

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(1024).required(),
  password: Joi.string().min(4).max(1024).required(),
  email: Joi.string()
      .email()
      .required(),
  phoneNumber: Joi.string()
      .pattern(/^05\d{8}$/)
      .required(),
});
const validateAdminContest = (data) => {
  return joiSchema.validate(data);
};

module.exports = {
  adminContestModel: mongoose.model('adminContest', adminSchema),
  validateAdminContest,
};