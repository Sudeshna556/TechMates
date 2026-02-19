What is JSON?
First off, it stands for JavaScript Object Notation. JSON syntax is derived from Javascript objects, but the JSON format is text only, meaning a JSON object is quite literally just a string.

See in this code example what JSON object looks like:


JSON Object
Many times you’ll find a JSON object written as a string with a key/value pair. See “firstName” is the key pointing to Harry.

When do we use a JSON object?
JSON is used to read data from a web server and then display that data onto a webpage. When we exchange data between a browser and a server it can only be text, hence we can use JSON for this.

JSON.parse() will convert text into a JavaScript object.
JSON.stringify() will convert a JavaScript object into a JSON object that can then be sent to a web server.