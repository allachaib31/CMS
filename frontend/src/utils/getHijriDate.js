const moment = require('moment-hijri');
const momentTimezone = require('moment-timezone');

export const hijriDateObject = (date) => {
    const months = {
        "1": "محرم", "2": "صفر", "3": "ربيع الاول", "4": "ربيع الثاني",
        "5": "جماد الأول", "6": "جماد الثاني", "7": "رجب", "8": "شعبان",
        "9": "رمضان", "10": "شوال", "11": "ذو القعدة", "12": "ذو الحجة"
    };

    let formattedHijriDate;

    try {
        // Attempt to use Intl.DateTimeFormat
        formattedHijriDate = new Intl.DateTimeFormat('ar-sa', { calendar: 'islamic-umalqura' }).format(date ? new Date(date) : new Date());
    } catch (e) {
        console.error("Intl.DateTimeFormat failed:", e);
        let date = moment(date ? new Date(date) : new Date()).format('iYYYY/iM/iD').split("/");
        return [date[2], {
            number: date[1]
        }, date[0]];
        // Fallback to moment-hijri
        const hijriMoment = momentTimezone.tz(date ? new Date(date) : new Date(), 'Asia/Riyadh').format('iYYYY/iM/iD');
        formattedHijriDate = hijriMoment.replace(/\/\d+$/, ' هـ');
    }

    const convertToArabicNumerals = (dateStr) => {
        const arabicIndicToArabic = {
            '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9', '٠': '0',
        };
        return dateStr.replace(/[١٢٣٤٥٦٧٨٩٠]/g, (digit) => arabicIndicToArabic[digit]);
    };

    const convertedHijriDateStr = convertToArabicNumerals(formattedHijriDate).replace(" هـ", "").trim();
    const convertedHijriDate = convertedHijriDateStr.split("/").map(part => part.trim());

    if (convertedHijriDate.length < 3) {
        let date = moment(date ? new Date(date) : new Date()).format('iYYYY/iM/iD').split("/");
        return [date[2], {
            number: date[1]
        }, date[0]];
        console.error("Invalid Hijri date format:", convertedHijriDateStr);
        return [0, { number: 0, ar: "Unknown" }, 0]; // Return a default value
    }

    let monthNumber = Number(convertedHijriDate[1].slice(0, convertedHijriDate[1].length - 1));
    if (isNaN(monthNumber) || !months[monthNumber]) {
        let date = moment(date ? new Date(date) : new Date()).format('iYYYY/iM/iD').split("/");
        return [date[2], {
            number: date[1]
        }, date[0]];
        console.error("Invalid month number:", monthNumber);
        monthNumber = 1; // Fallback to a default valid month
    }

    convertedHijriDate[1] = {
        number: monthNumber,
        ar: months[monthNumber]
    };

    const day = Number(convertedHijriDate[0].slice(0, convertedHijriDate[0].length - 1));
    const year = Number(convertedHijriDate[2].slice(0, convertedHijriDate[2].length));

    if (isNaN(day) || isNaN(year)) {
        let date = moment(date ? new Date(date) : new Date()).format('iYYYY/iM/iD').split("/");
        return [date[2], {
            number: date[1]
        }, date[0]];
        console.error("Invalid day or year:", day, year);
        return [0, { number: monthNumber, ar: months[monthNumber] }, 0]; // Return a default value
    }

    return [day, convertedHijriDate[1], year];
};
