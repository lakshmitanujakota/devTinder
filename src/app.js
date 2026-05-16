const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieparser());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(() => {
    console.log("Conneted to database");
    app.listen(3000, () => {
        console.log("Server is connected.")
    });
}).catch((err) => {
    console.error("Database connection not established");
});

