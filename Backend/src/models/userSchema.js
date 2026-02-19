const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email" + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 100,
        validate: {
            validator: function (value) {
                return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,100}$/.test(value);
            },
            message: "Password must contain uppercase, lowercase, number, and special character."
        }

    },
    age: {
        type: Number,
        min: 18,
        max: 60
    },
    gender: {
        type: String,
        validate(value) {
            if (!["Male", "Female", "Other"].includes(value)) {
                throw new Error("Invalid gender");
            }
        }
    },
    Skills: { type: [String] },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true }
    },
    profilePicture: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL");
            }
        }

    },
    about: {
        type: String,
        default: "Hi there! I'm a new user on TechMates."
    }

}, { timestamps: true })

//create a schema method for JWT token generation
userSchema.methods.getJWT = async function () {

    const user = this;
    const token = await jwt.sign({ userId: user._id }, "sd@123", { expiresIn: "1d" })
    return token;
}
//create a schema method for password validation
userSchema.methods.isValidatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}
// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
