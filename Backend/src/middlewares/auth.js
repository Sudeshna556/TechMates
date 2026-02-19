const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const userAuth = async (req, res, next) => {
    try {
        //1. check for the cookies from the req header
        const cookies = req.cookies;
        //2.extract the token from the cookie to check the user details
        const { token } = cookies;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        //3.validate the token and extract the payload
        const decodedToken = await jwt.verify(token, "sd@123"); // same as isvalidateToken , returns the payload
        //4. extract the userId from the payload
        const { userId } = decodedToken;

        //5. find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        //6. attach the user to the req object
        req.user = user;
        next();

    } catch (err) {
        res.status(500).json({ "error": err.message })

    }
}

module.exports = { userAuth };