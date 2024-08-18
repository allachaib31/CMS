const { typeExpensesModel, validateTypeExpenses } = require("../../models/reimbursedExpenses/typeExpenses");
const { reimbursedExpensesModel, validateReimbursedExpenses } = require("../../models/reimbursedExpenses/reimbursedExpenses");
const getHijriDate = require("../../utils/getHijriDate");
exports.addTypeExpenses = async (req, res) => {
    const { name } = req.body;
    try {
        const { error } = validateTypeExpenses({
            name
        });
        if (error) {
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const typeExpenses = new typeExpensesModel({
            name
        })
        await typeExpenses.save();
        return res.status(200).send({
            msg: "لقد تمت اضافته بنجاح",
            typeExpenses
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getTypeExpenses = async (req, res) => {
    try {
        const typesExpenses = await typeExpensesModel.find();
        return res.status(200).send({
            typesExpenses
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.deleteTypeExpenses = async (req, res) => {
    const { id } = req.query;
    try {
        const removeType = await typeExpensesModel.findByIdAndDelete(id);
        if (!removeType) {
            return res.status(404).send({
                msg: "لم يتم ايجاد هذا النوع"
            })
        }
        return res.status(200).send({
            msg: "تم حذف العنصر بنجاح"
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.printReimbursedExpenses = async (req, res) => {
    const { from, to } = req.query;
    try {
        if(req.user.admin.userPermission.indexOf("طباعة المصروفات المسترجعة (كلي أو جزئي حسب المدة)") <= -1){
            return res.status(400).send({
                msg: "ليس لديك الاذن للطباعة"
            })
        }
        const query = {};
        
        if (from) {
            query.createdAt = { $gte: new Date(from) };
        }
        
        if (to) {
            query.createdAt = query.createdAt || {};
            query.createdAt.$lte = new Date(to);
        }

        console.log(query)
        const reimbursedExpenses = await reimbursedExpensesModel.find(query);
        
        return res.status(200).json({reimbursedExpenses});
    } catch (error) {
        return res.status(500).json({ msg: "حدث خطأ أثناء معالجة طلبك" });
    }
};
exports.addExpenses = async (req, res) => {
    const { name, amount, typeExpenses, comments } = req.body;
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة المصروفات المسترجعة بأنواعها"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة المصروفات المسترجعة بأنواعها",
            });
        }
        const typeExpensesName = await typeExpensesModel.findOne({
            id: typeExpenses
        });
        if (!typeExpensesName) {
            return res.status(404).send({
                msg: "لا يوجد هذا النوع من المصروفات"
            })
        }
        const { error } = validateReimbursedExpenses({
            name, amount, typeExpenses: typeExpensesName.name, comments
        })
        if (error) {
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const hijriDate = getHijriDate();
        const reimbursedExpenses = new reimbursedExpensesModel({
            name, amount, typeExpenses: typeExpensesName.name, comments,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        })
        await reimbursedExpenses.save();
        return res.status(200).send({
            msg: "لقد تمت اضافته بنجاح",
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getRecordReimbursedExpenses =  async (req, res) => {
    try{
        const reimbursedExpenses = await reimbursedExpensesModel.find();
        let totalAmount = 0;
        reimbursedExpenses.forEach((expenses) => {
            totalAmount += expenses.amount
        })
        return res.status(200).send({
            reimbursedExpenses,
            totalAmount
        })
    }catch(error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getReimbursedExpenses = async (req, res) => {
    const { month, year } = req.query;
    try {
        const reimbursedExpenses = await reimbursedExpensesModel.find();
        let totalAmount = 0;
        let totalAmountMonth = 0;
        const result = [];
        reimbursedExpenses.forEach((expenses) => {
            totalAmount += expenses.amount
            if(expenses.hijriDate.month.number == month && expenses.hijriDate.year == year){
                result.push(expenses)
                totalAmountMonth += expenses.amount
            }
        })
        return res.status(200).send({
            result,
            totalAmount,
            totalAmountMonth
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}