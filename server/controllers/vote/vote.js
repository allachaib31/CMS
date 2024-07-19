const { validateVote, voteModel } = require("../../models/voting/vote");
const getHijriDate = require("../../utils/getHijriDate");

exports.addVote = async (req, res) => {
    const { subject, votingStartDate, votingEndDate, choices, numberOfChoices } = req.body;
    try {
        const { error } = validateVote({
            subject, votingStartDate, votingEndDate, choices, numberOfChoices
        });
        if (error) {
            console.log(error)
            return res.status(422).send({
                msg: "يرجى ادخال جميع المدخلات والتأكد من صحتها",
            });
        }
        if (numberOfChoices != choices.length) {
            return res.status(400).send({
                msg: "املاء كل الاختيارات"
            })
        }
        const hijriDate = getHijriDate();
        const vote = new voteModel({
            subject, votingStartDate, votingEndDate, choices, numberOfChoices, hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            }
        });
        await vote.save();
        return res.status(200).send({
            msg: "لقد تم اضافته بجاح",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.getVote = async (req, res) => {
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
exports.voteDetails = async (req, res) => {
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