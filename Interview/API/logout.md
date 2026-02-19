# logout API thought process

## description
- logout the user

## request
- method: POST
- endpoint: /api/logout
- headers: 
    - Authorization: Bearer <token>

## response
- status: 200
- body: 
    - message: "User logged out successfully"

## code
### 1. Clearing the Cookie to logout the user
- res.cookie("token", null, { expires: new Date(Date.now()) }):
- Sets the cookie named "token" to null.
- Immediately expires it by setting its expiry time to the current timestamp.
- This effectively removes the cookie from the client’s browser on the next response.

### 2. Sending the response
- After clearing the cookie, the server responds with: { "message": "Logout successful" }
- This confirms to the client that the logout action was processed.

```js
authRouter.post("/logout", async (req, res) => {
    try {
        //to logout the user we need to clear the cookie
        // or we can set the token to null and expiry the cookie time to 0 
        res.cookie("token", null, {
            expires: new Date(Date.now())
        })
        return res.send({ message: "Logout successful" })

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})
```