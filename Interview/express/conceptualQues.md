# 📝 Possible Interview Questions on Express Router

## 1. Conceptual Questions
- **What is the difference between `app` and `router` in Express?**  
- **Why would you use Express Router instead of defining all routes in `app.js`?**  
- **Can you explain how middleware works with Express Router?**  
- **What happens when you mount a router with `app.use('/api', router)`?**

---

## 2. Practical Usage
- **How do you organize routes in a large Express application?**  
- **Can you show how to split routes into separate files using Router?**  
- **How do you handle nested routers (e.g., `/users/:id/posts`)?**  
- **How do you apply authentication middleware only to certain routes in a router?**

---

## 3. Advanced Scenarios
- **What’s the difference between `router.use()` and `app.use()`?**  
- **How do you handle errors inside a router?**  
- **Can you explain how route parameters (`:id`) work with Router?**  
- **How do you pass data between middleware and route handlers in a router?**

---

## 4. Best Practices
- **How do you keep routers modular and maintainable in a large project?**  
- **What naming conventions or folder structures do you use for routers?**  
- **How do you test routes defined in a router?**

---

## 5. Trick / Clarification Questions
- **Can you use multiple routers in the same app?** (Yes, you can mount many routers.)  
- **Is Express Router a separate library?** (No, it’s built into Express.)  
- **What’s the difference between `router.get()` and `app.get()`?** (They behave similarly, but `router` is scoped to its module.)  

---

## 🧠 Interview Strategy
When asked about Express Router:
1. **Start with definition** → “It’s a mini‑Express app for grouping routes and middleware.”  
2. **Give a practical example** → “For example, I’d put all user routes in `userRoutes.js` and mount them under `/api/users`.”  
3. **Show awareness of scalability** → “This keeps the code modular and easier to maintain in large projects.”  
4. **Be ready for deeper probes** → middleware, nesting, error handling.

----------------------------------------------------------------------------------------------------------

1. What is the difference between app and router in Express?
Answer:
app is the main Express application object that represents the entire server.
router is a mini‑application that you can use to group related routes and middleware.
You mount routers onto the main app using app.use(). This keeps the code modular and organized.

2. Why would you use Express Router instead of defining all routes in app.js?
Answer:
Because putting all routes in app.js makes the file large and hard to maintain.
Routers let you split routes into separate modules (e.g., userRoutes.js, authRoutes.js) so the project is scalable, easier to read, and easier to test.

3. How does middleware work with Express Router?
Answer:
Routers can have their own middleware, just like the main app.
For example, you can attach authentication middleware to a router so that all routes inside it require login.
router.use(authMiddleware);
router.get('/profile', (req, res) => res.send('User profile'));


This way, middleware applies only to that router’s routes.

4. What happens when you mount a router with app.use('/api', router)?
Answer:
It tells Express: “For any request starting with /api, use this router.”
So if the router has a route router.get('/users'), the full path becomes /api/users.
Mounting defines the base path for all routes inside that router.

5. What’s the difference between router.get() and app.get()?
Answer:
Both define GET routes, but:
- app.get() defines routes directly on the main app.
- router.get() defines routes inside a router module, which you later mount onto the app.
Functionally they’re similar, but router.get() is scoped to its router, making modularization possible.

6. Can you use multiple routers in the same app?
Answer:
Yes. You can create multiple routers for different features (users, products, orders) and mount them separately:
app.use('/users', userRouter);
app.use('/products', productRouter);


This keeps each feature isolated and organized.

7. How do you handle errors inside a router?
Answer:
You can use Express’s error‑handling middleware inside a router.
router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});


