const { agreementsModel } = require("../../../models/agreements/agreements");
const moneyBoxModel = require("../../../models/moneybox");
const userModel = require("../../../models/user")
const moneyBoxId = process.env.moneyBoxId;
exports.getClientInformation = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await userModel.findById(id);
        const moneyBox = await moneyBoxModel.findById(moneyBoxId);
        return res.status(200).send({
            memberBalance: user.memberBalance,
            cumulativeBalance: user.cumulativeBalance,
            commodityProfitsContributions: user.commodityProfitsContributions,
            subsidies: user.subsidies,
            loans: user.loans,
            moneyBox
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getAgreements = async (req, res) => {
    try {
        const agreements = await agreementsModel.find({
            active: true
        });
        return res.status(200).send({
            agreements
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}