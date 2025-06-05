const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
require('dotenv').config();

const groceriesRoutes = require('./routes/groceries');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: process.env.FRONTEND_URL || '*' }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/api/groceries', groceriesRoutes);
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Backend running on port ${process.env.PORT || 3001}`);
});
