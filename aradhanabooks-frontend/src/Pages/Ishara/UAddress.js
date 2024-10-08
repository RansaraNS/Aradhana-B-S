import React, { useState, useEffect } from 'react';
import PSidebar from '../../Components/Ishara/PSidebar.js';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const UAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { register, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm();

  useEffect(() => {
    axios.get('http://localhost:2001/addresses')
      .then((response) => setAddresses(response.data))
      .catch((error) => console.error('Error fetching addresses:', error));
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAddress(null);
  };

  const onSubmit = async (data) => {
    if (isEditing) {
      try {
        await axios.put(`http://localhost:2001/addresses/${currentAddress._id}`, data);
        setAddresses(
          addresses.map((addr) => (addr._id === currentAddress._id ? { ...currentAddress, ...data } : addr))
        );
      } catch (error) {
        console.error('Error updating address:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:2001/addresses', data);
        setAddresses([...addresses, response.data]);
      } catch (error) {
        console.error('Error adding address:', error);
      }
      reset(); // Clear the form after adding a new address
    }
    closeModal();
  };

  const handleEditAddress = (address) => {
    setCurrentAddress(address);
    setIsEditing(true);
    setIsModalOpen(true);
    reset(address);
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:2001/addresses/${id}`);
      setAddresses(addresses.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAddresses = addresses.filter(address =>
    address.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    address.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    address.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const districtOptions = [
    "Select your district",
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Batticola",
    "Trincomalee",
    "Ampara",
    "Jaffna",
    "Mannar",
    "Mullaitivu",
    "Vavuniya",
    "Anuradhapura",
    "Polonnaruwa",
    "Kurunagala",
    "Puttalama",
    "Ratnapura",
    "Kegalle",
    "Galle",
    "Matara",
    "Hambantota",
    "Badulla",
    "Monaragala",
    "Kilinochchi",
  ];

  const validatePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    if (!/^\d+$/.test(phoneNumber)) {
      setError('phone', {
        type: 'manual',
        message: 'Phone number must be numeric',
      });
    } else {
      clearErrors('phone');
    }
  };

  const validateEmail = (e) => {
    const email = e.target.value;
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError('email', {
        type: 'manual',
        message: 'Invalid email format',
      });
    } else {
      clearErrors('email');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-8 flex">
        <PSidebar />
        <div className="w-3/4 pl-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">My Addresses</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button onClick={openModal} className="flex items-center bg-pink-700 hover:bg-pink-800 text-white px-4 py-2 rounded-lg shadow">
                <FaPlus className="mr-2" /> Add New Address
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAddresses.length > 0 ? (
              filteredAddresses.map((address) => (
                <div key={address._id} className="bg-white rounded-lg p-6 shadow-md relative border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl font-semibold text-gray-800">{address.firstName} {address.lastName}</p>
                      <p className="text-gray-600">{address.address}</p>
                      <p className="text-gray-600">{address.district}, {address.city}</p>
                      <p className="text-gray-600">{address.phone}</p>
                      <p className="text-gray-600">{address.email}</p>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => handleEditAddress(address)} className="text-pink-700 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteAddress(address._id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No addresses found.</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Address' : 'Add New Address'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    {...register('firstName', { required: 'First name is required' })}
                    className={`border p-2 rounded w-full mb-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    {...register('lastName', { required: 'Last name is required' })}
                    className={`border p-2 rounded w-full mb-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Address *</label>
                <input
                  type="text"
                  name="address"
                  {...register('address', { required: 'Address is required' })}
                  className={`border p-2 rounded w-full mb-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">District *</label>
                  <select
                    name="district"
                    {...register('district', { required: 'District is required' })}
                    className={`border p-2 rounded w-full mb-2 ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    {districtOptions.map((district, index) => (
                      <option key={index} value={district.toLowerCase()}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Town / City *</label>
                  <input
                    type="text"
                    name="city"
                    {...register('city', { required: 'City is required' })}
                    className={`border p-2 rounded w-full mb-2 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: { value: /^[0-9]+$/, message: 'Phone number must be numeric' },
                  })}
                  className={`border p-2 rounded w-full mb-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={validatePhoneNumber}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  {...register('email', {
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email format' },
                  })}
                  className={`border p-2 rounded w-full mb-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  onBlur={validateEmail}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="flex justify-end mt-4">
                <button type="button" onClick={closeModal} className="mr-4 text-gray-600 hover:text-gray-800">Cancel</button>
                <button type="submit" className="bg-pink-700 hover:bg-pink-800 text-white px-4 py-2 rounded-lg shadow">
                  {isEditing ? 'Update Address' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UAddress;
