//process.loadEnvFile(".env.dev");
require("custom-env").env();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const compression = require("compression");
const { rateLimit } = require("express-rate-limit");
const mongoose = require("mongoose");
const path = require('path');
const { default: helmet } = require("helmet");

// IMPORT middleware
const escape = require('./middleware/escape');

const app = express();

const MONGOODB = process.env.MONGOODB;

mongoose.connect(MONGOODB).then(() => {
    console.log("MONGOODB CONNECTED");
}).catch((err) => {
    console.error(err);
})

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

//IMPORT ROUTES
const adminRoute = require("./routes/manageAdmin/admins");
const userRoute = require("./routes/manageAdmin/users");
const authAdmin = require("./routes/manageAdmin/auth");
const typeSubscription = require("./routes/manageSubscription/typeSubscription");
const subscriptions = require("./routes/manageSubscription/subscriptions");
const commodityRevenu = require("./routes/manageCommodityRevenue/commodityRevenue");
const moneyBox = require("./routes/manageMoneyBox/moneyBox");
const loans = require("./routes/loans/loans");
const reimbursedExpenses = require("./routes/reimbursedExpenses/reimbursedExpenses");
const unReimbursedExpenses = require("./routes/unreimbursedExpenses/unreimbursedExpenses");
const { scheduleUpdate } = require("./schedule/schedule");
app
    .use(authAdmin)
    .use(adminRoute)
    .use(userRoute)
    .use(typeSubscription)
    .use(subscriptions)
    .use(commodityRevenu)
    .use(loans)
    .use(reimbursedExpenses)
    .use(unReimbursedExpenses)
    .use(moneyBox);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const startServer = () => {
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, (req, res) => {
        if (cluster.worker.id === 1) scheduleUpdate();
        console.log(`server is start running in ${PORT}`);
    });
}

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log("Forking a new worker...");
        cluster.fork();
    });
} else {
    startServer();
}
