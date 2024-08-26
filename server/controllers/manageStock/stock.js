const moneyBoxModel = require("../../models/moneybox");
const { stocksModel, validateStock } = require("../../models/stocks/stocks");
const { userStockModel } = require("../../models/stocks/userStocks");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;

exports.addStock = async (req, res) => {
    const { nameContributingParty, nameContributingBank, numberStocks, costStocks, totalCostStocks, contributionDateMiladi, contributionDateHijri, freeStocks, numberOfPreviousStockWithFreeStock, previousStockCostWithFreeShare, previousCostOfStockWithFreeStock, memberId, memberPercentage } = req.body;
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
        if (totalCostStocks > amountMoneyBox.amount) {
            return res.status(403).send({
                msg: "لايوجد رصيد كافي في الصندوق",
            });
        }
        const userExsist = await userModel.findById(memberId);
        if (!userExsist) {
            return res.status(404).send({
                msg: "العدد الخاص بهذا العضو غير موجود",
            });
        }
        const { error } = validateStock({
            nameContributingParty, nameContributingBank, numberStocks, costStocks, totalCostStocks, contributionDateMiladi, contributionDateHijri, freeStocks, numberOfPreviousStockWithFreeStock, previousStockCostWithFreeShare, previousCostOfStockWithFreeStock, memberId, memberPercentage
        });
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const hijriDate = getHijriDate();
        let amountPercentage = totalCostStocks * (memberPercentage / 100)
        const stocks = new stocksModel({
            nameContributingParty, nameContributingBank, numberStocks, costStocks, totalCostStocks, contributionDateMiladi, contributionDateHijri, freeStocks, numberOfPreviousStockWithFreeStock, previousStockCostWithFreeShare, previousCostOfStockWithFreeStock, memberId, memberPercentage, amountPercentage: 0,
            previousStockCostWithAdditionalStock: previousStockCostWithFreeShare,
            costPreviousSharesWithAdditionalShares: previousCostOfStockWithFreeStock,
            totalNumberOfStock: numberOfPreviousStockWithFreeStock,
            currentValueOfStock: costStocks,
            totalCostOfStock: costStocks * numberOfPreviousStockWithFreeStock,
            previousFundBalance: amountMoneyBox.amount,//>> 100%
            contributionAmount: totalCostStocks,// >> x
            contributionRate: (totalCostStocks * 100) / amountMoneyBox.amount,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        });
        await stocks.save();
        const numberOfUser = await userModel.countDocuments({ "status": "active", "disable": false });
        const activeUsers = await userModel.find({
            status: "active",
            disable: false,
            //memberBalance: { $gte: (totalCostStocks - amountPercentage) / Number(numberOfUser)}
        });
        //const amount = (totalCostStocks - amountPercentage) / activeUsers.length;
        const amount = totalCostStocks / activeUsers.length;
        for (const user of activeUsers) {
            let isSaved = false;
            while (!isSaved) {
                try {
                    const userStock = new userStockModel({
                        idStock: stocks._id,
                        idUser: user._id,
                        prevBalance: user.memberBalance,
                        contributionAmount: amount,
                        contributionRate: (amount * 100) / user.memberBalance,
                        amountProfitPercentage: (user._id.toString() == memberId.toString()) ? memberPercentage : 0
                    })
                    user.memberBalance -= amount;
                    await user.save();
                    await userStock.save();
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
                    amount: (totalCostStocks * (-1)),
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
exports.currentPrice = async (req, res) => {
    const { idStock, price } = req.body;
    console.log(req.body)
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
    const { buyAdditionalStock, additionalStockCost, idStock } = req.body;
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
        const totalCost = additionalStockCost * buyAdditionalStock;
        if (totalCost > amountMoneyBox.amount) {
            return res.status(403).send({
                msg: "لايوجد رصيد كافي في الصندوق",
            });
        }
        const stocks = await stocksModel.findById(idStock);
        if (!stocks) {
            return res.status(404).send({
                msg: "لا توجد هدى المساهمة"
            })
        }
        stocks.buyAdditionalStock += buyAdditionalStock;
        stocks.additionalStockCost = additionalStockCost;
        stocks.additionalStocksCost = totalCost;
        stocks.previousStockCostWithAdditionalStock = (stocks.previousStockCostWithAdditionalStock + additionalStockCost) / (stocks.totalNumberOfStock + buyAdditionalStock);
        stocks.totalNumberOfStock += buyAdditionalStock;
        await stocks.save();
        const numberOfUser = await userModel.countDocuments({ "status": "active", "disable": false });
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
        });
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
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
        }
        const userStock = await userStockModel.find({
            idStock: idStock
        }).populate("idUser", {
            password: false
        })
        return res.status(200).send({
            msg: "لقد تمت اضافته بنجاح",
            stocks,
            userStock
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
       if(stocks.dateSaleMiladi){
            return res.status(403).send({
                msg: "لقد تم البيع من قبل"
            })
        }
        const hijriDate = getHijriDate();
        stocks.stockSaleValue = stocks.currentValueOfStock * stocks.totalNumberOfStock;
        stocks.dateSaleMiladi = new Date();
        stocks.dateSaleHijri = {
            day: hijriDate[0],
            month: hijriDate[1],
            year: hijriDate[2],
        }
        stocks.balanceAfterSale = (stocks.previousFundBalance - stocks.contributionAmount) + stocks.stockSaleValue;
        let amount = stocks.stockSaleValue - stocks.totalCostOfStock;
        if(amount <= 0) {
            stocks.amountPercentage = 0;
        }
        let amountPercentage = amount * (stocks.memberPercentage / 100);
        stocks.amountPercentage = amountPercentage;
        await userModel.updateOne({
            id: stocks.memberId._id
        }, {
            $inc: {
                memberBalance: amountPercentage,
                cumulativeBalance: amountPercentage,
                commodityProfitsContributions: amountPercentage
            }
        })
        const userStock = await userStockModel.find({
            idStock: stocks._id
        }).populate("idUser", {
            password: false
        })
        const amountUser = (amount - amountPercentage) / userStock.length;
        for(const user of userStock) {
            const profitAmount = amountUser;
            user.rate = (profitAmount * 100) / user.contributionAmount;
            user.amount = profitAmount
            user.balanceAfterSale = user.prevBalance + amountUser;
            await user.save();
            await userModel.findByIdAndUpdate(user.idUser, {
                $inc: {
                    memberBalance: amountUser,
                    cumulativeBalance: amountUser,
                    commodityProfitsContributions: amountUser
                }
            },
                { new: true })
        }
        await stocks.save();
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: stocks.stockSaleValue,
                    cumulativeAmount: stocks.stockSaleValue,
                    "source.contributionRevenues": stocks.stockSaleValue
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
            stocks,
            userStock
        });
    } catch (err) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
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
    try{
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
    }   catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getRegisterShareholdersShares = async (req, res) => {
    const { id } = req.query;
    try{
        const userStock = await userStockModel.find({
            idStock: id
        }).populate("idUser", {
            password: false
        }).populate("idStock")
        return res.status(200).send({
            userStock
        })
    }catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getActiveStocks = async (req, res) => {
    const { date} = req.query;
    try{
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