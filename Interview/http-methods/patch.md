# patch method

The PATCH HTTP method is used to apply `partial modifications` to a resource/document.
syntax: PATCH <request-target>["?"<query>] HTTP/1.1 ;(e.g., /files/123?version=2).

ex:Updating a User's Email
To update just a user's email address in a REST API, you would send a PATCH request to that user's specific endpoint
PATCH /users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 31

{
  "email": "skwee357@newdomain.example"
}


* findByIdAndUpdate(id, ...) is equivalent to findOneAndUpdate({ _id: id }, ...). Both Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any).

* it takes 3 parameters id, update and options.
    - id can be a object,number and string.
    - update is an object containing the fields to update.
    - options is an object containing the options for the update.



## Use Cases

## PUT vs PATCH
In comparison with PUT, a PATCH serves as a set of instructions for modifying a resource, whereas PUT represents a complete replacement of the resource,For instance, if a resource includes an auto-incrementing counter, a PUT request will overwrite the counter (since it replaces the entire resource), but a PATCH request may not.

While both modify resources, they operate under different paradigms: PUT is a complete replacement, while PATCH is a set of instructions for modification. 

> Key Differences Summary

Feature 	PUT	                                                    PATCH
Operation	Replaces the entire resource.	               Applies partial modifications.
Payload	    Must contain all fields; missing               Contains only the fields to be changed.
            fields may be deleted or nulled.	           Not necessarily idempotent: E.g., incrementing a counter                                        twice changes the state twice.
                      
