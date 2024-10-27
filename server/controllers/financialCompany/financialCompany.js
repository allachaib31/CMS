const { validateFinancial, financialCompanyModel } = require("../../models/financialCompany/financialCompany");
const { userFinancialCompanyModel } = require("../../models/financialCompany/userFinancial");
const moneyBoxModel = require("../../models/moneybox");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;


exports.addFinancialCompany = async (req, res) => {
    const { nameContributingParty,
        nameContributingBank,
        amount,
        duration,
        contributionDateMiladi,
        contributionDateHijri,
        contributionEndDateMiladi,
        contributionEndDateHijri, } = req.body;
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)",
            });
        }
        const amountMoneyBox = await moneyBoxModel.findById(moneyBoxId);
        if (amount > amountMoneyBox.amount) {
            return res.status(403).send({
                msg: "لايوجد رصيد كافي في الصندوق",
            });
        }
        const { error } = validateFinancial({
            nameContributingParty,
            nameContributingBank,
            amount,
            duration,
            contributionDateMiladi,
            contributionDateHijri,
            contributionEndDateMiladi,
            contributionEndDateHijri
        });
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const hijriDate = getHijriDate();
        const financial = new financialCompanyModel({
            nameContributingParty,
            nameContributingBank,
            amount,
            duration,
            contributionDateMiladi,
            contributionDateHijri,
            contributionEndDateMiladi,
            contributionEndDateHijri,
            previousFundBalance: amountMoneyBox.amount,
            contributionAmount: amount,
            contributionRate: (amount * 100) / amountMoneyBox.amount,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        })
        await financial.save();
        const numberOfUser = await userModel.countDocuments({ "status": "active", "disable": false });
        const activeUsers = await userModel.find({
            status: "active",
            disable: false,
        });
        const amountUser = amount / activeUsers.length;
        for (const user of activeUsers) {
            let isSaved = false;
            while (!isSaved) {
                try {
                    const userFinancial = new userFinancialCompanyModel({
                        idFinancial: financial._id,
                        idUser: user._id,
                        prevBalance: user.memberBalance,
                        contributionAmount: amountUser,
                        contributionRate: (amountUser * 100) / user.memberBalance,
                    })
                    user.memberBalance -= amountUser;
                    await user.save();
                    await userFinancial.save();
                    isSaved = true;
                } catch (error) {
                    if (error.code === 11000) {
                        await new Promise(res => setTimeout(res, Math.random() * 100));
                    } else {
                        throw error;
                    }
                }
            }
        }
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: (amount * (-1)),
                }
            },
            { new: true })
        if (!moneyBox) {
            return res.status(400).send({
                msg: "حدث خطأ أثناء معالجة طلبك",
            });
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
exports.paymentFinancialCompany = async (req, res) => {
    const { idFinancial , money} = req.body;

    try{
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)",
            });
        }
        const financial = await financialCompanyModel.findById(idFinancial)
        if (!financial) {
            return res.status(404).send({
                msg: "لا توجد هدى المساهمة"
            })
        }
        if(financial.isDone){
            return res.status(403).send({
                msg: "لقد تم البيع من قبل"
            })
        }
        financial.amountAfterEnd = money;
        financial.isDone = true;
        const userFinancial = await userFinancialCompanyModel.find({
            idFinancial: financial._id
        }).populate("idUser", {
            password: false
        });
        const amountUser = money / userFinancial.length;
        for(const user of userFinancial) {
            //const profitAmount = amountUser;
            user.rate = ((amountUser -  user.contributionAmount) / user.contributionAmount) * 100;
            user.amount = amountUser
            user.balanceAfterSale = user.prevBalance + (amountUser - user.contributionAmount);
            await user.save();
            await userModel.findByIdAndUpdate(user.idUser, {
                $inc: {
                    memberBalance: amountUser,
                    cumulativeBalance: amountUser - user.contributionAmount > 0 ? amountUser - user.contributionAmount : 0,
                    commodityProfitsContributions: amountUser - user.contributionAmount > 0 ? amountUser - user.contributionAmount : 0
                }
            },
                { new: true })
        }
        await financial.save();
        console.log(financial.amountAfterEnd - financial.amount)
        console.log(financial.amountAfterEnd)
        console.log(financial.amount)
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: financial.amountAfterEnd,
                    cumulativeAmount: financial.amountAfterEnd - financial.amount > 0 ? financial.amountAfterEnd - financial.amount : 0,
                    "source.financialCompany": financial.amountAfterEnd - financial.amount > 0 ? financial.amountAfterEnd - financial.amount : 0
                }
            },
            { new: true })
        if (!moneyBox) {
            return res.status(400).send({
                msg: "حدث خطأ أثناء معالجة طلبك",
            });
        }
        return res.status(200).send({
            msg: "لقد تمت اضافته بنجاح",
            financial,
            userFinancial
        });
    } catch(error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getIdFinancial = async (req, res) => {
    const { month, year } = req.query;
    console.log(year)
    try {
        const financial = await financialCompanyModel.find({
            "hijriDate.year": parseInt(year),
            "hijriDate.month.number": parseInt(month)
        }).select("_id id");
        return res.status(200).send({
            financial
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getFinancial = async (req, res) => {
    const { id } = req.query;
    try {
        const financialCompany = await financialCompanyModel.findById(id);
        const userFinancialCompany = await userFinancialCompanyModel.find({
            idFinancial: id
        }).populate("idUser", {
            password: false
        }).populate("idFinancial")
        return res.status(200).send({
            financialCompany,
            userFinancialCompany
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}