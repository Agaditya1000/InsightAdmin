const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    await User.deleteMany({});
    console.log('Existing users cleared.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const users = [
      {
        name: 'Super Admin',
        email: 'admin@insight.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
      },
      {
        name: 'Test Editor',
        email: 'editor@insight.com',
        password: hashedPassword,
        role: 'user',
        isActive: true,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'Jane Smith',
        email: 'jane@insight.com',
        password: hashedPassword,
        role: 'user',
        isActive: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'New John',
        email: 'john@insight.com',
        password: hashedPassword,
        role: 'user',
        isActive: true,
        createdAt: new Date()
      }
    ];

    await User.insertMany(users);
    console.log('Production sample users seeded.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
