require("custom-env").env();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const { rateLimit } = require("express-rate-limit");
const mongoose = require("mongoose");
const path = require('path');
const { default: helmet } = require("helmet");

// IMPORT middleware
const escape = require('./middleware/escape');
const app = express();
const MONGOODB = process.env.MONGOODB;

// MongoDB Connection
mongoose.connect(MONGOODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MONGOODB CONNECTED");
}).catch((err) => {
    console.error(err);
});


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5000,
    message: "Too many requests from this IP, please try again later.",
    statusCode: 429,
    headers: true
});

app
    .use(express.static(path.join(__dirname, 'build')))
    .use(express.json())
    .use(helmet())
    .disable("x-powered-by")
    .use(cors({
        origin: process.env.URL,
        credentials: true
    }))
    .use(limiter)
    .use(compression())
    .use(cookieParser())
    .use(morgan(process.env.MODE))
    .use(escape);

const auth = require("./routes/auth/auth");
app
    .use(auth);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, (req, res) => {
    console.log(`server is start running in ${PORT}`);
});