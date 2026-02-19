- What role does middleware play in routing?
- Difference between application-level and router-level middleware?
- How do you use express.Router()? Why is it useful for modularizing routes?
- How do you implement error-handling middleware in routing?


1. What are middleware functions in Express.js? 
Answer:
"Middleware in Express.js is essentially a function that sits in the middle of the request–response cycle. It has access to the req and res objects, and the next() function, which passes control to the next middleware in the stack. Middleware can perform tasks like logging, authentication, parsing request bodies, handling errors, or even modifying the request/response before sending it back.
For example, when a request comes in, you might use middleware to check if the user is authenticated. If they are, you call next() to continue to the route handler; if not, you stop the cycle and return an error response. This makes middleware a powerful way to keep code modular and reusable."

2. What is the purpose of the next() function in Express middleware?
Answer:
The next() function is a crucial part of the middleware flow. When invoked, it passes control to the next middleware function in the application's middleware stack. This allows for sequential execution of multiple functions to handle a single request and response process. 

3. What are the different types of middleware in Express.js? 
Answer:
Express.js supports several types of middleware: 
1. Application-level middleware: Application-level middleware (app.use) runs on every single request to your server.
Application-level middleware in Express.js is middleware that’s bound directly to the app instance using app.use() or app.METHOD(). These functions let you apply logic across all routes or restrict it to specific paths.
- app.use(...) without a path → runs for every request (great for logging, body parsing, etc.).
- app.use('/feed', ...) → runs only when the request URL starts with /feed.

// Application-level middleware
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Scoped to a specific path
app.use('/feed', (req, res, next) => {
  console.log('Feed middleware triggered');
  next();
});

2. Router-level middleware: 

Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router(). const router = express.Router()

Bound to an instance of express.Router(). They are specific to a particular modular router instance.
3. Built-in middleware: Functions provided by Express itself, such as express.static() (for serving static files), express.json() (for parsing JSON request bodies), and express.urlencoded() (for parsing URL-encoded bodies).
4. Error-handling middleware: Defined with four arguments (err, req, res, next) to centralize the handling of errors that occur during the request-response cycle.
5. Third-party middleware: Middleware from the npm ecosystem (e.g., cors for Cross-Origin Resource Sharing, helmet for security headers, or multer for file uploads). 

4. How do you handle errors using middleware in Express.js?
Answer:
Error handling in Express is typically done using a dedicated error-handling middleware function, defined with the signature (err, req, res, next). This function is placed at the very end of the middleware stack and route definitions. When an error occurs in any preceding route handler or middleware, it can be passed to this special middleware by calling next(err). 
Example:
javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
Use code with caution.

 
5. Write a simple middleware function that logs the request method and URL. 
Answer:
A logging middleware function can access the request object to get the method and URL and then use next() to pass control to the next handler. 

6. What is the difference between application-level and router-level middleware?
Answer:
Application-level middleware is bound directly to the main app instance using app.use(), and generally applies to all incoming requests that match the path specified. Router-level middleware, on the other hand, is bound to an instance of express.Router() and applies only to the routes handled by that specific router, which helps in organizing code for large applications. 

7. How do you parse JSON request bodies in Express?
Answer:
You use the built-in express.json() middleware function to parse incoming requests with JSON payloads. This middleware makes the parsed data available in the req.body object.

const express = require('express');
const app = express();

// Use the built-in JSON parser middleware
app.use(express.json());

app.post('/profile', (req, res) => {
  console.log(req.body); // Contains the parsed JSON object
  res.send('Profile data received');
});
