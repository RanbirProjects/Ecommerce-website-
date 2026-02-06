
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, ComposedChart, Line,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Package, ShoppingBag, DollarSign, TrendingUp, AlertCircle, 
  Layers, Activity, Search, Zap, Globe, Shield, Clock,
  Cpu, Server, HardDrive, Wifi
} from 'lucide-react';
import { Product, Order } from '../types';
import { SALES_DATA } from '../constants';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
}

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f97316', '#10b981'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between space-x-8">
            <span className="text-xs font-bold text-white">{p.name}:</span>
            <span className="text-xs font-black" style={{ color: p.color }}>${p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'logistics' | 'system'>('overview');
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => (p + 1) % 100), 2000);
    return () => clearInterval(interval);
  }, []);
  
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  
  const categoryStats = products.reduce((acc: any, curr) => {
    const existing = acc.find((a: any) => a.name === curr.category);
    if (existing) existing.value++;
    else acc.push({ name: curr.category, value: 1 });
    return acc;
  }, []);

  const metrics = [
    { label: 'Global Revenue', value: `$${(totalRevenue/1000).toFixed(1)}k`, growth: '+14.2%', icon: DollarSign, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Pipeline Flux', value: orders.length, growth: '+22.1%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Sync Integrity', value: '99.9%', growth: 'Stable', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Processing', value: '0.8s', growth: '-12ms', icon: Cpu, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="p-10 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-indigo-600 rounded-full"></div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">Command Center</h1>
          <div className="flex items-center mt-3 space-x-4">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]">Node // 0x4492-PRO</span>
            <div className="flex space-x-1">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className={`w-1 h-1 rounded-full ${i <= (pulse % 3) ? 'bg-indigo-500' : 'bg-slate-200'}`}></div>
               ))}
            </div>
          </div>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-[28px] border border-slate-200 shadow-inner">
          {[
            { id: 'overview', label: 'Overview', icon: Layers },
            { id: 'logistics', label: 'Logistics', icon: Zap },
            { id: 'system', label: 'Infra', icon: Server }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-3 px-8 py-3.5 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-white shadow-xl text-slate-900 scale-105' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-indigo-600' : ''}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((m, i) => (
              <div key={i} className="group bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-default relative overflow-hidden">
                <div className={`absolute -right-6 -top-6 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity ${m.color}`}>
                  <m.icon className="w-full h-full rotate-12" />
                </div>
                <div className="flex justify-between items-start mb-8">
                   <div className={`${m.bg} ${m.color} p-5 rounded-3xl shadow-lg shadow-current/5`}>
                     <m.icon className="w-8 h-8" />
                   </div>
                   <div className="text-right">
                     <span className={`text-[10px] font-black px-3 py-1 rounded-full ${m.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                       {m.growth}
                     </span>
                   </div>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-4xl font-black text-slate-900 tracking-tighter">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <div className="xl:col-span-2 bg-slate-950 p-12 rounded-[64px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-black text-white flex items-center space-x-4">
                  <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span>Revenue Dynamics</span>
                </h3>
                <div className="flex space-x-2">
                   {['Actual', 'Projected'].map(l => (
                     <div key={l} className="flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        <div className={`w-2 h-2 rounded-full ${l === 'Actual' ? 'bg-indigo-500' : 'bg-purple-500 opacity-50'}`}></div>
                        <span className="text-[10px] font-black text-white/50 uppercase">{l}</span>
                     </div>
                   ))}
                </div>
              </div>
              <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SALES_DATA}>
                    <defs>
                      <linearGradient id="mainArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="subArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '900'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '900'}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area name="Revenue" type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={8} fill="url(#mainArea)" />
                    <Area name="Target" type="monotone" dataKey="sales" stroke="#a855f7" strokeWidth={2} strokeDasharray="12 12" fill="url(#subArea)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-12 rounded-[64px] shadow-sm flex flex-col relative overflow-hidden group">
               <div className="absolute -top-12 -right-12 w-48 h-48 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
               <h3 className="text-2xl font-black text-slate-900 mb-12 relative">Inventory Mix</h3>
               <div className="h-64 flex-grow relative mb-12">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie data={categoryStats} innerRadius={85} outerRadius={110} paddingAngle={8} dataKey="value">
                       {categoryStats.map((entry: any, index: number) => (
                         <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
                       ))}
                     </Pie>
                     <Tooltip />
                   </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">{products.length}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">SKU Core</span>
                 </div>
               </div>
               <div className="space-y-4 relative">
                 {categoryStats.map((c: any, i: number) => (
                   <div key={i} className="flex items-center justify-between group/item cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-all">
                     <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 rounded-lg shadow-sm" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                        <span className="text-xs font-black uppercase text-slate-400 group-hover/item:text-slate-900 transition-colors tracking-widest">{c.name}</span>
                     </div>
                     <span className="text-sm font-black text-slate-900">{c.value}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logistics' && (
        <div className="animate-in fade-in slide-in-from-right-12 duration-700 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 bg-white p-12 rounded-[64px] border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px]"></div>
               <h3 className="text-2xl font-black mb-12 flex items-center space-x-4">
                 <Globe className="w-8 h-8 text-indigo-600" />
                 <span>Regional Capacity</span>
               </h3>
               <div className="h-[450px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={[
                     { region: 'North Am.', load: 85, capacity: 100 },
                     { region: 'Europe', load: 42, capacity: 80 },
                     { region: 'APAC', load: 92, capacity: 95 },
                     { region: 'LATAM', load: 22, capacity: 50 },
                     { region: 'Global', load: 65, capacity: 70 },
                   ]}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: '900'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: '900'}} />
                     <Tooltip cursor={{fill: 'rgba(99,102,241,0.05)', radius: 10}} />
                     <Bar dataKey="load" fill="#6366f1" radius={[14, 14, 0, 0]} barSize={45} />
                     <Bar dataKey="capacity" fill="#f1f5f9" radius={[14, 14, 0, 0]} barSize={45} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
            
            <div className="flex flex-col gap-12">
               <div className="bg-indigo-600 p-12 rounded-[64px] text-white flex flex-col justify-between shadow-2xl shadow-indigo-200 group overflow-hidden relative">
                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <Zap className="w-16 h-16 mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                 <div>
                   <h3 className="text-4xl font-black tracking-tighter leading-[0.9] mb-6">Fulfillment Optimized</h3>
                   <p className="opacity-70 font-medium text-sm leading-relaxed mb-10">AI Cluster has re-routed premium logistics to APAC hubs due to sudden demand flux.</p>
                   <button className="w-full bg-white text-indigo-600 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl">View Protocol</button>
                 </div>
               </div>

               <div className="bg-slate-900 p-12 rounded-[64px] text-white flex flex-col">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Node Activity</h4>
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="flex-grow">
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 animate-pulse" style={{ width: `${Math.random() * 100}%`, animationDelay: `${i*500}ms` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="animate-in fade-in slide-in-from-left-12 duration-700 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'Compute Engine', icon: Cpu, stat: '84%', detail: 'Optimum' },
              { label: 'Cloud Storage', icon: HardDrive, stat: '2.4TB', detail: 'Available' },
              { label: 'Edge Latency', icon: Wifi, stat: '14ms', detail: 'Normal' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-12 rounded-[64px] border border-slate-100 shadow-sm text-center group hover:bg-slate-950 transition-colors duration-500">
                <div className="bg-indigo-50 p-6 rounded-[32px] inline-block mb-8 group-hover:bg-white/10 transition-colors">
                  <s.icon className="w-10 h-10 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{s.label}</h4>
                <p className="text-5xl font-black text-slate-900 group-hover:text-white tracking-tighter mb-2">{s.stat}</p>
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-[64px] border-4 border-dashed border-slate-200 py-32 flex flex-col items-center justify-center">
             <div className="relative mb-8">
               <Shield className="w-20 h-20 text-slate-300" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
               </div>
             </div>
             <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter">System Integrity: 100%</p>
             <div className="flex space-x-2 mt-6">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="w-1 h-8 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: `${i*100}ms`}}></div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
