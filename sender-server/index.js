const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

const allowedOrigins = ['http://localhost:4200', 'http://localhost:4201'];

app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('sendMessage', (message) => {
    console.log('Message received from sender:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(8001, () => {
  console.log('Sender server running on port 8001');
});
