# what is routing?
-  routing is the process of matching an incoming client request's Uniform Resource Identifier (URI) and HTTP method (like GET, POST, PUT, or DELETE) to a specific function or code (known as an "action method" or "handler") within the server application. 

A route is one mapping of method + path to a handler or we can say A single endpoint definition (method + path + handler)

“A route handler is the function that processes the incoming request for a specific route. It takes the request and response objects, performs the necessary logic (like querying a database or validating input), and sends back the response. In Express, it’s the callback you pass to methods like app.get, app.post, etc.”

Quick Analogy
Imagine a restaurant:
- The route is the menu item you order (GET /pizza).
- The route handler is the chef preparing that dish — it’s the actual logic that produces the response.


```js
// Basic route definition
app.get('/users', (req, res) => {
  res.send('User list');
});
- app.get → listens for GET requests.
- '/users' → the route path.
- (req, res) => { ... } → the handler function that runs when the route is matched.
```


Think of it as the API's "traffic director". When a request arrives, the routing system examines the URL and method to determine which specific piece of logic should handle the request, process the data, and generate an appropriate response. 

How Routing Works in an API
The core function of routing involves a few key steps within the web application framework: 
Request Reception: The server receives an HTTP request containing a URL and an HTTP verb (e.g., GET /api/products/1).

Pattern Matching: The routing middleware compares the incoming URL and HTTP method against a predefined set of route templates or a routing table defined in the application's configuration.

Parameter Extraction: If a template contains placeholder variables (e.g., {id} in /api/products/{id}), the routing system extracts the actual values from the URL (e.g., the value 1).

Handler Selection: Once a match is found, the system identifies the specific controller and action method (the handler function) responsible for that request.

Execution and Response: The identified action method is executed, processes the request, interacts with data (like a database), and returns an HTTP response to the client. 


Route path + HTTP method = the “address” of the request.


note: A route is a specific URL path (like /products or /users/123) and HTTP method (GET, POST) a web app responds to; routing is the process of mapping these requests to the right code; a route handler is the function that runs when a route is hit, performing actions like fetching data and sending back a response (HTML, JSON, etc.). Think of a website's navigation: hitting a link is the route, the system figuring out which page to show is routing, and the code on that page (or API endpoint) that generates content is the handler. 

app.get("/test", (req, res) => {
    res.send("Hello World")
})
- /test → This is the route path. It tells Express: “If a request comes in with this URI, check further.”
- get → This is the HTTP method. So only GET /test requests will match this handler. A POST /test would not.
- Handler function (req, res) => { ... } → This is the action method (the code that runs when the route matches).
- res.send("Hello World") → This sends the response back to the client.



# Difference between app.get() and app.use()
• 	app.get(): Defines a route for the GET method at a specific path.
• 	app.use(): Mounts middleware functions. It applies to all HTTP methods and can be used for path prefixes.

# How do you handle route parameters?
Route parameters are dynamic values in the URL, defined with :.
app.get('/user/:id', (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});


Dry run:
- Request → /user/42 → Express extracts → req.params.id = "42" → response "User ID is 42".


# Query parameters vs route parameters
- Route parameters: Part of the URL path, defined with :. Accessed via req.params.
Example: /user/:id → /user/42 → req.params.id = "42".
- Query parameters: Key-value pairs after ? in the URL. Accessed via req.query.
Example: /search?term=books&limit=10 → req.query.term = "books", req.query.limit = "10".


Core Concepts Explained
Route: A route is a specific path or pattern in a URL combined with an HTTP method (e.g., GET, POST, PUT, DELETE) that the application "listens" for. It's essentially the "name" or address used to access a particular function within the application (e.g., /users, /products/:id).
Routing: This is the overall process or mechanism of matching an incoming client request (based on its URL and HTTP method) to the appropriate route handler (executable code). It acts as a traffic controller for the application, determining how the application should respond to a request.
Router: This is the software component, library, or system that manages the routing process. It contains the configuration (often a routing table) that maps defined routes to their respective handlers. Frameworks like Express.js use express.Router to group and manage routes modularly.
Route Handler: This is the specific function, method, or block of code that is executed when a particular route is matched. Its purpose is to process the request, perform necessary logic (like fetching data from a database or running a business action), and generate a response to send back to the client (e.g., rendering a web page or returning JSON data).
API Endpoint: An API endpoint is a specific URL that an API (Application Programming Interface) exposes for receiving requests. It is essentially a route that is designed to return data (usually in JSON or XML format) for other applications to consume, rather than a full web page for a human user. Endpoints are defined by the route and the HTTP verb used (e.g., a GET request to /api/users might be one endpoint, while a POST request to the same URL is a different endpoint with a different purpose).

How They Work Synchronously
The system works like a sophisticated postal service:
Request Initiation: A client (e.g., a web browser or mobile app) sends an HTTP request to a specific URL (the API endpoint) with a particular method (e.g., GET /api/users).
Routing Process: The request arrives at the web server. The routing process begins when the router intercepts the request.
Matching the Route: The router consults its internal routing configuration (routing table) to find a defined route that matches the incoming URL path and HTTP method.
Executing the Handler: Once a match is found, the router dispatches the request to the associated route handler function.
Processing and Response: The route handler executes its logic (e.g., retrieves the list of users from a database). It then prepares a response (e.g., a JSON array of user data) and sends it back through the server to the client. 
To identify these components in practice:
The route is what you see in the URL bar (e.g., /products/123).
The router is the library code in your application (e.g., app.use(router) in Express.js).
The route handler is the function code that runs when you visit the URL (e.g., the callback in app.get('/products/:id', (req, res) => { ... })).
The API endpoint is the full address used by other programs (e.g., https://api.example.com/products/123