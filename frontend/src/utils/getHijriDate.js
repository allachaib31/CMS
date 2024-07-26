const moment = require('moment');
require('moment-hijri');
const momentTimezone = require('moment-timezone');

export const hijriDateObject = (date) => {
    const months = {
        "1": "محرم", "2": "صفر", "3": "ربيع الاول", "4": "ربيع الثاني",
        "5": "جماد الأول", "6": "جماد الثاني", "7": "رجب", "8": "شعبان",
        "9": "رمضان", "10": "شوال", "11": "ذو القعدة", "12": "ذو الحجة"
    };

    // Set the current date in the Asia/Riyadh timezone
    //alert(date)
    //const now = momentTimezone.tz(new Date(date), 'Asia/Riyadh');

    // Format the current date as Hijri in the ar-sa locale using Intl.DateTimeFormat
    const formattedHijriDate = new Intl.DateTimeFormat('ar-sa', { calendar: 'islamic-umalqura' }).format(date ? new Date(date) : new Date());

    // Function to convert Arabic-Indic numerals to Arabic numerals
    const convertToArabicNumerals = (dateStr) => {
        const arabicIndicToArabic = {
            '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9', '٠': '0',
        };
        return dateStr.replace(/[١٢٣٤٥٦٧٨٩٠]/g, (digit) => arabicIndicToArabic[digit]);
    };

    // Convert the formatted Hijri date to use Arabic numerals
    const convertedHijriDateStr = convertToArabicNumerals(formattedHijriDate).replace(" هـ", "").trim();
    const convertedHijriDate = convertedHijriDateStr.split("/").map(part => part.trim());

    let monthNumber = Number(convertedHijriDate[1].slice(0,convertedHijriDate[1].length -1 ));
    // Update the month to include Arabic name
    convertedHijriDate[1] = {
        number: monthNumber,
        ar: months[monthNumber]
    };
    return [
        Number(convertedHijriDate[0].slice(0,convertedHijriDate[0].length -1 )),
        convertedHijriDate[1],
        Number(convertedHijriDate[2].slice(0,convertedHijriDate[2].length ))
    ];
}