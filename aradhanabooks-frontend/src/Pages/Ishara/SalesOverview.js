import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { FaDollarSign, FaChartLine, FaCalendarAlt, FaCalculator, FaSearch, FaTachometerAlt, FaChartBar, FaUndoAlt, FaMoneyBillAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Chart, registerables } from 'chart.js';
import AdminHead from '../../Components/Sasin/AdminHead.js';
import AdminFoot from '../../Components/Sasin/AdminFoot.js';

Chart.register(...registerables);

const SalesOverview = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    recentOrders: [],
    sales: [],
    months: []
  });

  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const [expandedOrders, setExpandedOrders] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/orders/sales-overview', {
          params: {
            startDate: dateRange.start,
            endDate: dateRange.end
          }
        });
        const { totalRevenue, totalOrders, recentOrders, sales } = response.data;

        const months = sales.map(s => s.month);
        const salesData = sales.map(s => s.totalSales);

        setData({
          totalRevenue,
          totalOrders,
          recentOrders,
          sales: salesData,
          months
        });
      } catch (error) {
        console.error('Error fetching sales overview data:', error);
      }
    };

    fetchData();
  }, [dateRange]);

  const { totalRevenue, totalOrders, recentOrders, sales, months } = data;

  const salesAverage = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Total Sales',
        data: sales,
        backgroundColor: function (context) {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
          gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
          return gradient;
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
      }
    ],
  };

  const filteredOrders = recentOrders.filter((order) =>
    order.customOrderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prevExpanded) => ({
      ...prevExpanded,
      [orderId]: !prevExpanded[orderId],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHead />

      {/* Sidebar integrated into the same page */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div 
          style={{ backgroundColor: '#0e450e' }} 
          className="w-64 min-h-screen text-white flex flex-col"
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
                <a 
                  href="/sales-overview"   
                  className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200"
                >
                  <FaTachometerAlt className="mr-3" />
                  Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="/statistics" 
                  className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200"
                >
                  <FaChartBar className="mr-3" />
                  Statistics
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="/refunds-manage" 
                  className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200"
                >
                  <FaUndoAlt className="mr-3" />
                  Refunds
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="/payment" 
                  className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200"
                >
                  <FaMoneyBillAlt className="mr-3" />
                  Payment
                </a>
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

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-8 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Sales Overview</h1>

            {/* Date Range Filter */}
            <div className="flex space-x-4 items-center">
              <FaCalendarAlt className="text-2xl text-gray-600" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="border p-2 rounded-md"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="border p-2 rounded-md"
              />
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-white flex items-center">
              <FaDollarSign className="text-3xl mr-4" />
              <div>
                <p className="text-lg font-semibold">Total Revenue</p>
                <p className="text-3xl font-bold">LKR {totalRevenue.toLocaleString()}</p>
              </div>
            </div>
            {/* Total Orders */}
            <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-white flex items-center">
              <FaChartLine className="text-3xl mr-4" />
              <div>
                <p className="text-lg font-semibold">Total Orders</p>
                <p className="text-3xl font-bold">{totalOrders}</p>
              </div>
            </div>
            {/* Sales Average */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-white flex items-center">
              <FaCalculator className="text-3xl mr-4" />
              <div>
                <p className="text-lg font-semibold">Average Sales</p>
                <p className="text-3xl font-bold">LKR {salesAverage}</p>
              </div>
            </div>
          </div>

          {/* Sales Analytics */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">Sales Analytics</h2>
            <div className="w-full h-64">
              <Bar
                data={chartData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: 'top' },
                    tooltip: { enabled: true }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => 'LKR ' + value.toLocaleString()
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Orders</h2>

              {/* Search Box for Recent Orders */}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search by Order ID"
                  className="border rounded w-64 p-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="text-gray-400 ml-2" />
              </div>
            </div>

            <table className="w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2 text-center">Items Ordered</th>
                  <th className="px-4 py-2">Payment Method</th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="px-4 py-2">{order.customOrderId}</td>
                    <td className="px-4 py-2">LKR {order.total.toLocaleString()}</td>
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                    {order.items.length > 0 ? (
                      <ul className="grid grid-cols-1 gap-4">
                        {order.items.map(({ item, quantity }) => (
                          <li
                            key={item?._id || Math.random()} // Safely accessing _id or using a fallback
                            className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
                          >
                            <img
                              src={item?.itemPicture || 'https://via.placeholder.com/50'} // Use placeholder if itemPicture is null or undefined
                              alt={item?.itemName || 'Unnamed Item'} // Fallback for itemName
                              className="w-12 h-12 rounded-md border border-gray-300"
                            />
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-700">{item?.itemName || 'Unnamed Item'}</p>
                              <p className="text-sm text-gray-500">Price: LKR {item?.itemPrice || 'N/A'}</p>
                              <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No items</span>
                    )}
                    </td>
                    <td className="px-4 py-2">
                      {order.paymentMethod === 'cod' ? (
                        <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-md">
                          Cash on Delivery
                        </span>
                      ) : (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-md">
                          Card Payment
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="flex justify-end mt-4">
              <button
                className={`px-4 py-2 mr-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 rounded ${indexOfLastOrder >= filteredOrders.length ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastOrder >= filteredOrders.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AdminFoot />
    </div>
  );
};

export default SalesOverview;
