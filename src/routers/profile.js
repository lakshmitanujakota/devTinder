const express = require("express");
const profileRouter = express.Router("");
const { userAuth } = require("../middlewares/auth");
const { validateAllowedFields } = require("../utils/validate");
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json(user)
    } catch (err) {
        res.status(400).send("Error " + err.message);
    }
});


profileRouter.post("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateAllowedFields(req)) {
            throw new Error("Some of the Fields Not editable");
        };
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(keys => (loggedInUser[keys] = req.body[keys]));
        await loggedInUser.save();
        // res.send(`${loggedInUser.firstName}  your profile Data Updated `)
        res.json({ message: `${loggedInUser.firstName} your profile Data Updated`, data: loggedInUser });
    } catch (err) {
        res.status(400).send("Error" + err.message);
    }

});

profileRouter.post("/profile/password", userAuth, async (req, res) => {
    try {
       const {password} = req.body;
       const user = req.user;
       const isMatch = await bcrypt.compare(password,user.password);
       if(isMatch){
        throw new Error("Entered password is same as old password")
       }
       const newEncryptedPassword=await bcrypt.hash(password,10);
       user.password = newEncryptedPassword;
       await user.save();
       res.send("Password updated successfully")

    }catch(err){
        res.status(400).send("Error "+err.message);
    }
});

module.exports = profileRouter;
