const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { registerValidator, loginValidator } = require('../validators/auth');
const User = require('../models/User');

const router = express.Router();

// Register (for seeding the initial admin if needed)
router.post('/register', registerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password, role: role || 'user' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      
      // Real-time update for admins
      const io = req.app.get('socketio');
      if (io) {
        io.emit('newUser', { id: user.id, name: user.name, role: user.role });
      }

      res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);
    let user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    if (user.isActive === false) {
      console.log('User inactive:', email);
      return res.status(403).json({ msg: 'Account disabled' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) {
        console.error('JWT Signing Error:', err);
        throw err;
      }
      console.log('Login successful for:', email, 'Role:', user.role);
      res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
    });
  } catch (err) {
    console.error('SERVER ERROR during login:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
