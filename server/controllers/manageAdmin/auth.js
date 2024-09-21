const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const userModel = require("../../models/user");
const JWTKEY = process.env.JWTKEY;

exports.login = async (req, res) => {
    const { NationalIdentificationNumber, password } = req.body;
    try {
        const admin = await userModel.findOne({ NationalIdentificationNumber: NationalIdentificationNumber, "admin.isAdmin": true });
        console.log(admin)
        if (!admin) {
            return res.status(401).send({
                msg: "رقم الهوية الوطنية أو كلمة المرور غير صحيحة"
            });
        }
        if(admin.disable){
            return res.status(401).send({
                msg: "هذا الحساب معطل"
            });
        }
        console.log(admin)
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(401).send({
                msg: "رقم الهوية الوطنية أو كلمة المرور غير صحيحة"
            });
        }
        const token = jwt.sign({
            _id: admin._id,
        }, JWTKEY);
        return res.status(200).send({
            msg: "تم تسجيل الدخول بنجاح",
            token
        });

    } catch (err) {
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