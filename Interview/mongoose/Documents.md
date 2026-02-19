# Documents
Documents vs Models
Retrieving
Updating Using save()
Setting Nested Properties
Updating Using Queries
Validating

Mongoose documents represent a one-to-one mapping to documents as stored in MongoDB. Each document is an instance of its Model.

1. One-to-One Mapping
Direct Translation: Every Mongoose document represents exactly one document stored in a MongoDB collection.
Property Alignment: The fields you define in your Mongoose Schema (e.g., name, email) map directly to the keys stored in the BSON document in MongoDB.
Data Integrity: Mongoose acts as a translator, ensuring that when you save a JavaScript object, it is validated and cast into the correct types required by the database.

## Document vs models


Document and Model are distinct classes in Mongoose. The Model class is a subclass of the Document class. When you use the Model constructor, you create a new document.
const MyModel = mongoose.model('Test', new Schema({ name: String }));
const doc = new MyModel();

doc instanceof MyModel; // true
doc instanceof mongoose.Model; // true
doc instanceof mongoose.Document; // true

## The Relationship: Model = Class, Document = Instance
From a developer's perspective, this is the most common way to understand them: 
The Model is the Class: When you call mongoose.model('User', schema), Mongoose creates a custom JavaScript class (a "fancy constructor"). This class contains logic specifically for your "User" collection.
The Document is the Instance: When you use that class to create a specific record—for example, const user = new User({ name: 'Alice' })—you are instantiating that class. In the context of Mongoose, that instance is called a "document". 

Feature 	Model (The "Constructor")	                      Document (The "Instance")

Identity	A subclass of the internal mongoose.Model.	     An instance of your custom Model class.

Methods	   Static Methods: find(), findById(), aggregate().	 Instance Methods: save(), isModified(), populate().
Data	Does not contain actual data;                        Contains the actual data for one        
        it is just a blueprint.                              specific  database entry.
 
Creation	Created via mongoose.model().	                 Created via new MyModel() or returned by queries.