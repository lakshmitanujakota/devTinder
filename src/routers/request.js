const express = require("express");
const requestRouter = express.Router("");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { ConnectionStates } = require("mongoose");


requestRouter.post("/request/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const fromUserId = req.user._id;
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            return res.send(`${status}` + " Status is invalid");
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new Error(" User not found");
        }

        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                {
                    fromUserId,
                    toUserId
                },
                {
                    fromUserId: toUserId,
                    toUserId: fromUserId
                }
            ],
        });

        if(existingRequest){
            throw new Error(" Request Already Present.")
        };

        if(toUserId.toString()===fromUserId.toString()){
              throw new Error(" Request Is not allowed to send.")
        }

        const connectionRequest = new ConnectionRequest({ fromUserId, toUserId, status });
        const data = await connectionRequest.save();
        res.json({ message: `${req.user.firstName} is ${status} in ${toUser.firstName}`, data })
    } catch (err) {
        res.status(400).send("Error" + err.message);
    }
});

requestRouter.post("/request/review/:status/:requestid",userAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const status=req.params.status;
        const requestid=req.params.requestid;

        const isAllowedStatus=["accepted","ignored"];
        if(!isAllowedStatus.includes(status)){
            res.status(400).json({message: "Incorrect status."});
        };

        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestid,
            toUserId: loggedInUser._id,
            status: "interested"
        });
        if(!connectionRequest){
            res.status(400).send("Connection Request Not Found");
        };
        
        connectionRequest.status=status;

        const data= await connectionRequest.save();
        res.json({message: "Connection Request accepted",data})

    }catch(err){
        res.status(400).send("Error"+err.message);
    }
})

module.exports = requestRouter;