# Schema Methods

🛠 What Schema Methods Are
- Instance methods: Functions you define on a schema that are available on documents created from that schema.
- Static methods: Functions you define on a schema that are available on the Model itself.

I have already created a userSchema where i have defined my user model that are only applicable to each user or we can say, The schema defines the structure of a single user document (fields like username, email, password).That’s the blueprint for individual users in your database.
- But i can define my own methods on the schema that are applicable to all the users.


🔹 Static Methods
- Definition: Functions attached to the schema that are available on the Model itself.
- Use case: When you want behavior that applies to the entire collection of users.
- Example: Finding users by email, aggregating stats, etc.
// Static method: available on the User model
userSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

const User = mongoose.model('User', userSchema);

// Usage
(async () => {
  const user = await User.findByEmail('sudeshna@example.com');
  console.log(user);
})();


👉 Here, findByEmail is tied to the User model, not a single document. You call it directly on User.



🧠 Mental Model
- Instance methods = "What can this user do?"
- Static methods = "What can all users together do?"
Think of it like object-oriented programming:
- Instance methods = methods on an object.
- Static methods = methods on the class.


<!-- ! good practice  -->

# what i have done in my project, i have defined an instance method in userSchema for the JWT token generation so that i dont have to write the same code again and again inside my routes. same as what we have done in case of validation.encapsulating JWT logic as a mongoose instance method is the cleanest way to keep your authentication flow consistent and DRY, its a good practice.

# That’s a great architectural move because it keeps authentication concerns close to the user model and makes your code cleaner. I will do it using helper function or I can say mongoose instance methods

# 🔹 Why Instance Method Works Best Here
- Encapsulation: Token generation logic lives in the model, not scattered across controllers.
- Contextual: Uses this to access the current user’s _id, email, etc.
- Reusability: Any route that needs a token can just call user.generateJWT().

#### 📝 Notes on JWT Helper in Mongoose Schema
1. Goal
- Avoid repeating JWT generation logic in routes/controllers.
- Encapsulate token creation inside the user model.
- Keep authentication concerns close to the schema for cleaner architecture.

2. Approach
- Use Mongoose instance methods (attached to userSchema.methods).
- Instance methods have access to the document context via this.
- Perfect for generating a token tied to a specific user.

3. Implementation Steps
- Define schema with fields like username, email, password.
- Add instance method:
<!-- !
! In instance methods, this refers to the current document (the specific user record you’re working with). Without this, you wouldn’t know which user’s data to use when generating the JWT.
Why `this` Is an Instance Method
- Uses this → refers to the current user document.
- Payload includes user._id → unique to that user.
- Called like user.getJWT() after fetching a user from DB.
- Encapsulates per‑user token creation.

! `this` doesnot work with arrow functions.

🔹 Why Arrow Functions Don’t Work Here
- In JavaScript, arrow functions don’t have their own this binding.
- Instead, they inherit this from the surrounding lexical scope (the place where the function was defined).
- In Mongoose instance methods, you need this to point to the current document (the user record).
- If you use an arrow function, this won’t refer to the document — it will refer to whatever scope the method was defined in (often undefined in strict mode).

🔹 Example: Wrong vs Right
❌ Arrow function (wrong)
userSchema.methods.getJWT = async () => {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET);
};


- this._id will be undefined.
✅ Regular function (correct)
userSchema.methods.getJWT = async function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET);
};
- this._id correctly refers to the document’s _id.

🔹 Mental Model
- Arrow functions → great for callbacks, when you want to preserve the outer this.
- Regular functions → required when you want this to be dynamically bound to the object that calls the method (like a Mongoose document).
So:
👉 For instance methods in Mongoose, always use regular functions, not arrow functions.
!-->
```js
//instance method for JWT token generation

userSchema.methods.getJWT = async function () {

    const user = this;  // this keyword is used to access the current document
    const token = await jwt.sign({ userId: user._id }, "sd@123", { expiresIn: "1d" })
    return token;
}
```
- Export model:
```js
const User = mongoose.model('User', userSchema);
```
- Use in routes:
```js
// After verifying credentials, call:
const token = user.getJWT();
```

4. Benefits
- Encapsulation: JWT logic lives in the model, not scattered.
- Reusability: Any route can call user.getJWT().
- Consistency: All tokens follow the same structure and expiry rules.
- Clarity: Easy to read and maintain.

5. Mental Model
- Instance methods = per‑user actions (e.g., checkPassword, getJWT).
- Static methods = model‑wide actions (e.g., User.verifyJWT(token)).
- Together, they form a toolkit for authentication:
- Verify identity → checkPassword
- Issue credential → getJWT
- Validate credential → User.verifyJWT


