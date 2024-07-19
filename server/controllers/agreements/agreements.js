const { validateAgreement, agreementsModel } = require("../../models/agreements/agreements");
const getHijriDate = require("../../utils/getHijriDate");

exports.addAgreements = async (req, res) => {
    const { text } = req.body;
    try {
        const { error } = validateAgreement({
            text
        });
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const hijriDate = getHijriDate()
        const agreements = new agreementsModel({
            text,hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        })
        await agreements.save();
        return res.status(200).send({
            msg: "لقد تم اضافته بجاح",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getAgreements = async (req, res) => {
    try {
        const agreements = await agreementsModel.find().sort({
            createdAt: -1
        });
        return res.status(200).send({
            agreements
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}