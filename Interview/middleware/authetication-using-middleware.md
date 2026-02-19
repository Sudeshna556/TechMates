# Authentication Using Middleware
In Express.js, authentication is commonly implemented using middleware because middleware sits in the request–response cycle and can intercept requests before they reach route handlers.

## 🔑 How Authentication Works with Middleware :

- Intercept the request
     Middleware runs before the route handler. It checks if the request contains valid credentials (like a JWT token, session cookie, or API key).
- Validate credentials
        Extract token or session info from headers, cookies, or request body.
        Verify authenticity (e.g., decode JWT, check session store, validate against database).

- Attach user info to req
        If valid, middleware can attach the authenticated user object to req.user for downstream handlers.

- Control flow
        If authentication succeeds → call next() to continue to the route handler.
        If authentication fails → send an error response (e.g., 401 Unauthorized).

```js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded; // attach user info
    next(); // pass control
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
}

app.use('/protected', authMiddleware, (req, res) => {
  res.send(`Hello ${req.user.name}, you are authenticated!`);
});
```

### 📊 Dry Run Timeline
Request: GET /dashboard with Authorization: Bearer <token>
1. Authentication middleware runs
    - Extracts token from headers.
    - If missing → responds 401 Unauthorized.
    - If present → verifies token.
2. Token validation outcome
    - Valid → attaches decoded user info to req.user, calls next().
    - Invalid → responds 400 Invalid token.
3. Route handler executes (only if valid)
    - Reads req.user.
    - Sends personalized response: "Welcome Sudeshna, this is your dashboard."




so basically , Authentication in Express is typically done using middleware. The middleware intercepts requests, checks for credentials like JWTs or sessions, and either blocks the request with an error or passes control to the route handler if valid. This makes authentication reusable and centralized across routes."

---
Request -> Auth Middleware
             ↓
   Token missing → Response 401
   Token invalid → Response 400
   Token valid   → next()
             ↓
        Route Handler
             ↓
          Response 200
---

