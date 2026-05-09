// frontend/src/components/Navbar.jsx

import { Link } from 'react-router-dom';

function Navbar() {

  return (

    <nav className="bg-[#d8e2dc] shadow-md px-10 py-5 flex justify-between items-center">

      <h1 className="text-4xl font-extrabold text-[#344e41]">

        Auction Platform

      </h1>

      <div className="flex gap-8 items-center text-[#344e41] font-semibold">

        <Link to='/'>Home</Link>

        <Link to='/login'>Login</Link>

        <Link to='/register'>Register</Link>

        <Link to='/create-auction'>Create Auction</Link>

        <Link to='/dashboard'>Dashboard</Link>

        <Link to='/profile'>Profile</Link>

      </div>

    </nav>

  );

}

export default Navbar;