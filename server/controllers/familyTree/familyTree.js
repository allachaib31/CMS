const { familyTreeModel } = require("../../models/familyTree/familyTree");
const { Readable } = require('stream');
const { isValidObjectId } = require('mongoose');
const getHijriDate = require("../../utils/getHijriDate");
const shortid = require("shortid");
const { familyMemberModel } = require("../../models/familyTree/familyMembers");
const { File } = require("../../models/advertising/advertising");
const { familyRelationModel } = require("../../models/familyTree/familyRelation");
const { bucket } = require('../../app');
exports.createNewFamilyTree = async (req, res) => {
    const { nameTree } = req.body;
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "التعامل مع صفحة شجرة العائلة"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "التعامل مع صفحة شجرة العائلة",
            });
        }
        const hijriDate = getHijriDate();
        const familyTree = new familyTreeModel({
            name: nameTree,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        })
        await familyTree.save();
        return res.status(200).send({
            msg: "تم انشائها بنجاح",
            familyTree
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.addToFamilyTree = async (req, res) => {
    const { file } = req;
    const { idTree, nameTree, title, titleBgColor, titleTextColor, subtitles, sex, badges } = req.body;
    try {
        // Create a writable stream to GridFS
        if(file){
            const { originalname, mimetype, buffer } = file;
            let uploadStream = bucket.openUploadStream(originalname, {
                contentType: mimetype
            });
    
            // Create a readable stream from the buffer
            let readBuffer = new Readable();
            readBuffer.push(buffer);
            readBuffer.push(null);
    
            // Pipe the buffer to GridFS
            await new Promise((resolve, reject) => {
                readBuffer.pipe(uploadStream)
                    .on('finish', resolve)
                    .on('error', reject);
            });
    
            // Save file metadata in MongoDB
            let newFile = new File({
                filename: originalname,
                contentType: mimetype,
                length: buffer.length,
                id: uploadStream.id
            });
    
            let savedFile = await newFile.save();
            if (!savedFile) {
                return res.status(404).send("حدث خطأ أثناء حفظ البيانات التعريفية للملف");
            }
            const familyTree = await familyTreeModel.findById(idTree);
            if (!familyTree) {
                return res.status(404).send({
                    msg: "شجرة العائلة غير موجودة"
                });
            }
            const familyMember = new familyMemberModel({
                idFamilyTree: idTree,data: {
                    nameTree, title, titleBgColor, titleTextColor, subtitles: subtitles.split(","), sex, badges: badges.split(","),  imageUrl: newFile._id
                }
            })
            await familyMember.save();
        }else{
            const familyMember = new familyMemberModel({
                idFamilyTree: idTree,data: {
                    nameTree, title, titleBgColor, titleTextColor, subtitles: subtitles.split(","), sex, badges: badges.split(",")
                }
            })
            await familyMember.save();
        }
        return res.status(200).send({
            msg: "تمت إضافة العنصر بنجاح",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message
        });
    }
};
exports.addNewRelation = async (req, res) => {
    const { idTree, relationType, prettyType, toId, fromId, isInnerFamily } = req.body;
    try {
        const familyTree = await familyTreeModel.findById(idTree);
        if (!familyTree) {
            return res.status(404).send({
                msg: "شجرة العائلة غير موجودة"
            });
        }
        if(toId.toString() == fromId.toString()) {
            return res.status(400).send({
                msg: "حدث خطأ"
            })
        }
        const familyRelationExist = await familyRelationModel.findOne({
            fromId: toId,
            toId: fromId
        });
        if(familyRelationExist) {
            return res.status(400).send({
                msg: "هذه العلاقة موجودة بالفعل"
            })
        }
        const familyRelation = new familyRelationModel({
            idFamilyTree: idTree,relationType, prettyType, toId: fromId, fromId: toId , isInnerFamily
        })
        await familyRelation.save();
        return res.status(200).send({
            msg: "تمت إضافة العنصر بنجاح",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message
        });
    }
}
exports.getMemberFamilyTree = async (req, res) => {
    const { idFamilyTree } = req.query;
    try{
        const familyMember = await familyMemberModel.find({
            idFamilyTree
        });
        return res.status(200).send({
            familyMember
        })
    }catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getFamilyTree = async (req, res) => {
    try {
        const familyTree = await familyTreeModel.find().sort({
            createdAt: -1
        })
        return res.status(200).send({
            familyTree
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getFamilyTreeUseId = async (req, res) => {
    const { id } = req.query;
    try {
        const familyTree = await familyTreeModel.findById(id);
        const familyMember = await familyMemberModel.find({
            idFamilyTree: id
        });
        const familyRelation = await familyRelationModel.find({
            idFamilyTree: id
        });
        return res.status(200).send({
            familyTree,
            familyMembers: familyMember,
            familyRelations: familyRelation
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getIdFamilyTree = async (req, res) => {
    try{
        const listId = await familyTreeModel.find().select("name").sort({
            createdAt: -1
        })
        return res.status(200).send({
            listId
        })
    }catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.updateFamilyTree = async (req, res) => {

}
exports.deleteFamilyTree = async (req, res) => {
    const { id } = req.query;

    // Validate ID
    if (!id || !isValidObjectId(id)) {
        return res.status(400).send({
            msg: "معرف غير صالح"
        });
    }

    try {
        // Attempt to find and delete the document
        const familyTree = await familyTreeModel.findByIdAndDelete(id);

        // Handle case where no document is found
        if (!familyTree) {
            return res.status(404).send({
                msg: "لم يتم العثور على شجرة العائلة"
            });
        }

        // Success response
        return res.status(200).send({
            msg: "تم حذف شجرة العائلة"
        });
    } catch (error) {
        console.error("Error deleting family tree:", error); // Log the error
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};