import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaChartBar, FaUndoAlt, FaMoneyBillAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
  require('../../Pages/Ishara/tailwind.css')
  return (
    <div 
      style={{ backgroundColor: '#0e450e' }} 
      className="w-64 h-screen fixed top-0 left-0 text-white flex flex-col"
    >
      {/* Profile Section */}
      <div 
        style={{ backgroundColor: '#0e450e' }} 
        className="p-6 flex items-center justify-center flex-col"
      >
        <FaUserCircle size={64} className="mb-4" />
        <h2 className="text-lg font-semibold">Aradhana Admin</h2>
        <p className="text-sm">admin@aradhana.com</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-6 overflow-y-auto">
        <ul>
          <li className="mb-2">
            <Link 
              to="/sales-overview"   
              className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200"
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/statistics" 
              className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200"
            >
              <FaChartBar className="mr-3" />
              Statistics
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/refunds-manage" 
              className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200"
            >
              <FaUndoAlt className="mr-3" />
              Refunds
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/payment" 
              className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200"
            >
              <FaMoneyBillAlt className="mr-3" />
              Payment
            </Link>
          </li> 
        </ul>
      </nav>

      {/* Logout Section */}
      <div style={{ backgroundColor: '#0e450e' }} className="p-4">
        <button className="w-full flex items-center p-4 bg-red-600 hover:bg-red-500 rounded transition duration-200">
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
