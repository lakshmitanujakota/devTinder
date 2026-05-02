const express=require("express");
const requestRouter=express.Router("");
const { userAuth } = require("../middlewares/auth");


requestRouter.post("/getConnectionDetails", userAuth, async (req, res) => {

    console.log("server");
    res.send("Connected to Connection request server.");
})

module.exports=requestRouter;