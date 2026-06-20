import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Flame, Bell } from 'lucide-react';
import { io } from 'socket.io-client';
import 'bulma/css/bulma.min.css';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Connect to root backend
const socket = io(API_URL.replace('/api', ''), { transports: ['websocket', 'polling'] });

const App = () => {
  const [orders, setOrders] = useState([
    { id: 1001, time: '10:45 AM', status: 'To Cook', items: [{ name: 'Espresso', qty: 2, done: false }, { name: 'Croissant', qty: 1, done: false }] }
  ]);
  const [newOrderAlert, setNewOrderAlert] = useState(false);

  useEffect(() => {
    socket.on('new_order', (order) => {
      setOrders(prev => [...prev, { ...order, items: order.items.map(i => ({...i, done: false})) }]);
      setNewOrderAlert(true);
      setTimeout(() => setNewOrderAlert(false), 3000);
      
      // Play a tiny beep sound using AudioContext
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      } catch (e) {}
    });

    return () => {
      socket.off('new_order');
    };
  }, []);

  const toggleItemDone = (orderId, itemIndex) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        const newItems = [...o.items];
        newItems[itemIndex].done = !newItems[itemIndex].done;
        return { ...o, items: newItems };
      }
      return o;
    }));
  };

  const moveOrder = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const renderColumn = (title, status, colorClass, icon) => {
    const columnOrders = orders.filter(o => o.status === status);
    return (
      <div className="column is-one-third flex flex-col h-full">
        <div className={`p-4 rounded-t-lg ${colorClass} text-white font-bold text-xl flex items-center justify-between`}>
          <div className="flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </div>
          <span className="tag is-white is-rounded">{columnOrders.length}</span>
        </div>
        <div className="bg-gray-800 p-4 flex-1 overflow-y-auto rounded-b-lg border border-gray-700">
          {columnOrders.length === 0 ? (
            <div className="text-gray-500 text-center mt-10">No tickets</div>
          ) : (
            columnOrders.map(order => (
              <div key={order.id} className="card bg-gray-900 border border-gray-700 mb-4 rounded-lg overflow-hidden animate-fade-in shadow-lg">
                <div className="card-header bg-gray-800 border-b border-gray-700 p-3 flex justify-between items-center">
                  <h3 className="text-white font-bold text-lg">#{order.id}</h3>
                  <div className="text-gray-400 flex items-center text-sm">
                    <Clock size={14} className="mr-1" /> {order.time || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
                <div className="card-content p-4">
                  <ul>
                    {order.items.map((item, idx) => (
                      <li 
                        key={idx} 
                        onClick={() => toggleItemDone(order.id, idx)}
                        className={`text-lg py-2 border-b border-gray-800 cursor-pointer transition-colors hover:bg-gray-800 px-2 rounded ${item.done ? 'line-through text-gray-500' : 'text-gray-200'}`}
                      >
                        <span className="font-bold mr-2 text-orange-400">{item.qty}x</span> {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer border-t border-gray-700 flex p-2 space-x-2">
                  {status === 'To Cook' && (
                    <button onClick={() => moveOrder(order.id, 'Preparing')} className="button is-warning is-fullwidth font-bold">Start Prep</button>
                  )}
                  {status === 'Preparing' && (
                    <button onClick={() => moveOrder(order.id, 'Completed')} className="button is-success is-fullwidth font-bold">Mark Complete</button>
                  )}
                  {status === 'Completed' && (
                    <button onClick={() => moveOrder(order.id, 'Archived')} className="button is-dark is-fullwidth text-gray-400">Archive</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen kds-bg p-6 flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wider flex items-center">
            <Flame className="text-orange-500 mr-3" size={32} />
            SMARTCAFE KITCHEN
          </h1>
          <p className="text-gray-400 text-sm mt-1">Live Order Management System</p>
        </div>
        
        {newOrderAlert && (
           <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold flex items-center animate-pulse shadow-lg shadow-orange-500/50">
             <Bell className="mr-2" size={18} /> NEW ORDER RECEIVED
           </div>
        )}
        
        <div className="flex items-center text-gray-300">
           <div className="w-3 h-3 bg-green-500 rounded-full mr-2 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
           WebSocket Connected
        </div>
      </div>

      {/* Kanban Board */}
      <div className="columns flex-1 gap-6">
        {renderColumn('To Cook', 'To Cook', 'bg-red-600', <Flame size={20} />)}
        {renderColumn('Preparing', 'Preparing', 'bg-yellow-600', <Clock size={20} />)}
        {renderColumn('Completed', 'Completed', 'bg-green-600', <CheckCircle size={20} />)}
      </div>
    </div>
  );
}

export default App;
