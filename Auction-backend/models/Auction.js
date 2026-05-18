// Auction-backend/models/Auction.js

const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({

  user: String,

  amount: Number,

  time: {

    type: Date,

    default: Date.now

  }

});

const auctionSchema = new mongoose.Schema({

  title: String,

  description: String,

  image: String,

  category: String,

  startingPrice: Number,

  currentBid: Number,

  createdBy: String,

  highestBidder: String,

  endTime: Date,

  bids: [bidSchema]

});

module.exports =
  mongoose.model('Auction', auctionSchema);