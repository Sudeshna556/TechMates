const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validations");


profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        // since in the userAuth i have already attached the user to the req object, we dont need to find the user again
        //just get the user from the req object i.e., req.user
        const user = req.user
        //send back the user details to the client 
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        // check if the user is present
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid edit fields");
        }
        const loggedInUser = req.user;
        //update the user details
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        })
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.name}, your profile has been updated successfully.`,
            data: loggedInUser,
        });


    } catch (err) {
        res.status(500).send("ERROR: " + err.message);
    }
})



module.exports = profileRouter;
