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






// // VERSION_2
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.static('build'));

// // Root route to check if the server is running
// app.get('/', (req, res) => {
//   res.send('Server is running and ready!');
// });

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

// // Use the PORT environment variable if available, otherwise default to 5000
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });





const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allows any origin to connect; you can specify a specific domain here if needed
    methods: ["GET", "POST"]
  }
});

app.use(cors()); // Enable CORS for all routes

// S_TEST_CONNECTION_BACKEND
// app.use(require('cors')())
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// E_TEST_CONNECTION_BACKEND

// app.use(express.static('build'));

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



// S_TEST_CONNECTION_BACKEND
// Root route to check if the server is running
app.get('/', (req, res) => {
    console.log('== Server is running and ready! ==');
    res.send('Server is running and ready!');
});

app.post('/api/test', (req, res) => {
    console.log('==== START ====');
    console.log("req.body:");
    console.log(req.body);
    console.log('====================================');
    const { name } = req.body;
  
    if (name) {
        console.log('====================================');
        // console.log("Welcome Mr :",name);
        console.log('====================================');
      res.status(200).json({ message: `Welcome to our website, Mr./Ms. ${name}` });
    } else {
      res.status(400).json({ message: 'Name is required' });
    }
});
// E_TEST_CONNECTION_BACKEND

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
