import React from 'react';
import PSidebar from '../../Components/Ishara/PSidebar.js';


const UAccountDetails = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8 flex">
        <PSidebar />
        <div className="w-3/4 pl-8">
          <h1 className="text-2xl font-bold">Account Details</h1>
          
        </div>
      </div>
    </div>
  );
};

export default UAccountDetails; 
