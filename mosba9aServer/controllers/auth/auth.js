const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { adminContestModel, validateAdminContest } = require("../../models/admin");
const JWTKEY = process.env.JWTKEY;
const SALTROUNDS = Number(process.env.SALTROUNDS);

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminContestModel.findOne({ email: email });
        if (!admin) {
            return res.status(401).send({
                msg: "بريد إلكتروني أو كلمة المرور غير صحيحة"
            });
        }
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(401).send({
                msg: "بريد إلكتروني أو كلمة المرور غير صحيحة"
            });
        }
        const token = jwt.sign({
            _id: admin._id,
        }, JWTKEY);
        return res.status(200).send({
            msg: "تم تسجيل الدخول بنجاح",
            token
        });

    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.addAdmin = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    try {
        const { error } = validateAdminContest({
            name, email, phoneNumber, password
        })
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const genSalt = Number(await bcrypt.genSalt(SALTROUNDS));
        const hashPassword = await bcrypt.hash(password, genSalt);
        const admin = adminContestModel({
            name,email,phoneNumber,password: hashPassword
        })
        await admin.save();
        return res.status(200).send({
            msg: "لقد تمت إضافة العضو بنجاح",
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                phoneNumber: admin.phoneNumber
            }
        })
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                message = 'بريد إلكتروني موجود بالفعل';
            }
            return res.status(422).send({
                msg: message
            });
        }
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getAdmins = async (req, res) => {
    try{
        const admins = await adminContestModel.find().select("_id id name email phoneNumber");
        return res.status(200).send({
            admins
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.deleteAdmins = async (req, res) => {
    const { id } = req.query;
    try{
        const admin = await adminContestModel.findByIdAndDelete(id);
        if(!admin){
            return res.status(404).send({
                msg: "لم يتم العثور على العضو"
            })
        }
        return res.status(200).send({
            msg: "تم حذف العضو بنجاح"
        })
    }catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.validation = async (req, res) => {
    return res.status(200).send({
        msg: "تم تسجيل الدخول بنجاح",
        user: req.user
    });
}