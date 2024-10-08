import React from 'react';
import PSidebar from '../../Components/Ishara/PSidebar.js';


const UDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8 flex">
        <PSidebar />
        <div className="w-3/4 pl-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 py-10	font-semibold">From your account dashboard you can view your <a href='/orders' className='text-pink-700'>recent orders</a>, manage your <a href='/address' className='text-pink-700'>shipping addresses</a>, and edit your password and <a href='/account-details' className='text-pink-700'>account details</a>.</p>
          
        </div>
      </div>
    </div>
  );
};

export default UDashboard; 
