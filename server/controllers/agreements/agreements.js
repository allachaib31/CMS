const { validateAgreement, agreementsModel } = require("../../models/agreements/agreements");
const getHijriDate = require("../../utils/getHijriDate");

exports.addAgreements = async (req, res) => {
    const { text } = req.body;
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "التعامل مع صفحة بنود واتفاقيات الصندوق"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن التعامل مع صفحة بنود واتفاقيات الصندوق",
            });
        }
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

exports.updateAgreementsActive = async (req, res) => {
    const { id, active} = req.body;
    console.log(req.body)
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "التعامل مع صفحة بنود واتفاقيات الصندوق"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن التعامل مع صفحة بنود واتفاقيات الصندوق",
            });
        }
        if(!active) {
            const findActiveAgreement = await agreementsModel.findOne({
                active: true
            });
            console.log(findActiveAgreement)
            if(findActiveAgreement){
                console.log("hi")
                return res.status(400).send({
                    msg: "عليك تعطيل الاتفاقية المفعلة لتستطيع تفعيل هده الاتفاقية"
                })
            }
        }
        const agreements = await agreementsModel.findByIdAndUpdate(id, {
            active: !active
        });
        const result = await agreementsModel.find().sort({
            createdAt: -1
        });
        return res.status(200).send({
            agreements,
            result,
            msg: "لقد تم تحديث بنجاح"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}