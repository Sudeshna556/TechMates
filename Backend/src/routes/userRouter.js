const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequestModel = require("../models/connectionRequest")
const User = require("../models/userSchema");

// get all the pending requests for the logged in user
userRouter.get("/user/received/requests", userAuth, async (req, res) => {
    try {
        //get the loggedin user details
        const loggedInUser = req.user;


        const connectionRequest = await ConnectionRequestModel.find({
            // receiverId: loggedInUser._id
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["name", "profilePicture", "about", "Skills"])


        res.json({
            message: "data fetched successfully",
            data: connectionRequest,
        });

    } catch (error) {

        res.json({
            message: "error while fetching data",
            error: error,
        })

    }
})

//show the list of connected people or friends with
userRouter.get("/my-connections", userAuth, async (req, res) => {
    try {
        //get the loggedinUser
        const loggedInUser = req.user;
        //how would i fetch the people who are connected to me?
        const connectionRequest = await ConnectionRequestModel.find({
            //find the connection request where the status is accepted
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ],
        }).populate("fromUserId", ["name", "profilePicture", "about", "Skills"])
            .populate("toUserId", ["name", "profilePicture", "about", "Skills"]);

        const data = connectionRequest.map((request) => {
            //if the request is from the logged in user
            if (request.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return request.toUserId;
            }
            //if the request is to the logged in user
            else {
                return request.fromUserId;
            }
        })
        res.json({ data });


    } catch (err) {
        res.status(400).json({
            message: "error while fetching data",
            error: err,
        })
    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        //cheeck for loggedin user
        const loggedInUser = req.user;
        //pagination
        const page = req.query.page || 1;
        let limit = req.query.limit || 10;
        let skip = (page - 1) * limit;
        //if the user tries to fetch more than 50 users at a time, then return 50 users
        if (limit > 50) {
            limit = 50;
            skip = 0;
        }

        // find the connection req that are sent
        //constraints to be checkend : 1. show all the db users except himself,accepted users and rejected.

        //find the connection requests that are sent snd received by the logged in user
        const connectionRequests = await ConnectionRequestModel.find({
            // either send or received : use $or operator
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ],
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId.toString());
            hideUsersFromFeed.add(request.toUserId.toString());
        })


        //find the users who are not connected to the logged in user
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select("name profilePicture about Skills")
            .skip(skip)
            .limit(limit);

        res.send(users);

    } catch (error) {
        res.status(400).json({
            message: "error while fetching data",
            error: error,
        })
    }
})



module.exports = userRouter;
