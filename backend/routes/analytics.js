const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');

const User = require('../models/User');

// Get real analytics data using MongoDB Aggregation
router.get('/', [auth, admin], async (req, res) => {
  try {
    // Total & Active Stats
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    
    // New Signups (Last 7 Days Growth)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const growthData = await User.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Role Distribution (for Pie Chart)
    const roleDist = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    // Format for Chart.js
    const labels = growthData.map(d => d._id);
    const signupCounts = growthData.map(d => d.count);
    
    // Derive a fixed value from signups until a Sales model is implemented
    const salesData = signupCounts.map(c => c * 100);

    res.json({
      totalUsers,
      activeUsers,
      recentSignups: signupCounts.reduce((a, b) => a + b, 0),
      labels: labels.length > 0 ? labels : ['No Data'],
      signUps: signupCounts.length > 0 ? signupCounts : [0],
      sales: salesData,
      roleDistribution: {
        labels: roleDist.map(r => r._id),
        counts: roleDist.map(r => r.count)
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
