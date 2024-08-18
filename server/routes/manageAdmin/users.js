const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const {
    addUser,
    getUser,
    searchUser,
    updateUser,
    changeStatus,
    deleteUser,
    updatePassword,
    uploadImage,
    getProfileImage,
} = require("../../controllers/manageAdmin/users");
const authMiddleware = require("../../middleware/admin/auth");
const Router = express.Router();

const  storage = multer.memoryStorage()
const upload  =  multer({storage})

//POST METHODS
Router.post("/api/v1.0/users/addUser",authMiddleware, addUser);
Router.post("/api/v1.0/users/uploadImage",authMiddleware, upload.single("image"), uploadImage)

//GET METHODS
Router.get("/api/v1.0/users/",authMiddleware, getUser);
Router.get("/api/v1.0/users/search",authMiddleware, searchUser);
Router.get("/api/v1.0/users/getProfileImage/:id", authMiddleware, getProfileImage)

//UPDATE METHODS
Router.put("/api/v1.0/users",authMiddleware, updateUser);
Router.patch("/api/v1.0/users/updatePassword",authMiddleware, updatePassword);
Router.patch("/api/v1.0/users/changeStatus",authMiddleware, changeStatus);

//DELETE METHODS
Router.delete("/api/v1.0/users/",authMiddleware, deleteUser);

module.exports = Router;
