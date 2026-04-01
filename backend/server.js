const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const analyticsRoutes = require('./routes/analytics');
const contentRoutes = require('./routes/content');

const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Store socket.io instance in the app
app.set('socketio', io);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/insightAdmin')
  .then(() => console.log('MongoDB Connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/profile', require('./routes/profile'));
app.use('/api/admin/sales', require('./routes/sales'));

// Base route
app.get('/', (req, res) => res.send('API Server is running.'));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
