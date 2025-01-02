// // VERSION_1
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.static('build'));

// io.on('connection', (socket) => {
//   console.log('A user connected');
  
//   socket.on('qr-scanned', (orderId) => {
//     console.log('Order ID scanned:', orderId);
//     io.emit('order-details', orderId); // Send order details to all clients
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// // server.listen(5000, () => {
// //   console.log('Server running on http://localhost:5000');
// // });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('build'));

// Root route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running and ready!');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('qr-scanned', (orderId) => {
    console.log('Order ID scanned:', orderId);
    io.emit('order-details', orderId); // Send order details to all clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Use the PORT environment variable if available, otherwise default to 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
