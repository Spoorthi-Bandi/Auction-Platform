// frontend/src/pages/Dashboard.jsx

import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

function Dashboard() {

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {

    fetchAuctions();

  }, []);

  const fetchAuctions = async () => {

    try {

      const res = await fetch(
        'https://auction-platform-maef.onrender.com/api/auctions'
      );

      const data = await res.json();

      setAuctions(data);

    } catch (err) {

      console.log(err);

    }

  };

  const totalAuctions = auctions.length;

  const liveAuctions = auctions.filter(

    (item) => new Date(item.endTime) > new Date()

  ).length;

  const endedAuctions = auctions.filter(

    (item) => new Date(item.endTime) <= new Date()

  ).length;

  return (

    <div className="min-h-screen bg-[#f4f8f4]">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold text-[#344e41] mb-14 text-center">

          Dashboard

        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-[#e6efe9] rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold text-[#344e41] mb-5">

              Total Auctions

            </h2>

            <p className="text-6xl font-extrabold text-[#588157]">

              {totalAuctions}

            </p>

          </div>

          <div className="bg-[#e6efe9] rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold text-[#344e41] mb-5">

              Live Auctions

            </h2>

            <p className="text-6xl font-extrabold text-[#588157]">

              {liveAuctions}

            </p>

          </div>

          <div className="bg-[#e6efe9] rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold text-[#344e41] mb-5">

              Ended Auctions

            </h2>

            <p className="text-6xl font-extrabold text-[#588157]">

              {endedAuctions}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;