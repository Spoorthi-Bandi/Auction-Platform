const express = require('express');

const Auction = require('../models/Auction');

const upload = require('../config/upload');

const router = express.Router();

router.post(

  '/create',

  upload.single('image'),

  async (req, res) => {

    try {

      const auction = new Auction({

        ...req.body,

        image: req.file.path

      });

      await auction.save();

      res.json(auction);

    } catch (err) {

      console.log(err);

      res.status(500).json(err);

    }

});

router.get('/', async (req, res) => {

  try {

    const auctions = await Auction.find();

    res.json(auctions);

  } catch (err) {

    res.status(500).json(err);

  }

});

router.post('/bid/:id', async (req, res) => {

  try {

    const auction = await Auction.findById(
      req.params.id
    );

    if (!auction) {

      return res.status(404).json({
        message: 'Auction not found'
      });

    }

    const amount = req.body.amount;

    auction.currentBid = amount;

    auction.bids.push({

      user: 'demo-user',

      amount

    });

    await auction.save();

    req.io.emit('newBid', {

      auctionId: auction._id,

      amount

    });

    res.json(auction);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

module.exports = router;