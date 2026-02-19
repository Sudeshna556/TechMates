# CORS (Cross-Origin Resource Sharing)
Browsers have same origin policy which means a web page can only make requests to the same origin as the web page. CORS is a security mechanism enforced by browsers to controls how web pages can make requests/interact with diff diff resources hosted on different domains.
The Same-Origin Policy (SOP) is a fundamental security mechanism in web browsers that prevents a script on one page from accessing sensitive data on another page. 
What Defines an "Origin"?
An origin is defined by the "tuple" of three specific components: 
Protocol (Scheme): e.g., http vs. https.
Hostname (Domain): e.g., example.com vs. api.example.com.
Port: e.g., :80 vs. :8080 (though legacy browsers like Internet Explorer often ignored this). 
If any of these three elements differ, the browser treats the request as cross-origin and restricts access.

suppose, origin of a page as: https://www.example.com:443/home/index.html

In this case, the "tuple" consists of:
Protocol: https
Hostname: www.example.com
Port: 443 (the default for HTTPS)

Requested URL 	                            Origin Result	        Reason for Difference
https://www.example.com/about.html	        Same-Origin	            Matches protocol, hostname, and port (implicit 443).
http://www.example.com/home/index.html	    Cross-Origin	        Protocol differs (http vs https).
https://example.com/home/index.html	        Cross-Origin	        Hostname differs (example.com vs www.example.com).
https://api.example.com/data	             Cross-Origin	        Hostname differs (subdomains are distinct origins).
https://www.example.com:8080/home	         Cross-Origin	        Port differs (8080 vs 443).


Key Enforcement Rules
The SOP primarily controls three types of interactions: 
Cross-origin reads: Usually blocked. A script can send a request to another origin but cannot read the response.
Cross-origin writes: Usually allowed. This includes creating links, redirects, and submitting forms.
Cross-origin embedding: Usually allowed. This lets you use tags like <img>, <video>, and <script> to load resources from other sites. 