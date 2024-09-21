const express = require("express");
const { loginAdmin, validation, addAdmin, getAdmins, deleteAdmins } = require("../../controllers/auth/auth");
const authMiddleware = require("../../middleware/auth");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/auth/loginAdmin",loginAdmin);
Router.post("/api/v1.0/addAdmin",authMiddleware, addAdmin);

//GET METHODS
Router.get("/api/v1.0/auth/validation",authMiddleware,validation);
Router.get("/api/v1.0/getAdmins", authMiddleware,getAdmins);

//DELETE METHODS
Router.delete("/api/v1.0/deleteAdmin", authMiddleware,deleteAdmins)

module.exports = Router;