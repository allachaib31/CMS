const moneyBoxModel = require("../../models/moneybox");
const moneyBoxId = process.env.moneyBoxId;

exports.getConsolidatedRecordRevenues = async (req, res) => {
    try {
        const moneyBox = await moneyBoxModel.findById(moneyBoxId);
        return res.status(200).send({
            moneyBox
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}