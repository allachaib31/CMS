const { commodityRevenueModel, validateCommodityRevenue } = require("../../models/commodityRevenue/commodityRevenue");
const { installmentsGoodsModel, validateInstallmentsGoods } = require("../../models/commodityRevenue/installmentsGoods");
const { userContributionGoodModel, validateUserContributionGood } = require("../../models/commodityRevenue/userContributionsGoods");
const moneyBoxModel = require("../../models/moneybox");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;
exports.addCommodityRevenue = async (req, res) => {
    const { customerData, sponsorData, commodityData, comments } = req.body;
    try {
        //commodityData.numberOfInstallments = (commodityData.saleAmount - commodityData.amountPaid) / commodityData.premiumAmount;
        let days = 30 * commodityData.numberOfInstallments;
        const date = new Date();
        date.setDate(new Date(commodityData.dateOfPayment).getDate() + days)
        commodityData.paymentExpiryDate = date.toLocaleDateString();
        let paymentExpiryDateHijri = getHijriDate(date);
        commodityData.paymentExpiryDateHijri = {
            day: paymentExpiryDateHijri[0],
            month: paymentExpiryDateHijri[1],
            year: paymentExpiryDateHijri[2],
        };
        const hijriDate = getHijriDate();
        const { error } = validateCommodityRevenue({
            customerData, sponsorData, commodityData, comments, hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        });
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const commodityRevenu = new commodityRevenueModel({
            customerData, sponsorData, commodityData: {
                ...commodityData,
                saleAmount: commodityData.saleAmount - commodityData.amountPaid
            }, comments, hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        })
        await commodityRevenu.save();
        function calculateInstallmentDates(startDate, endDate, numberOfInstallments) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const totalTime = end.getTime() - start.getTime();
            const installmentInterval = 30;
            const installmentDates = [];
            //installmentDates.push(new Date(startDate).toISOString().split('T')[0]);
            for (let i = 1; i < numberOfInstallments; i++) {
                const installmentDate = new Date();
                installmentDate.setDate(new Date(start).getDate() + (30 * i))
                installmentDates.push(installmentDate.toISOString().split('T')[0]);
            }
            installmentDates.push(new Date(endDate).toISOString().split('T')[0]);
            return installmentDates;
        }
        const installmentDates = calculateInstallmentDates(commodityData.dateOfPayment, commodityData.paymentExpiryDate, commodityData.numberOfInstallments);
        installmentDates.forEach(async (date, index) => {
            const hijriDate = getHijriDate(date);
            const newInstallmentGoods = new installmentsGoodsModel({
                idCommodityRevenue: commodityRevenu._id,
                premiumAmount: commodityData.premiumAmount,
                requiredPaymentDate: date,
                requiredPaymentDateHijri: {
                    day: hijriDate[0],
                    month: hijriDate[1],
                    year: hijriDate[2],
                }
            })
            await newInstallmentGoods.save();
        });
        const activeUsers = await userModel.find({
            status: "active"
        });
        const amount = commodityData.purchaseAmount / activeUsers.length;

        activeUsers.forEach(async (user) => {
            const userContribution = new userContributionGoodModel({
                idUser: user._id,
                idCommodityRevenue: commodityRevenu._id,
                previousBalance: user.memberBalance,
                contributionPercentage: (amount * 100) / user.memberBalance,
                contributionAmount: amount,
                profitAmount: amount
            })
            user.memberBalance -= amount;
            await user.save();
            await userContribution.save();
        });
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: (commodityData.purchaseAmount * (-1)),
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

exports.payInstallmentSchedule = async (req, res) => {
    const { idInstallmentSchedule } = req.body;
    try {
        const installmentSchedule = await installmentsGoodsModel.findById(idInstallmentSchedule);
        if(installmentSchedule.itPaid){
            return res.status(400).send({
                msg: "لقد تم سداد القسط من قبل"
            });
        }
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: installmentSchedule.premiumAmount,
                    cumulativeAmount: installmentSchedule.premiumAmount
                }
            },
            { new: true })
        if (!moneyBox) {
            return res.status(400).send({
                msg: "حدث خطأ أثناء معالجة طلبك",
            });
        }
        const dateMiladi = new Date();
        const hijriDate = getHijriDate(dateMiladi);
        installmentSchedule.actualPaymentDate = dateMiladi;
        installmentSchedule.actualPaymentDateHijri = {
            day: hijriDate[0],
            month: hijriDate[1],
            year: hijriDate[2],
        };
        installmentSchedule.itPaid = true;
        await installmentSchedule.save();
        const commodityRevenu = await commodityRevenueModel.findById(installmentSchedule.idCommodityRevenue);
        const userContributions = await userContributionGoodModel.find({
            idCommodityRevenue: installmentSchedule.idCommodityRevenue
        });
        const amount = installmentSchedule.premiumAmount / userContributions.length;
        for (const contribution of userContributions) {
            const newBalance = contribution.balance + amount;
            await userContributionGoodModel.updateOne(
                { _id: contribution._id },
                { $set: { balance: newBalance } }
            );
            await userModel.findByIdAndUpdate(contribution.idUser, {
                $inc: {
                    memberBalance: amount,
                    cumulativeBalance: amount
                }
            },
            { new: true })
        }
        commodityRevenu.commodityData.balance += installmentSchedule.premiumAmount;
        await commodityRevenu.save();
        return res.status(200).send({
            msg: "لقد تم الدفع بنجاح"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getActiveCommodityRevenue = async (req, res) => {
    try {
        const { date } = req.query;

        // Ensure date is provided
        if (!date) {
            return res.status(400).send({ msg: "Please provide a date." });
        }

        // Parse the date to get month and year
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
            return res.status(400).send({ msg: "Invalid date format." });
        }

        const month = parsedDate.getMonth(); // getMonth() returns month from 0 to 11
        const year = parsedDate.getFullYear();

        // Construct the start and end dates for the month
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 1); 
        const commodityRevenue = await commodityRevenueModel.find({
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        }).select("_id").sort({ _id: -1 });
        const installmentSchedule = await installmentsGoodsModel.find({
            createdAt: {
                $gte: startDate,
                $lt: endDate
            },
            itPaid: true
        });
        let total = 0;
        console.log(installmentSchedule)
        for (let i = 0; i < installmentSchedule.length; i++) {
            total += installmentSchedule[i].premiumAmount;
        }
        return res.status(200).send({
            commodityRevenue,
            total
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getCommidtyAndInstallment = async (req, res) => {
    const { id } = req.query;
    try {
        const commodityRevenue = await commodityRevenueModel.findById(id);
        if(!commodityRevenue){
            return res.status(404).send({
                msg: "الرقم غير موجود"
            });
        }
        const installmentSchedule = await installmentsGoodsModel.find({
            idCommodityRevenue: id
        }).sort({
            requiredPaymentDate: 1
        });
        return res.status(200).send({
            commodityRevenue,
            installmentSchedule
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getIdCommodityRevenue = async (req, res) => {
    const { month, year} = req.query;
    try {
        const commodityRevenue = await commodityRevenueModel.find({
            "hijriDate.year": parseInt(year),
            "hijriDate.month.number": parseInt(month)
        }).select("_id");
        return res.status(200).send({
            commodityRevenue
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getCommodityRevenue = async (req, res) => {
    const { id } = req.query;
    try {
        const commodityRevenue = await commodityRevenueModel.findById(id);
        if(!commodityRevenue){
            return res.status(404).send({
                msg: "الرقم غير موجود!!"
            })
        }
        return res.status(200).send({
            commodityRevenue,
            print: req.user.admin.userPermission.indexOf("طباعة طلب شراء سلعة (بعد التعبئة)") > -1 ? true : false,
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getInstallmentSchedule = async (req, res) => {
    const { id } = req.query;
    try{
        const installmentSchedule = await installmentsGoodsModel.find({
            idCommodityRevenue: id
        }).sort({
            requiredPaymentDate: 1
        }).populate("idCommodityRevenue");
        if(!installmentSchedule){
            return res.status(404).send({
                msg: "الرقم غير موجود"
            })
        }
        let installmentspaid = 0;
        installmentSchedule.forEach((installment) => {
            if(installment.itPaid) installmentspaid++;
        })
        return res.status(200).send({
            installmentSchedule,
            installmentspaid,
            unpaidInstallments: installmentSchedule.length - installmentspaid
        })
    }catch(error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getFormContributionPurchaseCommodity = async (req, res) => {
    const { id } = req.query;
    try {
        const commodityRevenue = await commodityRevenueModel.findById(id);
        if(!commodityRevenue){
            return res.status(404).send({
                msg: "الرقم غير موجود!!"
            })
        }
        const userContribution = await userContributionGoodModel.find({
            idCommodityRevenue: commodityRevenue._id
        }).populate("idUser", "name");
        return res.status(200).send({
            commodityRevenue,
            userContribution,
            print: req.user.admin.userPermission.indexOf("طباعة سجل المساهمة في شراء السلع") > -1 ? true : false,
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getAllCommodityRevenue = async (req,res) => {
    try {
        const commodityRevenue = await commodityRevenueModel.find().sort({
            _id: -1
        });
        let saleAmount = 0;
        let profitAmount = 0;
        commodityRevenue.forEach((value) => {
            saleAmount += value.commodityData.saleAmount;
            profitAmount += value.commodityData.profitAmount;
        })
        let numberOfBeneficiaries = (await userContributionGoodModel.find().select("_id")).length;
        return res.status(200).send({
            commodityRevenue,
            saleAmount,
            profitAmount,
            numberOfBeneficiaries
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.addCommentCommodityRevenue = async (req, res) => {
    const { _id, comment } = req.body;
    try {
        const commodityRevenue = await commodityRevenueModel.findByIdAndUpdate(_id, {
            comments: comment
        });
        if(!commodityRevenue){
            return res.status(404).send({
                msg: "الرقم غير موجود"
            });
        }
        return res.status(200).send({
            msg: "تمت إضافة التعليق"
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.addCommentInstallmentSchedule = async (req, res) => {
    const { _id, comment } = req.body;
    try {
        const installment = await installmentsGoodsModel.findByIdAndUpdate(_id, {
            comments: comment
        });
        if(!installment){
            return res.status(404).send({
                msg: "الرقم غير موجود"
            });
        }
        return res.status(200).send({
            msg: "تمت إضافة التعليق"
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}