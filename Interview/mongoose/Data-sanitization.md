Where
First of all, the validation of models should be put in the file where the mongoose.Schema is used to create a certain model because validation is defined in the SchemaType. You should put the validator into when you define the property, like so:

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required.'], //validator
  }
})
How
There are built-in validators and custom validators.

- Built-in validators
Mongoose has several built-in validators for different SchemaTypes.

All SchemaTypes have the built-in required validator. The required validator uses the SchemaType’s checkRequired() function to determine if the value satisfies the required validator.

Numbers have min and max validators.

Strings have enum, match, minlength, and maxlength validators.

The validator usually looks like this: validator: [expectation, message] . The expectation will be something you expect, and the message will be something you return along with the error.

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required.'], 
}
})
In this case, if you want to create an event without a name, you will get an error:

"Event validation failed: name: A name is required."
As you can see, the message in the array “A name is required” is displayed along with the error.

2. Custom validators

Great documentation is presented to talk about the validate function in SchemaType if you want more details.

Become a member
The format would be:

const Schema = mongoose.Schema({
  name: {
  type: String,
  validate: {
  validator: function(v){
     return <expectation> 
  },
  message: props => `${props.path} should be..., got   '${props.value}'`;
  }
 })
The expectation should be something you expect the data to be, and to custom the error message, you could use the props that are passed in and access its path(which is ‘name’ here) and the value , which is the value of name when the request is submitted.

Error handle
In the case above,

const eventSchema = mongoose.Schema({
   name: {
     type: String,
     required: [true, 'A name is required.'],
  }
})
If you try to create an event without a name, the error object would look like this:

{
"errors": {
  "name": {
    "properties": {
    "message": "A name is required.",
    "type": "required",
    "path": "name"
    },
    "kind": "required",
    "path": "name"
  }
 },
"_message": "Event validation failed",
"message": "Event validation failed: name: A name is required."
}
You can use whatever way you like to print out the errors. But make sure you handle it in a try...catch block, like so:

router.post('/events', async (req, res) => {
  event = new Event(req.body);
  event.ownerId = req.params.id;
  try {
    const result = await event.save();
    res.json(result);
  } catch (err) {
    res.json(err.errors.message);
  }
});
