🍪 Cookies
# Cookie → storage mechanism so the browser automatically sends the token back.


- What is the difference between session cookies and persistent cookies?
- How do cookies differ from localStorage or sessionStorage?
- What are the security flags available for cookies (HttpOnly, Secure, SameSite) and why are they important?
- How would you use cookies in authentication flows?
- What are CSRF attacks, and how do cookies play a role in them?
- How do you handle cookie storage in cross-domain scenarios?


🔑 Key Distinction- 
- Header-based tokens → best for APIs, mobile apps, SPAs (React, Angular, Vue).
- Cookie-based tokens → best for browser-based sessions where you want automatic handling.

# we can also expire our cookies as we expire our tokens within 1 day/7 day or in hours.
- Expiration is controlled by two attributes:
- Expires → a fixed date/time when the cookie becomes invalid.
- Max-Age → a relative time in seconds (e.g., 3600 = 1 hour).
If neither is set, the cookie is a session cookie and disappears when the browser is closed.

res.cookie("token", {expiresIn: "1d"}, {httpOnly: true, secure: true, sameSite: "strict"})
or,

// Cookie expires in 1 hour
res.cookie('token', jwtToken, {
  httpOnly: true,       // safer, not accessible via JS
  secure: true,         // only over HTTPS
  maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
});

or,

res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
});