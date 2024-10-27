const { validateFatwa, fatwasModel } = require("../../models/fatwa/fatwa");
const getHijriDate = require("../../utils/getHijriDate");

exports.addFatwas = async (req, res) => {
    const { title,text } = req.body;
    try {
        /*if (
            req.user.admin.userPermission.indexOf(
                "التعامل مع صفحة بنود واتفاقيات الصندوق"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن التعامل مع صفحة بنود واتفاقيات الصندوق",
            });
        }*/
        const { error } = validateFatwa({
            text
        });
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const hijriDate = getHijriDate()
        const fatwas = new fatwasModel({
            title,
            text,hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        })
        await fatwas.save();
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

exports.getFatwas = async (req, res) => {
    try {
        const fatwas = await fatwasModel.find();
        return res.status(200).send({
            fatwas
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.updateFatwasActive = async (req, res) => {
    const { id, active} = req.body;
    console.log(req.body)
    try {
        /*if (
            req.user.admin.userPermission.indexOf(
                "التعامل مع صفحة بنود واتفاقيات الصندوق"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن التعامل مع صفحة بنود واتفاقيات الصندوق",
            });
        }*/
        if(!active) {
            const findActiveFatwa = await fatwasModel.findOne({
                active: true
            });
            if(findActiveFatwa){
                return res.status(400).send({
                    msg: "عليك تعطيل الاتفاقية المفعلة لتستطيع تفعيل هده الاتفاقية"
                })
            }
        }
        const fatwas = await fatwasModel.findByIdAndUpdate(id, {
            active: !active
        });
        const result = await fatwasModel.find().sort({
            createdAt: -1
        });
        return res.status(200).send({
            fatwas,
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