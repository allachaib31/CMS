const express = require("express");
const authMiddleware = require("../../middleware/admin/auth");
const { addFoundationSubscriptions, addMonthlySubscriptions, getAnnualSubscriptions,getUserForFoundationSubscripe, getSubscriptionHistory,searchSubscriptionHistory, updateCommentSubscribeHistory, getAnnualSubscriptionsDetails, updateCommentRecordAnnual, getSubscriptionsForm, getOverdueSubscriptions, updateInvoiceOverdue, addCommentMonthly, getRegisterFinancialData } = require("../../controllers/manageSubscription/subscriptions");
const Router = express.Router();


//POST METHODS
Router.post("/api/v1.0/subscriptions/foundation",authMiddleware, addFoundationSubscriptions);
Router.post("/api/v1.0/subscriptions/monthly",authMiddleware, addMonthlySubscriptions);
Router.post("/api/v1.0/subscriptions/getSubscriptionsForm",authMiddleware, getSubscriptionsForm);
//GET METHODS
Router.get("/api/v1.0/subscriptions/getRegisterFinancialData",authMiddleware, getRegisterFinancialData)
Router.get("/api/v1.0/subscriptions/getOverdueSubscriptions",authMiddleware, getOverdueSubscriptions);
Router.get("/api/v1.0/subscriptions/getUserForFoundationSubscripe",authMiddleware, getUserForFoundationSubscripe);
Router.get("/api/v1.0/subscriptions/annual",authMiddleware, getAnnualSubscriptions);
Router.get("/api/v1.0/subscriptions/annualDetails",authMiddleware, getAnnualSubscriptionsDetails);
Router.get("/api/v1.0/subscriptions/history",authMiddleware,getSubscriptionHistory);
Router.get("/api/v1.0/subscriptions/search",authMiddleware, searchSubscriptionHistory)

//PATCH METHODS
Router.patch("/api/v1.0/subscriptions/addCommentMonthly",authMiddleware,addCommentMonthly)
Router.patch("/api/v1.0/subscriptions/updateCommentSubscribeHistory",authMiddleware, updateCommentSubscribeHistory);
Router.patch("/api/v1.0/subscriptions/updateCommentRecordAnnual",authMiddleware,updateCommentRecordAnnual)
Router.patch("/api/v1.0/subscriptions/isInvoiceOverdue",authMiddleware, updateInvoiceOverdue);
module.exports = Router;