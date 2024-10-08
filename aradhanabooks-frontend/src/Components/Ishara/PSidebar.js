import React from 'react';
import { Link, useLocation } from 'react-router-dom';   

const PSidebar = () => {
  const location = useLocation();
  require('../../Pages/Ishara/tailwind.css')
  return (
    <div className="w-1/4 pr-8 border-r border-gray-200">
      <div className="flex items-center mb-8">
        <div className="rounded-full bg-gray-500 w-16 h-16 flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">IM</span>
        </div> 
        <div className="ml-4">
          <p className="text-gray-500 text-sm">Welcome Back,</p>
          <p className="font-bold text-lg text-gray-800">Ishara Madusanka</p>
        </div>
      </div>
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className={`block py-3 px-5 rounded-lg font-medium transition-colors ${
            location.pathname === '/dashboard' ? 'bg-[#ffebf5] text-[#c21c63]' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/orders"
          className={`block py-3 px-5 rounded-lg font-medium transition-colors ${
            location.pathname === '/orders' ? 'bg-[#ffebf5] text-[#c21c63]' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Orders
        </Link>
        <Link
          to="/address"
          className={`block py-3 px-5 rounded-lg font-medium transition-colors ${
            location.pathname === '/address' ? 'bg-[#ffebf5] text-[#c21c63]' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Address
        </Link>
        <Link
          to="/account-details"
          className={`block py-3 px-5 rounded-lg font-medium transition-colors ${
            location.pathname === '/account-details' ? 'bg-[#ffebf5] text-[#c21c63]' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Account Details
        </Link>
        
      </nav>
    </div>
  );
};

export default PSidebar;
