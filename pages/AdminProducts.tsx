
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Sparkles, X, Image as ImageIcon, Wand2, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { generateProductDescription, generateProductImage } from '../services/geminiService';

interface AdminProductsProps {
  products: Product[];
  addProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products, addProduct, deleteProduct }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', category: 'Electronics', price: 0, stock: 10, description: '', image: ''
  });

  const handleAI = async () => {
    if (!newProduct.name) return alert("Enter a product name first!");
    setIsGenerating(true);
    const desc = await generateProductDescription(
      newProduct.name || 'Premium Item', 
      newProduct.category || 'General', 
      ['High Quality', 'Modern Design', 'Durable']
    );
    setNewProduct({ ...newProduct, description: desc });
    setIsGenerating(false);
  };

  const handleImageAI = async () => {
    if (!newProduct.name) return alert("Enter a name for the product first!");
    setIsGeneratingImage(true);
    const imgUrl = await generateProductImage(newProduct.name);
    if (imgUrl) {
      setNewProduct({ ...newProduct, image: imgUrl });
    }
    setIsGeneratingImage(false);
  };

  const handleSave = () => {
    if (!newProduct.name || !newProduct.price) return;
    const p: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name || '',
      category: newProduct.category || '',
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      description: newProduct.description || '',
      image: newProduct.image || `https://picsum.photos/seed/${newProduct.name}/600/600`
    };
    addProduct(p);
    setIsAdding(false);
    setNewProduct({ name: '', category: 'Electronics', price: 0, stock: 10, description: '', image: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Inventory</h1>
          <p className="text-slate-500 font-medium">Manage and curate your product catalog.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl flex items-center space-x-3 font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b">
            <tr>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Product Details</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Price</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Stock Level</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-6">
                    <img src={p.image} className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block font-bold text-slate-900">{p.name}</span>
                      <span className="block text-xs text-slate-400 font-medium">ID: {p.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                    {p.category}
                  </span>
                </td>
                <td className="px-8 py-6 font-black text-slate-900">${p.price.toFixed(2)}</td>
                <td className="px-8 py-6">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tight text-slate-400">
                      <span>{p.stock} units</span>
                      <span>{Math.min(100, (p.stock / 50) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${p.stock < 10 ? 'bg-rose-500' : 'bg-indigo-500'}`} 
                        style={{width: `${Math.min(100, (p.stock / 50) * 100)}%`}}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit3 className="w-5 h-5" /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[48px] w-full max-w-2xl p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Add to Catalog</h2>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                 <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Product Name</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-900"
                  placeholder="The Eternal Timepiece"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Category</label>
                <select 
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-900"
                >
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Home Office</option>
                  <option>Fitness</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Product Image</label>
                <button 
                  onClick={handleImageAI}
                  disabled={isGeneratingImage}
                  className="text-[10px] font-black text-indigo-600 flex items-center space-x-2 bg-indigo-50 px-3 py-1.5 rounded-xl hover:bg-indigo-100 disabled:opacity-50 transition-all uppercase tracking-widest"
                >
                  {isGeneratingImage ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                  <span>{isGeneratingImage ? 'Visualizing...' : 'Generate with AI'}</span>
                </button>
              </div>
              <div className="flex space-x-4">
                <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden border-2 border-slate-50 flex-shrink-0">
                  {newProduct.image ? (
                    <img src={newProduct.image} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                       <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <input 
                  type="text" 
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  className="flex-grow bg-slate-50 border-none rounded-2xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-xs text-slate-500"
                  placeholder="Enter URL or use Magic Wand..."
                />
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
                <button 
                  onClick={handleAI}
                  disabled={isGenerating}
                  className="text-[10px] font-black text-indigo-600 flex items-center space-x-2 bg-indigo-50 px-3 py-1.5 rounded-xl hover:bg-indigo-100 disabled:opacity-50 transition-all uppercase tracking-widest"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{isGenerating ? 'Drafting...' : 'AI Writer'}</span>
                </button>
              </div>
              <textarea 
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 h-32 transition-all font-medium text-slate-700 leading-relaxed"
                placeholder="Describe the product narrative..."
              ></textarea>
            </div>

            <div className="flex space-x-4">
              <button onClick={() => setIsAdding(false)} className="flex-grow py-4 border-2 border-slate-100 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-all">Discard</button>
              <button onClick={handleSave} className="flex-grow py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">Commit Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
