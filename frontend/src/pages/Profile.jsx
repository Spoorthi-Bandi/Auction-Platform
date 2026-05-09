// frontend/src/pages/Profile.jsx

import Navbar from '../components/Navbar';

function Profile() {

  const email = localStorage.getItem('email');

  const logout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('email');

    window.location.href = '/login';

  };

  return (

    <div className="min-h-screen bg-[#f4f8f4]">

      <Navbar />

      <div className="flex justify-center pt-24">

        <div className="bg-[#e6efe9] p-10 rounded-3xl shadow-xl w-[500px]">

          <h1 className="text-4xl font-bold text-center text-[#344e41] mb-8">

            User Profile

          </h1>

          <div className="space-y-5 text-[#3a5a40] text-lg">

            <p>

              Email:
              {' '}
              {email}

            </p>

            <p>

              Status:
              {' '}
              Active User

            </p>

          </div>

          <button
            onClick={logout}
            className="w-full mt-8 bg-[#84a98c] hover:bg-[#6b9080] text-white py-4 rounded-2xl font-bold transition"
          >

            Logout

          </button>

        </div>

      </div>

    </div>

  );

}

export default Profile;