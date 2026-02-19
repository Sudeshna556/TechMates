---
### 🧩 `req` (Request Object)
It’s the **representation of the incoming HTTP request**. Whenever a client (like a browser, mobile app, or API client) makes a request to your server, Express wraps all that information into the `req` object.

Here’s what it typically contains:

- **Request Line Info**
  - `req.method` → HTTP method (`GET`, `POST`, `PUT`, `DELETE`)
  - `req.url` → The full URL requested
  - `req.path` → The path portion (`/user/123`)

- **Route Parameters**
  - `req.params` → Values from dynamic segments in the route (`/user/:id` → `req.params.id`)

- **Query String**
  - `req.query` → Key-value pairs from the query string (`/user?email=abc@example.com` → `req.query.email`)

- **Body**
  - `req.body` → Data sent in the body (only for POST/PUT/PATCH requests, not GET)

- **Headers**
  - `req.headers` → Metadata like `Content-Type`, `Authorization`, etc.

- Original URL → req.originalUrl
The full URL path including query strings.

- IP Address → req.ip
The client’s IP making the request.

- Cookies → req.cookies
If you’re using cookie-parser middleware

---

### ⚡ Example
```js
app.post("/login", (req, res) => {
  console.log(req.method);   // "POST"
  console.log(req.url);      // "/login"
  console.log(req.body);     // { email: "abc@example.com", password: "12345" }
  console.log(req.headers);  // { host: "...", content-type: "application/json", ... }

  res.send("Login attempt received");
});
```

---

### 🎯 Mental Model
- **`req` = everything the client sends you** (input).
- **`res` = everything you send back** (output).

So when you said *“Represents the incoming HTTP request from the client (browser, API client, etc.). It contains all the information the client sent.”* — that’s spot on.  



-----------------------------------------------

[ Client (Browser / API Client) ]
          |
          | 1. Sends HTTP Request
          |    (method, URL, headers, body, query params)
          v
[ Express.js Server ]
          |
          | 2. Express matches route
          |    (e.g. app.get("/user/:id"))
          v
[ Route Handler Function ]
          |
          |--> req (Request object)
          |      - Contains all incoming data
          |      - req.params, req.query, req.body, req.headers
          |
          |--> Your business logic
          |      - Validate input
          |      - Query database
          |      - Handle errors
          |
          |--> res (Response object)
          |      - Build outgoing response
          |      - res.status(), res.json(), res.send()
          v
[ Express.js Server ]
          |
          | 3. Sends HTTP Response
          |    (status code, headers, JSON/text payload)
          v
[ Client Receives Response ]


app.get("/user/:id", async (req, res) => {
  try {
    // req → input
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      // res → output
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

- Client sends: GET /user/693f03ebc9b0c0de3225de36
- req contains: { params: { id: "693f03ebc9b0c0de3225de36" } }
- Handler queries DB
- res sends back: 200 OK with user JSON
---