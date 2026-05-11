const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        requiredd: true
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

ConnectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check fromuserid is same as touserid
    if(ConnectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send Connection Request to Yourself");
    }
    next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", ConnectionRequestSchema);

module.exports = ConnectionRequestModel;