# Express Router

Currently we are writing all the routes in the app.js file. It is not a good practice to write all the routes in the app.js file. suppose , you have 100 routes (production level application) then it will be very difficult to manage all the routes in the app.js file. That is why we use express router.

Express router is a mini‑application inside Express that helps organize routes and middleware, it  modularize your APIs.

Why It Exists
- Without Router, all routes live in app.js → messy and hard to maintain.
- Router allows you to split routes into separate files/modules (e.g., userRoutes.js, authRoutes.js).
- Makes code scalable, reusable, and easier to test.

“Express Router is a mini‑Express application that lets us group routes and middleware into separate modules. Instead of defining all routes in the main app file, we can use Router to organize them by feature — for example, user routes, product routes, or authentication routes. This makes the codebase modular, easier to maintain, and scalable as the application grows.”

So i will group few related APIs into categories and diff files, then i will create separate routers for all of them.

For example, i will create routers for:
- user-account  (file name: user-account.js, within this file i will have all the routes related to user-account )
    - POST /signup
    - POST /login
    - POST /logout 
Now the routers  will be passed onto the app.js using app.use() middleware.

- router.use(path, subRouter): Mounts router or middleware at a specific path prefix.


app.js
```js
const router = express.Router(); // created a router instance
router.use('/api/authnticateUser', authUserRouter);
```


```js
 app.use(path, middlewareOrRouter)
```
- This tells Express: “For any request whose URL starts with path, run this middleware or router.”
- Here, path is "/" and authRoutes is a router you created with express.Router().

Mounting the router :
- By writing `app.use("/", authRoutes)`, you’re mounting the authRoutes router at the root path (/).
- That means every route defined inside authRoutes will be accessible directly from the root of your app.


<!-- note: 
Capitalization: The method Router() must be capitalized.
Spelling: Ensure your path matches your intended endpoint (e.g., authenticateUser) 
-->


# lets understand with an example by creating a router for authnticateUser or authRouter

```js
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    res.send("login");
});

router.post("/signup", (req, res) => {
    res.send("signup");
});

module.exports = router;

```

## first lets understand the diff b/w const express = require("express"); and const router = express.Router();

const app = express();
- This creates an application instance.
- It’s the main server object that represents your entire Express app.
- You can call app.listen(...) on it to start the HTTP server.
- Think of it as the root application.

const router = express.Router();
- What it does:
- A router has methods like .get(), .post(), .use(), and .param() — the same ones you use on app. That’s why it feels like a smaller version of the application.
- express.Router() creates a mini sub-application (a modular routing system). 
- Router ≠ App instance.
A router cannot call .listen() — it doesn’t have the ability to start an HTTP server.



<!--
* Basic Doubt *
* 1. const express = require("express"); why importing express in routes module since I have imported it in app.js.we are working in a single app.
* 2. const profileRouter = express.Router(); why we are doing express.Router 

* ANSWER *
1. We are exporting the express multiple times because Node.js files are separate modules with their own scope.
- When you do const express = require("express") in app.js, that express variable only exists inside app.js.
- Codes in routes/profileRoutes.js cannot "see" the variables in app.js. Therefore, to use express (and specifically express.Router) inside profileRoutes.js, you must require it there as well.
! const app = express(); → creates an application instance (the real Express app).
! const profileRouter = express.Router(); → creates a router instance (a modular routing object).

- express.Router() does not create an Express app instance, instead it creates a router instance, which is a special object provided by Express.
- A Router is essentially a mini routing system that behaves like middleware. It can define routes and middleware, but it cannot start a server on its own.
-->

