1. Introduction
In system design interviews, Latency and Throughput are among the most frequently discussed concepts.
 Many candidates know the definitions but fail to explain them clearly with examples.


2. What is Latency?
Definition
Latency is the time taken to complete a single request from start to finish.
In simple words:
How long does one request take to get a response?
Example
You open a website and click “Login”.
 If it takes 300 milliseconds to show the dashboard, then the latency is 300 ms.
Real-Life Analogy
Ordering tea at a shop:
You place the order


The shopkeeper prepares it


You receive the tea


The total time taken = Latency
Key Points
Measured in milliseconds (ms)


Focuses on speed


Affects user experience


Lower latency = faster system



3. What is Throughput?
Definition
Throughput is the number of requests a system can handle in a given time period.
In simple words:
How many requests can the system process per second/minute?
Example
A server handles 500 requests per second.
 That means its throughput is 500 RPS (Requests Per Second).
Real-Life Analogy
Same tea shop:
If the shop can serve 50 customers in one hour


That capacity is Throughput


Key Points
Measured in RPS, TPS, or requests/min


Focuses on capacity


Important for scalability


Higher throughput = handles more load



4. Latency vs Throughput (Simple Comparison)
Aspect
Latency
Throughput
Meaning
Time for one request
Number of requests
Focus
Speed
Capacity
Unit
Milliseconds
Requests/second
User Experience
Direct impact
Indirect impact
Example
Page loads in 200 ms
1000 users/sec


5. Important Insight (Interview Favorite)
A system can have:
Low latency but low throughput


High throughput but high latency


Both are independent metrics.
Example:
A single fast chef (low latency)


But only one chef (low throughput)



6. Why These Metrics Matter in System Design
Latency affects how fast users feel the system is


Throughput affects how many users the system can handle


Good systems balance both



7. Factors Affecting Latency
Network delay


Database queries


Disk I/O


Serialization/deserialization


Application logic


Cache misses



8. Factors Affecting Throughput
Number of servers


CPU and memory


Database connections


Load balancing


Parallel processing


Rate limiting


Interview Questions & Answers (Most Asked)
1. What is latency?
Latency is the time taken for a single request to travel through the system and receive a response.
2. What is throughput?
Throughput is the number of requests a system can process in a given time frame.
3. Can a system have low latency but low throughput?
Yes. A system may respond quickly but handle very few requests at a time.
4. Can a system have high throughput but high latency?
Yes. Systems processing requests in bulk may have high throughput but slow individual responses.
5. Which is more important: latency or throughput?
It depends on the use case. User-facing apps prioritize latency; batch systems prioritize throughput.
6. How is latency measured?
Usually measured in milliseconds using monitoring tools or logs.
7. How is throughput measured?
Measured as requests per second, transactions per second, or messages per minute.
8. How does caching affect latency?
Caching reduces latency by avoiding expensive operations like database calls.
9. How does caching affect throughput?
Caching increases throughput by reducing load on backend systems.
10. How does load balancing help throughput?
It distributes traffic across multiple servers, increasing total capacity.
11. How does load balancing affect latency?
It can reduce latency by routing requests to the least busy server.
12. Does increasing servers reduce latency?
Not always. It mainly increases throughput; latency depends on request path.
13. What is tail latency?
Tail latency refers to slowest requests (p95, p99) that affect user experience.
14. Why is p99 latency important?
Because even a few slow requests can frustrate users at scale.
15. How does database indexing affect latency?
Indexes speed up queries, reducing response time.
16. How does concurrency affect throughput?
More concurrency allows more requests to be processed simultaneously.
17. What happens to latency under heavy load?
Latency usually increases due to resource contention.
18. Can asynchronous processing improve latency?
Yes, it allows users to get faster acknowledgments.
19. How does network distance affect latency?
Greater distance increases latency due to propagation delay.
20. In system design interviews, how should you discuss these?
Always explain:
Definition


Real-world example


Trade-offs


How to optimize both


