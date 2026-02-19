# Enum in Mongoose
This is mongoose built-in validation .
🔹 What is Enum?
Enum (enumeration) is a schema validation feature in Mongoose that restricts a field to accept only specific, predefined values. Basically we create a enum when we need to restrict the user for some values.

🔹 Why Use It?
- Data Integrity: Ensures only valid values are stored (e.g., status can only be pending/accepted/rejected).
- Validation: Automatically validates data on save/update operations.
- Readability: Makes schemas easier to understand.
- Consistency: Prevents typos and invalid states.

🔹 Syntax
const schema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"]
  }
});

🔹 Example: Connection Request Status
const ConnectionRequestSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
    message: '{VALUE} is not a valid status' // this is a custom error message
  }
});

🔹 How It Works
- Only these values allowed: pending, accepted, rejected.
- If you try to save any other value, Mongoose will throw a validation error.
- Default value ensures it has a value even if not provided.

🔹 Example Validations
// ✅ Valid
const req1 = new ConnectionRequest({ status: 'pending' });
await req1.save();  // OK

// ❌ Invalid
const req2 = new ConnectionRequest({ status: 'approved' });
await req2.save();  // Validation Error!

// ❌ Invalid
const req3 = new ConnectionRequest({ status: 'Pending' });
await req3.save();  // Validation Error (case-sensitive)

🔹 Case-Insensitive Enum (Optional)
If you want to allow different cases:
const schema = new mongoose.Schema({
  status: {
    type: String,
    enum: {
      values: ['pending', 'accepted', 'rejected'],
      message: '{VALUE} is not a valid status'
    },
    lowercase: true,  // Convert input to lowercase
    trim: true        // Remove whitespace
  }
});

Now 'Pending', 'PENDING', ' pending ' will all work.

🔹 Enum with Numbers
const OrderSchema = new mongoose.Schema({
  status: {
    type: Number,
    enum: [0, 1, 2],  // 0=pending, 1=shipped, 2=delivered
    default: 0
  }
});

🔹 Benefits
- Type Safety: Ensures only expected values are used.
- Clear Documentation: Anyone reading the schema knows the allowed values.
- Easy Maintenance: Update allowed values in one place.
- Validation Built-in: No need for manual checks in your application code.

🔹 When to Use Enum
- Status fields (pending/active/inactive, open/closed/resolved).
- Roles (admin/user/guest).
- Categories (electronics/clothing/books).
- Payment states (paid/unpaid/refunded).
- Any field with a fixed set of possible values.

🔹 Summary
Enum in Mongoose is a powerful validation tool that restricts field values to a predefined set. It improves data integrity, makes schemas self-documenting, and provides automatic validation — essential for maintaining consistent and reliable data in your application.