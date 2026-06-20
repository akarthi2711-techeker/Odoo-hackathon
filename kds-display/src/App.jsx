import React, { useState } from 'react';
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
