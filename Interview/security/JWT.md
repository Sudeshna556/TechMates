
# What is a JWT and what are its main components?
jwt.verify(token, secretOrPublicKey, [options, callback])
A JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between client and server as a JSON object.
A JWT has three parts, separated by dots (.) i.e. Header.Payload.Signature.
1. Header: 
    Specifies the token type (JWT) and the signing algorithm (e.g., HS256, RS256).
    Example: { "alg": "HS256", "typ": "JWT" }

2. Payload: 
    Contains the claims — statements about the user and metadata.
    Common claims: sub (subject/user ID), iat (issued at), exp (expiry), role.
    Example: { "sub": "123456", "name": "Sudeshna", "role": "admin", "exp": 1736534400 }

3. Signature: 
    Ensures integrity and authenticity.
    Created by taking the base64‑encoded header + payload, hashing them with the specified algorithm, and signing with a secret or private key.
    Example (conceptual): HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

# why do ww need bcrypt and jwt both in authentication?

🔑 Different Roles in Authentication
 bcrypt
- Purpose: Password hashing.
- Used at login time to verify that the password a user typed matches the stored hash in the database.
- Protects passwords at rest (so even if the DB leaks, raw passwords aren’t exposed).
- Scope: Credential verification.
 JWT (JSON Web Token)
- Purpose: Session/token management.
- Used after login to represent the authenticated user in subsequent requests.
- Carries claims (user ID, roles, expiry) and is signed so the server can trust it without storing session state.
- Scope: Maintaining authentication across requests.

⚙️ How They Work Together
- Login flow:
- User submits username + password.
- Server uses bcrypt to hash the submitted password and compare with stored hash.
- If valid:
- Server issues a JWT containing user info and expiry.
- JWT is sent to the client (in a header or cookie).
- Subsequent requests:
- Client attaches JWT.
- Server verifies JWT signature and expiry.
- No need to re‑check bcrypt every time — JWT proves identity until it expires.

📡 Analogy
- bcrypt is like the lock on the front door — it checks your key (password) when you first enter.
- JWT is like the visitor badge you wear inside the building — once you’re in, you don’t show your key again; the badge (token) proves you’re authorized until it expires.



3. How does JWT differ from traditional session-based authentication?

🔑 Core Difference
• 	Session-based: Server creates and stores session data in memory or database; client holds only a session ID in a cookie.
• 	JWT-based: Server issues a signed token(jwt token) containing user claims (user id, role, expiry) ; client holds the entire token, and server validates it without storing session state.

> Session-based (Stateful)
Storage: The server's memory or a database (like Redis) holds the active session information.
Security: High control; you can instantly revoke a session (e.g., "Log out of all devices") because the server owns the data.
Scalability: Harder to scale horizontally; multiple servers must share a central session store to recognize the same user.

> JWT-based (Stateless)
Storage: The server holds nothing. All necessary user data (ID, roles, expiration) is encoded directly into the token.
Security: Harder to revoke before expiration; once issued, a JWT is valid until it expires unless you implement a "blacklist" (which re-introduces state).
Scalability: Excellent for distributed systems and microservices; any server with the secret key can verify the token without checking a central database.

4. Why is the signature important in JWT? How is it generated and verified?
signature is what makes JWT trustworthy
🔑 Why the Signature is Important
- Integrity: Ensures the token hasn’t been tampered with. Without the signature, anyone could modify the payload (e.g., change "role": "user" to "role": "admin").
- Authenticity: Proves the token was issued by the legitimate server, since only the server knows the secret/private key used to sign it.
- Security: Prevents attackers from forging tokens or altering claims.

⚙️ How the Signature is Generated
- Take the base64url‑encoded header and payload.
- Concatenate them with a dot:
base64UrlEncode(header) + "." + base64UrlEncode(payload)
- Apply the signing algorithm specified in the header (e.g., HMAC SHA‑256, RSA SHA‑256).
- Use the server’s secret key (for HMAC) or private key (for RSA/ECDSA).
- The result is the signature, which becomes the third part of the JWT.
Formula (HMAC SHA‑256 example):
Signature = HMACSHA256( base64UrlEncode(header) + "." + base64UrlEncode(payload), secret )

⚙️ How the Signature is Verified
- When the client sends the JWT back, the server extracts the header and payload.
- The server recomputes the signature using its secret/private key.
- Compares the recomputed signature with the one in the token.
- If they match → token is valid.
- If not → token is rejected.
- Server also checks claims like exp (expiry) and iss (issuer).


5. What are common pitfalls when using JWTs (e.g., storing them in localStorage)?

⚠️ Common Pitfalls with JWTs
1. Storing JWTs in localStorage or sessionStorage
- Problem: JavaScript can access localStorage/sessionStorage. If your site has an XSS vulnerability, attackers can steal tokens directly.
- Better practice: Store JWTs in HttpOnly, Secure cookies so they aren’t accessible to JavaScript.

2. Long‑lived tokens
- Problem: If a JWT has a very long expiry (exp), a stolen token remains valid for a long time.
- Better practice: Use short‑lived access tokens (minutes/hours) and refresh tokens for re‑authentication.
3. No revocation mechanism
- Problem: JWTs are stateless — once issued, they can’t be revoked easily. If a token is compromised, it stays valid until expiry.
- Better practice: Maintain a blacklist or rotate signing keys to invalidate tokens early.

4. Embedding sensitive data in payload
- Problem: Payload is only base64‑encoded, not encrypted. Anyone can decode it.
- Better practice: Never put secrets (like passwords or credit card numbers) in the payload. Only include non‑sensitive claims (user ID, role, expiry).

5. Ignoring algorithm choice
- Problem: Misconfigured libraries may accept alg: none or weak algorithms. Attackers can forge tokens.
- Better practice: Always enforce strong algorithms (HS256, RS256) and reject none.

6. How would you implement token expiration and refresh logic?
 🔑 Why We Need Expiration + Refresh
- **Expiration (`exp` claim):** Access tokens should be short‑lived (minutes/hours) to limit damage if stolen.  
- **Refresh tokens:** Longer‑lived tokens (days/weeks) used only to request new access tokens. They aren’t sent with every request, reducing exposure.

## ⚙️ Implementation Flow

### 1. **Login**
- User submits credentials.  
- Server verifies with bcrypt.  
- Server issues:
  - **Access token (JWT):** short expiry (e.g., 15 minutes).  
  - **Refresh token:** longer expiry (e.g., 7 days).  

### 2. **Accessing Protected Routes**
- Client sends **access token** in `Authorization: Bearer <token>`.  
- Middleware verifies signature + expiry.  
- If valid → grant access.  
- If expired → reject with `401 Unauthorized`.

### 3. **Refreshing Tokens**
- When access token expires, client sends **refresh token** to a special endpoint (`POST /refresh`).  
- Server verifies refresh token (signature + expiry).  
- If valid → issues a new access token (and optionally a new refresh token).  
- If invalid/expired → user must re‑login.

### 4. **Revocation**
- Refresh tokens can be stored in a DB or blacklist.  
- On logout, server deletes refresh token entry.  
- This prevents reuse of stolen refresh tokens.

---

## 📡 Express.js Example (Conceptual)

```js
// Issue tokens at login
const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' });
const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
//! always store the secret keys in an .env folder

// Refresh endpoint
app.post('/refresh', (req, res) => {
  const { token } = req.body; // refresh token
  jwt.verify(token, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // invalid/expired
    const newAccessToken = jwt.sign({ userId: user.userId }, ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  });
});
```

---

## 🔒 Best Practices
- **Short access tokens:** 15–30 minutes.  
- **Longer refresh tokens:** 7–30 days.  
- **HttpOnly cookies:** Store refresh tokens securely.  
- **Blacklist/DB:** Track refresh tokens for revocation.  
- **Rotate refresh tokens:** Issue a new one each time it’s used.  
- **Validate claims:** Always check `exp`, `iss`, `aud`.

---

## ✨ Interview‑Style Summary
> “We implement token expiration by giving access tokens a short lifetime and using refresh tokens to obtain new ones. Access tokens are sent with each request, while refresh tokens are stored securely and only used at a refresh endpoint. This balances usability with security, since short‑lived tokens limit exposure and refresh tokens allow seamless re‑authentication.”


7. What’s the difference between access tokens and refresh tokens?
8. How do you prevent JWT replay attacks?





Core Structure
In its compact form, a JWT consists of three parts separated by dots (.): Header.Payload.Signature. 
Header: Contains metadata about the token, such as the token type (JWT) and the signing algorithm used (e.g., HS256 or RS256).
Payload: Contains "claims," which are statements about an entity (typically a user) and additional data like expiration time (exp) and issuer (iss).
Signature: Ensures the token's integrity. It is created by taking the encoded header, encoded payload, and a secret (or private key) and signing them with the algorithm specified in the header.

How It Works
Authentication: A user logs in with credentials (e.g., username/password). If valid, the server generates a JWT signed with a secret key or private key.
Storage: The server sends the JWT back to the client, which stores it (typically in an HttpOnly cookie or secure storage).
Authorization: For subsequent requests, the client sends the JWT in the Authorization header using the Bearer schema.
Verification: The server verifies the signature. If valid, it trusts the claims in the payload without needing to query a database for session state.

Key Benefits
Stateless: Since the token contains all necessary user information, the server does not need to store session data, making it highly scalable for distributed systems and microservices.
Compact: Its small size allows it to be easily passed via URLs, POST parameters, or HTTP headers.
Secure: Digitally signed tokens prevent unauthorized modification of the data.

Important Security Considerations
Not Encrypted: By default, JWTs are encoded, not encrypted. Anyone can decode and read the payload using tools like the JWT.io Debugger. Never store sensitive data like passwords in a standard JWT.
HTTPS: Always transmit JWTs over HTTPS to prevent interception via man-in-the-middle attacks.
Revocation: Because they are stateless, JWTs cannot be easily revoked before they expire. Developers often use short-lived access tokens combined with refresh tokens to mitigate this.