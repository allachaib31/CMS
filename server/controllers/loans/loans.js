const { installmentsLoansModel, validateInstallmentsLoans } = require("../../models/loans/installmentsLoans")
const { loansModel, validateLoans } = require("../../models/loans/loans");
const { userContributionLoansModel } = require("../../models/loans/userContributionsLoans");
const moneyBoxModel = require("../../models/moneybox");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;

exports.addLoans = async (req,res) => {
    const { nationalIdentificationNumber, amount, premiumAmount, numberOfInstallments, dateOfReceipt, dateOfReceiptHijri } = req.body;
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة أقساط قروض الأعضاء"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن إضافة أقساط قروض الأعضاء",
            });
        }
        const amountMoneyBox = await moneyBoxModel.findById(moneyBoxId);
        if(amount > amountMoneyBox.amount){
            return res.status(403).send({
                msg: "لايوجد رصيد كافي في الصندوق",
            });
        }
        let date = new Date();
        date.setDate(new Date(dateOfReceipt).getDate() + 30);
        const paymentStartDate = date.toLocaleDateString();
        const paymentStartDateHijri = getHijriDate(date);
        date = new Date();
        date.setDate(new Date(dateOfReceipt).getDate() + (numberOfInstallments * 30))
        const paymentEndDate = date.toLocaleDateString();
        const paymentEndDateHijri = getHijriDate(date);
        const user = await userModel.findOne({
            NationalIdentificationNumber: nationalIdentificationNumber
        })
        const { error } = validateLoans({
            name: user.name, amount, premiumAmount, numberOfInstallments, dateOfReceipt, dateOfReceiptHijri,paymentStartDate,paymentStartDateHijri: {
                day: paymentStartDateHijri[0],
                month: paymentStartDateHijri[1],
                year: paymentStartDateHijri[2],
            },paymentEndDate,paymentEndDateHijri: {
                day: paymentEndDateHijri[0],
                month: paymentEndDateHijri[1],
                year: paymentEndDateHijri[2],
            }
        });
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const hijriDate = getHijriDate();
        const loans = new loansModel({
            name: user.name, amount, premiumAmount, numberOfInstallments, dateOfReceipt, dateOfReceiptHijri,paymentStartDate,paymentStartDateHijri: {
                day: paymentStartDateHijri[0],
                month: paymentStartDateHijri[1],
                year: paymentStartDateHijri[2],
            },paymentEndDate,paymentEndDateHijri: {
                day: paymentEndDateHijri[0],
                month: paymentEndDateHijri[1],
                year: paymentEndDateHijri[2],
            },
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        });
        await loans.save();
        function calculateInstallmentDates(startDate, endDate, numberOfInstallments) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            console.log(start)
            const installmentDates = [];
            for (let i = 0; i < numberOfInstallments; i++) {
                const installmentDate = new Date(start);
                installmentDate.setDate(installmentDate.getDate() + (30 * i))
                installmentDates.push(installmentDate.toISOString().split('T')[0]);
            }
            //installmentDates.push(new Date(endDate).toISOString().split('T')[0]);
            return installmentDates;
        }
        const installmentDates = calculateInstallmentDates(paymentStartDate, paymentEndDate, numberOfInstallments);
        installmentDates.forEach(async (date, index) => {
            const hijriDate = getHijriDate(date);
            const newInstallmentGoods = new installmentsLoansModel({
                idLoans: loans._id,
                premiumAmount: loans.premiumAmount,
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
        const amountUser = loans.amount / activeUsers.length;
        activeUsers.forEach(async (user) => {
            const userContribution = new userContributionLoansModel({
                idUser: user._id,
                idLoans: loans._id,
                previousBalance: user.memberBalance,
                amount: amountUser,
            })
            user.memberBalance -= amountUser;
            await user.save();
            await userContribution.save();
        });
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(moneyBoxId,
            {
                $inc: {
                    amount: (loans.amount * (-1)),
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
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getLoansHistory = async (req, res) => {
    try {
        const loans = await loansModel.find();
        var totalLoans = 0;
        var totalAmountsPaid = 0;

        const result = await Promise.all(loans.map(async (loan) => {
            totalLoans += loan.amount;
            totalAmountsPaid += loan.balance;

            const installments = await installmentsLoansModel.find({
                idLoans: loan._id
            });

            var installmentsPaid = 0;
            var remainingInstallments = 0;
            var lateInstallmentst = 0;
            var overdueAmounts = 0;

            installments.forEach((installment) => {
                if (installment.itPaid) {
                    installmentsPaid++;
                }
                const targetDate = new Date(installment.requiredPaymentDate);
                targetDate.setDate(targetDate.getDate() + 5);
                const currentDate = new Date();
                targetDate.setHours(0, 0, 0, 0);
                currentDate.setHours(0, 0, 0, 0);
                if (currentDate.getTime() >= targetDate.getTime() && !installment.itPaid) {
                    lateInstallmentst++;
                    overdueAmounts += installment.premiumAmount;
                }
            });

            remainingInstallments = loan.numberOfInstallments - installmentsPaid;

            return {
                loan,
                installmentsPaid,
                remainingInstallments,
                lateInstallmentst,
                overdueAmounts
            };
        }));

        return res.status(200).send({
            result,
            totalLoans,
            totalAmountsPaid
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};

exports.getIdLoans = async (req, res) => {
    try {
        const loansId = await loansModel.find().select("id");
        return res.status(200).send({
            loansId
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.searchLoans = async (req, res) => {
    const { id } = req.query;
    try {
        const loan = await loansModel.findOne({
            id: id
        });
        if(!loan){
            return res.status(404).send({
                msg: "القرض غير موجود"
            })
        }
        const installments = await installmentsLoansModel.find({
            idLoans: loan._id
        });
        var installmentsPaid = 0;
        installments.forEach((installment) => {
            if (installment.itPaid) {
                installmentsPaid++;
            }
        })
        return res.status(200).send({
            loan,
            installmentsPaid
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getRecordInstallments = async (req, res) => {
    const { id } = req.query;
    try {
        const loan = await loansModel.findOne({
            id: id
        });
        if(!loan){
            return res.status(404).send({
                msg: "القرض غير موجود"
            })
        }
        const installments = await installmentsLoansModel.find({
            idLoans: loan._id
        });
        var installmentsPaid = 0;
        installments.forEach((installment) => {
            if (installment.itPaid) {
                installmentsPaid++;
            }
        })
        return res.status(200).send({
            loan,
            installments,
            installmentsPaid
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}