const express = require("express");
const session = require('express-session');
const redis = require("redis");
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require("./config/config");

let RedisStore = require("connect-redis")(session);
let RedisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}/?authSource=admin`

const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then( () => console.log("Success"))
    .catch(err => {
        console.log("ERROR ",err)
        setTimeout(connectWithRetry, 5000)
    });
}

connectWithRetry();
app.enable("trust proxy");

app.use(session({
    store: new RedisStore({
        client: RedisClient
    }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000
    }
}))

app.use(express.json());
app.use(cors());

app.get('/api/v1',(req,res) => {
    console.log("HERE");
    res.send("<h2> Hi There </h2>");
})

app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter);

const port = process.env.PORT || 3000;


app.listen(port,() => console.log(`Listening on port ${port}`));