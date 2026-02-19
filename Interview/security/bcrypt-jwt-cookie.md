methods: compare, verify, sign???
## 🌀 Correct Flow (bcrypt + JWT + Cookie)

1. **User Login Request**
   - Client sends username + password.

2. **Password Verification (bcrypt)**
   - Server retrieves the stored bcrypt hash for that user.
   - Uses `bcrypt.compare(plainPassword, storedHash)` to check validity.
   - **Important:** We don’t hash `userID + password` together. The hash is only of the password (with its salt). The userID is stored separately in the DB.

🔍 What `bcrypt.compare` Actually Does
 At registration:
- You hash the password with bcrypt.hash(plainPassword, saltRounds).
- The result (hash + salt embedded) is stored in the database.
 At login:
- You call bcrypt.compare(plainPassword, hashedPasswordFromDB).
 Internally, bcrypt:
- Reads the salt embedded in hashedPasswordFromDB.
- Re-hashes the provided plainPassword using that exact salt and cost factor.
- Compares the newly computed hash with the stored hash.


3. **JWT Issuance**
   - If password matches, server creates a JWT:
     ```js
     jwt.sign({ userId, role }, SECRET, { expiresIn: '15m' })
     ```
   - Payload contains claims like `userId`, `role`, and `exp`.

4. **Wrap JWT in Cookie**
   - Server sends JWT back in a **Set‑Cookie header**:
     ```
     Set-Cookie: token=<jwt>; HttpOnly; Secure; SameSite=Strict
     ```
   - This makes the browser automatically attach the cookie on subsequent requests.

5. **Subsequent Requests**
   - Client’s browser sends the cookie with each request.
   - Middleware verifies the JWT signature + expiry.
   - If valid → request proceeds with `req.user` populated.

---

## 🔑 Key Clarifications
- **bcrypt:** Only used to hash and verify passwords at login.  
- **JWT:** Issued after successful login, contains identity/claims.  
- **Cookie:** Transport mechanism for JWT, making it auto‑sent by the browser.  

---

## ✨ Interview‑Style Summary
> “At login, we use bcrypt to verify the password against the stored hash. Once validated, we issue a JWT containing the user’s ID and claims. That JWT is wrapped inside a secure HttpOnly cookie and sent to the client. On subsequent requests, the browser automatically sends the cookie, and the server verifies the JWT to authenticate the user.”

