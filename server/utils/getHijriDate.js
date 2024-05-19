const axios = require("axios");

function getDate() {
    let now = new Date();
    let year = now.getFullYear().toString();
    let month = Number(now.getMonth().toString()) + 1; 
    let day = Number(now.getDate().toString());
    return day + "-" + month + "-" + year;
}

let now = getDate();

module.exports = async () => {
    const { data } = await axios.get("http://api.aladhan.com/v1/gToH/" + now);
    return data;
}