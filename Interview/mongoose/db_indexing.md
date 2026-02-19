# DB Indexing

As my db collection grows, the performance of my queries may decrease/becames slow because of the large data sets, for this we use indexing.
- Imagine a library: Without an index, you’d scan every shelf to find a book. With an index (catalog), you jump straight to the right shelf.
- In backend APIs, indexes are crucial for authentication lookups (e.g., finding a user by email) and connection requests (e.g., checking if a relationship already exists).

So basically, We need database indexing because it dramatically speeds up data retrieval by avoiding full table scans. Indexes act like a "search map," allowing the database to jump directly to the relevant rows instead of scanning every record.

🔍 Why Database Indexing Is Needed
1. Performance Optimization
• 	Without an index, the database must perform a full table scan for queries, which is slow for large datasets.
• 	Indexes reduce query time by providing a shortcut to the data, similar to how an index in a book helps you find topics quickly.
2. Efficient Query Execution
• 	Value-based lookups: Quickly find rows matching a specific value (e.g., ).
• 	Range queries: Retrieve records within a range (e.g., ).
• 	Sorting and ordering: Indexes can speed up  and  operations.
3. Scalability
• 	As data grows, indexes ensure queries remain fast and predictable.
• 	Essential for applications handling millions of records, like e-commerce platforms or social networks.

📌 Key Insights
- Indexes are not free: They consume disk space and add overhead during write operations.
- Choosing the right index matters: For example, a B-tree index is great for range queries, while a hash index is better for exact matches.
- Balance is critical: Too few indexes → slow queries; too many indexes → slow writes.

## Types of Indexes
1. Single-Field Index : Index on one field only.
- schema.index({ fieldName: 1 });   // ascending
- schema.index({ fieldName: -1 });  // descending

// Index on 'age' field (ascending)
userSchema.index({ age: 1 });
// Quickly finds all users with age = 25
User.find({ age: 25 });
MongoDB uses the index to jump directly to documents with age = 25 instead of scanning the whole collection.



2. Compound Index : Index on multiple fields.
- schema.index({ fieldName1: 1, fieldName2: -1 });

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  age: Number
});

// Compound index: first ascending, last descending
userSchema.index({ first: 1, last: -1 });


Query benefiting from this index:
// Finds all users named "Alice" and sorts them by last name descending
User.find({ first: "Alice" }).sort({ last: -1 });


👉 The database first filters by first and then sorts efficiently by last using the same index.


3. Multikey Index : Index on array fields.
- schema.index({ fieldName: 1 });

4. Text Index : Index on text fields.
- schema.index({ fieldName: "text" });

5. Unique Index : Ensures values are unique across the collection.
- schema.index({ fieldName: 1 }, { unique: true });

6.  Hashed Index
• 	Indexes the hash of a field’s value.
- schema.index({ userId: "hashed" });
Useful for sharding and evenly distributing data.


6. TTL Index : Index on time-to-live data.
- schema.index({ fieldName: 1 }, { expireAfterSeconds: 60 });
