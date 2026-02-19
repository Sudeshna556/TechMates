const express = require("express");
const RequestRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/userSchema")


RequestRouter.post("/send/request/:status/:toUserId", userAuth, async (req, res) => {
    try {
        //extract the user
        const toUserId = req.params.toUserId;
        const fromUserId = req.user._id;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).send({ message: "Invalid status" + " " + status })
        }

        // Fetch the receiver's user details so that i can sent the res message along with the users name
        //b/c toUserId → just an ID string, not a user object.

        //so we need to find the user in the database if toUserId is valid or present in the database otherwise it can sent req to anyone
        //edge case : if toUserId is not valid or not present in the database
        const toUser = await User.findById(toUserId).select("name");
        if (!toUser) {
            return res.status(404).send({ message: "User not found" })
        }

        // check if the user has already sent a request to the same user
        //This checks if there is already a connection request in the database between the same fromUserId and toUserId.
        //edge case : if the user has already sent a request to the same user
        const isConnectionAlreadyExists = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]

        });
        //If such a document exists, isConnectionAlreadyExists will be that document; otherwise it will be null.
        if (isConnectionAlreadyExists) {
            return res.status(400).send({ message: "You have already sent a request to " + toUser.name })
        }
        //edge case : user can not sent request to himself
        // if (toUserId === fromUserId) {
        //     return res.status(400).send({ message: "You can not sent request to yourself" })
        // }
        //creatie a new connection request instance
        const connectionRequest = await ConnectionRequestModel.create({
            fromUserId,
            toUserId,
            status,
        })
        const data = await connectionRequest.save();


        res.json({
            message: req.user.name + " is " + status + " to " + toUser.name,
            data
        })

        //
    } catch (err) {
        res.status(500).send("ERROR: " + err.message)
    }
})

// review requests : "/request/review/:status/:requestId"

RequestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        //extract the req id from the route params
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        //check for allowed status
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).send({ message: "Invalid status" })
        }

        //check if the req user exists in the db or not

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id, //usually, the receiver reviews the request, not the sender
            status: "interested"
        })
        //edge case : if the request is not found
        if (!connectionRequest) {
            return res.status(404).send({ message: "Request not found" })
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({ message: "Connection request " + status, data });

    } catch (err) {
        res.status(500).send("ERROR: " + err.message)

    }
})

module.exports = RequestRouter;


