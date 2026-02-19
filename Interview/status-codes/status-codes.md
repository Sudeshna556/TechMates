# Status codes
1. Informational responses (100 – 199)
2. Successful responses (200 – 299)
3. Redirection messages (300 – 399)
4. Client error responses (400 – 499)
5. Server error responses (500 – 599)


### 🔍 What res.status(500) Actually Does :

```
catch(err){
        res.status(500).send({"error" : + err.message}) 
    }
    //! we don't need to pass any custom error message ({}) ? like this-> res.status(500).send({"server error}) 
```
- When you call res.status(500), Express is simply setting the HTTP status code in the response header. The meaning of 500 comes from the HTTP specification, not from Express.


- The number 500 is part of the HTTP standard, which defines:
- 500 = “Internal Server Error”
- 404 = “Not Found”
- 401 = “Unauthorized”
So when the client (browser, Postman, frontend app) receives a response with status: 500, it knows from the HTTP spec that this means “Internal Server Error” — even if your response body doesn’t say it.

🔍 What Happens Without a Custom Message

• 	This sets the HTTP status code to .
• 	The client (browser, Postman, etc.) will interpret  as “Internal Server Error” because that’s the standard meaning of the code in the HTTP specification.




