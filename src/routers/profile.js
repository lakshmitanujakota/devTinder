const express = require("express");
const profileRouter=express.Router("");
const { userAuth } = require("../middlewares/auth");
const {validateAllowedFields}=require("../utils/validate");


profileRouter.post("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        console.log(user)
    } catch (err) {
        res.status(400).send("Error " + err.message);
    }
});


profileRouter.post("/profile/edit",userAuth, async(req,res)=>{
    try{
        if(!validateAllowedFields(req))
        {
            throw new Error("Some of the Fields Not editable");
        };
        const loggedInUser=req.user;
        Object.keys(req.body).forEach(keys=>(loggedInUser[keys]=req.body[keys]));
        await loggedInUser.save();
       // res.send(`${loggedInUser.firstName}  your profile Data Updated `)
       res.json({message :`${loggedInUser.firstName} your profile Data Updated`,data:loggedInUser});
    }catch(err){
        res.status(400).send("Error"+ err.message);
    }

})

module.exports=profileRouter;
