const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addStock, getActiveUser, getIdStock, getStock } = require("../../controllers/manageStock/stock");

const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/stock/add",authMiddleware, addStock);

//GET METHODS
Router.get("/api/v1.0/stock/getIdUsers", authMiddleware, getActiveUser);
Router.get("/api/v1.0/stock/getIdStock", authMiddleware ,getIdStock);
Router.get("/api/v1.0/stock/getStock", authMiddleware, getStock)

module.exports = Router;