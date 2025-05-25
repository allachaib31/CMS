const { commodityRevenueModel, validateCommodityRevenue } = require("../../models/commodityRevenue/commodityRevenue");
const { installmentsGoodsModel, validateInstallmentsGoods } = require("../../models/commodityRevenue/installmentsGoods");
const { userContributionGoodModel, validateUserContributionGood } = require("../../models/commodityRevenue/userContributionsGoods");
const moneyBoxModel = require("../../models/moneybox");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const mongoose = require('mongoose');
const moneyBoxId = process.env.moneyBoxId;
exports.addCommodityRevenue = async (req, res) => {
    var { customerData, sponsorData, commodityData, comments } = req.body;
    commodityData.profitAmount = (commodityData.saleAmount - commodityData.purchaseAmount)// - ((commodityData.saleAmount - commodityData.purchaseAmount) * (sponsorData.sponsorRatio / 100))
    commodityData.profitRatio = (commodityData.profitAmount / commodityData.purchaseAmount) * 100
    commodityData.premiumAmount = ((commodityData.purchaseAmount + commodityData.profitAmount) - commodityData.amountPaid) / commodityData.numberOfInstallments;
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة إيرادات (شراء السلع)"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة إيرادات (شراء السلع)",
            });
        }
        const sponsorUser = await userModel.findById(sponsorData.idSponsor)
        if (!sponsorUser) {
            return res.status(404).send({
                msg: "هذا الكفيل غير موجود"
            })
        }
        delete sponsorData.idSponsor;
        sponsorData.name = sponsorUser.name;
        sponsorData.nationalIdentificationNumber = sponsorUser.NationalIdentificationNumber;
        sponsorData.phoneNumber = sponsorUser.phoneNumber;
        const amountMoneyBox = await moneyBoxModel.findById(moneyBoxId);
        if (commodityData.purchaseAmount > amountMoneyBox.amount) {
            return res.status(403).send({
                msg: "لايوجد رصيد كافي في الصندوق",
            });
        }
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
        sponsorData.amount = commodityData.profitAmount * (sponsorData.sponsorRatio / 100);
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
                saleAmount: commodityData.saleAmount //- commodityData.amountPaid
            }, comments, hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        })
        if (commodityRevenu.commodityData.amountPaid == 0) commodityRevenu.commodityData.amountItPaid = true;
        await commodityRevenu.save();
        function calculateInstallmentDates(startDate, endDate, numberOfInstallments) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const installmentDates = [];
            //installmentDates.push(new Date(startDate).toISOString().split('T')[0]);
            for (let i = 0; i < numberOfInstallments; i++) {
                const installmentDate = new Date(start);
                installmentDate.setDate(installmentDate.getDate() + (30 * i))
                installmentDates.push(installmentDate.toISOString().split('T')[0]);
            }
            //installmentDates.push(new Date(endDate).toISOString().split('T')[0]);
            return installmentDates;
        }
        const installmentDates = calculateInstallmentDates(commodityData.dateOfPayment, commodityData.paymentExpiryDate, commodityData.numberOfInstallments);
        for (const date of installmentDates) {
            const hijriDate = getHijriDate(date);
            let isSaved = false;
            while (!isSaved) {
                try {
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
        const numberOfUser = await userModel.countDocuments({ "status": "active", "disable": false });
        const activeUsers = await userModel.find({
            status: "active",
            disable: false,
            //memberBalance: { $gte: commodityData.purchaseAmount / Number(numberOfUser)}
        });
        // 1. Compute total of all balances
        const totalBalance = activeUsers.reduce((sum, u) => sum + u.memberBalance, 0);
        if (totalBalance === 0) {
            return res.status(400).send({ msg: "لا يمكن تقسيم المبلغ، إذ مجموع أرصدة الأعضاء صفر" });
        }

        // 2. Loop and split
        for (const user of activeUsers) {
            let isSaved = false;
            const shareRatio = user.memberBalance / totalBalance;   // e.g. 0.15 if the user has 15% of the total

            // 3. Per-user amounts
            const contributionAmount = commodityData.purchaseAmount * shareRatio;
            const profitAmount = (commodityData.profitAmount - sponsorData.amount) * shareRatio;
            const contributionPercentage = shareRatio * 100;

            while (!isSaved) {
                try {
                    // build & save the contribution record
                    const userContribution = new userContributionGoodModel({
                        idUser: user._id,
                        idCommodityRevenue: commodityRevenu._id,
                        previousBalance: user.memberBalance,
                        contributionPercentage,   // the % of their balance they’re contributing
                        contributionAmount,       // how much they actually put in
                        profitAmount              // their slice of the profit pool
                    });

                    // deduct from their balance
                    user.memberBalance -= contributionAmount;
                    await user.save();
                    await userContribution.save();
                    isSaved = true;
                } catch (error) {
                    if (error.code === 11000) {
                        // duplicate-key retry
                        await new Promise(r => setTimeout(r, Math.random() * 100));
                    } else {
                        throw error;
                    }
                }
            }
        }

        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: ((commodityData.purchaseAmount) * (-1)),
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

exports.payAmount = async (req, res) => {
    const { id } = req.body;

    try {
        // 1. Permission check
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة بيانات شراء السلع وأقساطها"
            ) === -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة بيانات شراء السلع وأقساطها",
            });
        }

        // 2. Load the commodity revenue record
        const revenue = await commodityRevenueModel.findById(id);
        if (!revenue) {
            return res.status(404).send({ msg: "لم يتم ايجاد هذا الطلب" });
        }

        // 3. Must not have been paid before
        if (revenue.commodityData.amountItPaid) {
            return res.status(403).send({ msg: "لقد تم الدفع بالفعل" });
        }
        if (revenue.commodityData.amountPaid === 0) {
            return res.status(403).send({ msg: "المبلغ المسدد 0" });
        }

        // 4. Mark the initial payment as “paid”
        revenue.commodityData.amountItPaid = true;
        let remaining = revenue.commodityData.amountPaid;

        // 5. First, pay out the sponsor (if any)
        if (revenue.sponsorData.amount && !revenue.sponsorData.itPaid) {
            const sponsorRemains = revenue.sponsorData.amount - revenue.sponsorData.balance;
            let sponsorCredit = 0;

            if (remaining >= sponsorRemains) {
                sponsorCredit = sponsorRemains;
                revenue.sponsorData.balance += sponsorRemains;
                revenue.sponsorData.itPaid = true;
                remaining -= sponsorRemains;
            } else {
                sponsorCredit = remaining;
                revenue.sponsorData.balance += remaining;
                remaining = 0;
            }

            // Credit sponsor’s user account
            await userModel.updateOne(
                { NationalIdentificationNumber: revenue.sponsorData.nationalIdentificationNumber },
                {
                    $inc: {
                        memberBalance: sponsorCredit,
                        cumulativeBalance: sponsorCredit,
                        commodityProfitsContributions: sponsorCredit
                    }
                }
            );
        }

        // 6. Update money box with the full paid amount
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            {
                $inc: {
                    amount: revenue.commodityData.amountPaid
                }
            },
            { new: true }
        );
        if (!moneyBox) {
            return res.status(400).send({ msg: "حدث خطأ أثناء معالجة طلبك" });
        }

        // 7. Update revenue’s paid-to-date balance
        revenue.commodityData.balance += revenue.commodityData.amountPaid;
        await revenue.save();

        // 8. If nothing left after sponsor, we’re done
        if (remaining === 0) {
            return res.status(200).send({ msg: "لقد تم الدفع بنجاح" });
        }

        // 9. Load all user contributions for this revenue
        const contributions = await userContributionGoodModel.find({
            idCommodityRevenue: revenue._id
        });
        if (contributions.length === 0) {
            return res.status(400).send({ msg: "لا توجد مساهمات لتوزيع المبلغ" });
        }

        // 10. Compute total principal contributed (to weight distribution)
        const totalContributed = contributions
            .reduce((sum, c) => sum + c.contributionAmount, 0);
        if (totalContributed === 0) {
            return res.status(400).send({ msg: "خطأ في توزيع المبلغ: مجموع المساهمات صفر" });
        }

        // 11. Distribute the remaining principal back to contributors
        for (const c of contributions) {
            const ratio = c.contributionAmount / totalContributed;
            const userRefund = remaining * ratio;

            // 11a. Update contribution record’s balance
            await userContributionGoodModel.updateOne(
                { _id: c._id },
                { $inc: { balance: userRefund } }
            );

            // 11b. Credit each user’s account with their refund
            await userModel.findByIdAndUpdate(
                c.idUser,
                { $inc: { memberBalance: userRefund } },
                { new: true }
            );
        }

        // 12. Final response
        return res.status(200).send({ msg: "لقد تم الدفع بنجاح" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: "حدث خطأ أثناء معالجة طلبك" });
    }
};

exports.payInstallmentSchedule = async (req, res) => {
    const { idInstallmentSchedule } = req.body;
    try {
        // 1. Permission check
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة بيانات شراء السلع وأقساطها"
            ) === -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة بيانات شراء السلع وأقساطها",
            });
        }

        // 2. Load installment and parent revenue
        const installment = await installmentsGoodsModel.findById(idInstallmentSchedule);
        if (!installment) {
            return res.status(404).send({ msg: "القسط غير موجود" });
        }
        const revenue = await commodityRevenueModel.findById(installment.idCommodityRevenue);
        if (!revenue) {
            return res.status(404).send({ msg: "لم يتم إيجاد طلب الإيراد" });
        }

        // 3. Ensure initial deposit was paid
        if (!revenue.commodityData.amountItPaid) {
            return res.status(403).send({ msg: "يرجى تسديد الدفعه الاولى" });
        }

        // 4. Prevent double-pay
        if (installment.itPaid) {
            return res.status(400).send({ msg: "لقد تم سداد القسط من قبل" });
        }

        // 5. Mark this installment as paid (Miladi + Hijri)
        const now = new Date();
        const [hDay, hMonth, hYear] = getHijriDate(now);
        installment.actualPaymentDate = now;
        installment.actualPaymentDateHijri = { day: hDay, month: hMonth, year: hYear };
        installment.itPaid = true;
        await installment.save();

        // 6. Allocate this payment first to sponsor (if any)
        let remaining = installment.premiumAmount;
        if (revenue.sponsorData.amount && !revenue.sponsorData.itPaid) {
            const sponsorRemains = revenue.sponsorData.amount - revenue.sponsorData.balance;

            // determine how much of this installment goes to sponsor
            let sponsorCredit = 0;
            if (remaining >= sponsorRemains) {
                sponsorCredit = sponsorRemains;
                revenue.sponsorData.balance += sponsorRemains;
                revenue.sponsorData.itPaid = true;
                remaining -= sponsorRemains;
            } else {
                sponsorCredit = remaining;
                revenue.sponsorData.balance += remaining;
                remaining = 0;
            }

            // credit sponsor user
            await userModel.updateOne(
                { NationalIdentificationNumber: revenue.sponsorData.nationalIdentificationNumber },
                {
                    $inc: {
                        memberBalance: sponsorCredit,
                        cumulativeBalance: sponsorCredit,
                        commodityProfitsContributions: sponsorCredit,
                    }
                }
            );
        }

        // 7. Credit the revenue’s paid-to-date and save
        revenue.commodityData.balance += installment.premiumAmount;
        await revenue.save();

        // 8. If nothing left after sponsor, we’re done
        if (remaining === 0) {
            return res.status(200).send({ msg: "لقد تم الدفع بنجاح" });
        }

        // 9. Load all user contributions for this revenue
        const contributions = await userContributionGoodModel.find({
            idCommodityRevenue: revenue._id
        });
        if (contributions.length === 0) {
            return res.status(400).send({ msg: "لا توجد مساهمات لتوزيع المبلغ" });
        }

        // 10. Compute total principal contributed
        const totalContributed = contributions
            .reduce((sum, c) => sum + c.contributionAmount, 0);

        if (totalContributed === 0) {
            return res.status(400).send({ msg: "خطأ في توزيع المبلغ: مجموع المساهمات صفر" });
        }

        // 11. Distribute remaining principal + profit-portion to each user
        const perProfitInstallment = revenue.commodityData.profitAmount
            / revenue.commodityData.numberOfInstallments;

        for (const c of contributions) {
            const ratio = c.contributionAmount / totalContributed;
            const userPrincipalRefund = remaining * ratio;

            // 11a. Update contribution record
            await userContributionGoodModel.updateOne(
                { _id: c._id },
                { $inc: { balance: userPrincipalRefund } }
            );

            // 11b. Update user’s account: principal + this cycle’s profit slice
            await userModel.findByIdAndUpdate(
                c.idUser,
                {
                    $inc: {
                        memberBalance: userPrincipalRefund,
                        cumulativeBalance: perProfitInstallment,
                        commodityProfitsContributions: perProfitInstallment
                    }
                },
                { new: true }
            );
        }

        // 12. Update money box
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            {
                $inc: {
                    amount: installment.premiumAmount,
                    cumulativeAmount: perProfitInstallment,
                    "source.commodityRevenue": perProfitInstallment
                }
            },
            { new: true }
        );
        if (!moneyBox) {
            return res.status(400).send({ msg: "حدث خطأ أثناء معالجة طلبك" });
        }

        return res.status(200).send({ msg: "لقد تم الدفع بنجاح" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: "حدث خطأ أثناء معالجة طلبك" });
    }
};


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
        }).select("_id id sponsorData").sort({ _id: -1 });
        const installmentSchedule = await installmentsGoodsModel.find({
            createdAt: {
                $gte: startDate,
                $lt: endDate
            },
            itPaid: true
        });
        let total = 0;
        for (let i = 0; i < installmentSchedule.length; i++) {
            total += installmentSchedule[i].premiumAmount;
        }
        for (let j = 0; j < commodityRevenue.length; j++) {
            total += commodityRevenue[j].sponsorData.balance;
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
        if (!commodityRevenue) {
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
    const { month, year } = req.query;
    try {
        const commodityRevenue = await commodityRevenueModel.find({
            "hijriDate.year": parseInt(year),
            "hijriDate.month.number": parseInt(month)
        }).select("_id id");
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
        if (!commodityRevenue) {
            return res.status(404).send({
                msg: "الرقم غير موجود!!"
            })
        }
        return res.status(200).send({
            commodityRevenue,
            print: req.user.admin.userPermission.indexOf("طباعة عقد شراء سلعة و أقساطها (بعد التعبئة)") > -1 ? true : false,
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getInstallmentSchedule = async (req, res) => {
    const { id } = req.query;
    try {
        const installmentSchedule = await installmentsGoodsModel.find({
            idCommodityRevenue: id
        }).sort({
            requiredPaymentDate: 1
        }).populate("idCommodityRevenue");
        if (!installmentSchedule) {
            return res.status(404).send({
                msg: "الرقم غير موجود"
            })
        }
        let installmentspaid = 0;
        installmentSchedule.forEach((installment) => {
            if (installment.itPaid) installmentspaid++;
        })
        return res.status(200).send({
            installmentSchedule,
            installmentspaid,
            unpaidInstallments: installmentSchedule.length - installmentspaid
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getFormContributionPurchaseCommodity = async (req, res) => {
    const { id } = req.query;
    try {
        const commodityRevenue = await commodityRevenueModel.findById(id);
        if (!commodityRevenue) {
            return res.status(404).send({
                msg: "الرقم غير موجود!!"
            })
        }
        const userContribution = await userContributionGoodModel.find({
            idCommodityRevenue: commodityRevenue._id
        }).populate("idUser", "name").populate("idCommodityRevenue");
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

exports.getAllCommodityRevenue = async (req, res) => {
    try {
        const commodityRevenue = await commodityRevenueModel.find();
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
        if (!commodityRevenue) {
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
        if (!installment) {
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

