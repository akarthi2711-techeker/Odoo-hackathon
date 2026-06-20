import React, { useState, useEffect } from 'react';
import { Coffee, Search, Plus, Minus, User, CreditCard, Loader } from 'lucide-react';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const categories = [
    { id: 1, name: 'Coffee', color: '#8B4513' },
    { id: 2, name: 'Pastries', color: '#D2691E' },
    { id: 3, name: 'Cold Drinks', color: '#4682B4' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const json = await response.json();
        setProducts(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const submitOrder = async () => {
    if (cart.length === 0) return;
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total: (subtotal * 1.1).toFixed(2) })
      });
      if (response.ok) {
        alert('Order submitted successfully!');
        setCart([]); // clear cart
      }
    } catch (err) {
      alert('Error submitting order');
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.10;
  const total = subtotal + tax;

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
        
        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
             <Loader className="animate-spin mr-2" /> Fetching products from AWS...
          </div>
        ) : error ? (
           <div className="text-red-500 text-center">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-gray-400 text-center">No products found in the database. Run backend seed script!</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p.id} onClick={() => addToCart(p)} className="glass-card rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group border border-white/50 bg-white/40">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-24 bg-orange-50 rounded-xl mb-3 flex items-center justify-center text-orange-200">
                  <Coffee size={32} />
                </div>
                <h3 className="font-heading font-semibold text-gray-800">{p.name}</h3>
                <p className="text-primary font-bold mt-1">${parseFloat(p.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 35% Right - Cart & Payment */}
      <div className="w-[35%] bg-white shadow-xl z-10 flex flex-col p-6 rounded-l-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading font-bold text-xl">Current Order</h2>
          <button className="text-gray-400 hover:text-primary"><User size={20}/></button>
        </div>

        <div className="flex-grow overflow-y-auto mb-6 pr-2 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
              <Coffee size={48} opacity={0.5} />
              <p>Cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-primary font-medium">${parseFloat(item.price).toFixed(2)} x {item.qty}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-lg">${(item.price * item.qty).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="p-1 text-red-400 hover:bg-red-50 rounded-md">
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 space-y-3 font-heading">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-2xl text-dark pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button onClick={submitOrder} disabled={cart.length === 0} className={`w-full py-4 rounded-2xl font-bold text-lg mt-4 shadow-lg transition-colors flex justify-center items-center ${cart.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-orange-600'}`}>
            <CreditCard className="mr-2"/> Charge ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
