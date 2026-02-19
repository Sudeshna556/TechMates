const validations = require("validator");

const validateSignUpUser = (req) => {
    const { name, email, password } = req;

    if (!name) {
        throw new Error("Name is required");
    }
    else if (!validations.isEmail(email)) {
        throw new Error("Invalid email!");
    }
    else if (!validations.isStrongPassword(password)) {
        throw new Error("Password is not strong enough! It must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.");
    }
}

//validation for login user
const validateLoginUser = (req) => {
    const { email, password } = req;
    if (!validations.isEmail(email)) {
        throw new Error("Invalid email!");
    }
    else if (!validations.isStrongPassword(password)) {
        throw new Error("Password is not strong enough! It must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "name",
        "email",
        "password",
        "profilePicture",
        "about",
        "age",
        "gender",
        "skills"
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
    return isEditAllowed;

}


module.exports = {
    validateSignUpUser,
    validateLoginUser,
    validateEditProfileData
};
