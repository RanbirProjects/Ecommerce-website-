
import React, { useState } from 'react';
import { Trash2, Minus, Plus, ShoppingBag, CreditCard, ChevronRight, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { DISCOUNT_CODES } from '../constants';

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  placeOrder: (name: string, email: string, discount: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, removeFromCart, updateQuantity, placeOrder }) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{code: string, pct: number} | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountVal = activeDiscount ? (subtotal * (activeDiscount.pct / 100)) : 0;
  const shipping = subtotal > 500 ? 0 : 45;
  const total = subtotal - discountVal + shipping;

  const applyPromo = () => {
    const found = DISCOUNT_CODES.find(d => d.code.toUpperCase() === promoCode.toUpperCase());
    if (found) {
      setActiveDiscount({ code: found.code, pct: found.percentage });
      alert(`Applied ${found.percentage}% discount!`);
    } else {
      alert("Invalid promo code.");
    }
    setPromoCode('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(formData.name, formData.email, activeDiscount?.pct || 0);
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="max-w-xl mx-auto py-32 px-4 text-center">
        <div className="w-24 h-24 bg-indigo-100 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-lg rotate-12">
          <ChevronRight className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">Order Placed.</h2>
        <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">Your request is being processed by our global fulfillment network. A confirmation has been sent to your business email.</p>
        <button 
          onClick={() => window.location.hash = '/'} 
          className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl"
        >
          Explore More Collections
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-32 h-32 bg-slate-100 rounded-[48px] flex items-center justify-center mx-auto mb-12">
          <ShoppingBag className="w-16 h-16 text-slate-300" />
        </div>
        <h2 className="text-4xl font-black mb-6 text-slate-900 tracking-tighter">Your Bag is Empty</h2>
        <p className="text-slate-400 mb-12 max-w-sm mx-auto font-medium leading-relaxed text-lg">Your curated luxury collection is waiting to be built. Explore our storefront to get started.</p>
        <button onClick={() => window.location.hash = '/'} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl">Start Curating</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex items-center space-x-4 mb-16">
         <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Shopping Bag</h1>
         <div className="bg-slate-100 text-slate-500 px-4 py-2 rounded-2xl text-sm font-black">{cart.length} Items</div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-10">
          {cart.map(item => (
            <div key={item.id} className="flex bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow items-center relative overflow-hidden group">
              <div className="w-40 h-40 bg-slate-50 rounded-3xl overflow-hidden flex-shrink-0 border-2 border-slate-50 shadow-inner">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="ml-10 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2">{item.name}</h3>
                    <p className="text-xs font-black uppercase tracking-widest text-indigo-500">{item.category} Collection</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-2">
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-3 hover:text-indigo-600 transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="w-12 text-center font-black text-slate-900">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-3 hover:text-indigo-600 transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-2 h-full bg-slate-50"></div>
            </div>
          ))}
        </div>

        <div className="space-y-10">
          <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black mb-10 text-slate-900 tracking-tight">Order Architecture</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-slate-400 font-bold text-sm uppercase tracking-widest">
                <span>Enterprise Subtotal</span>
                <span className="text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {activeDiscount && (
                <div className="flex justify-between text-rose-500 font-bold text-sm uppercase tracking-widest">
                  <span>Discount Applied ({activeDiscount.pct}%)</span>
                  <span>-${discountVal.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400 font-bold text-sm uppercase tracking-widest">
                <span>Logistics Fee</span>
                <span className="text-slate-900">{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="pt-8 border-t border-slate-100 flex justify-between font-black text-4xl text-slate-900 tracking-tighter">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-10 p-2 bg-slate-50 rounded-3xl flex items-center">
              <Tag className="w-5 h-5 text-indigo-500 ml-4" />
              <input 
                type="text" 
                placeholder="PROMO CODE" 
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="bg-transparent border-none outline-none flex-grow p-4 text-xs font-black tracking-widest uppercase placeholder:text-slate-300" 
              />
              <button onClick={applyPromo} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Apply</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                required
                type="text" 
                placeholder="Business Entity / Name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
              />
              <input 
                required
                type="email" 
                placeholder="Enterprise Email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
              />
              <textarea 
                required
                placeholder="Global Fulfillment Address"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 h-28"
              ></textarea>
              
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-900 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-indigo-200"
              >
                <CreditCard className="w-6 h-6" />
                <span>Execute Payment</span>
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center space-x-3 text-slate-300">
               <ShieldCheck className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-widest">AES-256 Cloud Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
