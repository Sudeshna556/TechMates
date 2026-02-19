# auth-middleware:
Its an middleware that seats between the request and response for all the other protected APIs except signup and login apis.

auth middleware is a middleware which intercepts before it reaches the req/res cycle or they reach rout handler, validate the identity or the user via tokens,cookies and sessions. 

1. Interception
The middleware sits between the incoming request and the final route handler. In frameworks like Express.js, it uses the next() function to either pass control forward or block the request if authentication fails.

2. Validation
The middleware checks for identity markers in three primary locations:
Tokens: Extracts a JSON Web Token (JWT) from the Authorization: Bearer <token> header.
Cookies: Reads encrypted or signed cookies sent automatically by the browser.
Sessions: Matches a session ID against a server-side store (like Redis or a database). 

3. Identity Verification
Once the credential is extracted, the middleware:
Verifies the signature of the token.
Checks the expiration date.
(Optionally) Queries the database to ensure the user still exists or hasn't been banned. 

4. Request Augmentation
This is the most critical step for the developer. If valid, the middleware attaches the user data to the request object: 
javascript
// Example of request augmentation
req.user = { id: '123', email: 'user@example.com', roles: ['admin'] };
next(); // Pass to the route handler

5. Downstream Access
Because the req object is shared across the entire lifecycle of that specific request, the final route handler can now access req.user directly without needing to re-authenticate or re-query the database for basic user info. 
For further technical implementation details, you can refer to:
Passport.js Documentation for Node.js session/cookie strategies.
Auth0 JWT Introduction for understanding token-based flows.
MDN Web Docs on HTTP Cookies for secure cookie configuration. 


### signup and login apis (these are the public routes) does not need authentication (auth-middleware) but other apis need authentication. 

- Public routes = where identity is created or proven.
- Private routes = where identity is protected.

🚪 Signup & Login (Public APIs)
- No identity yet:
- At signup, the user is creating credentials for the first time. They don’t have a token or session yet, so requiring authentication would be impossible.
- At login, the user is proving their identity with username/password to obtain a token or session. Again, they can’t present authentication before they’ve logged in.
- Purpose: These endpoints are the entry points into the system. They issue the "proof of identity" (JWT, session cookie, etc.) that will be used later.

🔒 Other APIs (Protected APIs)
- Identity required:
- Once a user has signed up or logged in, they receive a token/session.
- Any request to sensitive endpoints (like /profile, /orders, /dashboard) must include this proof so the server knows who is making the request.
- Purpose: These endpoints expose personal or sensitive data. Without authentication, anyone could access or manipulate them, which would be a security risk.

👉 In short:
- Signup/Login don’t need authentication because they create or issue authentication.
- Other APIs need authentication because they consume authentication to protect resources.

## example for a protected api to get user profile
app.get("/profile",userAuth, async (req, res) => { // userAuth is the auth middleware, it sits before the req and res cycle
    try {
        const cookies = req.cookies; //first cookies should de extracted from the users req header
        const { token } = cookies; //then extract the token from the cookie
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        //validate the token
        const isValidateToken = await jwt.verify(token, "sd@123") // it returns the payload userid,iat,exp
        console.log(isValidateToken);
        // isValidateToken(the decoded payload) is accessed via userId which matches the jwt.sign payload in /login.

        const { userId } = isValidateToken;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

## user can access the protected api to get their profile, update their profile, delete their profile only when the user is authenticated (logic of userAuth middleware).
