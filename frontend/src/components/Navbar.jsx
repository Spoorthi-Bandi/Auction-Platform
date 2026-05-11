// frontend/src/components/Navbar.jsx

// frontend/src/components/Navbar.jsx

import { Link } from 'react-router-dom';

function Navbar() {

  return (

    <nav className="bg-[#d8e2dc] shadow-md px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-5">

      <h1 className="text-2xl md:text-4xl font-extrabold text-[#344e41] text-center">

        Auction Platform

      </h1>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center text-[#344e41] font-semibold text-sm md:text-base">

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