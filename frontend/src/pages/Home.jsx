// frontend/src/pages/Home.jsx

import { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

import Navbar from '../components/Navbar';

const socket = io(
  'https://backend-lwbc.onrender.com'
);

function Home() {

  const [auctions, setAuctions] = useState([]);

  const [search, setSearch] = useState('');

  const [category, setCategory] = useState('');

  useEffect(() => {

    fetchAuctions();

    socket.on('newBid', () => {

      fetchAuctions();

    });

    const timer = setInterval(() => {

      setAuctions((prev) => [...prev]);

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const fetchAuctions = async () => {

    try {

      const res = await fetch(
        'https://backend-lwbc.onrender.com/api/auctions'
      );

      const data = await res.json();

      setAuctions(data);

    } catch (err) {

      console.log(err);

    }

  };

  const getTimeLeft = (endTime) => {

    const total =
      new Date(endTime) - new Date();

    const hours = Math.floor(
      total / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (total / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (total / 1000) % 60
    );

    if (total <= 0) {

      return 'Auction Ended';

    }

    return `${hours}h ${minutes}m ${seconds}s`;

  };

  const placeBid = async (id, currentBid) => {

    try {

      await fetch(

        `https://backend-lwbc.onrender.com/api/auctions/bid/${id}`,

        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            amount: currentBid + 1000
          })

        }

      );

      fetchAuctions();

    } catch (err) {

      console.log(err);

    }

  };

  const deleteAuction = async (id) => {

    try {

      await fetch(

        `https://backend-lwbc.onrender.com/api/auctions/delete/${id}`,

        {
          method: 'DELETE'
        }

      );

      fetchAuctions();

    } catch (err) {

      console.log(err);

    }

  };

  const filteredAuctions = auctions.filter((item) => {

    const matchesSearch =

      item.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =

      category === ''

      ||

      item.category === category;

    return (
      matchesSearch &&
      matchesCategory
    );

  });

  return (

    <div className="min-h-screen bg-[#f4f8f4] text-[#3a5a40]">

      <Navbar />

      <div className="p-4 md:p-10">

        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-10 text-[#344e41]">

          Real-Time Auction Platform

        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">

          <input
            type="text"
            placeholder="Search Auctions..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }

            className="w-full md:w-96 p-3 rounded-2xl border bg-[#f1f7f2] outline-none"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }

            className="w-full md:w-64 p-3 rounded-2xl border bg-[#f1f7f2] outline-none"
          >

            <option value="">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Fashion">
              Fashion
            </option>

            <option value="Vehicles">
              Vehicles
            </option>

          </select>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredAuctions.map((item) => (

            <div
              key={item._id}

              className="bg-[#e6efe9] rounded-3xl overflow-hidden shadow-lg border border-green-100"
            >

              <img
                src={item.image}
                alt={item.title}
                className="h-60 w-full object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between items-center mb-4 gap-2">

                  <span className="bg-[#a4c3b2] text-[#344e41] px-4 py-1 rounded-full text-sm font-semibold">

                    {item.category}

                  </span>

                  <span className="text-[#588157] font-semibold text-sm md:text-base text-right">

                    ⏳ {getTimeLeft(item.endTime)}

                  </span>

                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#344e41]">

                  {item.title}

                </h2>

                <p className="text-[#3a5a40] mb-4 text-sm md:text-base">

                  {item.description}

                </p>

                <div className="flex justify-between items-center mb-5 gap-4">

                  <div>

                    <p className="text-sm text-[#588157]">

                      Current Bid

                    </p>

                    <h3 className="text-2xl md:text-3xl font-bold text-[#344e41]">

                      ₹{item.currentBid}

                    </h3>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-[#588157]">

                      Highest Bidder

                    </p>

                    <h4 className="font-semibold text-[#344e41] text-sm md:text-base">

                      {item.highestBidder || 'No Bids Yet'}

                    </h4>

                  </div>

                </div>

                <div className="mb-5">

                  <h3 className="font-bold text-lg mb-3 text-[#344e41]">

                    Bid History

                  </h3>

                  <div className="max-h-32 overflow-y-auto">

                    {item.bids && item.bids.length > 0 ? (

                      item.bids.map((bid, index) => (

                        <div
                          key={index}

                          className="p-3 rounded-xl mb-2 text-sm bg-[#f1f7f2]"
                        >

                          <p>

                            User:
                            {' '}
                            {bid.user}

                          </p>

                          <p>

                            Amount:
                            {' '}
                            ₹{bid.amount}

                          </p>

                        </div>

                      ))

                    ) : (

                      <p className="text-[#588157]">

                        No bids yet

                      </p>

                    )}

                  </div>

                </div>

                <div className="flex gap-3 items-center">

                  <button

                    onClick={() =>
                      placeBid(
                        item._id,
                        item.currentBid
                      )
                    }

                    className="flex-1 bg-[#84a98c] hover:bg-[#6b9080] text-white py-3 md:py-4 rounded-2xl font-bold transition text-sm md:text-base"

                  >

                    Place Bid +1000

                  </button>

                  <button

                    onClick={() =>
                      deleteAuction(item._id)
                    }

                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#cadbcf] hover:bg-[#b7cdbd] transition text-lg md:text-xl"

                  >

                    🗑️

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Home;