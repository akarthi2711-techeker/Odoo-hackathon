import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, CheckCircle, Loader } from 'lucide-react';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const App = () => {
  const [view, setView] = useState('menu'); // menu, cart, tracking
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (response.ok) {
          const json = await response.json();
          setProducts(json.data);
        }
      } catch (err) {
        console.error(err);
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

  const submitOrder = async () => {
    try {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const total = (subtotal * 1.1).toFixed(2);
      
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total })
      });
      
      if (response.ok) {
        const json = await response.json();
        setOrderId(json.data.id);
        setView('tracking');
      } else {
        alert('Failed to place order.');
      }
    } catch (err) {
      alert('Network Error');
    }
  };

  const renderMenu = () => (
    <div className="pb-24 animate-slide-up">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Menu</h2>
      {loading ? (
        <div className="flex justify-center py-10"><Loader className="animate-spin text-orange-500"/></div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Menu is empty. Run seed script.</div>
      ) : (
        <div className="space-y-4">
          {products.map(p => (
            <div key={p.id} className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 font-bold">☕</div>
                <div>
                  <h3 className="font-bold text-gray-800">{p.name}</h3>
                  <p className="text-orange-600 font-bold">${parseFloat(p.price).toFixed(2)}</p>
                </div>
              </div>
              <button onClick={() => addToCart(p)} className="w-10 h-10 bg-orange-500 text-white rounded-full flex justify-center items-center font-bold text-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/30">
                +
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6">
          <button onClick={() => setView('cart')} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl flex justify-between items-center px-6 animate-fade-in hover:bg-black transition-colors">
            <div className="flex items-center">
              <div className="bg-orange-500 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm mr-3">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </div>
              View Cart
            </div>
            <span className="flex items-center">${cart.reduce((s, i) => s + (i.price * i.qty), 0).toFixed(2)} <ChevronRight size={20} className="ml-2"/></span>
          </button>
        </div>
      )}
    </div>
  );

  const renderCart = () => (
    <div className="pb-24 animate-slide-up">
      <button onClick={() => setView('menu')} className="text-orange-500 font-bold mb-6 flex items-center">
        &larr; Back to Menu
      </button>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Order</h2>
      <div className="space-y-4 mb-8">
        {cart.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <span className="font-bold">{item.qty}x {item.name}</span>
            <span className="text-gray-600">${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <button onClick={submitOrder} className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:bg-orange-600 transition-colors">
        Pay with Apple Pay
      </button>
    </div>
  );

  const renderTracking = () => (
    <div className="flex flex-col items-center justify-center py-10 animate-fade-in text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex justify-center items-center mb-6">
        <CheckCircle size={48} className="text-green-500" />
      </div>
      <h2 className="text-3xl font-bold mb-2">Order Received!</h2>
      <p className="text-gray-500 mb-8">Order #{orderId}</p>
      
      <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-left relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
         <h3 className="font-bold text-xl mb-4">Status</h3>
         
         <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            <div className="relative">
              <div className="absolute -left-6 top-1 w-4 h-4 bg-orange-500 rounded-full ring-4 ring-orange-100"></div>
              <h4 className="font-bold text-gray-800">Sent to Kitchen</h4>
              <p className="text-sm text-gray-500">Your order is in the queue.</p>
            </div>
            <div className="relative opacity-40">
              <div className="absolute -left-6 top-1 w-4 h-4 bg-gray-300 rounded-full"></div>
              <h4 className="font-bold text-gray-800">Preparing</h4>
              <p className="text-sm text-gray-500">The barista is making your drinks.</p>
            </div>
            <div className="relative opacity-40">
              <div className="absolute -left-6 top-1 w-4 h-4 bg-gray-300 rounded-full"></div>
              <h4 className="font-bold text-gray-800">Ready for Pickup</h4>
              <p className="text-sm text-gray-500">Pick up at the counter.</p>
            </div>
         </div>
      </div>
      
      <button onClick={() => {setCart([]); setView('menu');}} className="mt-8 text-orange-500 font-bold">Start New Order</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans max-w-md mx-auto relative shadow-2xl overflow-y-auto">
      {/* Header */}
      <header className="bg-white p-6 sticky top-0 z-10 shadow-sm rounded-b-3xl mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight flex items-center justify-center text-gray-900">
          SMART<span className="text-orange-500 ml-1">CAFE</span>
        </h1>
        <p className="text-center text-sm text-gray-500 mt-1 font-medium">Table 12</p>
      </header>

      {/* Main Content */}
      <main className="px-6">
        {view === 'menu' && renderMenu()}
        {view === 'cart' && renderCart()}
        {view === 'tracking' && renderTracking()}
      </main>
    </div>
  );
}

export default App;
