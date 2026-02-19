const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // it is refrerence to the user collection
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "pending", "accepted", "rejected", "interested"],
            message: "{values} is not a valid status",
        },
        default: "pending",

    }

},
    { timestamps: true }
)

//create an index on the fromUserId and toUserId fields
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

//create a schema validation to save the connection request between two users
connectionRequestSchema.pre('save', function () {
    const connectionRequest = this;
    //now check if the fromUserId is equal to toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("You can not send a request to yourself");
    }
    // next(); //
});


const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;
