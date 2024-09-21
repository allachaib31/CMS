const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const authMiddleware = require("../../../middleware/admin/auth");
const { getClientInformation, getAgreements, getElection, setVote, ElectionDetails, getAdvertising, uploadImage,getSubscribeClient, payMonthlySubscribe, getClientAds} = require("../../../controllers/client/userInformation/information");
const Router = express.Router();
const  storage = multer.memoryStorage()
const upload  =  multer({storage})

//GET METHODS
Router.get("/api/v1.0/clientInformation/", authMiddleware, getClientInformation);
Router.get("/api/v1.0/clientInformation/agreements", authMiddleware, getAgreements);
Router.get("/api/v1.0/clientInformation/getElection", authMiddleware, getElection);
Router.get("/api/v1.0/clientInformation/electionDetails", authMiddleware, ElectionDetails);
Router.get("/api/v1.0/clientInformation/getAdvertising", authMiddleware ,getAdvertising);
Router.get("/api/v1.0/clientInformation/getAds", authMiddleware ,getClientAds);
Router.post("/api/v1.0/clientInformation/subscribe", authMiddleware, getSubscribeClient);
//POST METHODS
Router.post("/api/v1.0/clientInformation/vote", authMiddleware, setVote);
Router.post("/api/v1.0/clientInformation/payMonthly", authMiddleware, payMonthlySubscribe);
Router.post("/api/v1.0/users/uploadClientImage", authMiddleware, upload.single("image"), uploadImage)

module.exports = Router;