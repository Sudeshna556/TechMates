# http vs https

http is a stateless, foundational application-layer protocol for transferring data over the internet. It is a set of rules that define how web browsers (clients) and web servers communicate with each other to exchange information like HTML pages, images, and videos.  

This is a Layer 7 protocol that enables client browsers to communicate with web servers. It sends and receives data in plain text, making it insecure and vulnerable to sniffing. However, it is lightweight, offering better performance due to the lack of encryption. HTTP typically uses port 80.

- It is a stateless protocol, meaning that it does not maintain any information about previous requests or responses. It is a simple and lightweight protocol, making it ideal for transferring small amounts of data, such as web pages and images.

How HTTP Works: The Request-Response Cycle
HTTP operates on a simple client-server, request-response model. 
Request: When a user types a URL or clicks a link, their browser (the client) sends an HTTP request message to the web server hosting the website. The request specifies what action the client wants to perform using an HTTP method (like GET to retrieve data or POST to submit data), the target URL, HTTP version, and additional information in headers.

Processing: The server receives the request, processes it, and retrieves the requested resource.

Response: The server sends an HTTP response message back to the client. This response includes a three-digit status code (e.g., 200 OK for success, 404 Not Found for an error) and the requested data (e.g., the HTML content of a webpage) in the response body.

Rendering: The browser receives the response and renders the webpage for the user to see.

Key Characteristics
Stateless: Each request-response exchange is independent, and the server doesn't retain information about previous requests by default. "Cookies" and sessions are used to manage stateful interactions (like shopping carts or user logins).
Media Independent: HTTP can transfer any type of data (text, images, video, JSON, XML), provided both the client and server know how to handle the content as specified in the Content-Type header.
Extensible: The use of headers makes HTTP very flexible, allowing new functionality and features to be introduced over time.


https is a secure version of HTTP that encrypts the data being transferred between the client and server. It uses SSL/TLS (Secure Sockets Layer/Transport Layer Security) to ensure that the data is encrypted and secure during transmission. which protects sensitive information like passwords and credit card details. It uses port 443 by default and is the standard for modern websites.