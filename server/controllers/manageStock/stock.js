const moneyBoxModel = require("../../models/moneybox");
const { stocksModel, validateStock } = require("../../models/stocks/stocks");
const { userStockModel } = require("../../models/stocks/userStocks");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;

exports.addStock = async (req, res) => {
    const {
        nameContributingParty,
        nameContributingBank,
        numberStocks,
        costStocks,
        totalCostStocks,
        contributionDateMiladi,
        contributionDateHijri,
        freeStocks,
        numberOfPreviousStockWithFreeStock,
        previousStockCostWithFreeShare,
        previousCostOfStockWithFreeStock,
        memberId,
        memberPercentage
    } = req.body;

    try {
        // 1. Permission
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)"
            ) === -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)"
            });
        }

        // 2. Check money box balance
        const box = await moneyBoxModel.findById(moneyBoxId);
        if (totalCostStocks > box.amount) {
            return res.status(403).send({ msg: "لايوجد رصيد كافي في الصندوق" });
        }

        // 3. Validate member exists
        const member = await userModel.findById(memberId);
        if (!member) {
            return res.status(404).send({ msg: "العضو غير موجود" });
        }

        // 4. Input validation
        const { error } = validateStock({
            nameContributingParty, nameContributingBank, numberStocks,
            costStocks, totalCostStocks, contributionDateMiladi,
            contributionDateHijri, freeStocks, numberOfPreviousStockWithFreeStock,
            previousStockCostWithFreeShare, previousCostOfStockWithFreeStock,
            memberId, memberPercentage
        });
        if (error) {
            console.log(error);
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها"
            });
        }

        // 5. Prepare stock master record
        const hijriDate = getHijriDate();
        const stockMaster = new stocksModel({
            nameContributingParty,
            nameContributingBank,
            numberStocks,
            costStocks,
            totalCostStocks,
            contributionDateMiladi,
            contributionDateHijri,
            freeStocks,
            numberOfPreviousStockWithFreeStock,
            previousStockCostWithFreeShare,
            previousCostOfStockWithFreeStock,
            memberId,
            memberPercentage,
            amountPercentage: totalCostStocks * (memberPercentage / 100),
            previousStockCostWithAdditionalStock: previousStockCostWithFreeShare,
            costPreviousSharesWithAdditionalShares: previousCostOfStockWithFreeStock,
            totalNumberOfStock: numberOfPreviousStockWithFreeStock,
            currentValueOfStock: costStocks,
            totalCostOfStock: costStocks * numberOfPreviousStockWithFreeStock,
            previousFundBalance: box.amount,
            contributionAmount: totalCostStocks,
            contributionRate: (totalCostStocks * 100) / box.amount,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2]
            }
        });
        await stockMaster.save();

        // 6. Debit the money box
        await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            { $inc: { amount: -totalCostStocks } },
            { new: true }
        );

        // 7. Load all active users
        const activeUsers = await userModel.find({
            status: "active",
            disable: false
        });

        // 8. First, credit the special member’s free-percentage share:
        //    they get `memberPercentage%` of totalCostStocks at no cost.
        const freeShareAmount = totalCostStocks * (memberPercentage / 100);
        await userModel.findByIdAndUpdate(
            memberId,
            {
                $inc: {
                    memberBalance: freeShareAmount,
                    cumulativeBalance: freeShareAmount,
                    stockContributionsFree: freeShareAmount
                }
            },
            { new: true }
        );

        // 9. Now distribute the **remaining** cost among all active users
        const remainingCost = totalCostStocks - freeShareAmount;

        // 10. Compute total of all users’ balances
        const totalBalance = activeUsers.reduce((sum, u) => sum + u.memberBalance, 0);
        if (totalBalance === 0) {
            return res.status(400).send({ msg: "خطأ: أرصدة الأعضاء صفر" });
        }

        // 11. Loop and create per-user stock contribution records
        for (const user of activeUsers) {
            const ratio = user.memberBalance / totalBalance;
            const userContribution = remainingCost * ratio;
            const userContributionPct = ratio * 100;

            // a) update user balance
            user.memberBalance -= userContribution;
            await user.save();

            // b) record the contribution
            const us = new userStockModel({
                idStock: stockMaster._id,
                idUser: user._id,
                prevBalance: user.memberBalance + userContribution, // before deduction
                contributionAmount: userContribution,
                contributionRate: userContributionPct,
                amountProfitPercentage: user._id.equals(memberId) ? memberPercentage : 0
            });
            await us.save();
        }

        return res.status(200).send({
            msg: "لقد تمت إضافته بنجاح"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};

exports.currentPrice = async (req, res) => {
    const { idStock, price } = req.body;
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
        const stocks = await stocksModel.findById(idStock).populate("memberId", {
            password: false
        });
        if (!stocks) {
            return res.status(404).send({
                msg: "لا توجد هدى المساهمة"
            })
        }
        stocks.currentValueOfStock = price;
        await stocks.save();
        return res.status(200).send({
            msg: "لقد تمت اضافته بنجاح",
            stocks,
        });
    } catch (err) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.addAdditionalStock = async (req, res) => {
    const { addFreeStock, idStock } = req.body;
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
        /*const amountMoneyBox = await moneyBoxModel.findById(moneyBoxId);
        const totalCost = additionalStockCost * buyAdditionalStock;
        if (totalCost > amountMoneyBox.amount) {
            return res.status(403).send({
                msg: "لايوجد رصيد كافي في الصندوق",
            });
        }*/
        const stocks = await stocksModel.findById(idStock);
        if (!stocks) {
            return res.status(404).send({
                msg: "لا توجد هدى المساهمة"
            })
        }
        if (stocks.dateSaleMiladi) {
            return res.status(403).send({
                msg: "لقد تم البيع من قبل"
            })
        }
        stocks.freeStocks += addFreeStock;
        stocks.numberOfPreviousStockWithFreeStock += addFreeStock
        stocks.previousStockCostWithFreeShare = stocks.totalCostStocks / (stocks.numberStocks + stocks.freeStocks);
        stocks.previousCostOfStockWithFreeStock = (stocks.freeStocks + stocks.numberStocks) * (stocks.totalCostStocks / (stocks.numberStocks + stocks.freeStocks))
        //stocks.additionalStockCost = additionalStockCost;
        //stocks.additionalStocksCost = totalCost;
        //stocks.previousStockCostWithAdditionalStock = (stocks.previousStockCostWithAdditionalStock + additionalStockCost) / (stocks.totalNumberOfStock + buyAdditionalStock);
        stocks.totalNumberOfStock += addFreeStock;
        await stocks.save();
        /*const numberOfUser = await userModel.countDocuments({ "status": "active", "disable": false });
        const activeUsers = await userModel.find({
            status: "active",
            disable: false,
            memberBalance: { $gte: (totalCost) / Number(numberOfUser) }
        });
        const amount = totalCost / activeUsers.length;
        activeUsers.forEach(async (user) => {
            const userStock = new userStockModel({
                idStock: stocks._id,
                idUser: user._id,
                prevBalance: user.memberBalance,
                contributionAmount: amount,
                contributionRate: (amount * 100) / user.memberBalance,
                amountProfitPercentage: 0
            })
            user.memberBalance -= amount;
            await user.save();
            await userStock.save();
        });*/
        /*const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: (totalCost * (-1)),
                }
            },
            { new: true })
        if (!moneyBox) {
            return res.status(400).send({
                msg: "حدث خطأ أثناء معالجة طلبك",
            });
        }*/
        /*const userStock = await userStockModel.find({
            idStock: idStock
        }).populate("idUser", {
            password: false
        })*/
        return res.status(200).send({
            msg: "لقد تمت اضافته بنجاح",
            stocks,
            //userStock
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.sellStock = async (req, res) => {
    const { idStock } = req.body;

    try {
        // 1. Permission check
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)"
            ) === -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)",
            });
        }

        // 2. Load stock master and validate
        const stock = await stocksModel
            .findById(idStock)
            .populate("memberId", { password: false });
        if (!stock) {
            return res.status(404).send({ msg: "لا توجد بيانات المساهمة" });
        }
        if (stock.dateSaleMiladi) {
            return res.status(403).send({ msg: "لقد تم البيع من قبل" });
        }

        // 3. Compute sale values and dates
        const saleValue = stock.currentValueOfStock * stock.totalNumberOfStock;
        const profit = saleValue - stock.totalCostOfStock;  // can be negative
        const now = new Date();
        const [hDay, hMonth, hYear] = getHijriDate(now);

        stock.stockSaleValue = saleValue;
        stock.dateSaleMiladi = now;
        stock.dateSaleHijri = { day: hDay, month: hMonth, year: hYear };
        stock.balanceAfterSale = (stock.previousFundBalance - stock.contributionAmount) + saleValue;

        // 4. Pay special member’s profit share first
        let remainingProfit = profit;
        let memberProfit = 0;
        if (profit > 0 && stock.memberPercentage > 0) {
            memberProfit = profit * (stock.memberPercentage / 100);
            remainingProfit = profit - memberProfit;

            // credit the special member
            await userModel.updateOne(
                { _id: stock.memberId._id },
                {
                    $inc: {
                        memberBalance: memberProfit,
                        cumulativeBalance: memberProfit,
                        commodityProfitsContributions: memberProfit
                    }
                }
            );

            stock.amountPercentage = memberProfit;
        } else {
            stock.amountPercentage = 0;
        }

        // 5. Load all contributor records
        const contribs = await userStockModel
            .find({ idStock: stock._id })
            .populate("idUser", { password: false });
        if (contribs.length === 0) {
            // No contributors → nothing left to distribute
            await stock.save();
            await moneyBoxModel.findByIdAndUpdate(
                moneyBoxId,
                {
                    $inc: {
                        amount: saleValue,
                        cumulativeAmount: Math.max(0, profit),
                        "source.contributionRevenues": Math.max(0, profit)
                    }
                },
                { new: true }
            );
            return res.status(200).send({ msg: "لقد تمت إضافته بنجاح", stock, userStock: [] });
        }

        // 6. Compute total principal contributed
        const totalPrincipal = contribs.reduce((sum, c) => sum + c.contributionAmount, 0);
        if (totalPrincipal === 0) {
            return res.status(400).send({ msg: "خطأ: مجموع المساهمات صفر" });
        }

        // 7. Distribute remaining profit + refund principals
        for (const rec of contribs) {
            const ratio = rec.contributionAmount / totalPrincipal;
            const userProfit = Math.max(0, remainingProfit) * ratio;  // no negative profit share
            const principalRefund = rec.contributionAmount;

            // Update userStock record
            rec.rate = userProfit > 0
                ? (userProfit * 100) / rec.contributionAmount
                : 0;
            rec.amount = userProfit;
            rec.balanceAfterSale = rec.prevBalance + userProfit;
            await rec.save();

            // Credit user's account: principal + profit
            await userModel.findByIdAndUpdate(
                rec.idUser._id,
                {
                    $inc: {
                        memberBalance: principalRefund + userProfit,
                        cumulativeBalance: userProfit > 0 ? userProfit : 0,
                        commodityProfitsContributions: userProfit > 0 ? userProfit : 0
                    }
                },
                { new: true }
            );
        }

        // 8. Persist stock master and update money box
        await stock.save();
        const netProfit = Math.max(0, profit);
        await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            {
                $inc: {
                    amount: saleValue,
                    cumulativeAmount: netProfit,
                    "source.contributionRevenues": netProfit
                }
            },
            { new: true }
        );

        return res.status(200).send({
            msg: "لقد تمت إضافته بنجاح",
            stock,
            userStock: contribs
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};

exports.getActiveUser = async (req, res) => {
    try {
        const users = await userModel.find({
            disable: false
        }).select("id name");
        return res.status(200).send({
            users
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getIdStock = async (req, res) => {
    const { month, year } = req.query;
    try {
        const stock = await stocksModel.find({
            "hijriDate.year": parseInt(year),
            "hijriDate.month.number": parseInt(month)
        }).select("_id id");
        return res.status(200).send({
            stock
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getStock = async (req, res) => {
    const { id } = req.query;
    try {
        const stock = await stocksModel.findById(id).populate("memberId", {
            password: false
        });
        console.log(stock)
        const userStock = await userStockModel.find({
            idStock: id
        }).populate("idUser", {
            password: false
        })
        return res.status(200).send({
            stock,
            userStock
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.stockContributionRecord = async (req, res) => {
    try {
        const soldStocks = await stocksModel.find({
            dateSaleMiladi: { $exists: true, $ne: null }
        });
        let totalShareAmount = 0;
        let totalProfitAmount = 0;
        let totalNumberContribution = soldStocks.length;
        soldStocks.forEach((stock) => {
            totalShareAmount += stock.stockSaleValue;
            totalProfitAmount += (stock.stockSaleValue - stock.contributionAmount)
        })
        return res.status(200).send({
            soldStocks,
            totalShareAmount,
            totalProfitAmount,
            totalNumberContribution
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getRegisterShareholdersShares = async (req, res) => {
    const { id } = req.query;
    try {
        const userStock = await userStockModel.find({
            idStock: id
        }).populate("idUser", {
            password: false
        }).populate("idStock")
        return res.status(200).send({
            userStock
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getActiveStocks = async (req, res) => {
    const { date } = req.query;
    try {
        if (!date) {
            return res.status(400).send({ msg: "Please provide a date." });
        }
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
            return res.status(400).send({ msg: "Invalid date format." });
        }
        const month = parsedDate.getMonth(); // getMonth() returns month from 0 to 11
        const year = parsedDate.getFullYear();
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 1);
        const stocks = await stocksModel.find({
            dateSaleMiladi: { $exists: true, $ne: null },
            dateSaleMiladi: {
                $gte: startDate,
                $lt: endDate
            }
        }).sort({ _id: -1 });
        let total = 0;
        stocks.forEach((stock) => {
            total += (stock.stockSaleValue - stock.contributionAmount)
        })
        return res.status(200).send({
            stocks,
            total
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}