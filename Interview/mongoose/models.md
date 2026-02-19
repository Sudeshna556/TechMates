# models

## topics :
Compiling your first model
Constructing Documents
Querying
Deleting
Updating
Change Streams
Views

### Definition: 
A Model is a "constructor" compiled from a Mongoose Schema. It serves as a class that represents a specific collection in the MongoDB database. An instance of a Model is called a Document. Each document corresponds to a single record stored within a MongoDB collection.

The .model() function makes a copy of schema. 

Models are responsible for all high-level database interactions, including creating, reading, updating, and deleting (CRUD) documents.

Methods: They provide static methods for collection-level operations, such as save(), find(), create(), updateOne(), and deleteOne().

Creation: A model is typically created using the mongoose.model() function, which takes a name and a schema as arguments. 

When you create a new instance of a model (e.g., new MyModel({ ... })), you are creating a document in memory. It is not persisted to the database until you call its save() method or use model-level creation methods like create()

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Step 1: Define the blueprint (Schema)
const blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  date:   { type: Date, default: Date.now }
});

// Step 2: Compile the Schema into a Model
// 'Blog' is the singular name of the collection. 
// Mongoose will automatically look for the plural 'blogs' collection.
const Blog = mongoose.model('Blog', blogSchema);

```
Use the Model to Create a Document
An instance of this model is a Document. You can create it and save it to the database. 

Constructing documents using the model:

```javascript
// Creating a new instance (a Document)
const newPost = new Blog({
  title: 'Understanding Mongoose',
  author: 'John Doe',
  body: 'Models are fancy constructors...'
});

// Saving the document to the MongoDB database
await newPost.save();
```


### Querying

Documents can be retrieved using a model's find, findById, findOne, or where static functions.

> Deleting
Models have static deleteOne() and deleteMany() functions for removing all documents matching the given filter.
> Updating
Models have static updateOne() and updateMany() functions for updating all documents matching the given filter.
>

await name.deleteOne({ name: 'sd' });
await Tank.updateOne({ name: 'sd' }, { name: "sid" });

---------------------------------------------------------
Model.find({}) // finds all documents
Model.findById() // finds document by id ex: 
 ```js
 const userId = req.body.id; // req.params.id
  if (!userId){
        return res.status(400).send({ error: "User Id is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

 ```
Model.findOne() // finds document by filter such as mail,name etc..

Model.findByIdAndDelete() // finds document by id and delete

Model.findByIdAndUpdate() // finds document by id and update

Model.findOneAndDelete() // finds document by filter and delete
----------------------------------------------------

# DELETE method

Model.findByIdAndDelete()
Model.findOneAndDelete()
Model.deleteOne()

# update 


