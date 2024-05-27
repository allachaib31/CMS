const foundationSubscriptionModel = require("../../models/foundationSubscription");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxModel = require("../../models/moneybox");
const monthlySubscriptionModel = require("../../models/monthlySubscription");
const { schemaSearchValidation } = require("../../utils/validation/schemaValidation");
const moneyBoxId = process.env.moneyBoxId;

//POST METHODS
exports.addFoundationSubscriptions = async (req, res) => {
    const { idUser, amount, comments } = req.body;
    try {
        if (
            req.user.admin.userPermission.indexOf(
                "إضافة إيرادات (اشتراكات الأعضاء)"
            ) == -1
        ) {
            return res.status(403).send({
                msg: "ليس لديك إذن التعامل مع إيرادات (اشتراكات الأعضاء)",
            });
        }
        const hijriDate = getHijriDate();

        const user = await userModel.findById(idUser);
        if (!user) {
            return res.status(404).send({
                msg: "المستخدم غير موجود",
            });
        }
        if (user.enableAccount) {
            return res.status(400).send({
                msg: "لقد تم دفع الاشتراك التاسيسي من قبل"
            })
        }

        const foundationSubscription = foundationSubscriptionModel({
            idUser,
            amount,
            comments,
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            },
        });
        let err = await foundationSubscription.joiValidate(foundationSubscription.toObject());
        if (err.error) {
            throw err
        };
        await foundationSubscription.save();

        user.enableAccount = true;

        user.markModified("enableAccount");
        await user.save();

        const moneyBox = await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            {
                $inc: {
                    amount: amount,
                    cumulativeAmount: amount
                }
            },
            { new: true }
        );
        if (!moneyBox) {
            return res.status(400).send({
                msg: "حدث خطأ أثناء معالجة طلبك",
            });
        }
        const Subscription = new monthlySubscriptionModel({
            idUser,
            year: hijriDate[2],
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            },
        });
        for (let i = 0; i < 12; i++) {
            const monthIndex = (i + 1).toString();
            Subscription.months[monthIndex].isInvoiceOverdue = false;
        }
        await Subscription.save();
        return res.status(200).send({
            msg: "لقد تم دفع الاشتراك التاسيسي بنجاح",
        });
    } catch (error) {
        console.log(error)
        let message = "";
        if (error.code === 11000) {
            if (error.keyPattern.idUser) {
                message = "لقد قام هذا العضو بدفع الاشتراك التاسيسي من قبل";
            }
            return res.status(400).send({
                msg: message,
            });
        }
        if (error.error) {
            return res.status(422).send({
                msg: "احد المدخلات فيه خطاء",
            });
        }
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
        });
    }
};

exports.addMonthlySubscriptions = async (req, res) => {
    const { idUser, amount, month, year, comments } = req.body;
    try {
        // Check for permissions
        if (req.user.admin.userPermission.indexOf("إضافة إيرادات (اشتراكات الأعضاء)") === -1) {
            return res.status(403).send({
                msg: "ليس لديك إذن التعامل مع إيرادات (اشتراكات الأعضاء)",
            });
        }

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

        let existingSubscription = await monthlySubscriptionModel.findOne({ idUser, year });

        if (!existingSubscription) {
            existingSubscription = new monthlySubscriptionModel({
                idUser,
                year,
                hijriDate: {
                    day: hijriDate[0],
                    month: hijriDate[1],
                    year: hijriDate[2],
                },
            });
            for (let i = 0; i < 12; i++) {
                const monthIndex = (i + 1).toString();
                existingSubscription.months[monthIndex].isInvoiceOverdue = false;
            }
        }
        if (existingSubscription.months[month].amount != 0) {
            return res.status(400).send({
                msg: "لقد تم دفع الاشتراك الخاص بهذا الشهر من قبل"
            })
        }
        existingSubscription.total += Number(amount);
        if(existingSubscription.months[month].isInvoiceOverdue) {
            existingSubscription.numberofArrears -= 1;
        }
        existingSubscription.months[month] = {
            name: existingSubscription.months[month].name,
            amount: amount,
            comments: comments,
            isInvoiceOverdue: false,
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
                    cumulativeAmount: amount
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
};

//GET METHODS
exports.getSubscriptionsForm = async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).send({ msg: "مطلوب الشهر والسنة" });
    }

    try {
        const subscriptions = await monthlySubscriptionModel.find({ year: year }).populate("idUser");

        if (subscriptions.length === 0) {
            return res.status(404).send({ msg: "لم يتم العثور على اشتراكات للسنة المحددة" });
        }
        const results = []
        for(let i = 0; i < subscriptions.length;i++){
            const monthData = subscriptions[i].months[month];
            if(monthData &&  monthData.amount !== 0){
                results.push(subscriptions[i])
            }
        }
        return res.status(200).send({
            subscriptions: results
        });

    } catch (error) {
        return res.status(500).send({
            msg:  "حدث خطأ أثناء معالجة طلبك",
            error: error.message,
        });
    }
};
exports.getOverdueSubscriptions = async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).send({ msg: "مطلوب الشهر والسنة" });
    }

    try {
        const subscriptions = await monthlySubscriptionModel.find({ year: year }).populate("idUser");

        if (subscriptions.length === 0) {
            return res.status(404).send({ msg: "لم يتم العثور على اشتراكات للسنة المحددة" });
        }
        const results = []
        for(let i = 0; i < subscriptions.length;i++){
            const monthData = subscriptions[i].months[month];
            if(monthData &&  monthData.amount == 0){
                results.push(subscriptions[i])
            }
        }
        return res.status(200).send({
            subscriptions: results
        });

    } catch (error) {
        return res.status(500).send({
            msg:  "حدث خطأ أثناء معالجة طلبك",
            error: error.message,
        });
    }
}
exports.getAnnualSubscriptions = async (req, res) => {
    const { year } = req.query;
    try {
        const subscription = await monthlySubscriptionModel.find({
            year
        }).populate("idUser", "name");
        return res.status(200).send({
            subscription
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message
        });
    }
}
exports.getAnnualSubscriptionsDetails = async (req, res) => {
    const { idUser, typeSearch, startYear, endYear } = req.query;
    try {
        if (typeSearch == "oneYear") {
            const subscription = await monthlySubscriptionModel.find({
                idUser,
                year: startYear
            }).populate("idUser", "name");
            return res.status(200).send({
                subscription
            });
        }
        const subscription = await monthlySubscriptionModel.find({
            idUser,
            year: {
                $gte: startYear,
                $lte: endYear
            }
        }).populate("idUser", "name");
        return res.status(200).send({
            subscription
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message
        });
    }
}

exports.getSubscriptionHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const users = await userModel.find().select("_id name memberBalance cumulativeBalance commentSubscribeHistory").skip(skip).limit(pageSize).exec();
        const totalUsers = await userModel.countDocuments();
        const totalPages = Math.ceil(totalUsers / pageSize);
        const moneyBox = await moneyBoxModel.findById(moneyBoxId)
        return res.status(200).json({
            moneyBox,
            users,
            totalPages,
            totalUsers,
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}

exports.searchSubscriptionHistory = async (req, res) => {
    try {
        const { searchMethod, searchValue } = req.query;
        let err = schemaSearchValidation.validate({
            searchMethod,
            searchValue
        });
        if (err.error) throw err;
        let query = {};
        if (searchMethod && searchValue) {
            switch (searchMethod) {
                case "_id":
                    query._id = searchValue;
                    break;
                case "name":
                    query.name = { $regex: searchValue, $options: "i" };
                    break;
                case "email":
                    query.email = searchValue;
                    break;
                case "NationalIdentificationNumber":
                    query.NationalIdentificationNumber = searchValue;
                    break;
                case "phoneNumber":
                    query.phoneNumber = searchValue;
                    break;
                default:
                    return res
                        .status(400)
                        .send({ msg: "قم بتحديث الصفحة هناك خطا في المدخلات" });
            }
        } else {
            return res.status(400).send({ msg: "مطلوب طريقة البحث والقيمة" });
        }
        const users = await userModel.find(query).select("_id name memberBalance cumulativeBalance commentSubscribeHistory");
        const totalUsers = await userModel.countDocuments();
        const totalPages = Math.ceil(totalUsers / 1);
        return res.status(200).json({
            users,
            totalUsers,
            totalPages
        });
    } catch (error) {
        if (error.error) {
            return res.status(422).send({
                msg: "احد المدخلات فيه خطاء",
            });
        }
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
//UPDATE METHODS
exports.updateCommentSubscribeHistory = async (req, res) => {
    const { _id, comment } = req.body;
    try {
        const user = await userModel.findByIdAndUpdate(_id, {
            commentSubscribeHistory: comment
        });
        if (!user) {
            return res.status(404).send({
                msg: "المستخدم غير موجود",
            });
        }
        return res.status(200).send({
            msg: "لقد تم اضافة الملاحظة بنجاح",
        });
    } catch (error) {
        if (error.error) {
            return res.status(422).send({
                msg: "احد المدخلات فيه خطاء",
            });
        }
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.updateCommentRecordAnnual = async (req, res) => {
    const { _id, comment } = req.body;
    try {
        const subscription = await monthlySubscriptionModel.findByIdAndUpdate(_id, {
            comments: comment
        });
        if (!subscription) {
            return res.status(404).send({
                msg: "الاشتراك غير موجود",
            });
        }
        return res.status(200).send({
            msg: "لقد تم اضافة الملاحظة بنجاح",
        });
    } catch (error) {
        if (error.error) {
            return res.status(422).send({
                msg: "احد المدخلات فيه خطاء",
            });
        }
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.updateInvoiceOverdue = async (req, res) => {
    const { id,month } = req.body;
    try{
        if (req.user.admin.userPermission.indexOf("إضافة إيرادات (اشتراكات الأعضاء)") === -1) {
            return res.status(403).send({
                msg: "ليس لديك إذن التعامل مع إيرادات (اشتراكات الأعضاء)",
            });
        }
        console.log(id)
        let existingSubscription = await monthlySubscriptionModel.findById(id);
        if (!existingSubscription) {
            return res.status(400).send({
                msg: "لم يتم ايجاد هذا الاشتراك"
            });
        }
        if(existingSubscription.months[month].amount != 0){
            return res.status(400).send({
                msg: "لقد تم دفع هدا الاشتراك من قبل"
            });
        }
        if(existingSubscription.months[month].isInvoiceOverdue){
            return res.status(400).send({
                msg: "لقد تم اضافتها من قبل"
            });
        }
        existingSubscription.months[month].isInvoiceOverdue = true;
        existingSubscription.numberofArrears += 1;
        existingSubscription.markModified('months');
        existingSubscription.markModified("numberofArrears");

        await existingSubscription.save();
        return res.status(200).send({
            msg: "لقد تم تسجيلها بنجاح",
        });
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message
        });
    }
}