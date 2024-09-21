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
const Grid = require('gridfs-stream');
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

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    //gfs = Grid(conn.db, mongoose.mongo);
    //gfs.collection('uploads'); // Set collection name to 'uploads'
    let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db)
    module.exports.bucket = bucket;
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5000,
        message: "Too many requests from this IP, please try again later.",
        statusCode: 429,
        headers: true
    });

    app
        .use(express.json({ limit: '50mb' }))
        .use(express.urlencoded({ limit: '50mb', extended: true }))
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

    // IMPORT ROUTES
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
    const contributionRevenue = require("./routes/manageContributionRevenue/contributionRevenue");
    const contest = require("./routes/contest/contest");
    const stocks = require("./routes/manageStock/stock");
    const vote = require("./routes/vote/vote");
    const agreements = require("./routes/agreement/agreement");
    const agreementsFamily = require("./routes/agreementFamily/agreement");
    const familyTree = require("./routes/familyTree/familyTree");
    const clientAuth = require("./routes/client/login/login");
    const userInformation = require("./routes/client/userInformation/information");
    const advertising = require("./routes/manageAdvertising/advertising");
    const competition = require("./routes/client/competition/competition");
    const bloodMoney = require("./routes/bloodMoney/bloodMoney");
    const { scheduleUpdate } = require("./schedule/schedule");

    app
        .use(clientAuth)
        .use(userInformation)
        .use(authAdmin)
        .use(adminRoute)
        .use(userRoute)
        .use(typeSubscription)
        .use(subscriptions)
        .use(commodityRevenu)
        .use(loans)
        .use(stocks)
        .use(reimbursedExpenses)
        .use(unReimbursedExpenses)
        .use(moneyBox)
        .use(contributionRevenue)
        .use(contest)
        .use(vote)
        .use(agreements)
        .use(agreementsFamily)
        .use(familyTree)
        .use(advertising)
        .use(competition)
        .use(bloodMoney);

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

});
