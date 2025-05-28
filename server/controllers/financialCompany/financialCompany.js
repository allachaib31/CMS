const { validateFinancial, financialCompanyModel } = require("../../models/financialCompany/financialCompany");
const { userFinancialCompanyModel } = require("../../models/financialCompany/userFinancial");
const moneyBoxModel = require("../../models/moneybox");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;


exports.addFinancialCompany = async (req, res) => {
    const {
        nameContributingParty,
        nameContributingBank,
        amount,
        duration,
        contributionDateMiladi,
        contributionDateHijri,
        contributionEndDateMiladi,
        contributionEndDateHijri
    } = req.body;

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

        // 2. Check money box
        const box = await moneyBoxModel.findById(moneyBoxId);
        if (amount > box.amount) {
            return res.status(403).send({ msg: "لايوجد رصيد كافي في الصندوق" });
        }

        // 3. Validate input
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
            console.log(error);
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها"
            });
        }

        // 4. Create financial master record
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
            previousFundBalance: box.amount,
            contributionAmount: amount,
            contributionRate: (amount * 100) / box.amount,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2]
            }
        });
        await financial.save();

        // 5. Debit money box
        await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            { $inc: { amount: -amount } },
            { new: true }
        );

        // 6. Load all active users
        const activeUsers = await userModel.find({
            status: "active",
            disable: false
        });

        // 7. Compute total of all balances to weight distribution
        const totalBalance = activeUsers.reduce((sum, u) => sum + u.memberBalance, 0);
        if (totalBalance === 0) {
            return res.status(400).send({ msg: "خطأ: أرصدة الأعضاء صفر" });
        }

        // 8. Distribute amount proportionally
        for (const user of activeUsers) {
            const shareRatio = user.memberBalance / totalBalance;
            const userContribution = amount * shareRatio;
            const contributionPct = shareRatio * 100;

            // a) Deduct from user balance
            user.memberBalance -= userContribution;
            await user.save();

            // b) Record user’s contribution
            const uf = new userFinancialCompanyModel({
                idFinancial: financial._id,
                idUser: user._id,
                prevBalance: user.memberBalance + userContribution,
                contributionAmount: userContribution,
                contributionRate: contributionPct
            });
            await uf.save();
        }

        return res.status(200).send({ msg: "لقد تمت إضافته بنجاح" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};

exports.paymentFinancialCompany = async (req, res) => {
    const { idFinancial, money } = req.body;

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

        // 2. Load financial master record
        const fin = await financialCompanyModel.findById(idFinancial);
        if (!fin) {
            return res.status(404).send({ msg: "لا توجد بيانات المساهمة" });
        }
        if (fin.isDone) {
            return res.status(403).send({ msg: "لقد تم السداد من قبل" });
        }

        // 3. Mark as done and record payout
        fin.amountAfterEnd = money;
        fin.isDone = true;

        // 4. Load all user-side records
        const userRecords = await userFinancialCompanyModel
            .find({ idFinancial: fin._id })
            .populate("idUser", { password: false });

        if (userRecords.length === 0) {
            // No participants → just save and credit the box
            await fin.save();
            await moneyBoxModel.findByIdAndUpdate(
                moneyBoxId,
                {
                    $inc: {
                        amount: money,
                        cumulativeAmount: 0,
                        "source.financialCompany": 0
                    }
                },
                { new: true }
            );
            return res.status(200).send({ msg: "تم بنجاح", financial: fin, userFinancial: [] });
        }

        // 5. Compute the total contributed principal
        const totalContrib = userRecords.reduce((sum, u) => sum + u.contributionAmount, 0);
        if (totalContrib === 0) {
            return res.status(400).send({ msg: "خطأ: مجموع المساهمات صفر" });
        }

        // 6. Distribute payout proportionally
        //    and update each user’s record & account
        for (const rec of userRecords) {
            const ratio = rec.contributionAmount / totalContrib;
            const userTotal = money * ratio;                         // what they get back total
            const userProfit = userTotal - rec.contributionAmount;    // net gain (can be negative)
            const profitToCredit = userProfit > 0 ? userProfit : 0;

            // a) update the userFinancial record
            rec.rate = profitToCredit > 0
                ? (profitToCredit * 100) / rec.contributionAmount
                : 0;
            rec.amount = userTotal;
            rec.balanceAfterSale = rec.prevBalance + userTotal;
            await rec.save();

            // b) credit the user’s account
            await userModel.findByIdAndUpdate(
                rec.idUser._id,
                {
                    $inc: {
                        memberBalance: userTotal,
                        cumulativeBalance: profitToCredit,
                        commodityProfitsContributions: profitToCredit
                    }
                },
                { new: true }
            );
        }

        // 7. Persist the financial record
        await fin.save();

        // 8. Update the money box: full payout & net positive profit
        const netProfit = userRecords
            .reduce((sum, u) => sum + Math.max(0, u.amount - u.contributionAmount), 0);

        await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            {
                $inc: {
                    amount: money,
                    cumulativeAmount: netProfit,
                    "source.financialCompany": netProfit
                }
            },
            { new: true }
        );

        return res.status(200).send({
            msg: "لقد تم الدفع بنجاح",
            financial: fin,
            userFinancial: userRecords
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};

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