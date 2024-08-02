const { agreementsModel } = require("../../../models/agreements/agreements");
const moneyBoxModel = require("../../../models/moneybox");
const { advertisingModel, File } = require("../../../models/advertising/advertising")
const userModel = require("../../../models/user");
const { voteModel } = require("../../../models/voting/vote");
const monthlySubscriptionModel = require("../../../models/subscription/monthlySubscription");
const moneyBoxId = process.env.moneyBoxId;
exports.getClientInformation = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await userModel.findById(id);
        const moneyBox = await moneyBoxModel.findById(moneyBoxId);
        return res.status(200).send({
            memberBalance: user.memberBalance,
            cumulativeBalance: user.cumulativeBalance,
            commodityProfitsContributions: user.commodityProfitsContributions,
            subsidies: user.subsidies,
            loans: user.loans,
            moneyBox
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getAgreements = async (req, res) => {
    try {
        const agreements = await agreementsModel.find({
            active: true
        });
        return res.status(200).send({
            agreements
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getElection = async (req, res) => {
    try {
        const vote = await voteModel.find().sort({
            createdAt: -1
        })
        return res.status(200).send({
            vote
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.setVote = async (req, res) => {
    const { id, choice } = req.body;
    const idUser = req.user.id;
    try {
        console.log(choice);
        const vote = await voteModel.findById(id);
        if (!vote) {
            return res.status(404).send({
                msg: "التصويت غير موجود"
            });
        }
        if (vote.choices && vote.choices.indexOf(choice) <= -1) {
            return res.status(404).send({
                msg: "لا يوجد هذا الاختيار"
            });
        }

        const today = new Date();
        const votingEndDate = new Date(vote.votingEndDate);

        if (today > votingEndDate) {
            return res.status(400).send({
                msg: "لقد انتهى موعد التصويت"
            });
        }

        for (let i = 0; i < vote.userVote.length; i++) {
            if (vote.userVote[i].id.toString() === idUser.toString()) {
                return res.status(400).send({
                    msg: "قمت بتصويت من قبل"
                });
            }
        }

        vote.userVote.push({
            id: idUser,
            choose: choice
        });
        await vote.save();
        return res.status(200).send({
            msg: "تم تصويت بنجاح"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};
exports.ElectionDetails = async (req, res) => {
    const { id } = req.query;
    try {
        const vote = await voteModel.findById(id);
        return res.status(200).send({
            vote
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getAdvertising = async (req, res) => {
    try {
        const currentDate = new Date();
        const advertising = await advertisingModel.find({
            endDate: { $gt: currentDate }
        }).sort({ createdAt: -1 });
        return res.status(200).send({
            advertising
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getSubscribeClient = async (req, res) => {
    const { year } = req.query;
    const id = req.user.id;
    try {
        const subscription = await monthlySubscriptionModel.findOne({
            year,
            idUser: id
        });
        return res.status(200).send({
            subscription,
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message
        });
    }
}