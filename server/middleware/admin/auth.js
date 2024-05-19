const jwt = require('jsonwebtoken');
const JWTKEY = process.env.JWTKEY;

module.exports = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, JWTKEY, (err, user) => {
        if (err) {
            return res.status(403).send({
                msg: "حدث خطأ أثناء معالجة طلبك"
            });
        }
        req.user = user;
        next();
    });
}
