// frontend/src/pages/Register.jsx

import { useState } from 'react';

import Navbar from '../components/Navbar';

function Register() {

  const [formData, setFormData] = useState({

    email: '',
    password: ''

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await fetch(

        'https://auction-platform-maef.onrender.com/api/auth/register',

        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(formData)

        }

      );

      alert('Registered Successfully');

      window.location.href = '/login';

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#f4f8f4]">

      <Navbar />

      <div className="flex items-center justify-center pt-24">

        <form
          onSubmit={handleSubmit}
          className="bg-[#e6efe9] p-10 rounded-3xl shadow-xl w-96"
        >

          <h1 className="text-4xl font-bold mb-8 text-center text-[#344e41]">

            Register

          </h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-4 mb-5 rounded-2xl bg-[#f1f7f2] outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-4 mb-5 rounded-2xl bg-[#f1f7f2] outline-none"
          />

          <button
            className="w-full bg-[#84a98c] hover:bg-[#6b9080] text-white py-4 rounded-2xl font-bold transition"
          >

            Register

          </button>

        </form>

      </div>

    </div>

  );

}

export default Register;