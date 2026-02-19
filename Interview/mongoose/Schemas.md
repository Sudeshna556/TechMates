# Mongoose Schemas

- Schema definition
- Schema types
- Schema options

## Techmates has 2 schemas: (read normalization.md for more details)
1. User Schema : Represents a person in your system. It stores identity-related data like name, email, password hash, profile info, etc
2. Connection Schema : Represents an action or relationship between two users. It stores metadata about the request — who sent it, who received it, status (pending/accepted/rejected), timestamps, etc.

> So, you need two schemas because one models users themselves, and the other models relationships/actions between users. This separation keeps your backend clean, scalable, and easy to extend.


<!-- *NOTE:
- If you tried to store connection requests inside UserSchema, you’d end up with nested arrays like sentRequests and receivedRequests.
- This quickly becomes messy:
- Harder to query (e.g., "show me all pending requests for user X").
- Risk of duplication and inconsistency.
- By separating into ConnectionRequestSchema, you normalize the data. Each request is its own document, linked to users by their IDs. This makes queries efficient and avoids bloating the user object.

Imagine a library system:
- UserSchema = the library members (their personal info).
- ConnectionRequestSchema = the borrowing slips (who borrowed which book, when, and status).
You wouldn’t store all borrowing slips inside the member record — you’d keep them separate but linked.

*-->
## Schema definition :

Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and it defines the structure, data types, validation rules, and other properties for document within that collection. 

NOTE:
- When you interact with Mongoose models and documents, you are working with JSON-like data that the Mongoose and MongoDB drivers automatically convert to and from the efficient BSON format. MongoDB stores all documents in the BSON format.When you use Mongoose to save a JavaScript object, the driver handles the conversion to BSON before sending it to the database. When you query data, the retrieved BSON is converted back into Mongoose documents/JavaScript objects.

- Schema Types and BSON Types: Mongoose schemas define the structure and data types for your application data (e.g., String, Date, Number, ObjectId, Boolean). These Mongoose types map directly to specific BSON data types, many of which are not available in standard JSON (e.g., ObjectId, Decimal128, Date, Binary data).

## Schema types :
MongoDB is a schema-less (flexible schema) NoSQL database by default, meaning documents in a collection don't need the same fields or data types. However, when working with MongoDB through Object Data Modeling (ODM) libraries like Mongoose for Node.js, you define a Schema that uses specific Schema Types to enforce structure and validation.

The permitted Mongoose Schema Types, which correspond to underlying MongoDB BSON data types, include: 
String: Used for text data, stored in BSON string format.
Number: Used for numeric data. This can represent integers or floating-point numbers.
Date: Stores date and time data.
Buffer: Used to store binary data, such as images or files.
Boolean: Stores true or false values.




1. How do you define a basic schema in Mongoose? Provide an example.
- first we need to import mongoose library and utilizing the Schema constructor.
- define the schema fields such as data types, and any basic validation rules
- To use our schema defination (schema i defined) we need to create a model from the schema so that we work with it.

const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  fieldName: SchemaType,
  anotherField: {
    type: SchemaType,
    // Optional configuration properties (e.g., required, default)
  }
});

// You then use this schema to create a Model:
const MyModel = mongoose.model('MyModelName', mySchema);
------------
Example of an user schema:
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Simple field definition (shorthand for type: String)
  username: String,

  // Field with options specified as an object
  email: {
    type: String,
    required: true,      // Email is mandatory
    unique: true,        // Email must be unique in the collection
    lowercase: true,     // Always store email in lowercase
    trim: true           // Remove whitespace from ends
  },

  age: {
    type: Number,
    min: 18,             // Must be at least 18 years old
    max: 99              // Must be less than 100
  },

  isActive: {
    type: Boolean,
    default: true        // Default value if not provided
  },

  createdAt: {
    type: Date,
    default: Date.now    // Set default creation date to now
  }
});

// Compile the schema into a Model named 'User'
const User = mongoose.model('User', userSchema);

// Now you can use the 'User' model to create and save documents
// const newUser = new User({ username: 'jdoe', email: 'JDOE@EXAMPLE.COM', age: 25 });
// newUser.save();
-------------------------------

2. What are the different data types supported by Mongoose schemas?
Common types include String, Number, Date, Boolean, Array, ObjectId, and Mixed (for flexible data).

3. Validation and Data Integrity
How do you ensure a field is mandatory in a Mongoose schema?
By setting the required: true option in the field definition.
How can you ensure a field has a unique value across the collection?
By using the unique: true option. This often also requires creating a unique index in MongoDB.
How do you implement custom validation logic in a Mongoose schema?
You can use the validate property, which accepts a function that returns true or false, along with a custom error message.
What is the enum validator used for?
It defines a set of allowed string values for a field, ensuring data consistency.