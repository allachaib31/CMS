const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const authMiddleware = require("../../middleware/admin/auth");
const { addAdvertising, getAdvertisingImage, repostAds,getAdvertising, deleteAdvertising, addAds, getAds, deleteAds } = require("../../controllers/manageAdvertising/advertising");
const { bucket } = require("../../app");
const Router = express.Router();

/*const upload = multer({
    storage: multer.memoryStorage(),
});*/
// Storage engine
const  storage = multer.memoryStorage()
const upload  =  multer({storage})

//POST METHODS
Router.post("/api/v1.0/advertising/", authMiddleware, upload.single("image"), addAdvertising);
Router.post("/api/v1.0/ads/add", authMiddleware, addAds);
Router.post("/api/v1.0/ads/repost", authMiddleware, repostAds)

//GET METHODS
Router.get("/api/v1.0/advertising/getAll",authMiddleware,getAdvertising)
Router.get("/api/v1.0/advertisingImage/:id", authMiddleware, getAdvertisingImage)
Router.get("/api/v1.0/ads/", authMiddleware, getAds)

//Delete methods
Router.delete("/api/v1.0/advertising/delete", authMiddleware, deleteAdvertising)
Router.delete("/api/v1.0/ads", authMiddleware, deleteAds)

module.exports = Router;