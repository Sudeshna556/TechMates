//post signup
1. validation
2. check uniqueness
3. hash password (install bcrypt)
4. save user
5. respond

//post signup
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User'); // Mongoose model

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 2. Check uniqueness
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // 5. Respond
    res.status(201).json({ message: 'Signup successful', userId: newUser._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;