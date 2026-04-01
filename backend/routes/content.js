const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const Content = require('../models/Content');

router.get('/', auth, async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', [auth, admin], async (req, res) => {
  try {
    const newContent = new Content({
      title: req.body.title,
      body: req.body.body,
      author: req.user.name || 'Admin'
    });
    const savedContent = await newContent.save();
    res.json(savedContent);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Content deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
