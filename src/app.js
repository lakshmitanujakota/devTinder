const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieparser());

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;
        // validate the data
        validateSignUpData(req);

        //encrypt the password

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();
        res.send("User Added successfully.");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        };
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            //Create JWT 
            const token = await user.getJWT(user);
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 360000) });
            res.send("login Successful");
        }
        else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("Error " + err.message);
    }

})

app.post("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Error " + err.message);
    }

});

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

