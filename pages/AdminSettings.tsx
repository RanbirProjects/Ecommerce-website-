
import React, { useState } from 'react';
import { 
  Settings, Shield, Sparkles, Palette, Globe, 
  Save, RefreshCw, Smartphone, Database, Zap, Cpu,
  HardDrive, Lock, Cloud, Key, Trash2, CheckCircle, AlertTriangle
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'general' | 'ai' | 'ui' | 'network'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState({
    siteName: 'Lumina Cloud Store',
    currency: 'USD',
    aiModel: 'gemini-3-flash-preview',
    aiTemp: 0.7,
    aiThinking: 2000,
    accentColor: '#4f46e5',
    darkMode: false,
    notifications: true,
    backupFreq: 'daily',
    apiLogs: true,
    encryption: 'AES-256'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("System Protocol Updated Successfully.");
    }, 1500);
  };

  const sections = [
    { id: 'general', label: 'General Node', icon: Globe, status: 'Online' },
    { id: 'ai', label: 'Gemini AI Core', icon: Cpu, status: 'Active' },
    { id: 'ui', label: 'Visual Interface', icon: Palette, status: 'Synced' },
    { id: 'network', label: 'Data Registry', icon: Database, status: 'Secure' },
  ];

  return (
    <div className="p-10 animate-in fade-in duration-500 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-10 rounded-[40px] shadow-sm">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">System Parameters</h1>
          <p className="text-slate-400 font-bold mt-4 uppercase text-[10px] tracking-[0.4em] flex items-center">
            <Lock className="w-3.5 h-3.5 mr-2 text-indigo-600" /> Administrative Protocol Node_0x82
          </p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="hidden xl:flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-xl text-[10px] font-black text-indigo-600 uppercase">
             <CheckCircle className="w-3 h-3" />
             <span>Config Integrity Verified</span>
           </div>
           <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl flex items-center space-x-3 font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isSaving ? 'Updating...' : 'Commit Changes'}</span>
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Nav Quadrant */}
        <div className="lg:w-80 flex-shrink-0 space-y-3">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id as any)}
              className={`w-full flex flex-col px-8 py-6 rounded-[32px] transition-all group relative overflow-hidden ${
                activeSection === s.id 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-4 mb-2 z-10">
                <s.icon className={`w-5 h-5 transition-transform group-hover:rotate-12 ${activeSection === s.id ? 'text-white' : 'text-indigo-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
              </div>
              <div className="flex items-center space-x-2 z-10">
                <div className={`w-1.5 h-1.5 rounded-full ${activeSection === s.id ? 'bg-indigo-300' : 'bg-emerald-500'} animate-pulse`}></div>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${activeSection === s.id ? 'text-indigo-200' : 'text-slate-400'}`}>{s.status}</span>
              </div>
              {activeSection === s.id && <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20"></div>}
            </button>
          ))}
          
          <div className="mt-8 p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group border border-slate-800">
             <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest">Cloud Health</h4>
                   <p className="text-[9px] text-indigo-400 font-bold">Stable 99.98%</p>
                </div>
             </div>
             <div className="space-y-2">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500 w-[88%]"></div>
                </div>
                <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest opacity-50">
                   <span>Throughput</span>
                   <span>882 TPS</span>
                </div>
             </div>
          </div>
        </div>

        {/* Content Node */}
        <div className="flex-grow bg-white border border-slate-100 rounded-[48px] p-12 shadow-sm relative min-h-[500px]">
          {activeSection === 'general' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Storefront Identity</label>
                  <input 
                    type="text" 
                    value={config.siteName}
                    onChange={e => setConfig({...config, siteName: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none transition-all"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Default Exchange</label>
                  <select 
                    value={config.currency}
                    onChange={e => setConfig({...config, currency: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none transition-all appearance-none"
                  >
                    <option value="USD">USD - Dollar</option>
                    <option value="INR">INR - Rupee</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
              </div>
              
              <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100 flex items-center justify-between group">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Smartphone className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-sm">PWA Protocol</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Mobile Edge Optimization</p>
                  </div>
                </div>
                <button 
                  onClick={() => setConfig({...config, notifications: !config.notifications})}
                  className={`w-16 h-8 rounded-full transition-all relative ${config.notifications ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${config.notifications ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          )}

          {activeSection === 'ai' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 p-10 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between border-b-8 border-indigo-500 gap-8 shadow-xl">
                <div className="flex items-center space-x-6">
                  <div className="p-5 bg-indigo-500/20 rounded-3xl border border-indigo-500/30">
                    <Sparkles className="w-10 h-10 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black tracking-tighter uppercase leading-none">Gemini LLM Core</h4>
                    <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.3em] mt-2">Active: 3-Flash-Preview</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                   {[1,2,3].map(i => <div key={i} className="w-1 h-8 bg-indigo-500/40 rounded-full animate-pulse" style={{animationDelay: `${i*200}ms`}}></div>)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inference Heat</label>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{config.aiTemp}</span>
                  </div>
                  <input 
                    type="range" min="0" max="1" step="0.1"
                    value={config.aiTemp}
                    onChange={e => setConfig({...config, aiTemp: parseFloat(e.target.value)})}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-full cursor-pointer"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Token Budget</label>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{config.aiThinking}</span>
                  </div>
                  <input 
                    type="range" min="1000" max="16000" step="1000"
                    value={config.aiThinking}
                    onChange={e => setConfig({...config, aiThinking: parseInt(e.target.value)})}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-full cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ui' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brand Color Node</label>
                    <div className="flex flex-wrap gap-3">
                       {['#4f46e5', '#0ea5e9', '#10b981', '#f43f5e', '#fbbf24', '#0f172a'].map(c => (
                         <button 
                           key={c}
                           onClick={() => setConfig({...config, accentColor: c})}
                           className={`w-12 h-12 rounded-xl transition-all border-4 ${config.accentColor === c ? 'border-indigo-100 scale-110 shadow-lg' : 'border-transparent opacity-60'}`}
                           style={{backgroundColor: c}}
                         />
                       ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mode Protocol</label>
                    <div className="flex bg-slate-100 p-2 rounded-2xl w-full">
                       <button 
                         onClick={() => setConfig({...config, darkMode: false})}
                         className={`flex-grow py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!config.darkMode ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                       >
                         Light Shell
                       </button>
                       <button 
                         onClick={() => setConfig({...config, darkMode: true})}
                         className={`flex-grow py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${config.darkMode ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                       >
                         Obsidian Shell
                       </button>
                    </div>
                 </div>
              </div>
              <div className="aspect-[21/9] bg-slate-50 rounded-[32px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center group overflow-hidden relative">
                 <Palette className="w-12 h-12 text-slate-200 group-hover:rotate-12 transition-transform duration-500 mb-2" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Style Sandbox V.4</span>
                 <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          )}

          {activeSection === 'network' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group">
                     <div className="flex items-center space-x-4 mb-8">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Database className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-sm uppercase">Data Frequency</h4>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Backup Cadence</p>
                        </div>
                     </div>
                     <select 
                        value={config.backupFreq}
                        onChange={e => setConfig({...config, backupFreq: e.target.value})}
                        className="w-full bg-white border-none rounded-2xl px-6 py-4 font-bold text-slate-900 shadow-sm outline-none appearance-none"
                     >
                        <option value="hourly">Synchronized Hourly</option>
                        <option value="daily">Synchronized Daily</option>
                        <option value="weekly">Weekly Rollup</option>
                     </select>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between">
                     <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          <Shield className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-sm uppercase">Vault Standard</h4>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Encryption Level</p>
                        </div>
                     </div>
                     <div className="text-xl font-black text-indigo-600 tracking-widest mt-4">AES-256-GCM</div>
                  </div>
               </div>

               <div className="bg-rose-50 border border-rose-100 p-10 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 group">
                  <div className="flex items-center space-x-6">
                     <div className="w-16 h-16 bg-white text-rose-500 rounded-3xl flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
                        <Trash2 className="w-8 h-8" />
                     </div>
                     <div className="max-w-md">
                        <h4 className="font-black text-rose-900 uppercase text-sm">Registry Purge</h4>
                        <p className="text-[10px] text-rose-600 font-medium leading-relaxed mt-1">Clear all system logs, cached weights, and session clusters. This protocol is irreversible.</p>
                     </div>
                  </div>
                  <button className="bg-rose-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-rose-700 transition-all flex items-center space-x-2">
                     <AlertTriangle className="w-4 h-4" />
                     <span>Initiate Purge</span>
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
