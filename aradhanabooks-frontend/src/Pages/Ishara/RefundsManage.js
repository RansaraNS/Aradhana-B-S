import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaSearch, FaDollarSign, FaFileInvoiceDollar, FaCalendarAlt, FaTachometerAlt, FaChartBar, FaUndoAlt, FaMoneyBillAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminHead from '../../Components/Sasin/AdminHead.js';
import AdminFoot from '../../Components/Sasin/AdminFoot.js'; 

const RefundsManage = () => {
  const [refunds, setRefunds] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [refundsPerPage] = useState(5);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const res = await axios.get('http://localhost:2001/api/refunds');
        setRefunds(res.data);
      } catch (err) {
        console.error('Error fetching refunds:', err);
      }
    };

    fetchRefunds();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const res = await axios.patch(`http://localhost:2001/api/refunds/${id}`, { status: action });
      setRefunds((prevRefunds) =>
        prevRefunds.map((refund) =>
          refund._id === id ? { ...refund, status: action } : refund
        )
      );
      console.log(res.data.message);
    } catch (error) {
      console.error('Error updating refund status:', error.response?.data || error.message);
    }
  };

  const filteredRefunds = refunds.filter((refund) => {
    const matchesStatus = filterStatus ? refund.status === filterStatus : true;
    const matchesSearchQuery = refund.customRefundId?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                               refund.orderId?.customOrderId?.toLowerCase().includes(searchQuery.toLowerCase());
    const refundDate = new Date(refund.refundDate);
    const matchesDateRange = (!startDate || refundDate >= new Date(startDate)) && (!endDate || refundDate <= new Date(endDate));
    return matchesStatus && matchesSearchQuery && matchesDateRange;
  });

  const sortedRefunds = [...filteredRefunds].sort((a, b) => {
    return sortBy === 'asc'
      ? new Date(a.refundDate) - new Date(b.refundDate)
      : new Date(b.refundDate) - new Date(a.refundDate);
  });

  const indexOfLastRefund = currentPage * refundsPerPage;
  const indexOfFirstRefund = indexOfLastRefund - refundsPerPage;
  const currentRefunds = sortedRefunds.slice(indexOfFirstRefund, indexOfLastRefund);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePDFForAllInRange = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Aradhana BookStore', 14, 20);
    doc.setFontSize(12);
    doc.text('Matara', 14, 30);
    doc.text('Phone: 0712903736', 14, 35);
    doc.text('Email: contact@aradhana.com', 14, 40);
    doc.setFontSize(16);
    doc.text(`Refund Orders Report`, 14, 50);
    doc.autoTable({
      startY: 60,
      head: [['Refund ID', 'Order ID', 'Refund Date', 'Reason', 'Status']],
      body: filteredRefunds.map((refund) => [
        refund.customRefundId, 
        refund.orderId.customOrderId, 
        refund.refundDate ? new Date(refund.refundDate).toLocaleDateString() : 'N/A',
        refund.reason,
        refund.status,
      ]),
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        halign: 'left',
        valign: 'middle',
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
      },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'center' },
        2: { halign: 'left' },
        3: { halign: 'center' },
      },
      margin: { top: 60 },
    });
    doc.setFontSize(10);
    doc.text('Generated by Ishara Madusanka', 14, doc.internal.pageSize.height - 10);
    doc.save('refunds_report.pdf');
  };

  const approvedRefunds = refunds.filter((refund) => refund.status === 'Approved');
  const totalApprovedRefunds = approvedRefunds.length;
  const totalApprovedAmount = approvedRefunds.reduce((total, refund) => total + refund.total, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHead />

      {/* Sidebar and Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div style={{ backgroundColor: '#0e450e' }} className="w-64 min-h-screen text-white flex flex-col">
          {/* Profile Section */}
          <div style={{ backgroundColor: '#0e450e' }} className="p-6 flex items-center justify-center flex-col">
            <FaUserCircle size={64} className="mb-4" />
            <h2 className="text-lg font-semibold">Aradhana Admin</h2>
            <p className="text-sm">admin@aradhana.com</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 mt-6 overflow-y-auto">
            <ul>
              <li className="mb-2">
                <a href="/sales-overview" className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200">
                  <FaTachometerAlt className="mr-3" />
                  Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a href="/statistics" className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200">
                  <FaChartBar className="mr-3" />
                  Statistics
                </a>
              </li>
              <li className="mb-2">
                <a href="/refunds-manage" className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200">
                  <FaUndoAlt className="mr-3" />
                  Refunds
                </a>
              </li>
              <li className="mb-2">
                <a href="/payment" className="flex items-center p-4 hover:bg-green-800 hover:rounded transition duration-200">
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
        <div className="flex-1 p-6 bg-gray-100">
          {/* Header and Date Filter */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Refunds Overview</h1>
            <div className="flex space-x-4 items-center">
              <FaCalendarAlt className="text-2xl text-gray-600" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded-md"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded-md"
              />
            </div>
          </div>

          {/* Top Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-md text-white flex items-center">
              <FaFileInvoiceDollar className="text-3xl mr-4" />
              <div>
                <p className="text-lg font-semibold">Total Approved Refunds</p>
                <p className="text-3xl font-bold">{totalApprovedRefunds}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-md text-white flex items-center">
              <FaDollarSign className="text-3xl mr-4" />
              <div>
                <p className="text-lg font-semibold">Total Approved Refund Amount</p>
                <p className="text-3xl font-bold">
                  LKR {totalApprovedAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <button
                className={`px-4 py-2 rounded ${filterStatus === '' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setFilterStatus('')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded ${filterStatus === 'Approved' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setFilterStatus('Approved')}
              >
                Approved
              </button>
              <button
                className={`px-4 py-2 rounded ${filterStatus === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setFilterStatus('Pending')}
              >
                Pending
              </button>
              <button
                className={`px-4 py-2 rounded ${filterStatus === 'Rejected' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setFilterStatus('Rejected')}
              >
                Rejected
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search by OrderID or RefundID"
                className="border rounded w-64 p-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="text-gray-400" />
            </div>
          </div>

          {/* Refund Table */}
          <div className="bg-white p-6 rounded shadow-md">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Refund Products</h3>
              <button
                onClick={() => generatePDFForAllInRange()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Generate Report
              </button>
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="border-b p-4 text-left">Refund ID</th>
                  <th className="border-b p-4 text-left">Order ID</th>
                  <th className="border-b p-4 text-left">Refund Date</th>
                  <th className="border-b p-4 text-left">Reason</th>
                  <th className="border-b p-4 text-left">Status</th>
                  <th className="border-b p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRefunds.map((refund) => (
                  <tr key={refund._id}>
                    <td className="border-b p-4">{refund.customRefundId}</td>
                    <td className="border-b p-4">{refund.orderId.customOrderId}</td>
                    <td className="border-b p-4">{refund.refundDate ? new Date(refund.refundDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="border-b p-4">{refund.reason}</td>
                    <td className={`border-b p-4 ${refund.status === 'Approved' ? 'text-green-600' : refund.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                      {refund.status}
                    </td>
                    <td className="border-b p-4 text-center">
                      {refund.status === 'Pending' && (
                        <>
                          <button onClick={() => handleAction(refund._id, 'Approved')} className="bg-green-200 text-green-700 px-4 py-1 rounded mr-2">Approve</button>
                          <button onClick={() => handleAction(refund._id, 'Rejected')} className="bg-red-200 text-red-700 px-4 py-1 rounded">Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`bg-gray-200 px-4 py-2 rounded mr-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              className={`bg-gray-200 px-4 py-2 rounded ${indexOfLastRefund >= sortedRefunds.length ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={indexOfLastRefund >= sortedRefunds.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AdminFoot />
    </div>
  );
};

export default RefundsManage;
