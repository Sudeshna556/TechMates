# build relation between two tables
In Mongoose, ref and populate are used to create relationships between documents in different collections. Since MongoDB is document-oriented, we don't have traditional SQL joins. ref allows us to define which model a specific ObjectId points to, and .populate() is the query method used to automatically replace those IDs with the actual document data."
ref: "User", // it is refrerence to the user collection

1. The ref Option (Schema Definition)
The ref property tells Mongoose which model to use when you want to look up a document. You store the _id of the related document in a field of type ObjectId.

"The ref property is defined inside the Schema. It acts as a pointer. For example, if I have a Post schema, I’ll set the fromUserId field type to `mongoose.Schema.Types.ObjectId` and add `ref: 'User'`. This tells Mongoose: 'The ID stored here belongs to a document in the User collection.'"

example in my project:
```js
const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // it is refrerence to the user collection, This must match the User model in db.
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // it is refrerence to the user collection, This must match the User model in db.
        required: true
    },
    status: {
        type: String,
        enum: ["interested", "accepted", "rejected"],
        default: "interested"
    }
}, { timestamps: true })
```

2. The populate() Method (Querying)

By default, when I query a Post, MongoDB only returns the raw ID for the fromUserId and toUserId. 
like this :
        {
            "_id": "69723fe5cb378ad08144275c",
            "fromUserId": "6969d2707aa1d272d2b5cf60",
            "toUserId": "6965f58ba2dbf0c6c265c331",
            "status": "interested",
            "createdAt": "2026-01-22T15:19:01.295Z",
            "updatedAt": "2026-01-22T15:19:01.295Z",
            "__v": 0
        },
To get the fromUserId and toUserId's full details—like their name or email—Id i need to chain the .populate('fromUserId', 'toUserId') method to my query.
```js
userRouter.get("/user/requests", userAuth, async (req, res) => {
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
```
So basically Internally, Mongoose performs a secondary query to the Users collection, fetches the matching document, and 'hydrates' the original result by swapping the ID with the full object. This provides a developer experience similar to a Left Join in SQL.

Key Performance :
- Not a real Join: "Unlike SQL where the join happens at the database engine level, .populate() happens in the application layer. Mongoose is effectively running multiple queries for you."

- Selective Population: "You can optimize performance by populating only specific fields (e.g., .populate('author', 'name')) so you aren’t fetching unnecessary data like passwords."

- Manual vs. Auto: "It gives us the flexibility of Normalization (saving space) while maintaining the ease of use of Denormalization (reading full objects)."

## tip
If interviewer ask for a use case, say:
"If I'm building an E-commerce app, I'd store an Order with just a ref to a Product ID. This ensures that if the product price or description changes, the Order will always reflect the most current data when I call .populate(), rather than having stale data saved inside the Order document."

