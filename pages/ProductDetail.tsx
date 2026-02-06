
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RefreshCcw, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) return <div className="p-20 text-center font-black">Product not found.</div>;

  const simulatedReviews = [
    { name: "Julian V.", rating: 5, comment: "The quality exceeds any expectation. Lumina Luxe truly understands modern luxury.", date: "2 days ago" },
    { name: "Sophia M.", rating: 4, comment: "Beautiful design. The delivery was remarkably fast.", date: "1 week ago" },
    { name: "Marcus T.", rating: 5, comment: "I used the AI Stylist to match this with my current collection. Perfect choice.", date: "3 weeks ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-indigo-600 mb-12 font-bold uppercase tracking-widest text-xs transition-colors group">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Curated Collection
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-32">
        <div className="space-y-6">
          <div className="aspect-[4/5] bg-white rounded-[40px] overflow-hidden border-2 border-slate-50 shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-white rounded-2xl overflow-hidden border border-slate-100 cursor-pointer hover:border-indigo-500 transition-all opacity-60 hover:opacity-100">
                <img src={`https://picsum.photos/seed/${product.id}-${i}/200/200`} alt="Detail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-10">
            <div className="flex items-center space-x-2 mb-4">
               <span className="bg-slate-900 text-white px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] text-[10px]">{product.category}</span>
               <div className="flex items-center space-x-1 text-indigo-600">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Lumina Recommendation</span>
               </div>
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter">{product.name}</h1>
            <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-slate-100">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">(1.2k Reviews)</span>
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">In Stock</span>
            </div>
            <p className="text-4xl font-black text-slate-900 mb-10">${product.price.toFixed(2)}</p>
            <p className="text-slate-500 leading-relaxed mb-12 text-lg font-medium">{product.description}</p>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-slate-900 text-white px-8 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center space-x-3 transform active:scale-95 shadow-2xl shadow-slate-200 mb-12"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Acquire Item</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-slate-100">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-8 h-8 text-indigo-600 mb-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Global Express</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RefreshCcw className="w-8 h-8 text-indigo-600 mb-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">White Glove Returns</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="w-8 h-8 text-indigo-600 mb-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Lifetime Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-sm">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Verified Experience</h3>
               <p className="text-slate-400 font-medium">Hear from the Lumina Luxe community.</p>
            </div>
            <div className="flex items-center space-x-8">
               <div className="text-center">
                  <span className="block text-4xl font-black text-slate-900">4.9</span>
                  <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Score</span>
               </div>
               <button className="bg-slate-50 text-slate-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Write a Review</button>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {simulatedReviews.map((rev, i) => (
              <div key={i} className="space-y-4">
                 <div className="flex items-center text-amber-400 mb-2">
                   {[...Array(rev.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                 </div>
                 <p className="text-slate-600 italic font-medium">"{rev.comment}"</p>
                 <div className="pt-4 border-t border-slate-50">
                    <span className="block font-black text-xs text-slate-900 uppercase tracking-widest">{rev.name}</span>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">{rev.date} • Verified Member</span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default ProductDetail;
