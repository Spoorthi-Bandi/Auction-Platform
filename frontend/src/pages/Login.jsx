// frontend/src/pages/Login.jsx

import { useState } from 'react';
import Navbar from '../components/Navbar';

function Login() {

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

      const res = await fetch(
        'https://auction-backend-n5fu.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if (data.token) {

        localStorage.setItem('token', data.token);

        localStorage.setItem('email', formData.email);

        alert('Login Successful');

        window.location.href = '/';

      }

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#f4f8f4]">

      <Navbar />

      <div className="flex justify-center items-center pt-24">

        <form
          onSubmit={handleSubmit}
          className="bg-[#e6efe9] p-10 rounded-3xl shadow-xl w-96"
        >

          <h1 className="text-4xl font-bold text-center mb-8 text-[#344e41]">

            Login

          </h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-2xl border bg-[#f1f7f2] outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-2xl border bg-[#f1f7f2] outline-none"
          />

          <button
            className="w-full bg-[#84a98c] hover:bg-[#6b9080] text-white py-4 rounded-2xl font-bold transition"
          >

            Login

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;