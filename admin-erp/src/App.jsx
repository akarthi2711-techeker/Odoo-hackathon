import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Package, Grid } from 'lucide-react';
import './index.css';

const Dashboard = () => (
  <div className="p-4">
    <h2 className="mb-4">Dashboard Overview</h2>
    <div className="row g-4">
      {[1,2,3,4].map(i => (
        <div key={i} className="col-md-3">
          <div className="glass-card p-4">
            <h6 className="text-muted">Metric {i}</h6>
            <h3>$12,450</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar" style={{ width: '250px' }}>
          <div className="p-4">
            <h4 className="text-white">SMARTCAFE<span style={{color: '#FF8A00'}}>.</span></h4>
          </div>
          <div className="nav flex-column">
            <Link to="/" className="nav-link active"><LayoutDashboard size={18} className="me-2"/> Dashboard</Link>
            <Link to="/orders" className="nav-link"><ShoppingCart size={18} className="me-2"/> Orders</Link>
            <Link to="/products" className="nav-link"><Package size={18} className="me-2"/> Products</Link>
            <Link to="/tables" className="nav-link"><Grid size={18} className="me-2"/> Tables</Link>
            <Link to="/staff" className="nav-link"><Users size={18} className="me-2"/> Staff</Link>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow-1 bg-light">
          {/* Top Navbar */}
          <nav className="navbar navbar-light bg-white px-4 py-3 shadow-sm" style={{borderBottomLeftRadius: '20px'}}>
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">Admin ERP</span>
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" style={{width: 40, height: 40}}>
                  A
                </div>
              </div>
            </div>
          </nav>
          
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<div>Orders Page</div>} />
              <Route path="/products" element={<div>Products Page</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
