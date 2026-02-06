
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Filter, ArrowRight, Heart, Sparkles, TrendingUp, Zap, Clock, ChevronRight, ChevronDown } from 'lucide-react';
import { Product, MarketingBanner } from '../types';

interface StorefrontProps {
  products: Product[];
  addToCart: (p: Product) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  banners: MarketingBanner[];
  onMount: () => void;
}

const CATEGORY_ICONS = [
  { name: 'Electronics', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100' },
  { name: 'Accessories', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100' },
  { name: 'Home Office', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/ab7e2c021f97a887.png?q=100' },
  { name: 'Photography', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100' },
  { name: 'Fitness', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100' },
  { name: 'Lifestyle', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff09f05111da722.png?q=100' },
];

const Storefront: React.FC<StorefrontProps> = ({ products, addToCart, wishlist, toggleWishlist, banners, onMount }) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown

  useEffect(() => {
    onMount();
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const deals = products.filter(p => p.originalPrice && (p.originalPrice - p.price) > 50).slice(0, 4);

  return (
    <div className="bg-slate-100 min-h-screen pb-12">
      {/* Category Strip (Flipkart Style) */}
      <div className="bg-white shadow-sm mb-2">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between px-4 py-4 overflow-x-auto no-scrollbar gap-8">
          {CATEGORY_ICONS.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => setCategoryFilter(cat.name)}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer"
            >
              <img src={cat.icon} alt={cat.name} className="w-16 h-16 group-hover:scale-110 transition-transform" />
              <span className={`text-sm font-bold mt-2 ${categoryFilter === cat.name ? 'text-indigo-600' : 'text-slate-700'}`}>
                {cat.name}
              </span>
            </button>
          ))}
          <button 
            onClick={() => setCategoryFilter('All')}
            className="flex flex-col items-center flex-shrink-0 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-indigo-600">
               <Filter className="w-8 h-8" />
            </div>
            <span className={`text-sm font-bold mt-2 ${categoryFilter === 'All' ? 'text-indigo-600' : 'text-slate-700'}`}>All Offer</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-2 lg:px-4 space-y-4">
        {/* Main Banner */}
        {banners.length > 0 && (
          <div className={`relative h-[280px] md:h-[350px] overflow-hidden bg-gradient-to-br ${banners[0].bgGradient} group shadow-sm`}>
             <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center text-white z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-4 leading-none tracking-tighter">{banners[0].title}</h2>
                <p className="text-sm md:text-xl opacity-90 font-medium mb-8 max-w-lg">{banners[0].subtitle}</p>
                <div>
                  <button className="bg-white text-indigo-700 px-10 py-3 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-md">
                    Shop Now
                  </button>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
               <TrendingUp className="w-full h-full rotate-12 scale-150" />
             </div>
          </div>
        )}

        {/* Deals of the Day */}
        <div className="bg-white p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
           <div className="flex-shrink-0 text-center md:text-left md:border-r md:pr-10 border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center md:justify-start">
                Deals of the Day
              </h3>
              <div className="flex items-center mt-2 text-slate-400 font-bold space-x-2 justify-center md:justify-start">
                 <Clock className="w-4 h-4" />
                 <span className="text-sm">{formatTime(timeLeft)} Left</span>
              </div>
              <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg">View All</button>
           </div>
           
           <div className="flex-grow flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {deals.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="w-44 flex-shrink-0 flex flex-col items-center group cursor-pointer border border-transparent hover:border-slate-50 p-2">
                  <div className="w-36 h-36 mb-4 overflow-hidden">
                    <img src={p.image} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 line-clamp-1">{p.name}</span>
                  <span className="text-sm font-black text-green-600 mt-1">From ${p.price}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.category}</span>
                </Link>
              ))}
           </div>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-4">
           {/* Sidebar Filter (Hidden on mobile) */}
           <div className="hidden lg:block w-72 flex-shrink-0 bg-white p-6 shadow-sm h-fit sticky top-20">
              <h4 className="text-lg font-black text-slate-900 mb-6 border-b pb-4">Filters</h4>
              <div className="space-y-6">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">Categories</span>
                    <div className="space-y-3">
                      {['All', ...new Set(products.map(p => p.category))].map(cat => (
                        <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                           <input 
                             type="checkbox" 
                             checked={categoryFilter === cat} 
                             onChange={() => setCategoryFilter(cat)}
                             className="w-4 h-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
                           />
                           <span className={`text-sm font-medium ${categoryFilter === cat ? 'text-indigo-600 font-bold' : 'text-slate-600 group-hover:text-indigo-500'}`}>{cat}</span>
                        </label>
                      ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Results Grid */}
           <div className="flex-grow bg-white p-6 shadow-sm">
             <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-xl font-black text-slate-900">Recommended for You</h2>
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <span>Sorted by: Popularity</span>
                   <ChevronDown className="w-3 h-3" />
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-12">
               {products.filter(p => categoryFilter === 'All' || p.category === categoryFilter).map(product => {
                 const isWishlisted = wishlist.includes(product.id);
                 const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
                 
                 return (
                   <div key={product.id} className="group flex flex-col relative bg-white border border-slate-50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 p-4">
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                        className={`absolute top-4 right-4 z-10 p-2 rounded-full ${isWishlisted ? 'text-rose-500' : 'text-slate-300 hover:text-rose-500'} transition-colors`}
                      >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                      
                      <Link to={`/product/${product.id}`} className="block overflow-hidden h-56 mb-4">
                        <img src={product.image} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </Link>

                      <div className="flex flex-col flex-grow">
                        <Link to={`/product/${product.id}`} className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2 leading-tight">
                          {product.name}
                        </Link>
                        
                        <div className="flex items-center space-x-2 mb-2">
                           <div className="bg-green-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm flex items-center">
                             <span>4.4</span>
                             <Star className="w-2.5 h-2.5 fill-current ml-0.5" />
                           </div>
                           <span className="text-xs text-slate-400 font-bold">(1,248)</span>
                           <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fa_62780c.svg" className="h-4 ml-auto" title="Assured" />
                        </div>

                        <div className="flex items-center space-x-2">
                           <span className="text-lg font-black text-slate-900">${product.price}</span>
                           {product.originalPrice && (
                             <>
                               <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                               <span className="text-xs font-black text-green-600">{discount}% off</span>
                             </>
                           )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => addToCart(product)}
                             className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800"
                           >
                             Add to Cart
                           </button>
                           <Link to={`/product/${product.id}`} className="text-slate-400 hover:text-indigo-600">
                             <ArrowRight className="w-4 h-4" />
                           </Link>
                        </div>
                      </div>
                   </div>
                 );
               })}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Storefront;
