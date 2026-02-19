# Schema Validations
(there is also builtin schema level validations)

- Validation is defined in the SchemaType.

- Validation is middleware. Mongoose registers validation as a pre('save') hook on every schema by default.By default, Mongoose registers validation as a pre('save') hook on every schema.The save() function triggers validation automatically because Mongoose has a built-in pre('save') hook that calls validate().

//In my connectionRequest model i am creating a schema level validation to save the connection request between two users using pre('save') hook. 
//Option 1: pre('save') Middleware.
//Option 2: Field-level validate.


connectionRequestSchema.pre('save', function(){ // before save pre function will be called
    const connectionRequest = this;
    //now check if the fromUserId is equal to toUserId
    if(connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()){
        throw new Error("User cannot send a request to himself");
    }
})

<!--* Centralized: runs before every save, regardless of which field triggered it.
    * Can access multiple fields at once (fromUserId and toUserId).
    * Flexible: you can add more complex lifecycle logic (timestamps, side effects)
*-->
<!-- ? this keyword refers to the document being saved, This is kind of like a middleware that runs before the document is saved to the database or we can say it will be called everytime the connection request is saved,when we do  `const data = await connectionRequest.save();` in the followRequest.js file, the save() function triggers validation automatically because Mongoose has a built-in pre('save') hook that calls validate(). -->

- As we created schema methods for the JWT token generation, we can also create schema validations for the user model or connection request model.

- In this project, i have created schema validations for the connection request model, which is used to save the connection request between two users.

<!--?OPTION 2 Field-level validate  -->
validate: {
            validator: function (v) {
                // "this" refers to the document being saved
                return v.toString() !== this.fromUserId.toString();
            },
            message: "User cannot send a request to himself"
        }



