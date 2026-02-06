
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Heart, Search, LayoutDashboard, Package, ShoppingBag, Megaphone, Users, Settings, Globe, ChevronDown } from 'lucide-react';
import { Product, CartItem, Order, View, MarketingBanner } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, MARKETING_BANNERS } from './constants';
import Storefront from './pages/Storefront';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminMarketing from './pages/AdminMarketing';
import AdminCustomers from './pages/AdminCustomers';
import AdminSettings from './pages/AdminSettings';
import ChatAssistant from './components/ChatAssistant';

const Navigation = ({ activeView, cartCount }: { activeView: View, cartCount: number }) => {
  return (
    <nav className="bg-indigo-700 text-white sticky top-0 z-[100] shadow-md">
      <div className="max-w-[1300px] mx-auto px-4 lg:px-6">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group">
             <div className="italic font-black text-2xl tracking-tighter hover:text-yellow-400 transition-colors">
               Lumina<span className="text-yellow-400">Store</span>
             </div>
             <div className="flex flex-col ml-1 -mt-1 opacity-80 group-hover:opacity-100">
               <span className="text-[10px] font-black italic leading-none">Explore</span>
               <span className="text-[10px] font-black italic leading-none text-yellow-400 flex items-center">
                 Plus <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc130b.svg" className="w-2.5 h-2.5 ml-0.5" />
               </span>
             </div>
          </Link>

          {/* Flipkart-Style Search Bar */}
          <div className="flex-grow max-w-[600px] relative group">
            <input 
              type="text" 
              placeholder="Search for products, brands and more" 
              className="w-full bg-slate-50 text-slate-900 px-4 py-2.5 pl-12 rounded-sm text-sm border-none focus:ring-0 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600" />
          </div>

          {/* Action Items */}
          <div className="flex items-center space-x-8">
            <button className="bg-white text-indigo-700 px-8 py-1.5 rounded-sm font-black text-sm hover:bg-slate-100 transition-all shadow-sm">
              Login
            </button>
            <div className="hidden lg:flex items-center space-x-1 cursor-pointer hover:text-yellow-400 font-bold text-sm">
              <span>More</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <Link to="/cart" className="flex items-center space-x-2 hover:text-yellow-400 font-bold text-sm">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-700 font-black">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </Link>
            <Link to="/admin" className="hidden xl:flex items-center space-x-2 text-indigo-200 hover:text-white font-black text-xs uppercase tracking-widest">
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const AdminSidebar = () => {
  const location = useLocation();
  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Inventory', icon: Package, path: '/admin/products' },
    { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Marketing', icon: Megaphone, path: '/admin/marketing' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="w-72 bg-slate-950 text-white flex flex-col h-[calc(100vh-64px)] sticky top-16 border-r border-slate-800">
      <div className="p-8">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8">Cloud Registry</h2>
        <div className="space-y-2">
          {menu.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`flex items-center space-x-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${location.pathname === item.path ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto p-8 border-t border-slate-900">
        <div className="bg-slate-900/50 p-6 rounded-[32px] border border-slate-800 flex items-center space-x-4">
           <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Secure</div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => JSON.parse(localStorage.getItem('products') || JSON.stringify(INITIAL_PRODUCTS)));
  const [cart, setCart] = useState<CartItem[]>(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [wishlist, setWishlist] = useState<string[]>(() => JSON.parse(localStorage.getItem('wishlist') || '[]'));
  const [orders, setOrders] = useState<Order[]>(() => JSON.parse(localStorage.getItem('orders') || JSON.stringify(INITIAL_ORDERS)));
  const [banners, setBanners] = useState<MarketingBanner[]>(() => JSON.parse(localStorage.getItem('banners') || JSON.stringify(MARKETING_BANNERS)));
  const [activeView, setActiveView] = useState<View>('store');

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('banners', JSON.stringify(banners));
  }, [products, cart, orders, wishlist, banners]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (id: string) => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.id !== productId));
  const updateQuantity = (productId: string, delta: number) => setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));

  const placeOrder = (customerName: string, customerEmail: string, discount: number = 0) => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal - (subtotal * (discount / 100));
    setOrders([{ id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`, customerName, customerEmail, items: [...cart], total, discountApplied: discount, status: 'Pending', date: new Date().toISOString().split('T')[0] }, ...orders]);
    setCart([]);
  };

  const addProduct = (p: Product) => setProducts([p, ...products]);
  const deleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id));

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-['Inter']">
        <Navigation activeView={activeView} cartCount={cart.reduce((a, b) => a + b.quantity, 0)} />
        
        <div className="flex flex-grow bg-slate-50">
          <Routes>
            <Route path="/*" element={
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Storefront products={products} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} banners={banners} onMount={() => setActiveView('store')} />} />
                  <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
                  <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} placeOrder={placeOrder} />} />
                </Routes>
              </div>
            } />
            <Route path="/admin/*" element={
              <>
                <AdminSidebar />
                <div className="flex-grow bg-white" onMouseEnter={() => setActiveView('admin')}>
                  <Routes>
                    <Route index element={<AdminDashboard orders={orders} products={products} />} />
                    <Route path="products" element={<AdminProducts products={products} addProduct={addProduct} deleteProduct={deleteProduct} />} />
                    <Route path="orders" element={<AdminOrders orders={orders} setOrders={setOrders} />} />
                    <Route path="customers" element={<AdminCustomers orders={orders} />} />
                    <Route path="marketing" element={<AdminMarketing banners={banners} setBanners={setBanners} />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Routes>
                </div>
              </>
            } />
          </Routes>
        </div>

        <ChatAssistant products={products} />
      </div>
    </Router>
  );
};

export default App;
