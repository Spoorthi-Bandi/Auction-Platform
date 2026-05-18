// Auction-backend/routes/auctionRoutes.js
// Auction-backend/routes/auctionRoutes.js

const express = require('express');

const router = express.Router();

const multer = require('multer');

const cloudinary = require('../config/cloudinary');

const Auction = require('../models/Auction');

const storage = multer.diskStorage({});

const upload = multer({ storage });

router.get('/', async (req, res) => {

  try {

    const auctions = await Auction.find();

    res.json(auctions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Failed to fetch auctions'
    });

  }

});

router.post(

  '/create',

  upload.single('image'),

  async (req, res) => {

    try {

      const {
        title,
        description,
        startingPrice,
        currentBid,
        category,
        endTime,
        createdBy
      } = req.body;

      let imageUrl = '';

      if (req.file) {

        const result =
          await cloudinary.uploader.upload(
            req.file.path
          );

        imageUrl = result.secure_url;

      }

      const auction = new Auction({

        title,
        description,
        startingPrice,
        currentBid,
        category,
        createdBy,
        endTime,
        image: imageUrl,
        highestBidder: 'No Bids Yet',
        bids: []

      });

      await auction.save();

      res.status(201).json(auction);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: 'Create auction failed'
      });

    }

  }

);

router.post('/bid/:id', async (req, res) => {

  try {

    const auction =
      await Auction.findById(
        req.params.id
      );

    if (!auction) {

      return res.status(404).json({
        message: 'Auction not found'
      });

    }

    const amount = req.body.amount;

    auction.currentBid = amount;

    auction.highestBidder = 'Current User';

    auction.bids.push({

      user: 'Current User',

      amount

    });

    await auction.save();

    res.json(auction);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Bid failed'
    });

  }

});

router.delete('/delete/:id', async (req, res) => {

  try {

    await Auction.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Auction deleted'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Delete failed'
    });

  }

});

module.exports = router;