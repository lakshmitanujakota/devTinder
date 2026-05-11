const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_DATA = "firstName lastName age skills About";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_DATA);

        res.json({ message: "Data fetched Successfully", data: connectionRequest });

    } catch (err) {
        res.status(400).send("Error " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [{
                fromUserId: loggedInUser._id
            }, { toUserId: loggedInUser._id }], status: "accepted"
        }).populate("fromUserId", USER_DATA).populate("toUserId", USER_DATA);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({ data });

    } catch (err) {
        res.status(400).send("Error" + err.message);
    }
})

module.exports = userRouter;
