Both frameworks and libraries are code written by someone else that is used to help solve common problems.

For example, let’s say you have a program where you plan on working with strings. You decide to keep your code DRY (don’t repeat yourself) and write some reusable functions like these.

There isn’t anything magic about frameworks or library. Both libraries and frameworks are reusable code written by someone else. Their purpose is to help you solve common problems in easier ways.

Library: Similar to your home, a library offers fewer rules and more freedom, allowing you to use its code as you like.

Framework: Comparable to a school or university, a framework imposes more rules and a structured environment, guiding how you develop.

Who Calls Whom?

Library: You, the programmer, call the library's code when you need it.
Framework: The framework calls your code, dictating the flow and structure of your application.

Great question, Sudeshna — you’re zeroing in on the **“Inversion of Control”** principle that separates libraries from frameworks. Let’s break it down clearly and extend your MERN stack example:

---

## 📚 Library vs 🏗️ Framework — Who Calls Whom?

### **Library**
- **You call the library.**
- You’re in control of the flow; you decide *when* and *how* to use its functions.
- Example in MERN:
  - Using **Mongoose** (a library) → you call `Model.find()` or `Model.save()` when you need database operations.
  - Using **bcrypt** (a library) → you call `bcrypt.hash()` or `bcrypt.compare()` explicitly in your authentication logic.

### **Framework**
- **The framework calls your code.**
- It dictates the application’s lifecycle and structure; you “plug in” your code at specific points.
- Example in MERN:
  - **Express.js** (a framework) → you don’t call Express directly to handle requests. Instead, you define route handlers (`app.get('/users', handler)`), and Express calls *your handler function* when a request comes in.
  - The framework controls the request/response cycle, you just provide the pieces it needs.

---

## 🔑 Key Distinction: *Inversion of Control*
- **Library:** You’re the boss. You call it when needed.
- **Framework:** The framework is the boss. It calls your code at the right time.

---

## MERN Stack Examples Side by Side

| Tool        | Library or Framework | Who Calls Whom? | Example |
|-------------|----------------------|-----------------|---------|
| **Express** | Framework            | Express calls your route handler | `app.get('/users', (req,res)=>{...})` |
| **Mongoose**| Library              | You call Mongoose methods | `User.find({})` |
| **React**   | Framework (UI)       | React calls your component functions | `function MyComponent(){ return <div>Hello</div> }` |
| **bcrypt**  | Library              | You call bcrypt functions | `bcrypt.hash(password, saltRounds)` |

---

So in your MERN stack:
- **Frameworks (Express, React)** → They call your code.
- **Libraries (Mongoose, bcrypt, Lodash, etc.)** → You call their code.
