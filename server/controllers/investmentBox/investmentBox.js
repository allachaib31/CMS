const { validateInvestment, investmentBoxModel } = require("../../models/investmentBox/investmentBox");
const { userInvestmentModel } = require("../../models/investmentBox/userInvestmentBox");
const moneyBoxModel = require("../../models/moneybox");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;


exports.addInvestmentBox = async (req, res) => {
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
        const { error } = validateInvestment({
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
        const investment = new investmentBoxModel({
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
        await investment.save();
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
                    const userInvestment = new userInvestmentModel({
                        idInvestment: investment._id,
                        idUser: user._id,
                        prevBalance: user.memberBalance,
                        contributionAmount: amountUser,
                        contributionRate: (amountUser * 100) / user.memberBalance,
                    })
                    user.memberBalance -= amountUser;
                    await user.save();
                    await userInvestment.save();
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
exports.paymentInvesment = async (req, res) => {
    const { idInvestment , money} = req.body;

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
        const investment = await investmentBoxModel.findById(idInvestment)
        if (!investment) {
            return res.status(404).send({
                msg: "لا توجد هدى المساهمة"
            })
        }
        if(investment.isDone){
            return res.status(403).send({
                msg: "لقد تم البيع من قبل"
            })
        }
        investment.amountAfterEnd = money;
        investment.isDone = true;
        const userInvestment = await userInvestmentModel.find({
            idInvestment: investment._id
        }).populate("idUser", {
            password: false
        });
        const amountUser = money / userInvestment.length;
        for(const user of userInvestment) {
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
        await investment.save();
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: investment.amountAfterEnd,
                    cumulativeAmount: investment.amountAfterEnd - investment.amount > 0 ? investment.amountAfterEnd - investment.amount : 0,
                    "source.investmentBox": investment.amountAfterEnd - investment.amount > 0 ? investment.amountAfterEnd - investment.amount : 0
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
            investment,
            userInvestment
        });
    } catch(error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getIdInvestmentBox = async (req, res) => {
    const { month, year } = req.query;
    console.log(year)
    try {
        const investment = await investmentBoxModel.find({
            "hijriDate.year": parseInt(year),
            "hijriDate.month.number": parseInt(month)
        }).select("_id id");
        return res.status(200).send({
            investment
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getInvestmentBox = async (req, res) => {
    const { id } = req.query;
    try {
        const investment = await investmentBoxModel.findById(id);
        const userInvestment = await userInvestmentModel.find({
            idInvestment: id
        }).populate("idUser", {
            password: false
        }).populate("idInvestment")
        return res.status(200).send({
            investment,
            userInvestment
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}