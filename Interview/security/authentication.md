# Authentication 
authentication when you log in or access protected resources.
1. session based authentication
2. token based authentication (most common)

🔑 The General Flow
- User submits credentials
- Typically a username/email and password in a login form.
- Sometimes additional factors (OTP, biometrics, hardware token).
- Server verifies credentials
- Passwords are not stored in plain text. Instead, the server stores a hashed version (using bcrypt, Argon2, etc.).
- When you log in, the server hashes the submitted password with the same salt and cost, then compares it to the stored hash.
- If they match → authentication succeeds.

## Token-Based Authentication (JWT, OAuth2)
Instead of storing a session ID on the server, the server issues a token (usually a signed string like a JWT). The client then attaches this token to every request. The server validates the token’s authenticity and expiry, granting or denying access.

Login:
- User submits credentials.
- Server verifies them.

Token issuance:
- Server generates a signed token (e.g., JWT).
- Token contains claims (user ID, roles, expiry).
- Signed with server’s secret/private key.
- Sent to client (often in response body or cookie).

Subsequent requests:
- Client attaches token in header:
- Server verifies token signature and expiry.
- If valid → grants access.

Lifecycle:
- Tokens usually expire quickly (minutes/hours).
- Refresh tokens can issue new access tokens.
- Server doesn’t need to store tokens (stateless).
👉 Pros: Scales well, stateless, works across APIs and microservices.
👉 Cons: Harder to revoke tokens early unless you maintain a blacklist


or, Session-Based Authentication
Login:
- User submits username + password.
- Server verifies credentials (e.g., bcrypt hash comparison).
- Session creation:
- Server generates a unique session ID (random string).
- Stores it in a session store (memory, database, Redis).
- Sends it back to the client inside a Set-Cookie header.

Subsequent requests:
each time user makes new req server checks for session ID in cookie and validates it. 

Lifecycle:
- Session expires after a timeout or logout. once timeout the session gets expired and the cookie is deleted. so in order to to make new req user has to login again. and the same process will be followed.
- Server can invalidate sessions centrally (e.g., delete from store).
👉 Pros: Easy to implement, server-controlled.
👉 Cons: Doesn’t scale well across distributed servers unless you use a shared session store.



[Login Request] → Server verifies credentials
       ↓
[Session ID or Token issued] → Sent to client
       ↓
[Client stores it] → Cookie or local storage
       ↓
[Subsequent Request] → Client sends cookie/token
       ↓
[Server validates] → Grants or denies access


🔐 Authentication
- What’s the difference between authentication and authorization?
- Can you explain the difference between stateful and stateless authentication?
- Walk me through how OAuth 2.0 works.
- How would you design a login flow using JWTs and cookies together?
- What’s the role of middleware in authentication in Express.js?
- How do you handle multi-factor authentication (MFA)?
- What’s the difference between Basic Auth, Token Auth, and OAuth?
- How would you secure APIs against brute force login attempts?
