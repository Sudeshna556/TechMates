const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://SudeshnaDas:Fd5lwmMfJ9AfX38m@cluster-1.rd00r.mongodb.net/techMates");
}

// connectDB().then(() => {
//     console.log("database connection established..")
// }).catch((err) => {
//     console.error("connection failed", err)
// }) // this part is done in app.js


//export 
module.exports = connectDB;