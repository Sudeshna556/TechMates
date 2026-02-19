Basic REST API interview questions
1. How do you define REST?
REST is an architectural style used to design scalable and reliable web services or build distributed applications. Unlike protocols such as SOAP (Simple Object Access Protocol), it isn’t tied to a specific technology. Instead, it relies on standard HTTP methods like GET, POST, PUT, PATCH, and DELETE to interact with server resources.

RESTful systems are built on the client-server architecture, where the client sends an HTTP request and the server responds with an HTTP response containing the requested resource or details of the operation performed.

In RESTful APIs, every resource requested is uniquely identified using a Uniform Resource Identifier (URI). A request usually consists of a request line, request headers, and an optional request body, while the server sends back a response body along with response headers and an appropriate HTTP status code.

2. What do the letters in REST stand for?
REST stands for:

R (Representational): Refers to different formats like JSON or XML that represent a resource.
S (State): Shows the resource’s data at a given time.
T (Transfer): The actual exchange of these resource representations between client and server over HTTP methods (GET, POST, PUT, DELETE, etc.).

Each letter in the term describes how data is represented, managed, and transferred between client and server.

3. What are REST APIs and why use them?
REST APIs are web services that follow REST principles, exposing resources via URI (Uniform Resource Identifier) and allowing clients (like browsers, mobile apps, or other servers) to interact with backend services using HTTP.

Most developers prefer it because they are simple, scalable, stateless, and language-agnostic. REST APIs enable seamless communication between different systems, whether mobile, web, or microservices, without requiring custom protocols.

4. What is the difference between HTTP and REST?
HTTP is a protocol that governs the transmission of data between clients and servers on the web. It defines request methods like GET, POST, PUT, and DELETE, along with headers, response codes, and message structures.

REST, on the other hand, is an architectural style for designing APIs that leverages HTTP to structure APIs around resources and operations. It applies principles such as statelessness, resource identification via URIs, and uniform use of HTTP request methods to represent operations on resources.

For example, HTTP tells you that GET /users is a valid request method and URI, but REST defines how to use that request to represent the retrieval of a “users” resource.

5. What does “resource” mean in REST API?
According to the REST architectural pattern (Representational State Transfer), resources are the central building blocks of REST services. Examples of resources include users, products, or orders.

Each requested resource is uniquely identified by a Uniform Resource Identifier (URI), such as /users/123. This URI allows the REST client to send an HTTP request to the REST server and receive an HTTP response with the response body that contains the data in a format like JSON (JavaScript Object Notation) or XML.

Resources are manipulated using standard HTTP methods. For example, GET retrieves them, POST creates new ones, PUT updates them, and DELETE removes them. Along with the request body and request headers, the server includes response headers and appropriate HTTP status codes (200 OK, 201 Created, 404 Not Found) to indicate success or failure.

6. What is an HTTP request, and what are its key parts?
An HTTP request is how a client communicates with a server in REST. It typically has three parts: a request line, headers, and an optional body. Together, these parts tell the server what resource is being requested and how to process it.

Request line: This includes the HTTP method (like GET, POST, PUT, DELETE), the URI (which identifies the resource, such as /users/123), and the HTTP version.

Headers: These are additional details that help the server understand the HTTP request, such as the format of the data (Content-Type: application/json), authentication info (Authorization: Bearer <token>), or caching rules.

Body: This is optional and only present in some HTTP requests (like POST or PUT). It carries the actual data the client wants to send, usually in JSON format, for example, { "name": "Alice" }.

In simple terms, the HTTP request tells the server what resource you want, what you want to do with it, and any extra information needed to process it properly.

7. What does an HTTP response consist of?
An HTTP response is the server's response sent back to the client after it makes an HTTP request. In RESTful web services, there are usually three main parts:

First is the status line, which includes the HTTP protocol version and a status code (e.g., 200 OK, 404 Not Found, or 500 Internal Server Error). These codes are essential for error handling, since they help the client understand whether the request was successful, whether the user is unauthorized, or if there were server errors.

The second part is the response headers, which contain metadata about the response. These headers can define things like cache control, the content type (JSON or XML), or security measures such as authentication requirements. For example, APIs may use API keys in headers to ensure only authorized users can access certain resources, or they may enforce role-based access control.

The final part is the response body, which holds the actual dynamic data being returned, commonly in JSON format. For instance, when retrieving user information, the body might return { "id": 1, "name": "Alice" }.

8. What is a URI in REST?
URI stands for Uniform Resource Identifier; it uniquely identifies a resource in a REST API. It tells the client where the resource is located and how to access it. For example, /api/orders/45 might point to order #45.

# 9. What is the difference between query parameters and path parameters?
Path parameters identify specific resources in an API endpoint, while query parameters modify or filter the response data without changing the resource being accessed. Path parameters are part of the URL structure itself, whereas query parameters appear after a ? and are optional.
📌 Path Parameters
- Definition: Variables embedded directly in the URL path.
- Purpose: Used to uniquely identify a resource.
- Format: /users/{id} → /users/123
- Characteristics:
- Mandatory for the endpoint to resolve.
- Define hierarchy and resource identity.
- Typically used for IDs, slugs, or names.
Example:
https://api.example.com/users/123
This retrieves the user with ID 123.

📌 Query Parameters
- Definition: Key-value pairs appended to the URL after a ?.
- Purpose: Used to filter, sort, or modify the response.
- Format: /users?sort=asc&limit=10
- Characteristics:
- Optional and flexible.
- Do not change the resource being accessed, only the representation.
- Often used for pagination, sorting, filtering, or search.
Example:
https://api.example.com/users?sort=asc&limit=10
This retrieves users sorted ascending, limited to 10 results.

In short, path parameters identify “what” to fetch, while query parameters define “how” to fetch it.

# 10. What are the standard or core HTTP methods in REST?
The core HTTP methods in REST are:

GET: Fetch data

POST: Create new resources

PUT: Update or replace existing resources

PATCH: Make partial updates

DELETE: Remove resources

These methods map directly to CRUD operations, making REST APIs easy to design and consume consistently across different systems.

11. What is statelessness in a REST API?
Statelessness means each client request must contain all necessary information for the server to process it, and the server does not store client session state. This makes REST APIs scalable, as servers don’t need to remember client context between requests.

<!--! Doubt: http is stateless because the server doesnot remember any prev req info or the http protocol does not remember any prev req info?  
- HTTP itself is stateless: The protocol does not keep track of previous requests or responses. Each request is independent, and the protocol doesn’t carry memory of what happened before.
- Servers can be stateful or stateless in their design: By default, when using plain HTTP, the server does not automatically remember anything about a client’s past requests. If you want persistence (like sessions, authentication, shopping carts), you need to add mechanisms such as cookies, tokens, or server-side session storage
!-->


# 12. What is the concept of idempotency?
Idempotency refers to an operation that produces the same result no matter how many times it is repeated. This is an important REST API concept because it ensures reliability, consistency, and safety in distributed systems where network issues may cause clients to retry requests.
🔑 Core Idea
- Idempotency means that making the same request multiple times has the same effect as making it once
✅ Idempotent Methods
- GET: Safe and idempotent. Multiple GETs don’t change server state; they just retrieve data.
- PUT: Idempotent because it replaces the resource with the same representation each time. Calling PUT /users/123 with identical data doesn’t change the outcome after the first call.
- DELETE: Idempotent because once a resource is deleted, further DELETEs have no additional effect (though the response may differ, e.g., 200 vs 404)

❌ Non-Idempotent Method
- POST: Not idempotent because each call usually creates a new resource (e.g., multiple orders, multiple records). Repeated POSTs change server state differently each time.

⚠️ Subtle Points
- Responses may differ even for idempotent methods. For example:
- First DELETE /users/123 → returns 200 (deleted).
- Second DELETE /users/123 → returns 404 (not found).
The effect is the same (user gone), but the response differs.
- PATCH is tricky: it’s not guaranteed idempotent because applying the same patch multiple times may change state incrementally.

📌 Why It Matters
- Retries in distributed systems: If a client retries due to a timeout or network glitch, idempotency ensures the server state doesn’t get corrupted.

In REST, GET, PUT, and DELETE are idempotent HTTP methods. Even if a developer calls them multiple times, it has no additional effect. The POST method is not idempotent because it creates new resources each time.

#   13. What is cross-origin resource sharing (CORS)?
CORS is a browser security mechanism that controls how resources in REST services are shared across different origins. By default, browsers block requests from one domain to another. Servers use response headers like Access-Control-Allow-Origin to specify which domains are allowed. CORS is essential when web clients consume APIs hosted on different domains.

# 14. What is the purpose of the HTTP status code?
HTTP status codes communicate the outcome of a request. They indicate whether the request was successful, failed due to client error, or failed due to server error.

For example, 200 OK means success; if you receive 404 Not Found, it indicates a missing resource. If any user receives 500 Internal Server Error, it signals a server issue. They standardize communication between client and server.

# 15. Which HTTP status codes indicate success vs. errors?
Success codes fall under the 2xx range, such as 200 OK, 201 Created, and 204 No Content. Client errors fall under the 4xx range, like 400 Bad Request or 401 Unauthorized. Server errors are in the 5xx range, such as 500 Internal Server Error or 503 Service Unavailable. These categories help quickly classify responses.

# 16. Which HTTP status code fits a successful patch?
For a successful PATCH request, the server usually returns 200 OK if the updated resource is included in the response, or 204 No Content if no body is returned. Both codes indicate success, but 200 OK is preferred when the client needs confirmation of the changes. It is important to check that the appropriate HTTP status code is implemented.

# 17. When should you use put vs. post?
The choice between PUT and POST in RESTful APIs depends on how you want to handle the request data and the resource being targeted. The PUT is idempotent, which means that sending the same request multiple times will always result in the same state of the resource.

For example, a PUT /users/123 with updated user details will replace or update that specific user. Even if the same request is sent again, the server processes it without creating duplicates.

On the other hand, POST is not idempotent. It is used to create new resources, often at a collection endpoint like POST /users. Every call creates a new entry, even if the request body contains the same request data. That’s why POST methods are best for operations where you expect a new identifier (like id) to be generated.

When working with secure REST APIs, you should also consider security measures. Both PUT and POST requests may carry sensitive data, so using custom request headers (for example, tokens, API keys, or encryption details) helps enforce stronger authentication and authorization.

Organizations can even implement their own security measures, like validating user roles, before allowing POST or PUT operations.

# 18. How does HTTP basic authentication work?
In HTTP basic authentication, the client sends credentials in the Authorization header as a Base64-encoded string in the format username:password. The server decodes and validates them. Since credentials are easily decodable, Basic Auth should always be used over HTTPS to ensure they are transmitted securely.

19. What is the purpose of TLS for APIs?
TLS (Transport Layer Security) ensures secure communication between client and server by encrypting the data exchanged. This prevents eavesdropping and tampering. For REST APIs, TLS is critical because sensitive data like authentication tokens or user details often travels over the network. Hence, it is best to always prefer HTTPS over plain HTTP.



### Intermediate REST API interview questions


# 20. What are the constraints of REST architecture?
There are six specific architectural constraints of REST architecture:

Client-server separation

The client (frontend) and server (backend) are independent, which allows them to evolve separately. UI changes won't break the API, and backend improvements can happen without affecting the client. For example, you can update your mobile app UI without touching the API.

Statelessness

Each API call must stand on its own. The server doesn’t retain any information between requests. Instead, every request carries everything the server needs: authentication, data context, etc. This simplifies scaling and reduces server complexity because there’s no session state to manage.

Cacheable

REST responses must explicitly state if they can be cached (and for how long). Caching improves performance and reduces server load by allowing clients or intermediaries to reuse recent data rather than requesting it repeatedly.

Uniform interface

REST uses a consistent set of standards, like URIs to identify resources, HTTP request methods (GET, POST, PUT, DELETE) to manipulate them, and clear media types (JSON, XML). This consistency makes APIs predictable and easier to use.

Layered system

API architecture can include layers like proxies, gateways, or load balancers, without the client knowing. This helps with scalability, security, and manageability while keeping the client-server interaction the same.

Code on demand (optional)

Sometimes the server may send executable code (like JavaScript) for the client to run. This is optional and allows for flexible client behavior, but it isn’t common in traditional REST APIs.

# 21. How do you handle versioning in RESTful APIs? (due)
API versioning is necessary because APIs evolve over time. Without versioning, existing clients may break when changes are introduced, i.e., new fields are added or old endpoints are replaced. The common strategies are:

URI versioning: Include the version in the path, e.g., /api/v1/users. This is simple and widely used.

Header versioning: Specify the version in request headers, e.g., Accept: application/vnd.myapp.v2+json. This keeps the URI clean but requires more client configuration.

Query parameters: Append version to query string, e.g., /users?version=2. This is less common but sometimes used for quick testing.

22. How do you maintain backward compatibility in REST APIs?
Backward compatibility means old clients should continue working even when the API evolves. You can use the following strategies to maintain backward compatibility in REST APIs:

Keep old versions alive while introducing new ones (e.g., /v1/ and /v2/).

Instead of removing fields, add new optional fields so old clients don’t break.

Clearly mark old endpoints as deprecated and give clients time to migrate before shutting them down.

When adding new required fields, provide defaults so older clients don’t fail.

For example, if your /users API adds a new phoneNumber field, don’t remove existing email or name fields. Just add the new field in the response so older clients can ignore it.

# 23. What is HATEOAS?(due)
HATEOAS stands for Hypermedia as the Engine of Application State and is part of the uniform interface constraint in REST architecture. It is one of the key, yet often overlooked, constraints of the REST architecture. In simple terms, it means that a REST server should provide not only the requested resource but also hyperlinks (or hypermedia controls) in the HTTP response that guide the client about possible next actions.

For example, if a client requests details of a user with GET /users/123, the response body might not only include the user data in JSON format but also links such as "update": "/users/123", "delete": "/users/123", "orders": "/users/123/orders". This way, the REST client can dynamically discover what it can do next without hardcoding URIs.

The real benefit of HATEOAS is decoupling. Existing clients don’t need to know all endpoints beforehand; they can follow links provided by the server. This supports backward compatibility when new features are added, helps improve error handling by pointing to recovery actions, and aligns with the client-server architecture principle of RESTful web services.

24. Which HTTP methods are safe vs. idempotent?
In REST, safe methods don’t modify server state. These include GET, HEAD, and OPTIONS. For example, GET /users only retrieves data; it does not change anything. Because it always returns the same result without side effects, GET is also idempotent.

Idempotent methods produce the same result no matter how many times you call them. PUT and DELETE are idempotent because repeating them doesn’t create additional changes.

For instance, DELETE /users/5 deletes the user once, and calling it again has no further effect. POST is neither safe nor idempotent; it always creates a new resource. Distinguishing safe vs. idempotent helps interviewers see if you understand reliability in REST design.

25. How do you choose appropriate HTTP status codes?
Developers must follow the simple guidelines when choosing a status code.

2xx success codes: Use 200 OK for successful GET, 201 Created when a resource is added, and 204 No Content when an update or delete succeeds without returning data.

4xx client errors: Use 400 Bad Request for invalid input, 401 Unauthorized for missing authentication, 403 Forbidden for insufficient permissions, and 404 Not Found for missing resources.

5xx server errors: Use 500 Internal Server Error for generic failures or 503 Service Unavailable when a service is down.

For example, if a client sends an invalid email in a signup API, return 400 Bad Request, not 500, since it’s the client’s fault.

26. How does the cache-control header work with ETags?
Caching is important for performance. The Cache-Control header tells clients how long they can reuse a response. For example, Cache-Control: max-age=3600 means the response is valid for one hour.

ETags (Entity Tags), on the other hand, are unique identifiers for resource versions. Clients can send If-None-Match with the last ETag to check if the resource has changed. If it hasn’t, the server replies with 304 Not Modified, saving bandwidth.

Together, Cache-Control headers and ETags reduce server load and speed up responses, which is an important optimization for high-traffic APIs.

27. How does pagination work in REST APIs?
Pagination helps handle large datasets by splitting results into smaller chunks. Instead of returning thousands of records at once, APIs return a subset and let clients request more.

Common methods include:

Page & limit: /users?page=2&limit=20 → returns 20 users on page 2

Offset & limit: /users?offset=40&limit=20 → skips 40 users, then returns the next 20

Cursor-based: returns a “next” cursor token with each response, used to fetch subsequent results

28. How do you handle multiple identical requests safely?
Duplicate requests are common, especially in unreliable networks where clients retry operations. To prevent duplicate resource creation, APIs use idempotency keys.

For example, when creating a payment, the client includes a unique key like Idempotency-Key: abc123. If the same request is sent again with the same key, the server returns the same result instead of creating another payment.

29. What is content negotiation, and how does it work?
Content negotiation allows a client to tell the server what data format it prefers. This is usually done using the Accept header.

For example:

javascript

Accept: application/json: server responds in JSON. 
Accept: application/xml: server responds in XML. 
The server decides which representation to return based on the request. If it can’t provide the requested format, it may return 406 Not Acceptable.

30. How does REST compare to GraphQL and gRPC?
REST is resource-based, widely adopted, and simple to use with HTTP. However, it may lead to over-fetching or under-fetching data.

GraphQL gives clients the flexibility to request only the fields they need in a single query. This reduces round-trip time but requires more setup.

gRPC is a high-performance, binary protocol based on HTTP/2. It supports streaming and is great for microservices, but less human-readable than REST.

31. What is the difference between REST and SOAP protocols?
REST is lightweight, flexible, and usually uses JSON over HTTP. It’s easy to use and widely adopted in modern web applications.

SOAP (Simple Object Access Protocol) is more rigid, relies on XML, and requires a WSDL (Web Services Description Language). It has built-in error handling and security, but is heavy compared to REST.

32. How do you enforce TLS for REST APIs?
TLS ensures all data is encrypted between the client and the server. To enforce it:

Configure the API server to accept only HTTPS.

Redirect all HTTP traffic to HTTPS.

Reject requests that attempt plain HTTP.

In addition, use strong TLS versions (e.g., TLS 1.2 or higher), rotate certificates regularly, and consider enforcing HSTS (HTTP Strict Transport Security) headers to prevent downgrade attacks. It’s also important to obtain certificates from trusted certificate authorities (CAs) and to turn off weak ciphers or outdated protocols (like SSLv3 or TLS 1.0) to maintain security. This is essential for protecting sensitive data like login credentials or payments.

33. What are the key aspects to consider when implementing RESTful web services?
When building REST APIs, make them simple and reliable. Use clear and consistent paths (URIs) for your resources and match each HTTP method to the correct action, i.e, (GET to read, POST to add). Keep the API stateless so each request is standalone.

Key practices to follow are:

Security: Implement login or token checks to protect resources.

Performance: Use caching to speed up responses.

Handling large data: Apply pagination to avoid sending too much data at once.

Server stability: Set limits or monitoring to prevent overload.

34. What core REST API concepts should everyone know?
Everyone working with REST should know how resources are identified with URIs and how to use the main HTTP methods (GET, POST, PUT, DELETE, PATCH) on them. It is also important to understand the status codes and idempotency, statelessness and authentication. Other key ideas include caching to improve speed, pagination for large data sets, and common security measures like using HTTPS (TLS) and handling cross-origin requests (CORS).

35. How do you implement webhooks in RESTful web services?
Webhooks enable servers to notify clients of events, eliminating the need for clients to constantly poll. To implement, the client registers a callback URL with the API provider.

When an event occurs (e.g., a payment succeeds), the server makes an HTTP POST request to that callback. The client processes the event and sends back a response (like 200 OK).

For example, Stripe uses webhooks to notify your system about payment events.

36. What are the differences between JSON and XML in RESTful web services?
In RESTful web services, the two most common data formats for request and response bodies are JSON (JavaScript Object Notation) and XML (eXtensible Markup Language). Both serve the same purpose, i.e., structuring data, but they differ in style and use cases.

JSON is lightweight, less verbose, and very close to how data structures are represented in most programming languages, especially JavaScript. It uses key-value pairs, arrays, and objects, which makes it faster to parse and easier for developers to work with. Because of its simplicity and efficiency, JSON has become the default choice for most modern REST APIs. For example, { "id": 1, "name": "Alice" }.

XML, on the other hand, is more verbose and uses opening/closing tags, which increases payload size. However, XML is more powerful in certain scenarios; it supports attributes, namespaces, and strict schemas (XSD), making it useful where data validation and complex hierarchical structures are important. For example:

xml

<user id="1"> 
<name>Alice</name> 
</user>
JSON is preferred mostly for performance and readability, but XML is still valuable in enterprise systems or when schema validation and document-like structures are required.

37. What is the difference between Swagger and OpenAPI?
The terms Swagger and OpenAPI are closely related. The key point is that OpenAPI is the specification, while Swagger is a set of tools that help you use that specification.

OpenAPI is a standard way to describe REST APIs. It defines how you can document details such as available endpoints, request methods, query parameters, authentication types, and expected responses. For example, an OpenAPI document (usually written in YAML or JSON) acts like a blueprint of the API that both humans and machines can understand. This makes it easier to generate documentation, client SDKs, and tests automatically.

Swagger, on the other hand, started as both a specification and a toolset. Later, the specification part was donated to the Linux Foundation and renamed OpenAPI Specification (OAS). Since then, “Swagger” refers mainly to the tools that support OpenAPI. These include:

Swagger Editor to design APIs.

Swagger UI to visualize and interact with API docs in the browser.

Swagger Codegen to generate server stubs or client SDKs.

In short, OpenAPI is the specification (the rules and format), and Swagger is the toolset that implements and works with that specification.

