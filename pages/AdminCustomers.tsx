
import React from 'react';
import { Search, Mail, Phone, MapPin, Sparkles, UserCheck } from 'lucide-react';
import { Order } from '../types';

interface AdminCustomersProps {
  orders: Order[];
}

const AdminCustomers: React.FC<AdminCustomersProps> = ({ orders }) => {
  // Aggregate unique customers from orders
  const customers = Array.from(new Set(orders.map(o => o.customerEmail))).map(email => {
    const customerOrders = orders.filter(o => o.customerEmail === email);
    const totalSpent = customerOrders.reduce((a, b) => a + b.total, 0);
    return {
      name: customerOrders[0].customerName,
      email: email,
      orders: customerOrders.length,
      spent: totalSpent,
      lastOrder: customerOrders[0].date,
      status: totalSpent > 500 ? 'Platinum' : 'Standard'
    };
  });

  return (
    <div className="p-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Customer CRM</h1>
          <p className="text-slate-400 font-medium text-sm mt-1 uppercase tracking-widest">Enterprise Membership Base</p>
        </div>
        <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
           <Search className="w-4 h-4 text-slate-400 ml-4" />
           <input type="text" placeholder="Global Search Profiles..." className="bg-transparent border-none outline-none p-2 w-64 text-[10px] font-black uppercase" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
         {[
           { label: 'Verified Profiles', value: customers.length, color: 'text-indigo-600' },
           { label: 'Avg Customer Value', value: `$${(customers.reduce((a,b)=>a+b.spent, 0) / (customers.length || 1)).toFixed(0)}`, color: 'text-green-600' },
           { label: 'Retention Rate', value: '98.2%', color: 'text-amber-600' },
           { label: 'New This Week', value: '+12', color: 'text-rose-600' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-center">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Profile</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Order Cycle</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Pipeline</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Tier Status</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-10 py-8">
                   <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs uppercase">{c.name.split(' ').map(n=>n[0]).join('')}</div>
                      <div>
                         <p className="font-black text-slate-900">{c.name}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.email}</p>
                      </div>
                   </div>
                </td>
                <td className="px-10 py-8">
                   <p className="font-bold text-slate-900">{c.orders} Deliveries</p>
                   <p className="text-[10px] text-slate-400 font-medium">Last: {c.lastOrder}</p>
                </td>
                <td className="px-10 py-8 font-black text-slate-900">${c.spent.toFixed(2)}</td>
                <td className="px-10 py-8">
                   <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${c.status === 'Platinum' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {c.status}
                   </span>
                </td>
                <td className="px-10 py-8 text-right">
                   <button className="p-3 hover:bg-white rounded-2xl transition-all text-slate-400 hover:text-indigo-600 border border-transparent hover:border-slate-100">
                      <UserCheck className="w-5 h-5" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-12 bg-indigo-600 p-12 rounded-[56px] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
         <Sparkles className="absolute -left-12 -bottom-12 w-64 h-64 opacity-10 group-hover:rotate-45 transition-transform duration-700" />
         <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl font-black mb-4 tracking-tighter">AI Sentiment Prediction</h3>
            <p className="text-indigo-100 font-medium leading-relaxed opacity-90">Our Gemini engine predicts a 12% increase in high-value orders for Platinum members this quarter. We recommend activating targeted accessory campaigns.</p>
         </div>
         <button className="relative z-10 bg-white text-indigo-600 px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">Launch Insights</button>
      </div>
    </div>
  );
};

export default AdminCustomers;
