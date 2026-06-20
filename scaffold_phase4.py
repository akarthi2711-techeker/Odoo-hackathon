import os

workspace_dir = r"c:\Users\Admin\OneDrive\Desktop\odoo Hackathon"

phase4_files = {
    "kds-display/src/index.css": """@import 'bulma/css/bulma.min.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

:root {
  --kds-bg: #1A1C23;
  --kds-column: #252836;
  --kds-card: #1F1D2B;
  --kds-text: #FFFFFF;
  --kds-accent: #10B981; /* Mint */
}

body {
  background-color: var(--kds-bg);
  color: var(--kds-text);
  font-family: 'Inter', sans-serif;
  height: 100vh;
  overflow: hidden;
}

.kds-header {
  background-color: var(--kds-column);
  color: var(--kds-accent);
  padding: 1rem;
  border-bottom: 2px solid var(--kds-accent);
}

.kanban-board {
  display: flex;
  height: calc(100vh - 60px);
  padding: 1rem;
  gap: 1.5rem;
}

.kanban-column {
  flex: 1;
  background-color: var(--kds-column);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.kanban-header {
  padding: 1rem;
  font-weight: 700;
  font-size: 1.25rem;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.kanban-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.ticket-card {
  background-color: var(--kds-card);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.ticket-card:hover {
  border-color: var(--kds-accent);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.ticket-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed rgba(255,255,255,0.1);
  cursor: pointer;
}
.ticket-item.done {
  text-decoration: line-through;
  opacity: 0.5;
}
""",
    "kds-display/src/App.jsx": """import React, { useState } from 'react';
import { Clock, ChefHat } from 'lucide-react';
import './index.css';

const KDS = () => {
  const [tickets, setTickets] = useState([
    { id: 1, orderNo: 'ORD-101', table: 'T-5', time: '5m', status: 'to_cook', items: [{name: 'Espresso', qty: 2, done: false}, {name: 'Croissant', qty: 1, done: false}] },
    { id: 2, orderNo: 'ORD-102', table: 'T-2', time: '2m', status: 'preparing', items: [{name: 'Latte', qty: 1, done: true}] }
  ]);

  const toggleItemStatus = (ticketId, itemIndex) => {
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        const newItems = [...t.items];
        newItems[itemIndex].done = !newItems[itemIndex].done;
        return { ...t, items: newItems };
      }
      return t;
    }));
  };

  const moveTicket = (ticketId, nextStatus) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: nextStatus } : t));
  };

  const getTickets = (status) => tickets.filter(t => t.status === status);

  const Column = ({ title, status, nextStatus }) => (
    <div className="kanban-column">
      <div className="kanban-header text-white">{title} <span className="tag is-dark ml-2">{getTickets(status).length}</span></div>
      <div className="kanban-body">
        {getTickets(status).map(t => (
          <div key={t.id} className="ticket-card">
            <div className="ticket-header text-white" onClick={() => nextStatus && moveTicket(t.id, nextStatus)}>
              <span>#{t.orderNo} ({t.table})</span>
              <span className="has-text-warning flex items-center"><Clock size={14} className="mr-1"/> {t.time}</span>
            </div>
            <div>
              {t.items.map((item, idx) => (
                <div key={idx} className={`ticket-item ${item.done ? 'done' : ''} text-light`} onClick={() => toggleItemStatus(t.id, idx)}>
                  <span>{item.qty}x {item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="kds-header is-flex is-align-items-center">
        <ChefHat className="mr-2" />
        <h1 className="title is-4 mb-0 has-text-primary-light" style={{color: 'var(--kds-accent)'}}>SMARTCAFE 360 - KDS</h1>
      </div>
      <div className="kanban-board">
        <Column title="To Cook" status="to_cook" nextStatus="preparing" />
        <Column title="Preparing" status="preparing" nextStatus="completed" />
        <Column title="Completed" status="completed" nextStatus={null} />
      </div>
    </div>
  );
};

export default KDS;
""",
    "customer-portal/tailwind.config.js": """/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8A00',
      }
    },
  },
  plugins: [],
}
""",
    "customer-portal/postcss.config.js": """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
""",
    "customer-portal/src/index.css": """@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #FAFAFA;
}
""",
    "customer-portal/src/App.jsx": """import React, { useState } from 'react';
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
"""
}

for filename, content in phase4_files.items():
    filepath = os.path.join(workspace_dir, filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Scaffolded Phase 4 UIs.")
