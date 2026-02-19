# Follow Request API

- Create a diff Schema for the connection request (send/receive)
- Create a diff API for the connection request (send/receive)
        - Send request API (POST : /send/request/interested/:toUserId)
        - Accept request API (POST : /accept/request/:fromUserId)
        - Reject request API (POST : /reject/request/:fromUserId)

## Schema  
const mongoose = require("mongoose");

const connectionRequestModel = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "pending", "accepted", "rejected"],
            message: "{values} is not a valid status",
        }
        default: "pending",

    }

},
    { timestamps: true }
)

const ConnectionRequestScema = new mongoose.model("connectionRequest", connectionRequestModel);
module.exports = ConnectionRequestScema;

## API
- So  first create a path to send request (fromUserId to toUserId) and include the status in the path.
- Then create a middleware to check the user is authenticated or not (i.e., userAuth)
- after checking the user is authenticated or not, the next() middleware calls the next function which is this API and extract the user details from the req object. 
- In the req object, we have the user details of fromUserId(the mongodb _id of the user who is sending the request) and from the path/params we are extracting toUserId(the mongodb _id of the user who is receiving the request).
- Now comes to status , we also need to pass the status in the route params and extract it from the req.params.
```js
RequestRouter.post("/send/request/interested/:toUserId", userAuth, async (req, res) => {
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
        // b/c toUserId → just an ID string, not a user object.

        const toUser = await User.findById(toUserId).select("name");

        // check if the user has already sent a request to the same user
        //This checks if there is already a connection request in the database between the same fromUserId and toUserId.

        const isConnectionAlreadyExists = await ConnectionRequest.findOne({
            fromUserId,
            toUserId,
        });
        <!-- ! NOTE:

        when checking for user is already exists or not , we need to check for both fromUserId and toUserId
        i.e., if user A has sent a request to user B , then user B cannot send a request to user A
        and also user A cannot send a request to user B again.
        const isConnectionAlreadyExists = await ConnectionRequest.findOne({
            fromUserId,
            toUserId,
        }); here we are only checking if the user(fromUserId) has already sent a request to the same user(toUserId).
        So,How to Check Both Directions? 
        -> You can use a `$or` query in Mongoose.
        const isConnectionAlreadyExists = await ConnectionRequest.findOne({
            $or: [
                // these are two separate objects
                { fromUserId, toUserId }, //checks one direction.
                { fromUserId: toUserId, toUserId: fromUserId } //checks reverse direction.
            ]
            !Query : but why do I need to write like this I can write  { fromUserId, toUserId },  and then  { toUserId, fromUserId }.
            !Answer : Mongoose’s findOne() only accepts one query object. If you pass one object, it will only check that exact condition.
                    To check both directions in a single query, you need to wrap them in an $or:- $or tells MongoDB: “Match if either of these conditions is true.” Without $or, you’d only be checking one condition at a time.



        });
        # Flow
        - Sender tries to send request.
        - Backend checks if a request exists in either direction.
        - If yes → reject with message.
        - If no → create new "pending" request.

        !-->
        //If such a document exists, isConnectionAlreadyExists will be that document; otherwise it will be null.
        if (isConnectionAlreadyExists) {
            return res.status(400).send({ message: "You have already sent a request to " + toUser.name })
        }
        //creatie a new connection request instance
        const connectionRequest = await ConnectionRequest.create({
            fromUserId,
            toUserId,
            status,
        })
        const data = await connectionRequest.save();
<!-- !important
# ConnectionRequest.create({...}) - This already creates new instance and saves the document in MongoDB. It returns the saved document instance.
const data = await connectionRequest.save(); // unnecessary b/c create() already saves the document , It will still work, but you’re saving twice.

?  .create() → shortcut for new + save (already persisted). and .save() → only needed if you manually construct with new or want to update later.

const connectionRequest = new ConnectionRequest({
  fromUserId,
  toUserId,
  status,
});

/you can modify fields before saving
connectionRequest.extraField = "something";

const data = await connectionRequest.save();
res.json(data);


# 
!-->

        //
    } catch (err) {
        res.status(500).send("ERROR: " + err.message)
    }
})

module.exports = RequestRouter;

```

