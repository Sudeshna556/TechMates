Excellent question, Sudeshna — you’re zeroing in on the **difference between authentication and session management**. Let’s break it down step by step:

---

### 1. **Login with bcrypt**
- When you log in:
  - You send your **plain password**.
  - The server uses **bcrypt.compare(plainPassword, hashedPasswordFromDB)**.
  - If it matches, you’re authenticated — the server knows *“this is really Sudeshna”*.

👉 At this point, the server has verified you **once**. But how does it remember you on the *next request* without asking for your password again?

---

### 2. **Why we need a token**
- After successful login, the server issues a **JWT (JSON Web Token)**.
- This token contains encoded info (like `userId`, `role`, `email`) and is signed with a secret.
- The token acts like a **digital ID card**:
  - You don’t need to send your password again.
  - The server can quickly verify the token’s signature to confirm it hasn’t been tampered with.
  - It can also check expiry (`exp`) to enforce session timeouts.

👉 Without a token, you’d have to re‑enter your password for every request — not practical.

---

### 3. **Why we store/extract it from a cookie**
- The token needs to travel with every request. There are two common ways:
  1. **Authorization header**: `Authorization: Bearer <token>`
  2. **Cookie**: The server sets a cookie like `token=<jwt>`.

- Cookies are convenient because:
  - Browsers automatically attach them to every request to the same domain.
  - You don’t need to manually add headers in frontend code.
  - You can mark them as `HttpOnly` and `Secure` for better protection.

👉 So when you hit `/profile`, the server extracts the token from the cookie, verifies it, and decides whether you’re allowed to see that resource.

---

### 4. **Putting it together**
- **bcrypt** → one‑time check at login (password vs DB hash).
- **JWT token** → reusable proof of identity for subsequent requests.
- **Cookie** → storage mechanism so the browser automatically sends the token back.

---

### 🔑 Analogy
Think of it like entering a secure building:
- **bcrypt check** = showing your ID card to the guard at the entrance.
- **JWT token** = the guard gives you a visitor badge.
- **Cookie** = you wear the badge, and every time you enter a new room, security just glances at it instead of re‑checking your ID.
