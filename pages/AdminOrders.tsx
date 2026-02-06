
import React from 'react';
import { Eye, CheckCircle, Truck, XCircle, Mail } from 'lucide-react';
import { Order } from '../types';

interface AdminOrdersProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, setOrders }) => {
  const updateStatus = (id: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Order ID</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Customer</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Total</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600">Date</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-bold">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{order.customerName}</span>
                    <span className="text-xs text-gray-500 flex items-center mt-1">
                      <Mail className="w-3 h-3 mr-1" /> {order.customerEmail}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button 
                      title="Ship Order" 
                      onClick={() => updateStatus(order.id, 'Shipped')}
                      className="p-2 text-gray-400 hover:text-blue-600"
                    ><Truck className="w-4 h-4" /></button>
                    <button 
                      title="Deliver Order" 
                      onClick={() => updateStatus(order.id, 'Delivered')}
                      className="p-2 text-gray-400 hover:text-green-600"
                    ><CheckCircle className="w-4 h-4" /></button>
                    <button 
                      title="Cancel Order" 
                      onClick={() => updateStatus(order.id, 'Cancelled')}
                      className="p-2 text-gray-400 hover:text-red-600"
                    ><XCircle className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
