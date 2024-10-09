import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PSidebar from '../../Components/Ishara/PSidebar.js';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CHeader from '../../Components/Sasin/HomeHead';
import CFooter from '../../Components/Sasin/HomeFoot';


const UOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(4); // Set to 4 orders per page
  const [filter, setFilter] = useState('');
  const [expandedOrders, setExpandedOrders] = useState({});
  const navigate = useNavigate();
  require('./tailwind.css')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:2001/api/orders');
        // Sort orders by date (newest first)
        const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const handleReceived = async (orderId) => {
    try {
      await axios.patch(`http://localhost:2001/api/orders/${orderId}/mark-received`);
      
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'Received', refundRequested: false } : order
        )
      );
    } catch (error) {
      console.error('Error marking order as received:', error);
    }
  };
  

  const handleReturnRefund = async (order) => {
    navigate('/refund-process', { state: { order } });
    
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o._id === order._id ? { ...o, refundRequested: true } : o
      )
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prevExpanded) => ({
      ...prevExpanded,
      [orderId]: !prevExpanded[orderId],
    }));
  };

  const filteredOrders = orders.filter((order) =>
    order._id.includes(filter) || order.shippingAddress.firstName.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div><CHeader /> <div  className='py-8 '>

    <div className="min-h-screen bg-gray-100 flex justify-center py-12">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-8 flex">
        <PSidebar />
        <div className="w-3/4 pl-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
            <input
              type="text"
              placeholder="Search Orders..."
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
          {filteredOrders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div>
              <div className="mb-4 flex justify-between">
                <div>
                  <span className="text-gray-600">Page {currentPage} of {Math.ceil(filteredOrders.length / ordersPerPage)}</span>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className={`ml-4 px-4 py-2 bg-gray-200 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className={`ml-2 px-4 py-2 bg-gray-200 rounded-lg ${currentPage === Math.ceil(filteredOrders.length / ordersPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {currentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
                    <div>
  <h2 className="text-xl font-semibold text-gray-700">Order #{order.customOrderId}</h2>  {/* Use customOrderId */}
  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
</div>

                      <p className="text-lg text-gray-800 font-medium">Total: LKR {order.total}</p>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-medium text-gray-700">Order Details</h3>
                      <button
                        className="text-gray-500 hover:text-gray-700 flex items-center mt-2"
                        onClick={() => toggleOrderDetails(order._id)}
                      >
                        {expandedOrders[order._id] ? (
                          <>
                            <FaChevronUp className="w-5 h-5 mr-1" />
                            <span>Hide Details</span>
                          </>
                        ) : (
                          <>
                            <FaChevronDown className="w-5 h-5 mr-1" />
                            <span>Show Details</span>
                          </>
                        )}
                      </button>
                      {expandedOrders[order._id] && (
                        <div className="mt-4">
                          <ul className="grid grid-cols-1 gap-4">
                            {order.items.map(({ item, quantity }) => (
                              <li
                                key={item._id}
                                className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
                              >
                                <img
                                  src={item.itemPicture || 'https://via.placeholder.com/50'}
                                  alt={item.itemName}
                                  className="w-12 h-12 rounded-md border border-gray-300"
                                />
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-700">{item.itemName}</p>
                                  <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex justify-end space-x-4 items-center">
                      {!order.refundRequested && order.status !== 'Received' && (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
                            onClick={() => handleReceived(order._id)}
                          >
                            Mark as Received
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                            onClick={() => handleReturnRefund(order)}
                          >
                            Request Refund
                          </button>
                        </>
                      )}
                      {order.status === 'Received' && !order.refundRequested && (
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow cursor-not-allowed"
                          disabled
                        >
                          Received
                        </button>
                      )}
                      {order.refundRequested && (
                        <span className="text-red-600 font-bold">Refund Requested</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div></div><CFooter /></div>
  );
};

export default UOrders;
