const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addStock, getActiveUser, getIdStock, getStock, addAdditionalStock, currentPrice, sellStock, stockContributionRecord, getRegisterShareholdersShares, getActiveStocks} = require("../../controllers/manageStock/stock");

const Router = express.Router();

//POST METHODS
Router.post("/api/v1.0/stock/add",authMiddleware, addStock);
Router.post("/api/v1.0/stock/addAdditionalStock", authMiddleware,addAdditionalStock);
Router.post("/api/v1.0/stock/currentPrice", authMiddleware, currentPrice);
Router.post("/api/v1.0/stock/sell", authMiddleware, sellStock)

//GET METHODS
Router.get("/api/v1.0/stock/getIdUsers", authMiddleware, getActiveUser);
Router.get("/api/v1.0/stock/getIdStock", authMiddleware ,getIdStock);
Router.get("/api/v1.0/stock/getStock", authMiddleware, getStock);
Router.get("/api/v1.0/stock/stockContributionRecord", authMiddleware, stockContributionRecord);
Router.get("/api/v1.0/stock/getRegisterShareholdersShares", authMiddleware, getRegisterShareholdersShares);
Router.get("/api/v1.0/stock/getActiveStock",authMiddleware, getActiveStocks)

module.exports = Router;