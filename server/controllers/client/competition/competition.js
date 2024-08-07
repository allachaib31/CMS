const { contestModel } = require("../../../models/contest/contest");
const { contestBrancheModel } = require("../../../models/contest/contestBranches");
const moment = require('moment'); // Import moment for date comparison
const { userContestModel } = require("../../../models/contest/userContest");
const { questionModel } = require("../../../models/contest/question");
const { mcqModel } = require("../../../models/contest/mcq");
const { fillVoidModel } = require("../../../models/contest/fillVoid");
const { dragDropModel } = require("../../../models/contest/dargDrop");
const { userContestBrancheModel } = require("../../../models/contest/userContestBranche");
exports.getTiming = async (req, res) => {
    try {
        // Query for contests that have not started yet
        const upcomingContests = await contestModel.findOne({
            competitionStartDate: { $gt: new Date() }
        });

        // If no upcoming contests are found
        const contest = await contestModel.find()
        if (!upcomingContests) {
            return res.status(200).send({
                contest,
            });
        }
        // Return the upcoming contests
        return res.status(200).send({
            upcomingContests,
            contest: contest.reverse()
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
    try {
        const checkUser = await userContestModel.findOne({
            email,
            idUser: id,
            idContest,
        })
        if (checkUser) {
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
    } catch (error) {
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
    const { id,idBranche } = req.query;
    const idUser = req.user.id;
    try {
        const questions = await questionModel.find({ idBranche });
        const checkUser = await userContestModel.findOne({
            idUser: idUser,
            idContest: id,
        });
        console.log(idUser)
        console.log(id)
        console.log(checkUser)
        if (!checkUser) {
            return res.status(400).send({
                msg: "انت لست مشترك في المسابقة"
            })
        }
        const checkUserContestBranche = await userContestBrancheModel.findOne({
            idUserContest: checkUser._id,
            idBranche,
        })
        if(checkUserContestBranche){
            return res.status(403).send({
                msg: "لا تستطيع الاشتراك اكثر من مرة",
                id: checkUserContestBranche._id
            })
        }
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
    var { response, idContest, idBranche } = req.body;
    try {
        const checkUser = await userContestModel.findOne({
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
        if (checkUserContestBranche) {
            return res.status(400).send({
                msg: "لا تستطيع الاشتراك اكثر من مرة"
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
        console.log(response)
        const userContestBranche = new userContestBrancheModel({
            idUserContest: checkUser._id,
            idBranche,
            point: points,
            response
        });
        await userContestBranche.save();
        return res.status(200).send({
            msg: "تم تسجيل اجوبتك بنجاح",
            id: userContestBranche._id
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
    try {
        const userContestBranche = await userContestBrancheModel.findById(id).populate("idUserContest");
        console.log(userContestBranche.idUserContest.idUser)
        console.log(idUser)
        console.log(userContestBranche.idUserContest.idUser.toString() == idUser.toString())
        if (userContestBranche.idUserContest.idUser.toString() == idUser.toString()){
            return res.status(200).send({
                userContestBranche
            })
        }
        return res.status(400).send({
            msg: "لا تستطيع الحصول على النتائج"
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

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
}