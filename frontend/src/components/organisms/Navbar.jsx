import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

const Navbar = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Grab the user's email when the navbar loads
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-black text-blue-600 tracking-tighter">
              FAANG<span className="text-gray-900">PLS</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-500 hidden sm:block">
              {email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;