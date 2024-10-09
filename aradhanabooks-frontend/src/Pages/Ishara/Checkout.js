import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom'; 
import axios from 'axios';

const Checkout = () => {
  const { register, handleSubmit, setValue, resetField, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation(); 
  require('./tailwind.css')

  const [cartItems, setCartItems] = useState(location.state?.cart || []); 
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingCharges, setShippingCharges] = useState(0);
  const [totalBill, setTotalBill] = useState(0); 
  const [phoneError, setPhoneError] = useState(''); 
  const [emailError, setEmailError] = useState(''); 
  const [addresses, setAddresses] = useState([]); // State for saved addresses
  const [useSavedAddress, setUseSavedAddress] = useState(false); // Checkbox state

  const shippingRates = {
    colombo: 50,
    gampaha: 60,
    kalutara: 70,
    kandy: 80,
    matale: 90,
    "nuwara eliya": 100,
    batticola: 110,
    trincomalee: 120,
    ampara: 130,
    jaffna: 140,
    mannar: 150,
    mullaitivu: 160,
    vavuniya: 170,
    anuradhapura: 180,
    polonnaruwa: 190,
    kurunagala: 200,
    puttalama: 210,
    ratnapura: 220,
    kegalle: 230,
    galle: 240,
    matara: 250,
    hambantota: 260,
    badulla: 270,
    monaragala: 280,
    kilinochchi: 290,
  };

  const selectedDistrict = watch('district');

  // Fetch saved addresses from the database
  useEffect(() => {
    axios.get('http://localhost:2001/addresses')
      .then((response) => setAddresses(response.data))
      .catch((error) => console.error('Error fetching addresses:', error));
  }, []);

  const updateShippingCharges = (district) => {
    const charges = shippingRates[district.toLowerCase()] || 0;
    const cartTotal = cartItems.reduce((total, item) => total + item.item.itemPrice * item.quantity, 0);
    setShippingCharges(charges);
    setTotalBill(cartTotal + charges);
  };

  useEffect(() => {
    const cartTotal = cartItems.reduce((total, item) => total + item.item.itemPrice * item.quantity, 0);
    setTotalBill(cartTotal + shippingCharges);
  }, [cartItems, shippingCharges]);

  // Autofill the form with the first saved address when the checkbox is checked
  useEffect(() => {
    if (useSavedAddress && addresses.length > 0) {
      const firstAddress = addresses[0];
      setValue('firstName', firstAddress.firstName);
      setValue('lastName', firstAddress.lastName);
      setValue('address', firstAddress.address);
      setValue('district', firstAddress.district);
      setValue('city', firstAddress.city);
      setValue('phone', firstAddress.phone);
      setValue('email', firstAddress.email);
    } else if (!useSavedAddress) {
      // Clear the fields if the checkbox is unchecked
      resetField('firstName');
      resetField('lastName');
      resetField('address');
      resetField('district');
      resetField('city');
      resetField('phone');
      resetField('email');
    }
  }, [useSavedAddress, addresses, setValue, resetField]);

  const saveOrderToDatabase = async (orderData) => {
    try {
      const response = await axios.post('http://localhost:2001/api/orders/create', orderData);
      console.log('Order saved successfully:', response.data.customOrderId);  // The generated customOrderId is available in the response
    } catch (error) {
      console.error('Error saving order:', error.response?.data || error.message);
    }
  };

  const saveAddressToDatabase = async (addressData) => {  
    try {
      await axios.post('http://localhost:2001/addresses', addressData);
      console.log('Address saved successfully.');
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const orderData = {
        items: cartItems,
        total: totalBill,
        paymentMethod,
        shippingAddress: data,
      };

      // Save the order to the database
      await saveOrderToDatabase(orderData);

      // Save the address to the database if it's not autofilled
      if (!useSavedAddress) {
        const addressData = {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          district: data.district,
          city: data.city,
          phone: data.phone,
          email: data.email,
        };
        await saveAddressToDatabase(addressData);
      }

      // Navigate based on the payment method
      if (paymentMethod === 'cod') {
        navigate('/payment-success');
      } else if (paymentMethod === 'card') {
        navigate('/card-payment', {
          state: {
            subtotal: totalBill - shippingCharges,
            shippingCharges,
            total: totalBill,
          },
        });
      }
    } catch (error) {
      console.error('Error during the checkout process:', error);
      alert('There was an issue with your order. Please try again.');
    }
  };

  const validatePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
  
    // Check if it starts with 0 and is exactly 10 digits long
    if (!/^0\d{9}$/.test(phoneNumber)) {
      setPhoneError('Phone number must start with 0 and be exactly 10 digits long');
    } else {
      setPhoneError('');
    }
  };

  const validateEmail = (e) => {
    const email = e.target.value;
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen flex justify-center py-12" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Shipping & Billing Details */}
            <div>
              <h2 className="text-2xl font-bold mb-8" style={{ color: '#f04681' }}>Shipping & Billing Details</h2> 
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium">First Name *</label>
                    <input
                      type="text"
                      className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring focus:ring-blue-300`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium">Last Name *</label>
                    <input
                      type="text"
                      className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring focus:ring-blue-300`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Address *</label>
                  <input
                    type="text"
                    className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring focus:ring-blue-300`}
                    {...register('address', { required: 'Address is required' })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>)}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium">District *</label>
                    <select
                      className={`w-full border ${errors.district ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring focus:ring-blue-300`}
                      {...register('district', { required: 'District is required' })}
                      onChange={(e) => updateShippingCharges(e.target.value)}
                    >
                      <option value="">Select your district</option>
                      {Object.keys(shippingRates).map((district) => (
                        <option key={district} value={district}>
                          {district.charAt(0).toUpperCase() + district.slice(1)}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium">Town / City *</label>
                    <input
                      type="text"
                      className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring focus:ring-blue-300`}
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                </div>
                <div>
  <label className="block font-medium">Phone *</label>
  <input
    type="text"
    className={`w-full border ${phoneError ? 'border-red-500' : errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring focus:ring-blue-300`}
    {...register('phone', {
      required: 'Phone number is required',
      pattern: {
        value: /^[0-9]+$/,
        message: 'Phone number must be numeric',
      },
    })}
    onBlur={(e) => {
      const phoneNumber = e.target.value;
      if (phoneNumber.length !== 10) {
        setPhoneError('Enter valid phone number');
      } else {
        setPhoneError('');
      }
    }}
  />
  {phoneError && (
    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
  )}
  {errors.phone && !phoneError && (
    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
  )}
</div>

                <div>
                  <label className="block font-medium">Email Address *</label>
                  <input
                    type="email"
                    className={`w-full border ${emailError ? 'border-red-500' : errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring focus:ring-blue-300`}
                    {...register('email', {
                      required: false,
                      pattern: { value: /^\S+@\S+\.\S+$$/, message: 'Email address is invalid' },
                    })}
                    onBlur={validateEmail}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                  {errors.email && !emailError && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* New Checkbox for Autofill */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => setUseSavedAddress(!useSavedAddress)}
                  />
                  <label className="block font-medium">Use saved address</label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col bg-gray-50 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-8" style={{ color: '#f04681' }}>Your Order</h2>
              <div className="space-y-4">
                {cartItems.map(({ item, quantity }) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.itemPicture || 'default-image-url.jpg'}
                        alt={item.itemName}
                        className="w-16 h-20 object-cover rounded-md shadow-sm mr-4"
                        onError={(e) => { e.target.src = 'default-image-url.jpg'; }}
                      />
                      <div>
                        <p className="font-semibold">{item.itemName}</p>
                        <p className="text-sm text-gray-500">Qty: {quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold">LKR {item.itemPrice * quantity}</span>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>LKR {cartItems.reduce((total, { item, quantity }) => total + item.itemPrice * quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-medium mt-4">
                <span>Shipping</span>
                <span>LKR {shippingCharges}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>LKR {totalBill}</span>
              </div>
              <h3 className="text-lg font-semibold mt-8" style={{ color: '#f04681' }}>Select Payment Method</h3>
              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    className="mr-2 focus:ring focus:ring-blue-300"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="card">Credit or Debit Card</label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    value="cod"
                    className="mr-2 focus:ring focus:ring-blue-300"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-pink-700 hover:bg-pink-800 transition text-white font-semibold w-full rounded-lg py-3 mt-8 focus:ring focus:ring-blue-300"
              >
                Pay Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
