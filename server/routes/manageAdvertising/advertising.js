const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const authMiddleware = require("../../middleware/admin/auth");
const { addAdvertising, getAdvertisingImage, getAdvertising, deleteAdvertising } = require("../../controllers/manageAdvertising/advertising");
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

//GET METHODS
Router.get("/api/v1.0/advertising/getAll",authMiddleware,getAdvertising)
Router.get("/api/v1.0/advertisingImage/:id", authMiddleware, getAdvertisingImage)

//Delete methods
Router.delete("/api/v1.0/advertising/delete", authMiddleware, deleteAdvertising)
module.exports = Router;