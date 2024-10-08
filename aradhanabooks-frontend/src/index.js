import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from '../src/Pages/Sasin/Home.js';
import Item from './Pages/Sasin/Item.js';
import ItemAdd from './Pages/Sasin/AddItem.js';
import ItemUpdate from '../src/Pages/Sasin/UpdateItem.js';
import ItemTable from '../src/Pages/Sasin/TableItem.js';

import ReqTable from "./Pages/Piyumal/ReqTable.js";
import ReqForm from "./Pages/Piyumal/ReqForm.js";
import UpdateForm from "./Pages/Piyumal/UpdateForm.js"
import SingleDetail from "./Pages/Piyumal/SingleDetail.js";
import PreviewItem from "./Pages/Piyumal/PreviewItem.js";
import ViewCart from "./Pages/Piyumal/ViewCart.js";

import ComplaintForm from "./Pages/Iresha/ComplaintForm";
import ComplaintsDisplay from "./Pages/Iresha/ComplaintsDisplay";
import ComplaintUpdate from "./Pages/Iresha/ComplaintUpdate";
import ComplaintDisplayAdmin from "./Pages/Iresha/ComplaintDisplayAdmin";
import ComplaintPendingAdmin from "./Pages/Iresha/ComplaintPendingAdmin";
import ComplaintCompletedAdmin from "./Pages/Iresha/ComplaintCompletedAdmin";
import ComplaintReplyAdmin from "./Pages/Iresha/ComplaintReplyAdmin";
import ComplaintReportAdmin from "./Pages/Iresha/ComplaintReportAdmin";
import ReviewAdd from "./Pages/Iresha/ReviewAdd";
import ReviewDisplay from "./Pages/Iresha/ReviewDisplay";
import ReviewDisplayAdmin from "./Pages/Iresha/ReviewDisplayAdmin";
import ConditionAndTerms from "./Pages/Iresha/ConditionAndTerms";

import TrackHome from "./Pages/KIshara/TrackHome.js";
import AdminOrderCancel from "./Pages/KIshara/AdminOrderCancel";
import AdminSendEmail from "./Pages/KIshara/AdminSendEmail";
import AdminTrackAllorder from "./Pages/KIshara/AdminTrackAllOrder";
import AdminTrackAllOrders from "./Pages/KIshara/AdminTrackAllOrders";
import AdminTrackReport from "./Pages/KIshara/AdminTrackReport";
import AdminTrackInquiry from "./Pages/KIshara/AdminInquiry";
import AdminCompleOrders from "./Pages/KIshara/AdminCompleOrders";
import AdminInProgress from "./Pages/KIshara/AdminInProgress";
import AdminPendingOrders from "./Pages/KIshara/AdminPendingOrders";
import AdminPendingOrderDetails from "./Pages/KIshara/AdminPendingOrderDetails";
import CusInquiryDetail from "./Pages/KIshara/CusInquiryDetail";
import CusTrackOrderDetail from "./Pages/KIshara/CusTrackOrderDetail";
import CusTrackHome from "./Pages/KIshara/CusTrackHome";
import CusTrackInquiryForm from "./Pages/KIshara/CusTrackInquiryForm";
import CusUpdateInquiryForm from "./Pages/KIshara/CusUpdateInquiryForm";
import CusTrackPortal from "./Pages/KIshara/CusTrackPortal";

//import NavBar from './Components/Malitha/NavBar.js';
import CustomerLogin from './Components/Malitha/Auth/CustomerLogin.js';
import StaffLogin from './Components/Malitha/Auth/StaffLogin.js';
import AdminLogin from './Components/Malitha/Auth/AdminLogin.js';
import Register from './Components/Malitha/Auth/Register.js';
import AdminControlPanel from './Components/Malitha/Auth/AdminControlPanel.js';
import StaffDashboard from './Components/Malitha/Auth/StaffDashboard.js';
import AddStaff from './Components/Malitha/Auth/AddStaff.js'; 
import UpdateStaffForm from './Components/Malitha/Auth/UpdateStaffForm.js';
import CustomerDashboard from './Components/Malitha/Auth/CustomerDashboard.js';
import UpdateCustomerForm from './Components/Malitha/Auth/UpdateCustomerForm';
import DiscountManager from './Pages/Malitha/DiscountManager.js';
import DiscountPage from './Pages/Malitha/DiscountPage.js';

import Expenses from './Pages/Luthira/Expensespage';
import CreateExpenses from './Pages/Luthira/CreateExpensespage';
import GenReport from './Pages/Luthira/GenReportpage';
import PartTwo from './Pages/Luthira/PartTwopage';
import CreateSalary from './Pages/Luthira/CreateSalarypage';
import Commision from './Pages/Luthira/Commisionpage';
import SalaryDetails from './Pages/Luthira/SalaryDetailspage';

import Checkout from './Pages/Ishara/Checkout.js';
import PaymentSuccess from './Pages/Ishara/PaymentSuccess.js';
import UDashboard from './Pages/Ishara/UDashboard.js';
import CardPayment from './Pages/Ishara/CardPayment.js';
import UOrders from './Pages/Ishara/UOrders.js';
import UAddress from './Pages/Ishara/UAddress.js';
import UAccountDetails from './Pages/Ishara/UAccountDetails.js';
import RefundProcess from './Pages/Ishara/RefundProcess.js';
import RefundsManage from './Pages/Ishara/RefundsManage.js';
import SalesOverview from './Pages/Ishara/SalesOverview.js';

import Riders from './Pages/Janith/RidersPage.js';
import CreateRider from './Pages/Janith/CreateRiderPage.js';
import Report from './Pages/Janith/ReportsPage.js';
import Orders from './Pages/Janith/OrdersPage.js';
import RiderProfiles from './Pages/Janith/RiderProfilePage.js';
import App from './Pages/Janith/AppPage.js';
import CompletedOrders from './Components/Janith/CompletedOrders.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      
      <Route path='/home' element={<Home />} />
      <Route path='/itemtable' element={<ItemTable />} />
      <Route path='/item' element={<Item />} />
      <Route path='/itemadd' element={<ItemAdd />} />
      <Route path='/itemupdate/:itemId' element={<ItemUpdate />} />

      <Route path='/wcall' element={<ReqTable />} />
      <Route path='/wcform' element={<ReqForm />} />
      <Route path='wc/update/:id' element={<UpdateForm />} />
      <Route path="/wc/:id" element={<SingleDetail />} />
      <Route path="/item/:itemCode" element={<PreviewItem />} />
      <Route path="/cart" element={<ViewCart />} />

      <Route path="/complaint/add" element={<ComplaintForm/>} />
      <Route path="/complaint/display" element={<ComplaintsDisplay />} />
      <Route path="/complaint/update/:id" element={<ComplaintUpdate />} />
      <Route path="/admin/complaints" element={<ComplaintDisplayAdmin/>} />
      <Route path="/admin/complaints/pending" element={<ComplaintPendingAdmin />} />
      <Route path="/admin/complaints/completed" element={<ComplaintCompletedAdmin />} />
      <Route path="/admin/complaint/reply/:id" element={ <ComplaintReplyAdmin />} />
      <Route path="/admin/complaints/report" element={<ComplaintReportAdmin />} />
      <Route path="/review/add" element={<ReviewAdd />} />
      <Route path="/review/display" element={<ReviewDisplay />} />
      <Route path="/admin/review/display" element={<ReviewDisplayAdmin />} />
      <Route path="/terms" element={<ConditionAndTerms/>}/>

      <Route path="/tracking" element={<TrackHome />} />
      <Route path="/report" element={<AdminTrackReport />} />
      <Route path="/CusHome" element={<CusTrackHome />} />
      <Route path="/CusTrack" element={<CusTrackPortal />} />
      <Route path="/PendingOrders" element={<AdminPendingOrders />} />
      <Route path="/order/:id" element={<AdminPendingOrderDetails />} />
      <Route path="/in-progress" element={<AdminInProgress />} />
      <Route path="/cancel" element={<AdminOrderCancel />} />
      <Route path="/send-email" element={<AdminSendEmail />} />
      <Route path="/alltracking" element={<AdminTrackAllOrders />} />
      <Route path="/order/status/:id" element={<AdminTrackAllorder />} />
      <Route path="/completed" element={<AdminCompleOrders />} />
      <Route path="CusOrderDetail" element={<CusTrackOrderDetail />} />
      <Route path="/track-inquiry" element={<CusTrackInquiryForm />} />
      <Route path="/inquiries" element={<AdminTrackInquiry />} />
      <Route path="/inquiry/:id" element={<CusInquiryDetail />} />
      <Route path="/inquiry/update/:id" element={<CusUpdateInquiryForm />} />

      <Route path='/' element={<CustomerLogin />} />
      <Route path="/staff-login" element={<StaffLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-control-panel" element={<AdminControlPanel />} />
      <Route path="/staff-management" element={<StaffDashboard />} />
      <Route path="/add-staff" element={<AddStaff />} />
      <Route path="/update-staff/:email" element={<UpdateStaffForm />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/update-customer/:email" element={<UpdateCustomerForm />} />
      <Route path="/discount-manager" element={<DiscountManager />} />
      <Route path="/discount-page" element={<DiscountPage />} />

      <Route path="/expenses" element={<PartTwo />} />
      <Route path="/expensesview" element={<Expenses />} />
      <Route path="/createExpenses" element={<CreateExpenses />} />
      <Route path="/GenReport" element={<GenReport />} />
      <Route path="/CreateSalary" element={<CreateSalary />} />
      <Route path="/SalaryDetails" element={<SalaryDetails />} />
      <Route path="/Commision" element={<Commision />} />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/card-payment" element={<CardPayment />} />
      <Route path="/dashboard" element={<UDashboard />} /> 
      <Route path="/orders" element={<UOrders />} /> 
      <Route path="/address" element={<UAddress />} /> 
      <Route path="/account-details" element={<UAccountDetails />} /> 
      <Route path="/refund-process" element={<RefundProcess />} /> 
      <Route path="/refunds-manage" element={<RefundsManage />} />
      <Route path="/sales-overview" element={<SalesOverview />} />

      <Route path='/delivery' element={<App />} />
      <Route path='/createRider' element={<CreateRider />} />
      <Route path='/riders' element={<Riders />} />
      <Route path='/rider-profiles' element={<RiderProfiles />} />
      <Route path='/reports' element={<Report />} />
      <Route path='/porders' element={<Orders />} />
      <Route path="/completed-orders" element={<CompletedOrders />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
