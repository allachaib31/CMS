const { familyTreeModel } = require("../../models/familyTree/familyTree");
const getHijriDate = require("../../utils/getHijriDate");
const shortid = require("shortid");
exports.createNewFamilyTree = async (req, res) => {
    const { nameTree, name } = req.body;
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
            familyTree: {
                name,
                value: shortid.generate(),
                children: []
            },
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
    const { idTree, valueName, nameSun } = req.body;
    console.log(req.body);
    try {
        const familyTree = await familyTreeModel.findById(idTree);
        if (!familyTree) {
            return res.status(404).send({
                msg: "شجرة العائلة غير موجودة"
            });
        }

        function addChild(parentName, newChild, node) {
            if (node.value === parentName) {
                if (!node.children) {
                    node.children = [];
                }
                node.children.push(newChild);
                return true;
            }
            if (node.children) {
                for (let child of node.children) {
                    if (addChild(parentName, newChild, child)) {
                        return true;
                    }
                }
            }
            return false;
        }

        const newChild = { "name": nameSun, "value": shortid.generate() };
        const parentName = valueName;

        if (!addChild(parentName, newChild, familyTree.familyTree)) {
            return res.status(404).send({
                msg: "العنصر الأب غير موجود"
            });
        }

        // Mark the familyTree field as modified
        familyTree.markModified('familyTree');

        await familyTree.save();

        return res.status(200).send({
            msg: "تمت إضافة العنصر بنجاح",
            familyTree
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message
        });
    }
};
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
        return res.status(200).send({
            familyTree
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