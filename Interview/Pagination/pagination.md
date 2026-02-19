# Pagination

## pagination refers to the process of retrieving a subset of data from a collection in a structured manner. This is commonly used when working with large datasets, where you don't want to fetch all the data at once but only a portion of it. Pagination in MongoDB allows you to split the data into smaller, more manageable chunks. Pagination in MongoDB improves performance and reduces memory usage.

For example, let's say you have a collection with 1000 documents and you want to retrieve 100 documents at a time.

Pagination in MongoDB is achieved using two methods: limit() and skip(). 
- The limit() method is used to specify the maximum number of documents to return in a single query. You can use the limit() method to specify that you want to retrieve 100 documents at a time.

db.collection.find().limit(n) // where n = number of documents to return

- The skip() method is used to specify the number of documents to skip before starting to return the data. You can use the skip() method to skip the first 100 documents and return the next 100 documents.

db.collection.find().skip(n) // where n = number of documents to skip

### In my project i have used pagination in the feed api. So it will return the users in chunks of 10.
The limit number and page number is passed on to the api. Like in my feed API : `/feed?page=1&limit=10` in postman.

const limit = req.query.limit || 10;
const page = req.query.page || 1;
const skip = (page - 1) * limit;

const users = await User.find().limit(limit).skip(skip);

### my feed api
```js
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        //cheeck for loggedin user
        const loggedInUser = req.user;
        //pagination
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

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
```