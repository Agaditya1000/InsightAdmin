const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const Sale = require('../models/Sale');

// @route   GET /api/admin/sales/stats
// @desc    Get sales statistics (Total, Weekly, Monthly)
// @access  Private/Admin
router.get('/stats', [auth, admin], async (req, res) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    // Total Revenue
    const totalRevenue = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Last 7 Days Revenue
    const weeklyRevenue = await Sale.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Last 30 Days Revenue
    const monthlyRevenue = await Sale.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Daily Sales for Charts (Last 7 Days)
    const dailySales = await Sale.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      weeklyRevenue: weeklyRevenue[0]?.total || 0,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      dailySales: {
        labels: dailySales.map(d => d._id),
        amounts: dailySales.map(d => d.total)
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/admin/sales
// @desc    Record a new sale
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { amount, customerName } = req.body;
    
    if (!amount) {
      return res.status(400).json({ msg: 'Amount is required' });
    }

    const newSale = new Sale({
      amount,
      customerName
    });

    const sale = await newSale.save();
    
    // Get the socket instance from the app
    const io = req.app.get('socketio');
    if (io) {
      io.emit('newSale', sale);
    }

    res.json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
