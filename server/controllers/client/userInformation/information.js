const { agreementsModel } = require("../../../models/agreements/agreements");
const { Readable } = require('stream');
const moneyBoxModel = require("../../../models/moneybox");
const { advertisingModel, File } = require("../../../models/advertising/advertising")
const userModel = require("../../../models/user");
const { voteModel } = require("../../../models/voting/vote");
const monthlySubscriptionModel = require("../../../models/subscription/monthlySubscription");
const typeSubscriptionModel = require("../../../models/subscription/typeSubscription");
const getHijriDate = require("../../../utils/getHijriDate");
const { adsModel } = require("../../../models/advertising/ads");
const moneyBoxId = process.env.moneyBoxId;
const { bucket } = require('../../../app');
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
exports.uploadImage = async (req, res) => {
    const { file } = req;
    const { NationalIdentificationNumber } = req.user;
    try {
        if (file) {
            const { originalname, mimetype, buffer } = file;
            let uploadStream = bucket.openUploadStream(originalname, {
                contentType: mimetype
            });
            let readBuffer = new Readable();
            readBuffer.push(buffer);
            readBuffer.push(null);
            // Pipe the buffer to GridFS
            await new Promise((resolve, reject) => {
                readBuffer.pipe(uploadStream)
                    .on('finish', resolve)
                    .on('error', reject);
            });
            let newFile = new File({
                filename: originalname,
                contentType: mimetype,
                length: buffer.length,
                id: uploadStream.id
            });
            let savedFile = await newFile.save();
            if (!savedFile) {
                return res.status(404).send("حدث خطأ أثناء حفظ البيانات التعريفية للملف");
            }
            const user = await userModel.findOne({
                NationalIdentificationNumber
            });
            user.profileImage = newFile._id;
            await user.save();
            return res.status(200).send({ msg: "لقد تم رفع الصورة بنجاح", profileImage: newFile._id });
        }
        return res.status(404).send({ msg: "لم تصل الصورة حاول مجددا" });
    } catch (error) {
        console.log(error);
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
exports.getClientAds = async (req, res) => {
    try {
        const currentDate = new Date();
        const ads = await adsModel.find({
            endDate: { $gt: currentDate }
        }).sort({ createdAt: -1 });
        return res.status(200).send({
            ads
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.getSubscribeClient = async (req, res) => {
    const { date, dateHijri } = req.body;
    const { id } = req.user;
    if (!date || !dateHijri) {
        return res.status(400).send({ msg: "مطلوب الشهر والسنة" });
    }
    try {
        const subscriptions = await monthlySubscriptionModel.find({ year: dateHijri.year, idUser: id }).populate("idUser", "name");
        if (subscriptions.length === 0) {
            return res.status(404).send({ msg: "لم يتم العثور على اشتراكات للسنة المحددة" });
        }
        const results = []
        var total = 0;
        for (let i = 0; i < subscriptions.length; i++) {
            const monthData = subscriptions[i].months[dateHijri.month.number];
            //&& monthData.dueDateHijri.day == dateHijri.day
            if (monthData) {
                //results.push(subscriptions[i])
                if (monthData.dueDateHijri /*&& monthData.dueDateHijri.month.number == dateHijri.month.number && monthData.dueDateHijri.year == dateHijri.year*/) {
                    results.push(subscriptions[i]);
                }
                if (monthData.dueDateHijri && monthData.dueDateHijri.month.number == dateHijri.month.number) {
                    total += monthData.amount;
                }
            }
        }
        const typeSubscription = await typeSubscriptionModel.find();
        return res.status(200).send({
            subscriptions: results,
            typeSubscription,
            total,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message,
        });
    }
}

exports.payMonthlySubscribe = async (req, res) => {
    const { idUser, month, dueDateHijri, dueDate, year } = req.body;
    const { id } = req.user;
    try {
        const hijriDate = getHijriDate();
        const user = await userModel.findById(idUser);
        if (!user) {
            return res.status(404).send({
                msg: "المستخدم غير موجود",
            });
        }
        if (!user.enableAccount) {
            return res.status(400).send({
                msg: "عليك بدفع الاشتراك التاسيسي اولا"
            })
        }
        if (idUser.toString() != id.toString()) {
            return res.status(400).send({
                msg: "لا تستطيع دفع اشتراك شخص اخر"
            })
        }
        let type = await typeSubscriptionModel.find()
        let amount = type[0].amount;
        let existingSubscription = await monthlySubscriptionModel.findOne({ idUser, year });

        if (existingSubscription.months[month].amount != 0) {
            return res.status(400).send({
                msg: "لقد تم دفع الاشتراك الخاص بهذا الشهر من قبل"
            })
        }
        existingSubscription.total += Number(amount);
        if (existingSubscription.months[month].isInvoiceOverdue) {
            existingSubscription.numberofArrears -= 1;
        }
        existingSubscription.months[month] = {
            name: existingSubscription.months[month].name,
            amount: amount,
            isInvoiceOverdue: false,
            pendingPayment: true,
            dueDate: dueDate,
            dueDateHijri: dueDateHijri,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            },
            createdAt: new Date()
        };
        existingSubscription.markModified('months');
        existingSubscription.markModified("total");

        await existingSubscription.save();

        user.memberBalance += Number(amount);
        user.cumulativeBalance += Number(amount);
        user.markModified("memberBalance");
        user.markModified("cumulativeBalance");
        await user.save();


        const moneyBox = await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            {
                $inc: {
                    amount: amount,
                    cumulativeAmount: amount,
                    "source.subscriptions": amount
                }
            },
            { new: true }
        );
        if (!moneyBox) {
            return res.status(400).send({
                msg: "حدث خطأ أثناء معالجة طلبك",
            });
        }
        return res.status(200).send({
            msg: "لقد تم دفع الاشتراك الشهري بنجاح",
        });
    } catch (error) {
        console.log('Error:', error);
        if (error.name === 'ValidationError') {
            return res.status(422).send({
                msg: "احد المدخلات فيه خطاء",
                details: error.details || error.message
            });
        }
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message
        });
    }
}