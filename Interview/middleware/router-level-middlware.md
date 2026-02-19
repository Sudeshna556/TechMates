# Router-level middleware
Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router(). const router = express.Router().
Application-level middleware (app.use) runs on every single request to your server. Router-level middleware allows you to target only a specific "mini-app" or feature.

const adminRouter = express.Router();

// This runs ONLY for routes starting with /admin
adminRouter.use((req, res, next) => {
    console.log("Running high-security check...");
    if (userIsAdmin) {
        next();
    } else {
        res.status(403).send("Forbidden");
    }
});

adminRouter.get('/dashboard', (req, res) => res.send("Admin Dashboard"));
adminRouter.get('/settings', (req, res) => res.send("Admin Settings"));

// Mount the router
app.use('/admin', adminRouter);

// Public route: This NEVER triggers the verifyAdmin check
app.get('/', (req, res) => res.send("Public Homepage"));
