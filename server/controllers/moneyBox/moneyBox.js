const moneyBoxModel = require("../../models/moneybox");
const moneyBoxId = process.env.moneyBoxId;

exports.createMoneyBox = async (req, res) => {
    try {
        const moneyBox =  moneyBoxModel();
        await moneyBox.save()
        return res.status(200).send({
            msg: "لقد تم بناء صندوق المال بنجاح",
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
        });
    }
}

exports.getMoneyBox = async (req, res) => {
    try{
        const moneyBox = await moneyBoxModel.findById(moneyBoxId);
        return res.status(200).send({
            moneyBox
        });
    } catch(error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
        });
    }
}