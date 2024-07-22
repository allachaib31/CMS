const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const userModel = require("../../../models/user");
const JWTKEY = process.env.JWTKEY;

exports.login = async (req, res) => {
    const { NationalIdentificationNumber, password } = req.body;
    try {
        console.log(req.body)
        const user = await userModel.findOne({ NationalIdentificationNumber: NationalIdentificationNumber});
        if (!user) {
            return res.status(401).send({
                msg: "رقم الهوية الوطنية أو كلمة المرور غير صحيحة"
            });
        }
        if(user.disable){
            return res.status(401).send({
                msg: "هذا الحساب معطل"
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({
                msg: "رقم الهوية الوطنية أو كلمة المرور غير صحيحة"
            });
        }
        const token = jwt.sign({
            _id: user._id,
        }, JWTKEY);
        return res.status(200).send({
            msg: "تم تسجيل الدخول بنجاح",
            token
        });

    } catch (err) {
        console.log(err)
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