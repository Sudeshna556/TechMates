# URI vs URL

- URL (Uniform Resource Locator): It's the complete address of a resource on the internet. It includes the protocol (e.g., http or https), 
the domain name, and the path to the resource.

URLs consist of several components, each serving a distinct purpose:

Scheme: This part, often known as the protocol (e.g., http, https), specifies how the resource should be accessed.
 
Host: This section identifies the server hosting the resource, usually given as a domain name (e.g., www.example.com).
 
Port: An optional component that specifies the port number on the host, used to access the resource (e.g., :80 for HTTP).
 
Path: It indicates the specific location of the resource within the host (e.g., /folder/page.html).
 
Query String: An optional part, starting with a question mark (?), used to pass parameters or data to the resource.
 
Fragment: Another optional section, starting with a hash (#), used to navigate to a specific part of the resource.

Example
Consider the URL https://www.example.com:80/path?query#fragment. Here:

https is the scheme.

www.example.com is the host.

:80 is the port.

/path is the path.

?query is the query string.

#fragment is the fragment.


- URI (Uniform Resource Identifier): It's a broader term that can refer to both the URL and the path within the URL. It's used to identify a resource in a network.
Unlike a URL, which provides a means to locate a resource, a URI broadly identifies or names a resource. It includes URLs and URNs (Uniform Resource Names) as subsets. A URI can either locate a resource, name it, or both.

Components of a URI
URIs can be classified into two main categories:

URLs (Uniform Resource Locators): As discussed earlier, URLs locate resources on the internet.
 
URNs (Uniform Resource Names): These identify resources by name in a namespace, without specifying a location. An example is an ISBN for a book.
A URI typically includes:
Scheme: Similar to a URL, it indicates the protocol or method used for accessing or identifying the resource.
 
Scheme-Specific Part: This varies depending on whether the URI is a URL or a URN. For a URL, it includes the host, port, path, etc., while for a URN, it contains the namespace-specific string.

For a URL-based URI: https://www.example.com/page.html,  https is the scheme.
www.example.com/page.html is the scheme-specific part.


> Can a URI be a URL?
Yes, a URI can be a URL. In fact, all URLs are URIs, but not all URIs are URLs. A URL is a specific type of URI that not only names a resource but also provides a means to locate it. For example, https://www.example.com is both a URI and a URL, as it identifies a resource on the internet and provides a location for accessing it.

>How do URLs and URIs work together in web applications?
In web applications, URLs and URIs work together to facilitate resource identification and access. URLs, being a subset of URIs, are commonly used to locate and retrieve web resources. URIs provide a more general framework for resource identification, which can include URLs for web resources or URNs for naming resources in a specific namespace. This combination ensures that resources can be both uniquely identified and accessed efficiently in web environments.