const moneyBoxModel = require("../../models/moneybox");
const { cashPayUserModel } = require("../../models/unreimbursedExpenses/cashPayUser");
const { typeExpensesModel, validateTypeExpenses } = require("../../models/unreimbursedExpenses/typeExpenses");
const { unReimbursedExpensesModel, validateUnReimbursedExpenses } = require("../../models/unreimbursedExpenses/unreimbursedExpenses");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;

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
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.deleteTypeExpenses = async (req, res) => {
    const { id } = req.query;
    try {
        const type = await typeExpensesModel.findByIdAndDelete(id);
        if (!type) {
            return res.status(404).send({
                msg: "لم يتم ايجاد هذا النوع"
            })
        }
        return res.status(200).send({
            msg: "لقد تم حذفه بنجاح"
        })
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

exports.addExpenses = async (req, res) => {
    const { name, amount, typeExpenses, comments, selectType } = req.body;
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة المصروفات الغير مسترجعة بأنواعها"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة المصروفات الغير المسترجعة بأنواعها",
            });
        }
        const amountMoneyBox = await moneyBoxModel.findById(moneyBoxId);
        if (amount > amountMoneyBox.amount) {
            return res.status(403).send({
                msg: "لايوجد رصيد كافي في الصندوق",
            });
        }
        let user;
        if(selectType){
            user = await userModel.findById(name)
            if (!user) {
                return res.status(404).send({
                    msg: "لا وجود لهذا المستخدم"
                })
            }
        }
        const typeExpensesName = await typeExpensesModel.findOne({
            id: typeExpenses
        });
        if (!typeExpensesName) {
            return res.status(404).send({
                msg: "لا يوجد هذا النوع من المصروفات"
            })
        }
        const { error } = validateUnReimbursedExpenses({
            name: selectType ? user.name : name, amount, typeExpenses: typeExpensesName.name, comments
        })
        if (error) {
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const hijriDate = getHijriDate();
        const users = await userModel.find({
            disable: false
        });
        const paymentAmount = amount / users.length;
        const unReimbursedExpenses = new unReimbursedExpensesModel({
            name:  selectType ? user.name : name,
            amount,
            expensememberbalance: paymentAmount,
            typeExpenses: typeExpensesName.name,
            comments,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        })
        let activeAmount = 0;
        for(const user of users) {
            let isSaved = false;
            while(!isSaved){
                try {
                    if (user.status == "active") {
                        activeAmount += paymentAmount;
                        user.memberBalance -= paymentAmount;
                        await user.save();
                    } else {
                        const cashPayUser = new cashPayUserModel({
                            idUser: user._id,
                            amount: paymentAmount,
                            unReimbursedExpensesId: unReimbursedExpenses._id,
                            hijriDate: {
                                day: hijriDate[0],
                                month: hijriDate[1],
                                year: hijriDate[2],
                            }
                        })
                        await cashPayUser.save();
                    }
                    isSaved = true;
                }catch (error) {
                    if (error.code === 11000) {
                        await new Promise(res => setTimeout(res, Math.random() * 100));
                    } else {
                        throw error;
                    }
                }
            }
        }
        unReimbursedExpenses.balanceDistribution = activeAmount;
        unReimbursedExpenses.total = activeAmount;
        await unReimbursedExpenses.save();
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: (activeAmount * (-1)),
                }
            },
            { new: true })
        if (!moneyBox) {
            return res.status(400).send({
                msg: "حدث خطأ أثناء معالجة طلبك",
            });
        }
        if(selectType){
            const userUpdate = await userModel.findByIdAndUpdate(name, {
                $inc: {
                    "subsidies.number": 1,
                    "subsidies.amount": Number(amount)
                }
            },
                { new: true })
        }
        return res.status(200).send({
            msg: "لقد تمت اضافته بنجاح",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.printUnReimbursedExpenses = async (req, res) => {
    const { from, to } = req.query;
    try {
        if(req.user.admin.userPermission.indexOf("طباعة المصروفات الغير مسترجعة (كلي أو جزئي حسب المدة)") <= -1){
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
        const unReimbursedExpenses = await unReimbursedExpensesModel.find(query);
        
        return res.status(200).json({unReimbursedExpenses});
    } catch (error) {
        return res.status(500).json({ msg: "حدث خطأ أثناء معالجة طلبك" });
    }
};
exports.getRecordUnrecovereExpenses = async (req, res) => {
    try {
        const unReimbursedExpenses = await unReimbursedExpensesModel.find();
        let total = 0;
        unReimbursedExpenses.forEach((expenses) => {
            total += expenses.amount;
        })
        const cashPayUser = await cashPayUserModel.find();
        let expensesPaidCash = 0;
        cashPayUser.forEach((cashPay) => {
            if (cashPay.itPaid) {
                expensesPaidCash += cashPay.amount;
            }
        })
        return res.status(200).send({
            unReimbursedExpenses,
            total,
            expensesPaidCash,
            numberOfBeneficiaries: unReimbursedExpenses.length

        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getIdUnReimbursedExpenses = async (req, res) => {
    try {
        const unReimbursedExpenses = await unReimbursedExpensesModel.find().select("id");
        return res.status(200).send({
            unReimbursedExpenses
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.searchUnReimbursedExpenses = async (req, res) => {
    const { id } = req.query;
    try {
        const cashPayUsers = await cashPayUserModel.find({
            unReimbursedExpensesId: id,
        }).populate("idUser", "name id");
        console.log(cashPayUsers)
        return res.status(200).send({
            cashPayUsers
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.payCash = async (req, res) => {
    const { id } = req.body;
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة المصروفات الغير مسترجعة بأنواعها"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة المصروفات الغير المسترجعة بأنواعها",
            });
        }
        const cashPayUser = await cashPayUserModel.findById(id).populate("idUser");
        if (cashPayUser.itPaid) {
            return res.status(400).send({
                msg: "لقد تم الدفع من قبل"
            })
        }
        cashPayUser.itPaid = true;
        const unReimbursedExpenses = await unReimbursedExpensesModel.findById(cashPayUser.unReimbursedExpensesId);
        unReimbursedExpenses.total += cashPayUser.amount;
        unReimbursedExpenses.expensesPaidCash.push({
            name: cashPayUser.idUser.name,
            amount: cashPayUser.amount
        })
        /*const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: cashPayUser.amount,//remvoe this
                }
            },
            { new: true })*/
        await cashPayUser.save();
        await unReimbursedExpenses.save();
        return res.status(200).send({
            msg: "لقد تم الدفع بنجاح",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getUnReimbursedExpenses = async (req, res) => {
    const { month, year } = req.query;

    try {
        const unReimbursedExpenses = await unReimbursedExpensesModel.find();
        let totalAmount = 0;
        let totalAmountMonth = 0;
        const result = [];
        unReimbursedExpenses.forEach((expenses) => {
            if (expenses.hijriDate.month.number == month && expenses.hijriDate.year == year) {
                result.push(expenses)
                totalAmountMonth += expenses.amount
            }
            if(expenses.expensesPaidCash.length > 0) totalAmount += expenses.expensesPaidCash[0].amount * expenses.expensesPaidCash.length
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