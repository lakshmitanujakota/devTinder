const express = require("express");
const profileRouter=express.Router("");
const { userAuth } = require("../middlewares/auth");


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

    }catch(err){
        res.status(400).send("Error"+err.message);
    }

})

module.exports=profileRouter;
