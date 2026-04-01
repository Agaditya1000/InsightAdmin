const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');

// Get current user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update personal profile
router.put('/', auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findById(req.user.id);
    
    if (name) user.name = name;
    if (email) user.email = email;
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
