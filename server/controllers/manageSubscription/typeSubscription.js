const typeSubscriptionModel = require("../../models/subscription/typeSubscription")

//POST METHODS
exports.addTypeSubscription = async (req, res) => {
    const { name, amount } = req.body;
    try {
        const typeSubscription = typeSubscriptionModel({
            name,
            amount
        });
        await typeSubscription.save();
        return res.status(200).send({
            msg: "لقد تمت إضافة نوع بنجاح",
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

//GET METHODS
exports.getTypeSubscription = async (req, res) => {
    try {
        const typeSubscription = await typeSubscriptionModel.find();
        return res.status(200).send({
            typeSubscription,
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

//UPDATE METHODS
exports.updateTypeSubscription = async (req, res) => {
    const { id, amount } = req.body;
    try {
        const typeSubscription = await typeSubscriptionModel.findById(id);
        typeSubscription.amount = amount;
        let err = await typeSubscription.joiValidate(typeSubscription.toObject());
        if (err.error) throw err;
        await typeSubscription.save();
        return res.status(200).send({
            msg: "لقد تمت تحديث نوع بنجاح",
        });
    } catch (error) {
        console.log(error);
        if (error.error) {
            return res.status(422).send({
                msg: "احد المدخلات فيه خطاء",
            });
        }
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
//DELETE METHODS
exports.deleteTypeSubscription = async (req, res) => {

}