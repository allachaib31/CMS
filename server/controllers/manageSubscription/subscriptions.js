const foundationSubscriptionModel = require("../../models/subscription/foundationSubscription");
const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const moneyBoxModel = require("../../models/moneybox");
const monthlySubscriptionModel = require("../../models/subscription/monthlySubscription");
const { schemaSearchValidation } = require("../../utils/validation/schemaValidation");
const moneyBoxId = process.env.moneyBoxId;
const querystring = require("querystring");
const typeSubscriptionModel = require("../../models/subscription/typeSubscription");
const moment = require('moment');
const momentHijri = require("moment-hijri");
//POST METHODS
exports.addFoundationSubscriptions = async (req, res) => {
    const { idUser, comments } = req.body;
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
        let type = await typeSubscriptionModel.find()
        let amount = type[1].amount;
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
        user.memberBalance += amount;
        user.cumulativeBalance += amount;

        user.markModified("enableAccount");
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
        const Subscription = new monthlySubscriptionModel({
            idUser,
            year: hijriDate[2],
            hijriDate: {
                day: hijriDate[0],
                month: hijriDate[1],
                year: hijriDate[2],
            },
            total: amount
        });
        function addDaysToHijriDate(hijriDate) {
            const newDate = [...hijriDate];
            /*if (newDate[1].number < 12) {
                newDate[1].number += 1;
            }*/
            newDate[1].ar = Subscription.months[newDate[1].number].name;
            return newDate;
        }
        for (let i = 0; i < 12; i++) {
            const monthIndex = (i + 1).toString();
            if (Number(monthIndex) <= hijriDate[1].number) {//tfkar
                if(Number(monthIndex) == hijriDate[1].number){
                    const dueDate = addDaysToHijriDate([hijriDate[0], { number: Number(monthIndex), ar: Subscription.months[Number(monthIndex)].name }, hijriDate[2]]);
                    Subscription.months[monthIndex].dueDate = momentHijri(dueDate[2] + "-" + dueDate[1].number + "-" + dueDate[0], 'iYYYY-iMM-iDD').locale("en").format('YYYY-MM-DD');
                    const toHijriDate = getHijriDate(Subscription.months[monthIndex].dueDate);
                    Subscription.months[monthIndex] = {
                        dueDateHijri: {
                            day: toHijriDate[0],
                            month: {
                                number: dueDate[1].number,
                                ar: dueDate[1].ar
                            },
                            year: dueDate[2]
                        },
                        amount: amount,
                        pendingPayment: true,
                        isInvoiceOverdue: false,
                        comments: "",
                        hijriDate: {
                            day: hijriDate[0],
                            month: hijriDate[1],
                            year: hijriDate[2],
                        },
                        createdAt: new Date()
                    };
                    
                }
                else Subscription.months[monthIndex].pendingPayment = false;
            } else {
                const dueDate = addDaysToHijriDate([hijriDate[0], { number: Number(monthIndex), ar: Subscription.months[Number(monthIndex)].name }, hijriDate[2]]);
                Subscription.months[monthIndex].dueDate = momentHijri(dueDate[2] + "-" + dueDate[1].number + "-" + dueDate[0], 'iYYYY-iMM-iDD').locale("en").format('YYYY-MM-DD');
                const toHijriDate = getHijriDate(Subscription.months[monthIndex].dueDate);
                Subscription.months[monthIndex].dueDateHijri = {
                    day: toHijriDate[0],
                    month: {
                        number: dueDate[1].number,
                        ar: dueDate[1].ar
                    },
                    year: dueDate[2]
                };
            }
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
    const { idUser, month, dueDateHijri, dueDate, year } = req.body;
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

        if (existingSubscription.months[month].amount != 0) {
            return res.status(400).send({
                msg: "لقد تم دفع الاشتراك الخاص بهذا الشهر من قبل"
            })
        }
        let type = await typeSubscriptionModel.find()
        let amount = type[0].amount;
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
};
exports.endDateUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await userModel.findById(id);
        user.disable = true;
        //user.enableAccount = false;
        user.status = "not active";
        user.subscriptionExpiryDate = new Date();
        const hijriDate = getHijriDate();
        user.subscriptionExpiryDateHijri = {
            day: hijriDate[0],
            month: hijriDate[1],
            year: hijriDate[2],
        };
        await user.save();
        const users = await foundationSubscriptionModel.find().populate("idUser", {
            password: false
        });
        return res.status(200).send({
            users
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message,
        });
    }
}
exports.getEndUser = async (req, res) => {
    try {
        const currentDate = new Date();
        const users = await userModel.find({
            subscriptionExpiryDate: { $lt: currentDate }
        }).select('-password');
        return res.status(200).send({
            users
        })
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
exports.withdrawBalance = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await userModel.findById(id);
        let amount = user.memberBalance;
        if (user.memberBalance == 0) {
            return res.status(400).send({
                msg: "رصيد 0 حاليا لا تستطيع سحب"
            })
        }
        user.memberBalance = 0;
        await user.save();
        const currentDate = new Date();
        const users = await userModel.find({
            subscriptionExpiryDate: { $lt: currentDate }
        }).select('-password');
        const moneyBox = await moneyBoxModel.findByIdAndUpdate(
            moneyBoxId,
            {
                $inc: {
                    amount: amount * -1,
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
            users,
            msg: "تم سحب بنجاح"
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك"
        });
    }
}
exports.addCommentMonthly = async (req, res) => {
    const { _id, comment, month } = req.body;
    try {
        const existingSubscription = await monthlySubscriptionModel.findById(_id);
        if (!existingSubscription) {
            return res.status(404).send({
                msg: "الاشتراك غير موجود",
            });
        }
        existingSubscription.months[month].comments = comment;
        existingSubscription.markModified("months");
        await existingSubscription.save();
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
//GET METHODS
exports.getRegisterFinancialData = async (req, res) => {
    try {
        const users = await foundationSubscriptionModel.find().populate("idUser", {
            password: false
        });
        return res.status(200).send({
            users
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message,
        });
    }
}
exports.getUserForFoundationSubscripe = async (req, res) => {
    try {
        const users = await userModel.find().select("id name NationalIdentificationNumber phoneNumber enableAccount");
        return res.status(200).send({
            users
        })
    } catch (error) {
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message,
        });
    }
}
exports.getSubscriptionsForm = async (req, res) => {
    const { date, dateHijri } = req.body;
    if (!date || !dateHijri) {
        return res.status(400).send({ msg: "مطلوب الشهر والسنة" });
    }
    try {
        const sub = await monthlySubscriptionModel
            .find({ year: dateHijri.year })
            .populate("idUser", "name subscriptionExpiryDate");

        // Filter out users who have a subscriptionExpiryDate
        const subscriptions = sub.filter(subscription => !subscription.idUser?.subscriptionExpiryDate);

        // Now you can work with `subscriptionsWithoutExpiryDate`
        subscriptions.forEach(subscription => {
            console.log(subscription.idUser.name); // This will log the name of users who don't have a subscriptionExpiryDate
        });

        console.log(subscriptions)
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
};
exports.getOverdueSubscriptions = async (req, res) => {

    try {
        const subscriptions = await monthlySubscriptionModel.find().populate("idUser", "name");

        if (subscriptions.length === 0) {
            return res.status(404).send({ msg: "لم يتم العثور على اشتراكات للسنة المحددة" });
        }
        const results = []
        const typeSubscription = await typeSubscriptionModel.find();
        for (let i = 0; i < subscriptions.length; i++) {
            for (let j = 1; j <= 12; j++) {
                const monthData = subscriptions[i].months[j.toString()];
                if (monthData && monthData.pendingPayment && monthData.isInvoiceOverdue) {
                    results.push({
                        idUser: subscriptions[i].idUser,
                        name: subscriptions[i].idUser.name,
                        dueDate: monthData.dueDate,
                        dueDateHijri: {
                            year: monthData.dueDateHijri.year,
                            month: {
                                number: monthData.dueDateHijri.month.number
                            },
                            day: monthData.dueDateHijri.day
                        },
                        amount: typeSubscription[0].amount,
                        month: j.toString(),
                        comments: subscriptions[i].months[j.toString()].comments
                    })
                }
            }
        }
        return res.status(200).send({
            subscriptions: results
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg: "حدث خطأ أثناء معالجة طلبك",
            error: error.message,
        });
    }
}
exports.getAnnualSubscriptions = async (req, res) => {
    const { year } = req.query;
    try {
        const subscription = await monthlySubscriptionModel.find({
            year
        }).populate("idUser", "name id");
        return res.status(200).send({
            subscription,
            print: req.user.admin.userPermission.indexOf("طباعة سجل الاشتراكات (سنوي ، شهري ، أو مدة محددة)") > -1 ? true : false,
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
                subscription,
                print: req.user.admin.userPermission.indexOf("طباعة سجل الاشتراكات (سنوي ، شهري ، أو مدة محددة)") > -1 ? true : false,
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
            subscription,
            print: req.user.admin.userPermission.indexOf("طباعة سجل الاشتراكات (سنوي ، شهري ، أو مدة محددة)") > -1 ? true : false,
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
        const users = await userModel.find().select("_id name memberBalance cumulativeBalance commentSubscribeHistory status createdAt").skip(skip).limit(pageSize).exec();
        const totalUsers = await userModel.countDocuments();
        const totalPages = Math.ceil(totalUsers / pageSize);
        const moneyBox = await moneyBoxModel.findById(moneyBoxId)
        var activeMembers = (await userModel.find({status: "active"})).length;
        var newUser = 0;
        for (let i = 0; i < users.length; i++) {
            //if (users[i].status == "active") activeMembers++;
            var creationDate = moment(users[i].createdAt).locale("en");

            // Get the current date
            var currentDate = moment();

            // Calculate the difference in days
            var daysDifference = currentDate.diff(creationDate, 'years');
            if (daysDifference < 1) {
                newUser++;
            }
        }
        return res.status(200).json({
            moneyBox,
            users,
            activeMembers,
            newUser,
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
                    query.id = searchValue;
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
    const { id, month } = req.body;
    try {
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
        if (existingSubscription.months[month].amount != 0) {
            return res.status(400).send({
                msg: "لقد تم دفع هدا الاشتراك من قبل"
            });
        }
        if (existingSubscription.months[month].isInvoiceOverdue) {
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