import React, { useState } from 'react';
import { ShoppingBag, QrCode, ArrowRight } from 'lucide-react';
import './index.css';

const App = () => {
  const [view, setView] = useState('menu'); // menu, cart, tracking

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-50 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl text-primary">SMARTCAFE</h1>
          <p className="text-xs text-gray-500">Table 5</p>
        </div>
        <button onClick={() => setView('cart')} className="relative p-2 text-gray-600">
          <ShoppingBag />
          <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
        </button>
      </header>

      {view === 'menu' && (
        <div className="p-4 space-y-4">
          {/* Menu Items */}
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">Premium Coffee {i}</h3>
                <p className="text-primary font-semibold">$4.50</p>
              </div>
              <button className="bg-orange-100 text-primary p-2 rounded-xl">
                Add
              </button>
            </div>
          ))}
        </div>
      )}

      {view === 'cart' && (
        <div className="p-4">
          <h2 className="font-bold text-2xl mb-4">Your Order</h2>
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
            <div className="flex justify-between mb-2"><span>Subtotal</span><span>$9.00</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span>Total</span><span>$9.00</span></div>
          </div>
          <button onClick={() => setView('tracking')} className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex justify-center items-center">
            Place Order <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
      )}

      {view === 'tracking' && (
        <div className="p-6 flex flex-col items-center justify-center text-center mt-10">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <QrCode className="text-primary" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Received!</h2>
          <p className="text-gray-500 mb-8">We are preparing your order. Track the status below.</p>
          
          <div className="w-full space-y-4">
            <div className="flex items-center text-primary font-bold">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">1</div>
              Sent to Kitchen
            </div>
            <div className="flex items-center text-gray-400">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mr-3">2</div>
              Preparing
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
