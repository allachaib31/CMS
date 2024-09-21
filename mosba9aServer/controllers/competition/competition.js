const { contestModel } = require("../../models/contest/contest");
const { contestBrancheModel } = require("../../models/contest/contestBranches");
const moment = require('moment'); // Import moment for date comparison
const { userCompetitionModel } = require("../../models/contest/userCompetition");
const { questionModel } = require("../../models/contest/question");
const { mcqModel } = require("../../models/contest/mcq");
const { fillVoidModel } = require("../../models/contest/fillVoid");
const { dragDropModel } = require("../../models/contest/dargDrop");
const { userContestBrancheModel } = require("../../models/contest/userContestBranche");
exports.getTiming = async (req, res) => {
    try {
        // Query for contests that have not started yet
        const upcomingContests = await contestModel.findOne({
            open: true
        });
        if (!upcomingContests) {
            return res.status(200).send({
                msg: "لا توجد مسابقة حاليا"
            })
        }
        const contestStartDate = new Date(upcomingContests.competitionStartDate);
        const currentTime = new Date();
        if (currentTime < contestStartDate) {
            return res.status(200).send({
                msg: "لا توجد مسابقة حاليا"
            })
        }
        const contestEndDate = new Date(upcomingContests.competitionEndDate);
        const timeDifference = Math.floor((contestEndDate - currentTime) / 1000); // Time difference in seconds

        if (timeDifference > 0) {
            return res.status(200).send({
                upcomingContests,
            });
        }
        upcomingContests.open = false;
        await upcomingContests.save();
        return res.status(200).send({
            msg: "لا توجد مسابقه حاليا"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
        });
    }
};
exports.getContest = async (req, res) => {
    try {
        const upcomingContests = await contestModel.findOne({
            open: true
        });
        if(upcomingContests){
            const currentTime = new Date();
            const contestEndDate = new Date(upcomingContests.competitionEndDate);
            const timeDifference = Math.floor((contestEndDate - currentTime) / 1000); // Time difference in seconds
            if (timeDifference < 0) {
                upcomingContests.open = false;
                await upcomingContests.save();
            }
        }
        const contest = await contestModel.find({
            open: false
        });
        return res.status(200).send({
            contest: contest.reverse()
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getBrancheForUser = async (req, res) => {
    const idContest = req.query.id;
    const { id } = req.user;
    try {
        const checkUser = await userCompetitionModel.findOne({
            idUser: id,
            idContest
        })
        if (!checkUser) {
            const user = await userCompetitionModel({
                idUser: id,
                idContest,
            })
            await user.save();
            const contest = await contestModel.findById(idContest);
            contest.contestants.push(req.user.name);
            contest.winners.push({
                id: user._id,
                name: req.user.name,
                point: user.point,
                timing: user.totalTiming
            })
            contest.winners.sort((a, b) => {
                if (a.point === b.point) {
                    return a.timing - b.timing;
                } else {
                    return b.point - a.point;
                }
            });
            await contest.save();
        }
        const contestBranche = await contestBrancheModel.find({
            idContest
        }).sort({ createdAt: -1 })
        const result = []
        for (let i = 0; i < contestBranche.length; i++) {
            const questions = await questionModel.find({
                idBranche: contestBranche[i]._id
            });
            var points = 0;
            for (let j = 0; j < questions.length; j++) {
                if (questions[j].typeQuestion == "عادي") {
                    let obj = await mcqModel.findById(questions[j].idQuestion)
                    points += obj.point;
                } else if (questions[j].typeQuestion == "املأ الفراغ") {
                    let obj = await fillVoidModel.findById(questions[j].idQuestion)
                    points += obj.point;
                } else if (questions[j].typeQuestion == "سحب") {
                    let obj = await dragDropModel.findById(questions[j].idQuestion)
                    points += obj.point;
                }
            }
            result.push({
                contestBranche: contestBranche[i],
                numberOfQuestion: questions.length,
                points
            })
        }
        return res.status(200).send({
            result
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getQuestion = async (req, res) => {
    const { id, idBranche } = req.query;
    const idUser = req.user.id;
    try {
        const questions = await questionModel.find({ idBranche });
        const checkUser = await userCompetitionModel.findOne({
            idUser: idUser,
            idContest: id,
        });
        if (!checkUser) {
            return res.status(400).send({
                msg: "انت لست مشترك في المسابقة"
            })
        }
        const checkUserContestBranche = await userContestBrancheModel.findOne({
            idUserContest: checkUser._id,
            idBranche,
        })
        if (checkUserContestBranche) {
            return res.status(403).send({
                msg: "لا تستطيع الاشتراك اكثر من مرة",
                id: checkUserContestBranche._id
            })
        }
        const userContestBranche = new userContestBrancheModel({
            idUserContest: checkUser._id,
            idBranche,
        });
        await userContestBranche.save();
        const results = await Promise.all(questions.map(async (question) => {
            console.log(question.idQuestion);
            if (question.typeQuestion == "عادي") {
                let obj = await mcqModel.findById(question.idQuestion).select("question id responses");
                console.log(obj);
                return { ...obj, typeQuestion: "عادي" };
            } else if (question.typeQuestion == "املأ الفراغ") {
                let obj = await fillVoidModel.findById(question.idQuestion).select("question id");
                console.log(obj);
                return { ...obj, typeQuestion: "املأ الفراغ" };
            } else if (question.typeQuestion == "سحب") {
                let obj = await dragDropModel.findById(question.idQuestion).select("question id responses falseResponse");
                console.log(obj);
                return { ...obj, typeQuestion: "سحب" };
            }
        }));
        const contestBranche = await contestBrancheModel.findById(idBranche);
        contestBranche.contestants.push(req.user.name);
        contestBranche.winners.push({
            id: userContestBranche._id,
            name: req.user.name,
            point: 0,
            timing: 0
        })
        contestBranche.winners.sort((a, b) => {
            if (a.point === b.point) {
                return a.timing - b.timing;
            } else {
                return b.point - a.point;
            }
        });
        await contestBranche.save();
        return res.status(200).send({ results });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}


exports.saveResponse = async (req, res) => {
    const { id } = req.user;
    var { response, timing, idContest, idBranche } = req.body;
    try {
        const checkUser = await userCompetitionModel.findOne({
            idUser: id,
            idContest,
        });
        if (!checkUser) {
            return res.status(400).send({
                msg: "انت لست مشترك في المسابقة"
            })
        }
        const checkUserContestBranche = await userContestBrancheModel.findOne({
            idUserContest: checkUser._id,
            idBranche,
        })
        if (checkUserContestBranche.saveResponse == true) {
            return res.status(403).send({
                msg: "لا تستطيع الاجابة اكثر من مرة",
                id: checkUserContestBranche._id
            })
        }
        var points = 0;
        for (let i = 0; i < response.length; i++) {
            if (response[i].typeQuestion == "عادي") {
                const mcq = await mcqModel.findById(response[i].idQuestion);
                if (mcq.correctResponse == response[i].responses) {
                    response[i].responseStatus = true;
                    response[i].correctResponse = mcq.correctResponse
                    response[i].point = mcq.point;
                } else {
                    response[i].responseStatus = false;
                    response[i].correctResponse = mcq.correctResponse
                    response[i].point = 0;
                }
                points += response[i].point;
            } else if (response[i].typeQuestion == "املأ الفراغ") {
                const fillVoid = await fillVoidModel.findById(response[i].idQuestion);
                response[i].correctResponse = [];
                response[i].point = 0
                for (let j = 0; j < response[i].responses.length; j++) {
                    if (fillVoid.responses[j].indexOf(response[i].responses[j]) > -1) {
                        response[i].correctResponse[j] = fillVoid.responses[j]
                        response[i].point += fillVoid.point / response[i].responses.length;
                    } else {
                        response[i].correctResponse[j] = fillVoid.responses[j]
                        response[i].point += 0;
                    }
                }
                if (response[i].point == fillVoid.point) response[i].responseStatus = true;
                else if (response[i].point > 0 && response[i].point < fillVoid.point) response[i].responseStatus = "neutral";
                else if (response[i].point == 0) response[i].responseStatus = false;
                points += response[i].point;
            } else if (response[i].typeQuestion == "سحب") {
                const dragDrop = await dragDropModel.findById(response[i].idQuestion);
                response[i].correctResponse = [];
                response[i].point = 0
                for (let j = 0; j < response[i].responses.length; j++) {
                    if (dragDrop.responses[j] == response[i].responses[j]) {
                        response[i].correctResponse[j] = dragDrop.responses[j]
                        response[i].point += dragDrop.point / response[i].responses.length;
                    } else {
                        response[i].correctResponse[j] = dragDrop.responses[j]
                        response[i].point += 0;
                    }
                }
                if (response[i].point == dragDrop.point) response[i].responseStatus = true;
                else if (response[i].point > 0 && response[i].point < dragDrop.point) response[i].responseStatus = "neutral";
                else if (response[i].point == 0) response[i].responseStatus = false;
                points += response[i].point;
            }

        }
        checkUserContestBranche.point = points;
        checkUserContestBranche.response = response;
        checkUserContestBranche.timing = timing;
        checkUserContestBranche.saveResponse = true;
        await checkUserContestBranche.save();
        checkUser.point += points;
        checkUser.totalTiming += timing;
        await checkUser.save();
        const contest = await contestModel.findById(idContest);
        for (let i = 0; i < contest.winners.length; i++) {
            if (contest.winners[i].id.toString() == checkUser._id.toString()) {
                contest.winners[i].point = checkUser.point;
                contest.winners[i].timing = checkUser.totalTiming;
                break;
            }

        }
        contest.winners.sort((a, b) => {
            if (a.point === b.point) {
                return a.timing - b.timing;
            } else {
                return b.point - a.point;
            }
        });
        await contest.save();
        const contestBranche = await contestBrancheModel.findById(idBranche);
        for (let i = 0; i < contestBranche.winners.length; i++) {
            if (contestBranche.winners[i].id.toString() == checkUserContestBranche._id.toString()) {
                contestBranche.winners[i].point = checkUserContestBranche.point;
                contestBranche.winners[i].timing = checkUserContestBranche.timing;
                break;
            }

        }
        contestBranche.winners.sort((a, b) => {
            if (a.point === b.point) {
                return a.timing - b.timing;
            } else {
                return b.point - a.point;
            }
        });
        await contestBranche.save();
        return res.status(200).send({
            msg: "تم تسجيل اجوبتك بنجاح",
            id: checkUserContestBranche._id
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}


exports.getUserResult = async (req, res) => {
    const { id } = req.query;
    const idUser = req.user.id;
    console.log(req.user)
    try {
        const userContestBranche = await userContestBrancheModel.findById(id).populate("idUserContest");
        if (userContestBranche.idUserContest.idUser.toString() == idUser.toString()) {
            return res.status(200).send({
                point: userContestBranche.point,
                timing: userContestBranche.timing,

            })
        }
        return res.status(400).send({
            msg: "لا تستطيع الحصول على النتائج"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getBrancheId = async (req, res) => {
    const { id } = req.query;
    try{
        const brancheId = await contestBrancheModel.find({
            idContest: id
        })
        return res.status(200).send({
            brancheId
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getUserResultBranche = async (req, res) => {
    const { id } = req.query;
    const idUser = req.user.id;
    try{
        console.log(id)
        const userCompetition = await userCompetitionModel.findOne({
            idUser
        })
        console.log(userCompetition)
        const userContestBranche = await userContestBrancheModel.findOne({
            idBranche: id,
            idUserContest: userCompetition._id
        })
        console.log(userContestBranche)
        return res.status(200).send({
            userContestBranche
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
/*
exports.getContestResult = async (req, res) => {
    const { id } = req.query;
    try{
        const contest = await contestModel.findById(id);
        if (!contest) {
            return res.status(404).send({
                msg: "هذه المسابقة غير موجودة"
            });
        }
        
        const contestBranche = await contestBrancheModel.find({
            idContest: id
        });
        
        const results = await Promise.all(contestBranche.map(async (branche) => {
            const userContestBranche = await userContestBrancheModel.find({
                idBranche: branche._id
            }).sort({
                point: -1
            }).populate({
                path: 'idUserContest',
                populate: {
                    path: 'idUser',
                    select: '_id id name'
                }
            });
        
            return {
                branche,
                userContestBranche
            };
        }));
        
        return res.status(200).send({
            contest,
            results
        });
        
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}*/