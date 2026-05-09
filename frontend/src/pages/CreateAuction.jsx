// frontend/src/pages/CreateAuction.jsx

import { useState } from 'react';

import Navbar from '../components/Navbar';

function CreateAuction() {

  const [formData, setFormData] = useState({

    title: '',
    description: '',
    image: null,
    startingPrice: '',
    duration: '',
    category: ''

  });

  const handleChange = (e) => {

    if (e.target.name === 'image') {

      setFormData({

        ...formData,

        image: e.target.files[0]

      });

    } else {

      setFormData({

        ...formData,

        [e.target.name]: e.target.value

      });

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append('title', formData.title);

      data.append(
        'description',
        formData.description
      );

      data.append(
        'startingPrice',
        formData.startingPrice
      );

      data.append(
        'duration',
        formData.duration
      );

      data.append(
        'category',
        formData.category
      );

      data.append(
        'currentBid',
        formData.startingPrice
      );

      data.append(

        'endTime',

        new Date(
          Date.now() +
          formData.duration * 60 * 1000
        )

      );

      data.append(
        'image',
        formData.image
      );

      await fetch(

        'https://auction-platform-maef.onrender.com/api/auctions/create',

        {
          method: 'POST',
          body: data
        }

      );

      alert('Auction Created');

      window.location.href = '/';

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#f4f8f4]">

      <Navbar />

      <div className="flex items-center justify-center pt-24 pb-20">

        <form
          onSubmit={handleSubmit}
          className="bg-[#e6efe9] p-10 rounded-3xl shadow-xl w-96"
        >

          <h1 className="text-4xl font-bold mb-8 text-center text-[#344e41]">

            Create Auction

          </h1>

          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="w-full border p-4 mb-5 rounded-2xl bg-[#f1f7f2] outline-none"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-4 mb-5 rounded-2xl bg-[#f1f7f2] outline-none"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border p-4 mb-5 rounded-2xl bg-[#f1f7f2] outline-none"
          />

          <input
            type="number"
            name="startingPrice"
            placeholder="Starting Price"
            onChange={handleChange}
            className="w-full border p-4 mb-5 rounded-2xl bg-[#f1f7f2] outline-none"
          />

          <select
            name="category"
            onChange={handleChange}
            className="w-full border p-4 mb-5 rounded-2xl bg-[#f1f7f2] outline-none"
          >

            <option value="">

              Select Category

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

          <input
            type="number"
            name="duration"
            placeholder="Duration in Minutes"
            onChange={handleChange}
            className="w-full border p-4 mb-5 rounded-2xl bg-[#f1f7f2] outline-none"
          />

          <button
            className="w-full bg-[#84a98c] hover:bg-[#6b9080] text-white py-4 rounded-2xl font-bold transition"
          >

            Create Auction

          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateAuction;