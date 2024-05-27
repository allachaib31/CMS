const moment = require('moment');
require('moment-hijri');
const momentTimezone = require('moment-timezone');

// Set the current date in the Asia/Riyadh timezone
const now = momentTimezone.tz(new Date(), 'Asia/Riyadh');

// Get the current Gregorian date in ISO format
const gregorianDate = now.format('YYYY-MM-DD');

// Format the current date as Hijri in the ar-sa locale using Intl.DateTimeFormat
const formattedHijriDate = new Intl.DateTimeFormat('ar-sa', { calendar: 'islamic' }).format(new Date());

// Display the current Hijri date in the iYYYY/iM/iD format
const hijriDate = moment(now).format('iYYYY/iM/iD');

// Function to convert Arabic-Indic numerals to Arabic numerals
const convertToArabicNumerals = (dateStr) => {
    const arabicIndicToArabic = {
        '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9', '٠': '0',
    };
    return dateStr.replace(/[١٢٣٤٥٦٧٨٩٠]/g, (digit) => arabicIndicToArabic[digit]);
};

// Convert the formatted Hijri date to use Arabic numerals
const convertedHijriDate = convertToArabicNumerals(formattedHijriDate).slice(0, convertToArabicNumerals(formattedHijriDate).length - 3).split("/");

console.log(convertedHijriDate)