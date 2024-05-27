const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const userModel = require("../../models/user");
const JWTKEY = process.env.JWTKEY;

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await userModel.findOne({ email: email, "admin.isAdmin": true });
        if (!admin) {
            return res.status(401).send({
                msg: "بريدك الإلكتروني أو كلمة المرور غير صحيحة"
            });
        }
        
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(401).send({
                msg: "بريدك الإلكتروني أو كلمة المرور غير صحيحة"
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