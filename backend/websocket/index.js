// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle events here
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('todo_added', (data)
