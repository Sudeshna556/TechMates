# 🚦 Rule of Thumb
- GET → req.query or req.params
- POST/PUT → req.body

So if you want to fetch user data by email, you should not use req.body.emailId in a GET route. Instead, use either a query string (/user?emailId=...) or a route param (/user/:emailId).

# why use req.query or req.params in case of get request? 
- By design, GET requests are meant to be safe and idempotent — they’re used to retrieve data, not to send a payload.


- GET → retrieve resources, parameters in URL (query/params).
- POST/PUT/PATCH → send data in the body to create/update resources.

