var cron = require('node-cron');
const foundationSubscriptionModel = require("../models/subscription/foundationSubscription");
const monthlySubscriptionModel = require("../models/subscription/monthlySubscription");
const getHijriDate = require("../utils/getHijriDate");
const momentHijri = require("moment-hijri");
function scheduleUpdate() {
    cron.schedule('*/10 * * * *', async () => {
     const hijriDate = getHijriDate();
        const foundationSubscription = await foundationSubscriptionModel.find().populate("idUser");
        for (let i = 0; i < foundationSubscription.length; i++) {
            if(foundationSubscription[i].idUser.subscriptionExpiryDate) {
                continue;
            }
            let existingSubscription = await monthlySubscriptionModel.findOne({ idUser: foundationSubscription[i].idUser, year: hijriDate[2] });
            if (!existingSubscription) {
                existingSubscription = new monthlySubscriptionModel({
                    idUser: foundationSubscription[i].idUser,
                    year: hijriDate[2],
                    hijriDate: {
                        day: hijriDate[0],
                        month: hijriDate[1],
                        year: hijriDate[2],
                    },
                });
                for (let j = 0; j < 12; j++) {
                    const monthIndex = (j + 1).toString();
                    existingSubscription.months[monthIndex].dueDate = momentHijri(hijriDate[2] + "-" + monthIndex + "-" + foundationSubscription[i].hijriDate.day, 'iYYYY-iMM-iDD').locale('en').format('YYYY-MM-DD');
                    const toHijriDate = getHijriDate(existingSubscription.months[monthIndex].dueDate);
                    existingSubscription.months[monthIndex].dueDateHijri = {
                        day: toHijriDate[0],
                        month: {
                            number: monthIndex,
                            ar: existingSubscription.months[monthIndex].name
                        },
                        year: hijriDate[2]
                    };
                }
                existingSubscription.save();
            }
        }
        console.log('running a task every minute');
    });
    cron.schedule("*/10 * * * *", async () => {
        const hijriDate = getHijriDate();
        const existingSubscriptions = await monthlySubscriptionModel.find({ year: hijriDate[2] });
        existingSubscriptions.forEach(async (subscription) => {
            // Get the current month index
            const currentMonthIndex = hijriDate[1].number.toString();
            const prevMonth = hijriDate[1].number.toString() == "1" ? 12 : hijriDate[1].number.toString() - 1;
            verifyDate(currentMonthIndex);
            verifyDate(prevMonth);
            function verifyDate(index) {
                if(subscription.months[index].dueDate == null) return;
                const targetDate = new Date(subscription.months[index].dueDate)
                targetDate.setDate(targetDate.getDate() + 5);
                const currentDate = new Date();
                targetDate.setHours(0, 0, 0, 0);
                currentDate.setHours(0, 0, 0, 0);
    
                if (currentDate.getTime() >= targetDate.getTime()) {
                    if(!subscription.months[index].isInvoiceOverdue && subscription.months[index].amount == 0){
                        subscription.months[index].isInvoiceOverdue = true;
                        subscription.numberofArrears += 1;
                        subscription.markModified('months');
                        subscription.markModified("numberofArrears");
                    }
                }
            }
            await subscription.save();
        });
    });
}

module.exports = { scheduleUpdate };