import React, { useState } from 'react';
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
