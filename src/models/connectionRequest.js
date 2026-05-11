const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    status: {
        type: String,
        enum:
        {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type `
        }
    }
}, { Timestamps: true })

ConnectionRequestSchema.index({fromUserId:1, toUserId: 1});

ConnectionRequestSchema.pre("save",function(){
    const ConnectionRequest=this;
    //check fromuserid is same as touserid
    if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
        throw new Error("Cannot send Connection Request to Yourself");
    }
    //next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", ConnectionRequestSchema);

module.exports = ConnectionRequestModel;