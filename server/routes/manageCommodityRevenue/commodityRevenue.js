const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addCommodityRevenue, getIdCommodityRevenue, getCommodityRevenue, getInstallmentSchedule, getFormContributionPurchaseCommodity, getAllCommodityRevenue,addCommentCommodityRevenue,getActiveCommodityRevenue, getCommidtyAndInstallment, payInstallmentSchedule, addCommentInstallmentSchedule } = require("../../controllers/manageCommodityRevenue/commodityRevenue");
const Router = express.Router();


//GET METHODS
Router.get("/api/v1.0/commodityRevenu/getIdCommodityRevenue",authMiddleware, getIdCommodityRevenue);
Router.get("/api/v1.0/commodityRevenu/getCommodityRevenue",authMiddleware, getCommodityRevenue);
Router.get("/api/v1.0/commodityRevenu/getInstallmentSchedule",authMiddleware, getInstallmentSchedule);
Router.get("/api/v1.0/commodityRevenu/getFormContributionPurchaseCommodity",authMiddleware, getFormContributionPurchaseCommodity);
Router.get("/api/v1.0/commodityRevenu/getAllCommodityRevenue",authMiddleware, getAllCommodityRevenue);
Router.get("/api/v1.0/commodityRevenu/getActiveCommodityRevenue",authMiddleware, getActiveCommodityRevenue);
Router.get("/api/v1.0/commodityRevenu/getCommidtyAndInstallment",authMiddleware, getCommidtyAndInstallment);
//POST METHODS
Router.post("/api/v1.0/commodityRevenu/",authMiddleware, addCommodityRevenue);
Router.post("/api/v1.0/commodityRevenu/payInstallmentSchedule",authMiddleware,payInstallmentSchedule)

//PATCH METHODS
Router.patch("/api/v1.0/commodityRevenu/addCommentCommodityRevenue",authMiddleware, addCommentCommodityRevenue);
Router.patch("/api/v1.0/commodityRevenu/addCommentInstallmentSchedule",authMiddleware, addCommentInstallmentSchedule)

module.exports = Router;