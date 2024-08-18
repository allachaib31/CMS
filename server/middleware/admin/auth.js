const jwt = require('jsonwebtoken');
const userModel = require('../../models/user');
const JWTKEY = process.env.JWTKEY;

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, JWTKEY, async (err, user) => {
        if (err) {
            return res.status(403).send({
                msg: "حدث خطأ أثناء معالجة طلبك"
            });
        }
        const admin = await userModel.findById(user._id);
        if(!admin || !admin.admin.isAdmin){
            return res.sendStatus(401);
        }
        req.user = {
            name: admin.name,
            NationalIdentificationNumber: admin.NationalIdentificationNumber,
            phoneNumber: admin.phoneNumber,
            status: admin.status,
            profileImage: admin.profileImage,
            admin: {
                userPermission: admin.admin.userPermissions,
            }
        };
        next();
    });
}
