const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const authMiddleware = require("../../middleware/admin/auth");
const { addToFamilyTree, getFamilyTree, updateFamilyTree, createNewFamilyTree,addNewRelation, getFamilyTreeUseId, getIdFamilyTree, deleteFamilyTree, getMemberFamilyTree } = require("../../controllers/familyTree/familyTree");
const Router = express.Router();
const  storage = multer.memoryStorage()
const upload  =  multer({storage})

//POST MEHTODS
Router.post("/api/v1.0/familyTree/createNewFamilyTree",authMiddleware, createNewFamilyTree)
Router.post("/api/v1.0/familyTree",authMiddleware, upload.single("image"), addToFamilyTree);
Router.post("/api/v1.0/familyTree/addNewRelation", authMiddleware, addNewRelation)

//GET METHODS
Router.get("/api/v1.0/familyTree",authMiddleware, getFamilyTree);
Router.get("/api/v1.0/familyTree/getMemberFamilyTree", authMiddleware, getMemberFamilyTree)
Router.get("/api/v1.0/familyTree/withId",authMiddleware, getFamilyTreeUseId);
Router.get("/api/v1.0/familyTree/getListId",authMiddleware, getIdFamilyTree)

//PATCH METHODS
Router.patch("/api/v1.0/familyTree",authMiddleware, updateFamilyTree)

//DELETE METHODS
Router.delete("/api/v1.0/familyTree/delete",authMiddleware, deleteFamilyTree);

module.exports = Router