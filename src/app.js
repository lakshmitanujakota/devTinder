const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieparser());

const authRouter=require("./routers/auth");
const profileRouter=require("./routers/profile");

app.use("/",authRouter);
app.use("/",profileRouter);

app.post("/getConnectionDetails", userAuth, async (req, res) => {

    console.log("server");
    res.send("Connected to Connection request server.");
})


connectDB().then(() => {
    console.log("Conneted to database");
    app.listen(3000, () => {
        console.log("Server is connected.")
    });
}).catch((err) => {
    console.error("Database connection not established");
});

