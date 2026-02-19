# Mongoose Validations

🔹 What is Validation?
Validation is a feature in Mongoose that ensures data integrity by validating data before saving it to the database. Basically we create a validation when we need to restrict the user for some values.


1. Common Built-in Validators
These are the most standard validations used across almost every Mongoose project:
- required: Applied to all SchemaTypes, this ensures a field is not null or undefined.
- enum: Used for Strings to restrict values to a specific list (e.g., role: { type: String, enum: ['user', 'admin'] }).
- min and max: Used for Numbers and Dates to set upper and lower boundaries.Common for user inputs like age, passwords, titles.
- minLength and maxLength: Used for Strings to control the length of inputs like passwords or usernames.
- match: Uses a Regular Expression (Regex) to validate the format of a string, commonly used for email addresses or phone numbers. 

2. The unique Option : Essential for user accounts and identifiers
While technically an index rather than a validator, unique: true is widely used to prevent duplicate entries (e.g., unique emails or usernames). It triggers a MongoDB error if a duplicate is found, though many developers use the mongoose-unique-validator plugin to turn these into standard Mongoose validation errors.
<!-- !important : A common interview twist is: “Is `unique: true` a validator?” The correct answer is no—it’s an index, not a validator.
 -->
3. Custom Validators
For complex rules that built-in validators cannot cover, developers use the validate property. 
Synchronous: A simple function that returns true or false based on custom logic.
Asynchronous: Used when the validation requires external data, such as checking if a username exists by querying another collection.

4. Schema Sanitization (Often Used Alongside Validation)
Though not strictly "validators," these schema options are often paired with validations to clean data: 
trim: Removes whitespace from the beginning and end of strings.
lowercase / uppercase: Automatically converts string casing before saving.
default: Assigns a value if the field is missing, commonly used for timestamps like createdAt