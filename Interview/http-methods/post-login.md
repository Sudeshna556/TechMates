# why use post method for login?
For logging in, you should always use the POST method.

While both methods 'POST' and 'GET' can technically send data, they have fundamental differences in how they handle sensitive information: 

1. Security & Privacy: POST sends credentials (usernames and passwords) in the request body, keeping them hidden from the URL, while GET sends credentials in the URL and will appear in browser history, server logs, proxy logs, and can be easily bookmarked or shared accidentally making them visible to everyone.

2.No Size Limits: POST has no limit on the amount of data sent, whereas GET is typically limited by the browser's maximum URL length (often ~2,000 characters).

3. Security Status:  GET is Insecure for passwords and post is Secure (with HTTPS) , good for Submitting forms, logging in, uploading files.

Important Security Note
Using POST alone does not make a login secure. You must also use HTTPS (SSL/TLS) to encrypt the data in transit. Without HTTPS, even POST data can be intercepted by anyone on the same network. 


# login api 

app.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        //1. validate the user
        validateLoginUser(req.body);

        //2. find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        //3.compare the password
        // const isPasswordValid =  await bcrypt.compare("luffy@123",$2b$10$CRiirp6kbuU3g5FNEY0jZ.6OjReyTkq6Jd89n.ITr1PJFr3l6IA3O);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return res.send({ message: "Login successful" })
        } else {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        // 4. Issue token/session

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})