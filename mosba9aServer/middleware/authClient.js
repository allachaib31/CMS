const jwt = require('jsonwebtoken');
const { userContestModel } = require('../models/user');
const JWTKEY = process.env.JWTKEY;

module.exports = async (req, res, next) => {
    const token = req.cookies.tokenClient;
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, JWTKEY, async (err, userInfo) => {
        if (err) {
            return res.status(403).send({
                msg: "حدث خطأ أثناء معالجة طلبك"
            });
        }
        const user = await userContestModel.findById(userInfo._id);
        if(!user){
            return res.sendStatus(401);
        }
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        };
        next();
    });
}
