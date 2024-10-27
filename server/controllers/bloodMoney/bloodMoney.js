const moneyBoxModel = require("../../models/moneybox");
const { bloodMoneyModel } = require("../../models/bloodMoney/bloodMoney");
const { userBloodMoneyModel } = require("../../models/bloodMoney/userBloodMoney");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;
exports.addBloodMoney = async (req, res) => {
    const {name, amount,exchangeDateMiladi, exchangeDateHijri, comments} = req.body;
    try{
        const amountMoneyBox = await moneyBoxModel.findById(moneyBoxId);
        if(amount > amountMoneyBox.amount){
            return res.status(403).send({
                msg: "لايوجد رصيد كافي في الصندوق",
            });
        }
        const bloodMoney = new bloodMoneyModel({
            name, amount,exchangeDateMiladi, exchangeDateHijri, comments
        });
        await bloodMoney.save();
        const numberOfUser = await userModel.countDocuments({ "status": "active","disable": false });
        const activeUsers = await userModel.find({
            status: "active",
            disable: false,
        });
        const amountUser = amount / activeUsers.length;
        for(const user of activeUsers){
            let isSaved = false;
            while (!isSaved) {
                try{
                    const userBloodMoney = new userBloodMoneyModel({
                        idBloodMoney: bloodMoney._id,
                        idUser: user._id,
                        prevBalance: user.memberBalance,
                        amount: amountUser
                    })
                    user.memberBalance -= amountUser;
                    await user.save();
                    await userBloodMoney.save();
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
    }catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.payBloodMoney = async (req, res) => {
    const { id } = req.body;
    try{
        const bloodMoney = await bloodMoneyModel.findById(id);
        if(!bloodMoney){
            return res.status(404).send({
                msg: "هذه ديه غير موجودة"
            })
        }
        if(bloodMoney.itPaid) {
            return res.status(200).send({
                msg: "تم دفع من قبل"
            })
        }
        const hijriDate = getHijriDate();
        const date = new Date();
        bloodMoney.itPaid = true;
        bloodMoney.paymentDateMiladi = date;
        bloodMoney.paymentDateHijri = {
            day: hijriDate[0],
            month: hijriDate[1],
            year: hijriDate[2],
        }
        await bloodMoney.save();
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: bloodMoney.amount,
                    //cumulativeAmount: bloodMoney.amount,
                }
            },
        { new: true });
            const userBloodMoney = await userBloodMoneyModel.find({
                idBloodMoney: bloodMoney._id
            });
            const amount = bloodMoney.amount / userBloodMoney.length;
            userBloodMoney.forEach(async (userId) => {
                const user = await userModel.findByIdAndUpdate(userId.idUser, {
                    $inc: {
                        memberBalance: amount,
                        cumulativeBalance: amount
                    }
                },
                    { new: true })
            })
            const newBloodMoney = await bloodMoneyModel.find().sort({
                createdAt: -1
            })
            return res.status(200).send({
                msg: "لقد تم دفع بنجاح",
                newBloodMoney
            });
    }catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getPaymentBloodMoney = async (req, res) => {
    try{
        const bloodMoney = await bloodMoneyModel.find().sort({
            createdAt: -1
        })
        return res.status(200).send({
            bloodMoney
        })
    }catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getRecordBloodMoney = async (req, res) => {
    try{
        const bloodMoney = await bloodMoneyModel.find().sort({
            createdAt: -1
        })
        let total = 0;
        bloodMoney.forEach((bd) => {
            if(bd.itPaid) total += bd.amount;
        })
        console.log(total)
        return res.status(200).send({
            bloodMoney,
            total
        })
    }catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}