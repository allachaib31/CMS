const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addCommodityRevenue, getIdCommodityRevenue, getCommodityRevenue, getInstallmentSchedule, getFormContributionPurchaseCommodity, getAllCommodityRevenue,addCommentCommodityRevenue,getActiveCommodityRevenue, getCommidtyAndInstallment, payInstallmentSchedule, addCommentInstallmentSchedule } = require("../../controllers/manageCommodityRevenue/commodityRevenue");
const Router = express.Router();

Router.use(authMiddleware);

//GET METHODS
Router.get("/api/v1.0/commodityRevenu/getIdCommodityRevenue", getIdCommodityRevenue);
Router.get("/api/v1.0/commodityRevenu/getCommodityRevenue", getCommodityRevenue);
Router.get("/api/v1.0/commodityRevenu/getInstallmentSchedule", getInstallmentSchedule);
Router.get("/api/v1.0/commodityRevenu/getFormContributionPurchaseCommodity", getFormContributionPurchaseCommodity);
Router.get("/api/v1.0/commodityRevenu/getAllCommodityRevenue", getAllCommodityRevenue);
Router.get("/api/v1.0/commodityRevenu/getActiveCommodityRevenue", getActiveCommodityRevenue);
Router.get("/api/v1.0/commodityRevenu/getCommidtyAndInstallment", getCommidtyAndInstallment);
//POST METHODS
Router.post("/api/v1.0/commodityRevenu/", addCommodityRevenue);
Router.post("/api/v1.0/commodityRevenu/payInstallmentSchedule",payInstallmentSchedule)

//PATCH METHODS
Router.patch("/api/v1.0/commodityRevenu/addCommentCommodityRevenue", addCommentCommodityRevenue);
Router.patch("/api/v1.0/commodityRevenu/addCommentInstallmentSchedule", addCommentInstallmentSchedule)

module.exports = Router;