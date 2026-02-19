const validateEditProfileData = (req) => {
const allowedEditFields = [
    "name", 
    "email", 
    "password",
    "profilePicture",
    "about",
    "gender",
    "skills"
    ];

    const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
    if(!isEditAllowed){
        throw new Error("Invalid edit fields");
    }
}

<!-- !NOTE :    
! const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
1. Object.keys(req.body)
- Extracts all the keys (field names) from the incoming request body.
- Example: if req.body = { name: "Sudeshna", age: 25 }, then Object.keys(req.body) → ["name", "age"].
2. .every(...)
- Iterates over each key and checks if the condition inside returns true.
- If all keys satisfy the condition, .every() returns true.
- If any key fails, it returns false.
3. allowedEditFields.includes(field)
- Checks whether the current field is part of the whitelist (allowedEditFields).
- Example: if allowedEditFields = ["name", "email"], then "age" would fail the check.
4. Result → isEditAllowed
- Boolean (true or false).
- true means every field in the request body is allowed.
- false means at least one field is not permitted

!-->

<!-- ?
const allowedEditFields = ["name", "email"];
req.body = { name: "Sudeshna", email: "test@example.com" };
 - Object.keys(req.body) → ["name", "email"]
 - every(...) → true (both are allowed)
 - isEditAllowed = true ✅
?-->

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        // check if the user is present


    } catch (err) {
        res.status(500).send("ERROR: " + err.message);
    }
})

<!-- ! Object.keys(req.body).forEach((field) => {loggedInUser[field] = req.body[field];}) 
This snippet updates the loggedInUser object with all the fields provided in the request body.
- If the field already exists in loggedInUser, it gets overwritten.
- If the field doesn’t exist, it gets added

Stepwise Breakdown
1. 	
• 	Extracts all the property names (keys) from the request body object.
• 	Example: if , then this gives .
2. 	
• 	Iterates over each key in that array.
• 	So it will run the inner function once for , then again for .
3. 	
• 	For each key, it assigns the value from  into the corresponding property of .
• 	Essentially, it’s copying all fields from  into the  object.

Example Dry Run
let loggedInUser = { id: 1, role: "user" };
let req.body = { name: "Sudeshna", age: 25 };

Object.keys(req.body).forEach((field) => {
    loggedInUser[field] = req.body[field];
});

After execution:
loggedInUser = { id: 1, role: "user", name: "Sudeshna", age: 25 };

! -->