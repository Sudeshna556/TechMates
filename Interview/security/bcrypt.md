
# 🔑 What is a Cryptographic Hash?
a hash (or cryptographic hash) is defined as a digital fingerprint for data. It is the output of a mathematical function that transforms any input—like a word, a large file, or a password—into a unique, fixed-length string of characters. 
or,

A cryptographic hash function is a `mathematical algorithm` that takes an input (any size) and produces a fixed-length output, often represented as a string of hexadecimal characters. This output is called the hash value or digest.

- Salt = random value embedded in the hash string.
- Hash = the final output of bcrypt’s computation using the salt + password.

🔍 What `bcrypt.compare` Actually Does
- At registration:
- You hash the password with bcrypt.hash(plainPassword, saltRounds).
- The result (hash + salt embedded) is stored in the database.
- At login:
- You call bcrypt.compare(plainPassword, hashedPasswordFromDB).
- Internally, bcrypt:
- Reads the salt embedded in hashedPasswordFromDB.
- Re-hashes the provided plainPassword using that exact salt and cost factor.
- Compares the newly computed hash with the stored hash.


Core Properties of Hashing
- Irreversible (One-Way): A hash is designed to be impossible to reverse. You can turn "password" into a hash, but you cannot mathematically "un-hash" it back into "password".
- Deterministic: The same input will always produce the exact same hash. This allows systems to verify if a password is correct without ever knowing what the password is.
- Fixed Output Size: Regardless of whether you hash one letter or an entire book, the resulting hash will always be the same length (e.g., 256 bits for SHA-256).
- Avalanche Effect: Even a tiny change in the input (like changing a single letter from lowercase to uppercase) results in a drastically different and unpredictable hash. 


Hashing vs. Encryption

Feature 	        Hashing	                                              Encryption
Purpose	        To verify integrity (has this data changed?)	        To protect confidentiality (can anyone read this?)
Reversibility	One-way: Cannot be reversed	                            Two-way: Can be reversed using a secret key
Common Use	   Storing passwords, verifying file downloads	            Sending secure messages, protecting sensitive files

# what is bcrypt? 
bcrypt is a purpose-built password hashing function(algorithm) that salts each password and uses an adjustable work factor to make brute‑force attacks expensive; it’s widely implemented across languages and remains a solid choice for secure password storage when configured and tested for acceptable latency.

or,
Bcrypt is a cryptographic hash function based on the Blowfish cipher, designed specifically for securely hashing passwords.

# salt vs cost
A salt is a per‑password random value that makes identical passwords produce different hashes and defeats precomputed attacks; the cost (or work factor) is an adjustable exponent that controls how many internal iterations bcrypt performs—each increment doubles the work—so you tune cost to make hashing deliberately slow on your servers while salts remain unique per password.

🔑 Salt
- Definition: A random value generated once per password.
- Purpose: Ensures that even if two users choose the same password, their stored hashes are different.
- Lifecycle: The salt is generated independently of the cost. It’s embedded in the final bcrypt hash string alongside the cost and the hash itself.
- Key point: The salt is not created by iterations — it’s just a random value.

🔑 Cost (Work Factor)
- Definition: The log₂ of the number of iterations bcrypt runs internally.
- Example:
- Cost = 10 → 2^{10}=1024 iterations.
- Cost = 12 → 2^{12}=4096 iterations.
- Purpose: Makes hashing deliberately slow, so brute‑force attacks are expensive.
- Key point: The cost controls how many times bcrypt processes the password+salt, but it does not generate the salt.


$[algorithm]$[cost]$[salt][hash]
$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 |  |  |                     |
 |  |  |                     hash-value = K0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 |  |  |
 |  |  salt = nOUIs5kJ7naTuTFkBy1veu
 |  |
 |  cost-factor => 10 = 2^10 rounds
 |
 hash-algorithm identifier => 2b = BCrypt

2 chars hash algorithm identifier prefix. "$2a$" or "$2b$" indicates BCrypt
Cost-factor (n). Represents the exponent used to determine how many iterations 2^n
16-byte (128-bit) salt, base64 encoded to 22 characters
24-byte (192-bit) hash, base64 encoded to 31 characters

In bcrypt, "salt rounds" refers to the cost factor that determines the computational effort required to hash a password.Basically, it is the number of internal rounds run by the algorithm in order to provide a hash value for a password.
- The bcrypt cost (often called rounds or log2(n)) is the base‑2 logarithm of the internal iteration count. The algorithm performs 2^{\mathrm{cost}} internal iterations when deriving the hash, so the work grows exponentially with the cost. 
- Increasing the cost by 1 doubles the work (and time) because the actual iteration count is 2^cost; pick a cost so hashing takes a deliberately slow but acceptable time on your production hardware (commonly 100–500 ms) and re-evaluate as hardware changes.
- Concrete math:
- cost = 10 → 2^{10}=1,024 iterations.
- cost = 12 → 2^{12}=4,096 iterations.
Each increment of the cost doubles the CPU work and memory accesses required.

<!-- !
- Salt makes each password unique.
- Iterations (cost) make each password expensive to compute.
-->

# Why that exponential growth matters
• 	Doubling effect: Because work scales as , raising cost by 1 doubles the time; raising by 2 quadruples it. That makes bcrypt adaptive: small increases give large security gains against brute‑force attackers while remaining simple to tune.
• 	Practical latency: Many practitioners target ~0.1–0.5 seconds per hash on their authentication servers; a commonly cited example is cost = 12 producing roughly ~300 ms on typical developer hardware, though exact timing depends on CPU and implementation.

Why This is Used
Security: Storing plain-text passwords is dangerous; if your database is breached, attackers can see every user's credentials.
One-Way Hashing: Bcrypt is a "one-way" function, meaning it is computationally impossible to reverse the hash back into the original password.
Automatic Salting: Bcrypt automatically generates a unique salt for every password, ensuring that two users with the same password will have different hashes in the database 

Salt Rounds (10): This is the "cost factor" that determines how much computational power is needed to calculate the hash. A value of 10 is a widely accepted balance between security and performance, though higher values (e.g., 12) provide more resistance to brute-force attacks at the cost of speed.

# why these internal iteration of cost factor needed what is the purpose of these iterations? or why bcrypt (and other password hashing algorithms) deliberately use multiple internal iterations. 

### 🔑 Purpose of Internal Iterations in bcrypt
1. Slow Down Attackers
- Ordinary cryptographic hashes (like SHA‑256,MD5 etc are designed for speed ) are designed to be fast (they can process gigabytes of data per second) and Fast Hashes Are Dangerous for Passwords. Though its great for integrity checks, but terrible for password storage — attackers can try billions of guesses per second.
> That’s perfect for checksums or digital signatures, but for passwords it’s a problem:
-> An attacker with a GPU (A graphics processing unit is an electronic circuit that can perform mathematical calculations at high speed)it can compute billions of SHA‑256 hashes per second.
-> This makes brute‑force attacks (trying every possible password) extremely feasible.

- bcrypt’s iterations make hashing deliberately slow. Each extra round doubles the work, so brute‑force attacks become computationally expensive.

## 🐢 Why Slow Iterations Help
Password hashing algorithms like bcrypt, Argon2, PBKDF2 intentionally add iterations (repeated rounds of computation). Here’s why that matters:
 Each guess costs actual real time or we can say time taking.
- With bcrypt where cost = 12, hashing might take ~300 ms on a normal CPU.
- That means an attacker can only try ~3 guesses per second per core.
- Compare that to billions per second with SHA‑256 — the slowdown is astronomical.

 Exponential scaling
- bcrypt’s cost factor is logarithmic: cost = 12 → 2^{12}=4096 iterations.
- Raising cost by 1 doubles the work.
- You can tune cost so hashing is “just slow enough” for users but crippling for attackers.

🚶 Real-Life Analogy
Imagine you’re guarding a door with a lock:
- Fast lock (SHA‑256):
- Each key trial takes 1 millisecond.
- An attacker can try 1,000 keys per second.
- If there are millions of possible keys, they’ll break in quickly.
- bcrypt lock with cost = 12:
- Each key trial takes 300 milliseconds.
- An attacker can only try 3 keys per second per machine.
- To test millions of keys, they’d need years of computation or thousands of machines.
- Raising cost to 13:
- Each trial now takes 600 milliseconds.
- Attacker’s speed is cut in half instantly.
- For you as a user, login feels only slightly slower (still under a second).

NOTE -
 Exponential scaling means you can tune bcrypt so login feels instant for real users but unbearably slow for attackers.
 Raising cost by just 1 doubles attacker effort, while adding only a fraction of a second for legitimate logins.
 That’s why bcrypt remains a practical defense: it shifts the economics of password cracking heavily against attackers.


 Hardware resistance
- GPUs and ASICs thrive on fast, parallelizable algorithms like SHA‑256 or MD5.
- Slow, memory‑hard algorithms (bcrypt, Argon2) reduce that advantage.
- Attackers can’t scale brute‑force cheaply.





Recommendations (2026)
12 Rounds: Currently the recommended minimum for most production web applications. It typically results in a hashing time of ~250–300ms, balancing security with user experience.
10 Rounds: Often used as a default, but considered the "minimum acceptable" for lower-security or legacy environments.
14+ Rounds: Recommended for high-security systems (e.g., financial applications) where a longer wait time (~1 second) is acceptable for increased protection. 

Performance vs. Security
Target Timing: Aim for a hash duration between 250ms and 500ms per password. If it takes less than 100ms, your work factor may be too low for modern hardware.
Dos Attack Risk: Setting rounds too high (e.g., 16+) can cause significant server delays and potentially lead to Denial of Service (DoS) if an attacker triggers many concurrent login attempts.


bcrypt
- What is bcrypt and why is it used in authentication systems?
- How does bcrypt differ from simple hashing algorithms like SHA256?
- What is the role of salting in bcrypt?
- How do you decide the cost factor (salt rounds) in bcrypt?
- What are the trade-offs between security and performance when using bcrypt?
- How would you implement password hashing and verification in an Express.js app?
- What are common mistakes developers make when using bcrypt?
