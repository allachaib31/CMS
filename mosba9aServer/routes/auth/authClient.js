const express = require("express");
const { loginUser, validation, addUser, getUsers, deleteUser, activeUser, forgetPassword } = require("../../controllers/auth/authClient");
const authMiddleware = require("../../middleware/authClient");
const authMiddlewareAdmin = require("../../middleware/auth");
const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/auth/loginUser",loginUser);
Router.post("/api/v1.0/addUser", addUser);
Router.post("/api/v1.0/forgetPassword", forgetPassword)
Router.post("/api/v1.0/activeUser", authMiddlewareAdmin, activeUser)

//GET METHODS
Router.get("/api/v1.0/auth/validationClient",authMiddleware,validation);
Router.get("/api/v1.0/getUsers", authMiddlewareAdmin,getUsers);

//DELETE METHODS
Router.delete("/api/v1.0/deleteUser", authMiddlewareAdmin,deleteUser)

module.exports = Router;