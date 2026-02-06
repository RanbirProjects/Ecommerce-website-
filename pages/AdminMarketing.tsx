
import React, { useState } from 'react';
import { Sparkles, Layout, Megaphone, Plus, Trash2, Wand2, Loader2, Save } from 'lucide-react';
import { MarketingBanner } from '../types';
import { generateMarketingCampaign } from '../services/geminiService';

interface AdminMarketingProps {
  banners: MarketingBanner[];
  setBanners: React.Dispatch<React.SetStateAction<MarketingBanner[]>>;
}

const AdminMarketing: React.FC<AdminMarketingProps> = ({ banners, setBanners }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaignTopic, setCampaignTopic] = useState('');
  const [newBanner, setNewBanner] = useState<Partial<MarketingBanner>>({
    title: '', subtitle: '', cta: 'Shop Now', bgGradient: 'from-indigo-600 to-purple-800'
  });

  const handleGenerate = async () => {
    if (!campaignTopic) return alert("Enter a theme first!");
    setIsGenerating(true);
    const result = await generateMarketingCampaign(campaignTopic);
    
    // Simple parsing of Gemini response
    const titleMatch = result.match(/Title:\s*(.*)/i);
    const subtitleMatch = result.match(/Subtitle:\s*(.*)/i);
    const ctaMatch = result.match(/CTA:\s*(.*)/i);

    setNewBanner({
      ...newBanner,
      title: titleMatch ? titleMatch[1].trim() : 'Exclusive Summer Collection',
      subtitle: subtitleMatch ? subtitleMatch[1].trim() : 'Experience the pinnacle of luxury design.',
      cta: ctaMatch ? ctaMatch[1].trim() : 'Explore Now'
    });
    setIsGenerating(false);
  };

  const addBanner = () => {
    const banner: MarketingBanner = {
      id: `b-${Date.now()}`,
      title: newBanner.title || 'Untitled Campaign',
      subtitle: newBanner.subtitle || '',
      cta: newBanner.cta || 'Shop Now',
      bgGradient: newBanner.bgGradient || 'from-slate-900 to-indigo-950'
    };
    setBanners([banner, ...banners]);
    setNewBanner({ title: '', subtitle: '', cta: 'Shop Now', bgGradient: 'from-indigo-600 to-purple-800' });
    setCampaignTopic('');
  };

  const removeBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Marketing Studio</h1>
          <p className="text-slate-400 font-medium mt-2 uppercase text-xs tracking-[0.2em]">Powered by Adobe Partner AI</p>
        </div>
        <div className="flex space-x-4">
           <div className="bg-white border border-slate-100 p-2 rounded-2xl flex items-center space-x-4">
              <span className="text-xs font-black uppercase text-slate-400 px-4">Live Campaigns: {banners.length}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-1 bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl">
           <h3 className="text-xl font-black mb-8 flex items-center space-x-2">
             <Wand2 className="w-5 h-5 text-indigo-500" />
             <span>Campaign Creator</span>
           </h3>
           
           <div className="space-y-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Campaign Theme</label>
                 <div className="relative">
                    <input 
                      type="text" 
                      value={campaignTopic}
                      onChange={e => setCampaignTopic(e.target.value)}
                      placeholder="e.g. Summer Audio Sale"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 pr-12"
                    />
                    <button onClick={handleGenerate} disabled={isGenerating} className="absolute right-4 top-4 text-indigo-500 hover:scale-110 transition-transform disabled:opacity-50">
                       {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                    </button>
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Title</label>
                 <input 
                   type="text" 
                   value={newBanner.title}
                   onChange={e => setNewBanner({...newBanner, title: e.target.value})}
                   className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900"
                 />
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call to Action Text</label>
                 <input 
                   type="text" 
                   value={newBanner.cta}
                   onChange={e => setNewBanner({...newBanner, cta: e.target.value})}
                   className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900"
                 />
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visual Theme</label>
                 <div className="flex space-x-3">
                    {[
                      'from-slate-900 to-indigo-950',
                      'from-indigo-600 to-purple-800',
                      'from-rose-600 to-amber-500',
                      'from-emerald-600 to-teal-800'
                    ].map(grad => (
                      <button 
                        key={grad}
                        onClick={() => setNewBanner({...newBanner, bgGradient: grad})}
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${grad} border-4 transition-all ${newBanner.bgGradient === grad ? 'border-white ring-2 ring-indigo-500' : 'border-transparent'}`}
                      />
                    ))}
                 </div>
              </div>

              <button 
                onClick={addBanner}
                className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Deploy Campaign</span>
              </button>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-slate-400">Active Merchandising Banners</h3>
           {banners.map(banner => (
             <div key={banner.id} className={`relative h-64 rounded-[40px] overflow-hidden bg-gradient-to-r ${banner.bgGradient} group shadow-lg`}>
                <div className="absolute inset-0 p-10 flex flex-col justify-center text-white">
                   <h4 className="text-3xl font-black mb-2 tracking-tight">{banner.title}</h4>
                   <p className="text-indigo-100 font-medium mb-6 opacity-80">{banner.subtitle}</p>
                   <div>
                      <span className="bg-white/20 border border-white/30 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {banner.cta}
                      </span>
                   </div>
                </div>
                <button 
                  onClick={() => removeBanner(banner.id)}
                  className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-rose-500 hover:text-white rounded-2xl backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
             </div>
           ))}
           {banners.length === 0 && (
             <div className="h-64 rounded-[40px] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300">
                <Layout className="w-12 h-12 mb-4" />
                <p className="font-bold">No active banners. Start a campaign.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AdminMarketing;
