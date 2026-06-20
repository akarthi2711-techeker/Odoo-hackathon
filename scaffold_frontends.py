import os

workspace_dir = r"c:\Users\Admin\OneDrive\Desktop\odoo Hackathon"

admin_files = {
    "admin-erp/src/index.css": """@import 'bootstrap/dist/css/bootstrap.min.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap');

:root {
  --primary: #FF8A00;
  --secondary: #FFB347;
  --success: #10B981;
  --danger: #EF4444;
  --warning: #F59E0B;
  --dark: #0F172A;
  --bg: #F8FAFC;
  --cards: #FFFFFF;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Manrope', sans-serif;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg);
  color: var(--dark);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
}

/* Glassmorphism Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px 0 rgba(15, 23, 42, 0.1);
}

/* Custom Buttons */
.btn-primary {
  background-color: var(--primary);
  border-color: var(--primary);
  border-radius: 16px;
  font-family: var(--font-heading);
  font-weight: 500;
  padding: 8px 24px;
}
.btn-primary:hover {
  background-color: #E67A00;
  border-color: #E67A00;
}

/* Sidebar */
.sidebar {
  background-color: var(--dark);
  color: white;
  min-height: 100vh;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.sidebar .nav-link {
  color: rgba(255,255,255,0.7);
  font-family: var(--font-heading);
  border-radius: 12px;
  margin: 4px 12px;
  transition: all 0.2s ease;
}
.sidebar .nav-link:hover, .sidebar .nav-link.active {
  color: white;
  background-color: rgba(255,255,255,0.1);
}
""",
    "admin-erp/src/App.jsx": """import React from 'react';
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
""",
    "pos-terminal/tailwind.config.js": """/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8A00',
        secondary: '#FFB347',
        success: '#10B981',
        danger: '#EF4444',
        dark: '#0F172A',
        bg: '#F8FAFC'
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Manrope', 'sans-serif']
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      }
    },
  },
  plugins: [],
}
""",
    "pos-terminal/src/index.css": """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.05);
  }
}

body {
  background-color: #F8FAFC;
  color: #0F172A;
}
""",
    "pos-terminal/src/App.jsx": """import React, { useState } from 'react';
import { Coffee, Search, Plus, Minus, User, CreditCard } from 'lucide-react';
import './index.css';

const App = () => {
  const [cart, setCart] = useState([]);
  
  const categories = [
    { id: 1, name: 'Coffee', color: '#8B4513' },
    { id: 2, name: 'Pastries', color: '#D2691E' },
    { id: 3, name: 'Cold Drinks', color: '#4682B4' }
  ];

  const products = [
    { id: 1, name: 'Espresso', price: 3.50, catId: 1 },
    { id: 2, name: 'Latte', price: 4.50, catId: 1 },
    { id: 3, name: 'Croissant', price: 3.00, catId: 2 }
  ];

  return (
    <div className="flex h-screen font-body overflow-hidden">
      {/* 20% Left Panel - Category Tabs */}
      <div className="w-1/5 bg-white shadow-lg z-10 flex flex-col p-4">
        <h2 className="font-heading font-bold text-2xl mb-6 text-primary flex items-center">
          <Coffee className="mr-2" /> SMARTPOS
        </h2>
        <div className="space-y-3">
          {categories.map(cat => (
            <button key={cat.id} className="w-full text-left px-4 py-4 rounded-2xl transition-all hover:bg-orange-50 focus:bg-orange-100 font-heading font-medium" style={{ borderLeft: `6px solid ${cat.color}` }}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 45% Center - Product Grid */}
      <div className="w-[45%] bg-bg p-6 overflow-y-auto">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." className="w-full pl-12 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-primary" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.id} className="glass-card rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="h-32 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-400">
                Image
              </div>
              <h3 className="font-heading font-semibold">{p.name}</h3>
              <p className="text-primary font-bold mt-1">${p.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 35% Right - Cart & Payment */}
      <div className="w-[35%] bg-white shadow-xl z-10 flex flex-col p-6 rounded-l-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading font-bold text-xl">Current Order</h2>
          <button className="text-gray-400 hover:text-primary"><User size={20}/></button>
        </div>

        <div className="flex-grow overflow-y-auto mb-6">
          {/* Empty State */}
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
            <Coffee size={48} opacity={0.5} />
            <p>Cart is empty</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-3 font-heading">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax (10%)</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold text-2xl text-dark pt-2">
            <span>Total</span>
            <span>$0.00</span>
          </div>
          <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg mt-4 shadow-lg hover:bg-orange-600 transition-colors flex justify-center items-center">
            <CreditCard className="mr-2"/> Charge $0.00
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
"""
}

for filename, content in admin_files.items():
    filepath = os.path.join(workspace_dir, filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Scaffolded frontend UIs.")
