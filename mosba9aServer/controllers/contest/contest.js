const { contestModel, validateContest } = require("../../models/contest/contest");
const { validateContestBranche, contestBrancheModel } = require("../../models/contest/contestBranches");
const { validateQuestion, questionModel } = require("../../models/contest/question");
const { validateMcq, mcqModel } = require("../../models/contest/mcq");
const getHijriDate = require("../../utils/getHijriDate");
const { validateFillVoid, fillVoidModel } = require("../../models/contest/fillVoid");
const { validateDragDrop, dragDropModel } = require("../../models/contest/dargDrop");
const { userContestBrancheModel } = require("../../models/contest/userContestBranche");
exports.addContest = async (req, res) => {
    const { name, competitionStartDate, competitionEndDate, numberOfAwards, awards } = req.body;
    try {
        // Validate input
        const { error } = validateContest({
            name, competitionStartDate, competitionEndDate, numberOfAwards, awards
        });
        if (error) {
            console.log(error);
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }

        // Check if there are any contests with an end date in the future
        const ongoingContest = await contestModel.findOne({ competitionEndDate: { $gt: new Date() } });
        if (ongoingContest) {
            return res.status(422).send({
                msg: "هناك مسابقة جارية حالياً، لا يمكنك إضافة مسابقة جديدة قبل انتهاء المسابقة الحالية.",
            });
        }

        // Get Hijri date
        const hijriDate = getHijriDate();

        // Create contest
        const contest = new contestModel({
            name,
            competitionStartDate,
            competitionEndDate,
            numberOfAwards,
            awards,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        });
        await contest.save();

        // Create contest branch
        /*const contestBranche = new contestBrancheModel({
            idContest: contest._id,
            name: "فرع تجريبي",
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        });
        await contestBranche.save();*/

        return res.status(200).send({
            msg: "لقد تم انشاء المسابقة بنجاح",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
        });
    }
};
exports.removeContest = async (req, res) => {
    const { id } = req.query;
    try {
        const contestRemove = await contestModel.findByIdAndDelete(id);
        const branchesRemove = await contestBrancheModel.deleteMany({
            idContest: id
        });

        // Find the questions before deleting them
        const questions = await questionModel.find({ idContest: id });

        // Now delete the questions
        const deletedQuestion = await questionModel.deleteMany({
            idContest: id
        });

        // Iterate over the found questions
        for (const question of questions) {
            if (question.typeQuestion == "عادي") {
                await mcqModel.findByIdAndDelete(question.idQuestion);
            } else if (question.typeQuestion == "املأ الفراغ") {
                await fillVoidModel.findByIdAndDelete(question.idQuestion);
            } else if (question.typeQuestion == "سحب") {
                await dragDropModel.findByIdAndDelete(question.idQuestion);
            }
        }
        return res.status(200).send({
            msg: "تم حذف المسابقة بنجاح"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.removeBranche = async (req, res) => {
    const { id } = req.query;
    try {
        const brancheRemove = await contestBrancheModel.findByIdAndDelete(id);

        // Find the questions before deleting them
        const questions = await questionModel.find({ idContest: brancheRemove.idContest });

        // Now delete the questions
        const deletedQuestion = await questionModel.deleteMany({
            idBranche: id
        });

        // Iterate over the found questions
        for (const question of questions) {
            if (question.typeQuestion == "عادي") {
                await mcqModel.findByIdAndDelete(question.idQuestion);
            } else if (question.typeQuestion == "املأ الفراغ") {
                await fillVoidModel.findByIdAndDelete(question.idQuestion);
            } else if (question.typeQuestion == "سحب") {
                await dragDropModel.findByIdAndDelete(question.idQuestion);
            }
        }
        return res.status(200).send({
            msg: "تم حذف المسابقة بنجاح"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getContest = async (req, res) => {
    try {
        const upcomingContests = await contestModel.findOne({
            open: true
        });
        if (upcomingContests) {
            const currentTime = new Date();
            const contestEndDate = new Date(upcomingContests.competitionEndDate);
            const timeDifference = Math.floor((contestEndDate - currentTime) / 1000); // Time difference in seconds
            if (timeDifference < 0) {
                upcomingContests.open = false;
                await upcomingContests.save();
            }
        }
        const contest = await contestModel.find();
        return res.status(200).send({
            contest: contest.reverse()
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
        const findContest = await contestBrancheModel.findOne({
            name: name,
            idContest
        });
        if (findContest) {
            return res.status(400).send({
                msg: "هذا الفرع موجود بالفعل"
            })
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
    const { idContest } = req.query
    try {
        const contestBranche = await contestBrancheModel.find({
            idContest
        }).sort({ createdAt: -1 }).populate("idContest")
        return res.status(200).send({
            contestBranche
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.addQuestion = async (req, res) => {
    const { typeQuestion, idContest, idBranche } = req.body;
    try {
        const hijriDate = getHijriDate();
        if (typeQuestion == "عادي") {
            const { question, numberOfResponse, responses, correctResponse, point } = req.body;
            const { error } = validateMcq({
                question, numberOfResponse, responses, correctResponse, point
            });
            if (error) {
                console.log(error)
                return res.status(422).send({
                    msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
                });
            }
            const mcq = new mcqModel({
                question, numberOfResponse, responses, correctResponse, point, hijriDate: {
                    day: hijriDate[0],
                    month: hijriDate[1],
                    year: hijriDate[2],
                }
            })
            await mcq.save();
            const questions = new questionModel({
                typeQuestion, idContest, idBranche, idQuestion: mcq._id, hijriDate: {
                    day: hijriDate[0],
                    month: hijriDate[1],
                    year: hijriDate[2],
                }
            })
            await questions.save();
            return res.status(200).send({
                msg: "لقد تم اضافة السؤال بنجاح ",
            });
        } else if (typeQuestion == "املأ الفراغ") {
            const { question, responses, point } = req.body;
            const { error } = validateFillVoid({
                question, responses, point
            });
            if (error) {
                console.log(error)
                return res.status(422).send({
                    msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
                });
            }
            const fillVoid = new fillVoidModel({
                question, responses, point, hijriDate: {
                    day: hijriDate[0],
                    month: hijriDate[1],
                    year: hijriDate[2],
                }
            })
            await fillVoid.save();
            const questions = new questionModel({
                typeQuestion, idContest, idBranche, idQuestion: fillVoid._id, hijriDate: {
                    day: hijriDate[0],
                    month: hijriDate[1],
                    year: hijriDate[2],
                }
            })
            await questions.save();
            return res.status(200).send({
                msg: "لقد تم اضافة السؤال بنجاح ",
            });
        } else if (typeQuestion == "سحب") {
            const { question, responses, falseResponse, point } = req.body;
            const { error } = validateDragDrop({
                question, responses, falseResponse, point
            });
            if (error) {
                console.log(error)
                return res.status(422).send({
                    msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
                });
            }
            const dragDrop = new dragDropModel({
                question, responses, falseResponse, point, hijriDate: {
                    day: hijriDate[0],
                    month: hijriDate[1],
                    year: hijriDate[2],
                }
            })
            await dragDrop.save();
            const questions = new questionModel({
                typeQuestion, idContest, idBranche, idQuestion: dragDrop._id, hijriDate: {
                    day: hijriDate[0],
                    month: hijriDate[1],
                    year: hijriDate[2],
                }
            })
            await questions.save();
            return res.status(200).send({
                msg: "لقد تم اضافة السؤال بنجاح ",
            });
        }
        return res.status(404).send({
            msg: "لا يوجد هذا النوع من الاسئلة"
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getQuestions = async (req, res) => {
    const { idBranche } = req.query;
    try {
        const questions = await questionModel.find({ idBranche });
        const results = await Promise.all(questions.map(async (question) => {
            if (question.typeQuestion == "عادي") {
                let obj = await mcqModel.findById(question.idQuestion).select("question id");
                console.log(obj);
                return obj;
            } else if (question.typeQuestion == "املأ الفراغ") {
                let obj = await fillVoidModel.findById(question.idQuestion).select("question id");
                console.log(obj);
                return obj;
            } else if (question.typeQuestion == "سحب") {
                let obj = await dragDropModel.findById(question.idQuestion).select("question id");
                console.log(obj);
                return obj;
            }
        }));
        return res.status(200).send({ results });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
};
exports.removeQuestion = async (req, res) => {
    const { idQuestion } = req.query;
    try {
        console.log(idQuestion)
        const deletedQuestion = await questionModel.findOneAndDelete({
            idQuestion: idQuestion
        });
        if (deletedQuestion) {
            if (deletedQuestion.typeQuestion == "عادي") {
                await mcqModel.findByIdAndDelete(idQuestion);
            } else if (deletedQuestion.typeQuestion == "املأ الفراغ") {
                await fillVoidModel.findByIdAndDelete(idQuestion);
            } else if (deletedQuestion.typeQuestion == "سحب") {
                await dragDropModel.findByIdAndDelete(idQuestion)
            }
            return res.status(200).send({
                msg: "تم حذف السؤال بنجاح",
                deletedQuestion
            });
        } else {
            return res.status(404).send({
                msg: "السؤال غير موجود"
            });
        }
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getBrancheUserId = async (req, res) => {
    const { id } = req.query;
    try{
        const userContestBranche = await userContestBrancheModel.find({
            idBranche: id
        }).populate({
            path: 'idUserContest',
            populate: {
                path: 'idUser',
                select: 'name id' 
            }
        });
        return res.status(200).send({
            userContestBranche
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}