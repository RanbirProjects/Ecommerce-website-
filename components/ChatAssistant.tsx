
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Camera, Image as ImageIcon } from 'lucide-react';
import { getShoppingAssistantResponse, analyzeImageForSearch } from '../services/geminiService';
import { Product } from '../types';

interface ChatAssistantProps {
  products: Product[];
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; image?: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (overrideText?: string) => {
    const userMsg = overrideText || input;
    if (!userMsg.trim()) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const inventoryStr = products.map(p => `${p.name} ($${p.price})`).join(', ');
    const aiResponse = await getShoppingAssistantResponse(userMsg, inventoryStr);
    
    setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    setIsTyping(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const preview = reader.result as string;

      setMessages(prev => [...prev, { role: 'user', text: "Analyzing this for you...", image: preview }]);
      setIsTyping(true);
      setIsOpen(true);

      const inventoryStr = products.map(p => `${p.name} (ID: ${p.id})`).join(', ');
      const aiResponse = await analyzeImageForSearch(base64, inventoryStr);
      
      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
      setIsTyping(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 transition-all transform hover:scale-110 flex items-center space-x-2 group"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="font-bold tracking-tight">AI Concierge</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-80 sm:w-[400px] flex flex-col border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-indigo-600 text-white p-5 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-400/30 p-2 rounded-xl">
                <Sparkles className="w-5 h-5 text-indigo-100" />
              </div>
              <div>
                <span className="block font-bold leading-tight">Lumina Concierge</span>
                <span className="block text-[10px] text-indigo-200 uppercase tracking-widest font-bold">AI Stylist Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div ref={scrollRef} className="h-96 overflow-y-auto p-5 space-y-6 bg-slate-50/50">
            {messages.length === 0 && (
              <div className="text-center space-y-4 py-8">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 inline-block">
                   <p className="text-sm text-slate-600 font-medium">"Welcome to Lumina Luxe. How can I assist your lifestyle today?"</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                   {["Gift ideas?", "What's trending?", "Visual Search"].map(hint => (
                     <button 
                        key={hint} 
                        onClick={() => hint === "Visual Search" ? fileInputRef.current?.click() : handleSend(hint)}
                        className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all"
                      >
                       {hint}
                     </button>
                   ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] space-y-2`}>
                  {m.image && (
                    <img src={m.image} className="rounded-2xl w-full h-48 object-cover border-2 border-white shadow-md mb-2" alt="Uploaded search" />
                  )}
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100 shadow-lg' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl flex space-x-1 items-center shadow-sm">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                title="Visual Search"
              >
                <Camera className="w-6 h-6" />
              </button>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex-grow flex space-x-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-grow bg-slate-100 border-none focus:ring-2 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm transition-all"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
