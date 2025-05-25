import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import './index.css';
import AboutUS from './components/AboutUS';
import ContactUs from './components/ContactUs';
import DonorList from './components/DonorList';
import SearchDonor from './components/SearchDonor';
import Layout from './components/Layout';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/login';
import RequestReceived from './components/RequestReceived'
import RequestPage from "./components/RequestPage"
import Profile from './components/Profile'
import Forgettpassword from './components/ForgetPass'
import ResetPassword from './components/ResetPass'
import AdminLogin from './components/Admin/Login';
import AdminResetPassword from './components/Admin/AdminPassReset';
import BloodGroupPieChart from './components/Admin/PieChartBloodCount';
import DonorManagement from './components/Admin/ASdonorList';
import ContactQueries from './components/Admin/ContactQuery.js';
import AdminDashboard from './components/Admin/AdminDashbord';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUS />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="searchdonor" element={<SearchDonor />} />
            <Route path="donorlist" element={<DonorList />} />
            <Route path="registration" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="request-received" element={<RequestReceived/>} />
            <Route path="requestPage" element={<RequestPage/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="forgetpassword" element={<Forgettpassword/>} />
            <Route path="reset-password/:token" element={<ResetPassword />} />

            {/* Admin  */}
            <Route path="/admin/Dashbord" element={< AdminDashboard />} />
            <Route path="Admin-reset-password/:token" element={<AdminResetPassword />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/adminBloodGroupPieChart" element={<BloodGroupPieChart  />} />
            <Route path="/admin/DonorManagement" element={<  DonorManagement/>} />
            <Route path="/admin/ContactQueries" element={< ContactQueries/>} />
       
            

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
