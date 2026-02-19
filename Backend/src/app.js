const express = require("express");
const connectDB = require("./config/db")
const app = express();
const cookieParser = require("cookie-parser")




app.use(express.json()); // middleware to parse the incoming request body to js object
app.use(cookieParser())

//manage all the routes by using the router
//1. import all the routes
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");
const requestRouter = require("./routes/followRequest");
const userRouter = require("./routes/userRouter");
//2. use the router and mount the routes

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


connectDB().then(() => {
    console.log("database connection established..")
    app.listen(3000, () => {
        console.log("server is running on port 3000")
    })
}).catch((err) => {
    console.error("connection failed", err)
    // Optionally exit the process if the DB connection is critical
    // process.exit(1); 
})



