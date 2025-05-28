const { validateInvestment, investmentBoxModel } = require("../../models/investmentBox/investmentBox");
const { userInvestmentModel } = require("../../models/investmentBox/userInvestmentBox");
const moneyBoxModel = require("../../models/moneybox");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxId = process.env.moneyBoxId;


exports.addInvestmentBox = async (req, res) => {
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
                msg: "ليس لديك إذن إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)"
            });
        }

        // 2. Check money box balance
        const box = await moneyBoxModel.findById(moneyBoxId);
        if (amount > box.amount) {
            return res.status(403).send({ msg: "لايوجد رصيد كافي في الصندوق" });
        }

        // 3. Validate input
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
            console.log(error);
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها"
            });
        }

        // 4. Create investment master record
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
            previousFundBalance: box.amount,
            contributionAmount: amount,
            contributionRate: (amount * 100) / box.amount,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2]
            }
        });
        await investment.save();

        // 5. Debit the money box
        await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            { $inc: { amount: -amount } },
            { new: true }
        );

        // 6. Load active users
        const activeUsers = await userModel.find({
            status: "active",
            disable: false
        });

        // 7. Compute totalBalance for weighted split
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

            // b) Record the user’s investment
            const ui = new userInvestmentModel({
                idInvestment: investment._id,
                idUser: user._id,
                prevBalance: user.memberBalance + userContribution,
                contributionAmount: userContribution,
                contributionRate: contributionPct
            });
            await ui.save();
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

exports.paymentInvesment = async (req, res) => {
    const { idInvestment, money } = req.body;

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

        // 2. Load the investment record
        const investment = await investmentBoxModel.findById(idInvestment);
        if (!investment) {
            return res.status(404).send({ msg: "لا توجد بيانات المساهمة" });
        }
        if (investment.isDone) {
            return res.status(403).send({ msg: "لقد تم السداد من قبل" });
        }

        // 3. Mark as done and record the payout
        investment.amountAfterEnd = money;
        investment.isDone = true;

        // 4. Load all user-side records
        const userRecs = await userInvestmentModel
            .find({ idInvestment: investment._id })
            .populate("idUser", { password: false });

        // 5. If no participants, just credit the box
        if (userRecs.length === 0) {
            await investment.save();
            await moneyBoxModel.findByIdAndUpdate(
                moneyBoxId,
                {
                    $inc: {
                        amount: money,
                        cumulativeAmount: 0,
                        "source.investmentBox": 0
                    }
                },
                { new: true }
            );
            return res.status(200).send({
                msg: "تم السداد بنجاح",
                investment,
                userInvestment: []
            });
        }

        // 6. Compute total principal contributed
        const totalPrincipal = userRecs.reduce((sum, u) => sum + u.contributionAmount, 0);
        if (totalPrincipal === 0) {
            return res.status(400).send({ msg: "خطأ: مجموع المساهمات صفر" });
        }

        // 7. Distribute the payout proportionally
        let totalPositiveProfit = 0;
        for (const rec of userRecs) {
            const ratio = rec.contributionAmount / totalPrincipal;
            const userTotal = money * ratio;                       // what this user receives
            const userProfit = userTotal - rec.contributionAmount;  // net gain (can be negative)
            const profitToCredit = Math.max(0, userProfit);

            // a) Update the userInvestment record
            rec.rate = profitToCredit > 0
                ? (profitToCredit * 100) / rec.contributionAmount
                : 0;
            rec.amount = userTotal;
            rec.balanceAfterSale = rec.prevBalance + userTotal;
            await rec.save();

            // b) Credit the user’s account
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

            totalPositiveProfit += profitToCredit;
        }

        // 8. Persist the investment and update the money box
        await investment.save();
        await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            {
                $inc: {
                    amount: money,
                    cumulativeAmount: totalPositiveProfit,
                    "source.investmentBox": totalPositiveProfit
                }
            },
            { new: true }
        );

        // 9. Return success
        return res.status(200).send({
            msg: "لقد تم السداد بنجاح",
            investment,
            userInvestment: userRecs
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};

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