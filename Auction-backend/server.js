const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const dotenv = require('dotenv');

const http = require('http');

const { Server } = require('socket.io');

dotenv.config();

const authRoutes = require('./routes/authRoutes');

const auctionRoutes = require('./routes/auctionRoutes');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {

  cors: {
    origin: '*'
  }

});

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {

  req.io = io;

  next();

});

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log('MongoDB Connected');

})

.catch((err) => {

  console.log(err);

});

app.use('/api/auth', authRoutes);

app.use('/api/auctions', auctionRoutes);

io.on('connection', (socket) => {

  console.log('User connected');

});

server.listen(process.env.PORT, () => {

  console.log(

    `Server running on port ${process.env.PORT}`

  );

});