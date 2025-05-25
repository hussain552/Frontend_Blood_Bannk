import { Link, Outlet } from 'react-router-dom';
import { PieChart, Users, MessageSquare, Settings } from 'react-feather';
import './AdminDash.css';

// AdminDashboard.jsx
const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="branding">
          <h2>BloodBridge Admin</h2>
        </div>
        
        <nav className="nav-menu">
          <Link to="/adminBloodGroupPieChart" className="nav-item">
            <PieChart size={20} />
            <span>Blood Stats</span>
          </Link>
          
          <Link to="/admin/DonorManagement" className="nav-item">
            <Users size={20} />
            <span>Donor Management</span>
          </Link>
          
          <Link to="/admin/ContactQueries" className="nav-item">
            <MessageSquare size={20} />
            <span>Contact Queries</span>
          </Link>
          
          <Link to="/admin/settings" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h3>Admin Dashboard</h3>
          <div className="admin-controls">
            <button className="logout-btn">Logout</button>
          </div>
        </header>
        
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard ;