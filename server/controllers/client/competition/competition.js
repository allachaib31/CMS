const { contestModel } = require("../../../models/contest/contest");
const { contestBrancheModel } = require("../../../models/contest/contestBranches");
const moment = require('moment'); // Import moment for date comparison
const { userContestModel } = require("../../../models/contest/userContest");
const { questionModel } = require("../../../models/contest/question");
const { mcqModel } = require("../../../models/contest/mcq");
const { fillVoidModel } = require("../../../models/contest/fillVoid");
const { dragDropModel } = require("../../../models/contest/dargDrop");
exports.getTiming = async (req, res) => {
    try {
        // Query for contests that have not started yet
        const upcomingContests = await contestModel.findOne({
            competitionStartDate: { $gt: new Date() }
        });

        // If no upcoming contests are found
        const contest = await contestModel.find().sort({
            createdAt: -1
        })
        if (!upcomingContests) {
            return res.status(200).send({
                contest,
            });
        }
        // Return the upcoming contests
        return res.status(200).send({
            upcomingContests,
            contest
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
        });
    }
};


exports.getInformation = async (req, res) => {
    const { id } = req.user;
    const { idCompetition } = req.query;

    try {
        const checkUser = await userContestModel.findOne({
            idUser: id,
            idContest: idCompetition
        }).populate("idUser", "idContest");
        // Assuming checkUser has a contest field with startDate and endDate
        const contest = await contestModel.findById(idCompetition);
        const competitionStartDate = moment(contest.competitionStartDate);
        const currentDate = moment();

        if (currentDate.isBefore(competitionStartDate)) {
            return res.status(403).send({
                msg: "المسابقة لم تبدأ بعد"
            });
        }
        if (!checkUser) {
            return res.status(404).send({
                msg: "المستخدم غير متوفر"
            });
        }


        return res.status(200).send({
            name: checkUser.idUser.name
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};
exports.enterToContest = async (req, res) => {
    const { email, idContest } = req.body;
    const { id } = req.user;
    try{
        const checkUser = await userContestModel.findOne({
            email,
            idUser: id,
            idContest,
        })
        if(checkUser){
            return res.status(400).send({
                msg: "لا تستطيع الاشتراك مرتين"
            })
        }
        const user = await userContestModel({
            email,
            idUser: id,
            idContest,
        })
        await user.save();
        return res.status(200).send({
            msg: "تم تسجيلك بنجاح"
        })
    }catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
        });
    }
}

exports.getBrancheForUser = async (req, res) => {
    const { idContest } = req.query;
    try {
        const contestBranche = await contestBrancheModel.find({
            idContest
        }).sort({ createdAt: -1 })
        return res.status(200).send({
            contestBranche
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getQuestion = async (req, res) => {
    const { idBranche } = req.query;
    try {
        const questions = await questionModel.find({ idBranche });
        const results = await Promise.all(questions.map(async (question) => {
            console.log(question.idQuestion);
            if (question.typeQuestion == "عادي") {
                let obj = await mcqModel.findById(question.idQuestion).select("question id responses");
                console.log(obj);
                return {...obj, typeQuestion: "عادي"};
            } else if (question.typeQuestion == "املأ الفراغ") {
                let obj = await fillVoidModel.findById(question.idQuestion).select("question id");
                console.log(obj);
                return {...obj,typeQuestion: "املأ الفراغ"};
            } else if (question.typeQuestion == "سحب") {
                let obj = await dragDropModel.findById(question.idQuestion).select("question id responses falseResponse");
                console.log(obj);
                return {...obj,typeQuestion: "سحب"};
            }
        }));
        return res.status(200).send({ results });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}