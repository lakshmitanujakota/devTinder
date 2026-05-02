const express = require("express");
const authRouter=express.Router("");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validate");
const User = require("../models/user");



authRouter.post("/signup", async (req, res) => {
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


authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout",async(req, res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    });
    res.send();
})

module.exports=authRouter;