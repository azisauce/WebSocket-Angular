const express = require('express'); // Importing Express.js framework 
const http = require('http'); // Node's built-in HTTP module
const socketIo = require('socket.io'); // Importing socket.io for WebSocket support
const cors = require('cors'); // Importing CORS middleware for cross-origin requests

const app = express(); // Creating an Express application

const allowedOrigins = ['http://localhost:4200', 'http://localhost:4201'];

app.use(cors()); // Enabling CORS middleware for all routes

const server = http.createServer(app); // Creating an HTTP server using Express

const io = socketIo(server, { // Setting up socket.io with CORS options
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => { // Handling socket connections
  console.log('Client connected');

  socket.on('sendMessage', (message) => { // Handling 'sendMessage' event
    console.log('Message received from sender:', message);
    io.emit('message', message); // Broadcasting 'message' event to all connected clients
  });

  socket.on('disconnect', () => { // Handling client disconnect
    console.log('Client disconnected');
  });
});

server.listen(8001, () => { // Starting the HTTP server on port 8001
  console.log('Sender server running on port 8001');
});
