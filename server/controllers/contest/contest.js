const { contestModel, validateContest } = require("../../models/contest/contest");
const { validateContestBranche, contestBrancheModel } = require("../../models/contest/contestBranches");
const getHijriDate = require("../../utils/getHijriDate");
exports.addContest = async (req, res) => {
    const { name, competitionStartDate, competitionEndDate, numberOfAwards, awards } = req.body;
    try {
        const { error } = validateContest({
            name, competitionStartDate, competitionEndDate, numberOfAwards, awards
        });
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        if(numberOfAwards != awards.length) {
            return res.status(400).send({
                msg: "عدد الجوائز لا يساوي الجوائز"
            })
        }
        const hijriDate = getHijriDate();
        const contest = new contestModel({
            name, competitionStartDate, competitionEndDate, numberOfAwards, awards, hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        });
        await contest.save();
        return res.status(200).send({
            msg: "لقد تم انشاء المسابقة بجاح",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getContest = async (req, res) => {
    try {
        const contest = await contestModel.find().sort({ createdAt: -1 })
        return res.status(200).send({
            contest
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.addBranche = async (req, res) => {
    const { idContest, name } = req.body;
    try {
        const { error } = validateContestBranche({
            idContest, name
        });
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        const hijriDate = getHijriDate();
        const contestBranche = new contestBrancheModel({
            idContest, name, hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        })
        await contestBranche.save();
        return res.status(200).send({
            msg: "لقد تم انشاء الفرع بجاح",
            contestBranche
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getBranche = async (req, res) => {
    try {
        const contestBranche = await contestBrancheModel.find().sort({ createdAt: -1 })
        return res.status(200).send({
            contestBranche
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}