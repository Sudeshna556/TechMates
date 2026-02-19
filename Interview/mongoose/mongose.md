## Mongoose Interview Questions
mongoose and dotenv

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://SudeshnaDas:Fd5lwmMfJ9AfX38m@cluster-1.rd00r.mongodb.net/techMates");
} // my database name is techMates and it is on this `mongodb+srv://SudeshnaDas:Fd5lwmMfJ9AfX38m@cluster-1.rd00r.mongodb.net` cluster. It stores the id and password of the user. and it made a connection with the database and creates a db inside that cluster.

- Selecting/Creating the Database: The final part, techMates, tells Mongoose and MongoDB which specific database within that cluster your application will use to store its collections (like your user IDs and passwords).
If a database named "techMates" already exists, Mongoose connects to it.
If it does not exist, MongoDB will create it automatically the first time you insert data into a collection within that database.


- You use the `async` keyword because the operation of connecting to a database is an asynchronous task 
Connecting to a database involves input/output (I/O) operations—namely, sending a request over a network and waiting for a response from the MongoDB server . These operations take an unpredictable amount of time to complete, primarily due to network latency, server load, and physical data transfer times .


Non-Blocking Code: If this operation were run synchronously (without async/await), your entire Node.js application would freeze and become unresponsive while it waited for the connection to establish. This is known as "blocking" the event loop. By using async, you ensure that the connection process runs in the background, allowing the rest of your program's code to continue executing.

The await Keyword: The async keyword allows you to use the await keyword inside the function. The await mongoose.connect(...) line pauses the execution of that specific function until the connection promise resolves, without blocking the rest of your application.

Error Handling & Structure: async/await provides a clean, synchronous-looking syntax for handling the eventual success or failure (using try...catch blocks) of promise-based operations like the database connection, which is fundamentally a promise.

module.exports = connectDB;
# Q : when exporting db function why not using it with parenthesis , like connectDB() ?
Beacause i am exporting the reference of the function itself, so that other part of my codebases can use it.
When you export a reference to the function definition itself, it means you are making the function's existence, logic, and structure available to other parts of your codebase.

But if we do connectDB(), then it will execute the function and return the `result` of the function call, which is not what we want to export. we want to export the function itself.

so its the diff b/w calling a function and exporting a function.

-------------------------------------------------------0---------------------------------------------------------------------

# Q : @app.js#L9-11 @db.js  why do we need to handle the db connection logic in app.js while we can handle it on db.js as well?

handling the execution in app.js is considered a better practice.

@ db.js
```js
const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://SudeshnaDas:Fd5lwmMfJ9AfX38m@cluster-1.rd00r.mongodb.net/techMates");
}

// connectDB().then(() => {
//     console.log("database connection established..")
// }).catch((err) => {
//     console.error("connection failed", err)
// }) ! this part is done in app.js

/*
Beacuse, Preventing "Race Conditions"  (The most important reason)
In db.js: If you just call connectDB() inside db.js, it runs asynchronously in the background. Your server (app.listen) might start before the database is actually connected. If a user hits an endpoint immediately, it would crash because there's no DB connection yet.

In app.js: By wrapping app.listen() inside .then(), you guarantee the server only starts listening strictly AFTER the database is ready.

db.js: Should just know HOW to connect (the configuration).
app.js: Should decide WHEN to connect (the application lifecycle).
*/

//export 
module.exports = connectDB;
```

@ app.js
```js
const connectDB = require("./config/db")
const app = express();


connectDB().then(()=>{
    console.log("database connection established..")
    app.listen(3000, ()=>{
        console.log("server is running on port 3000")
    })
}).catch((err)=>{
    console.error("connection failed", err)
    // Optionally exit the process if the DB connection is critical
    // process.exit(1); 
})
```
So basically , whats happening here is that,First i am importing db.js file and calling connectDB()function where a db is present in my cluster, when i am doing npm start it basically first connect me to the db using my id and pw , when the connection is successfully made it prints the message that passed on to the callback function and after that it creates a server connection with the port 3000.

# Q:connectDB declared as async function,and we know that async returns promise and a promise is an object that stores a value temporarily. then what connectDB is holding here?


The promise object returned by mongoose.connect() represents the eventual completion (or failure) of the asynchronous database connection request, not the connection itself as a simple stored value.

When you call mongoose.connect():
Mongoose starts the complex, time-consuming process of negotiating a connection over the network to the MongoDB server.

Immediately, JavaScript returns a Promise object to your code. This promise is initially in a pending state. This is what connectDB returns when you call it.

A Placeholder for the Future Result: It acts as a placeholder for the value you will eventually get back if the connection succeeds.
The Outcome: Once the network operation finishes, the promise transitions from pending to one of two final states:

The Promise Object: Structure and States
The JavaScript Promise object isn't just a simple value holder; it's a state machine that manages the outcome of a future event.

State		          Description			                                  What happens in your code?

pending		        The operation is ongoing; the outcome is unknown.		The moment connectDB() is called until the network request completes.

fulfilled           The operation completed successfully.		            The code inside your .then() block executes.
(Resolved)

rejected            The operation failed (an error occurred).		         The code inside your .catch() block executes.




