import React, { useState, useRef, useEffect } from 'react';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Volume2, 
  Loader2, 
  Building, 
  ShieldCheck,
  Globe2
} from 'lucide-react';
import { BRICS_NATIONS } from '../data/mockData';
import { BRICSNationCode } from '../types';
import { sendPolicymakerChatMessage, generateSpeechAudio } from '../services/gemini';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface UrbanAiChatProps {
  selectedNation: BRICSNationCode;
}

export const UrbanAiChat: React.FC<UrbanAiChatProps> = ({ selectedNation }) => {
  const currentNation = BRICS_NATIONS[selectedNation];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      text: `Welcome to the VoxBRICS Strategic Urban Planning Desk. I am operating with gemini-3.1-pro-preview, tasked with advising policymakers across ${currentNation.name} and BRICS partner institutions. 

How can I assist you with infrastructure prioritization, municipal demographic correlations, or New Development Bank (NDB) blended financing models?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Build conversation history format for gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const replyText = await sendPolicymakerChatMessage(history, userMsg.text, currentNation.name);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakMessage = async (msgId: string, text: string) => {
    setActiveSpeechId(msgId);
    const audioData = await generateSpeechAudio(text.slice(0, 250), 'Charon');
    if (audioData) {
      const audio = new Audio(audioData);
      audio.onended = () => setActiveSpeechId(null);
      audio.onerror = () => setActiveSpeechId(null);
      await audio.play();
    } else {
      const u = new SpeechSynthesisUtterance(text.slice(0, 200));
      u.onend = () => setActiveSpeechId(null);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentNation.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                Multi-Turn Planning Consultation
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              VoxBRICS Strategic Advisory Chat
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Powered by <code className="text-cyan-300 font-mono">gemini-3.1-pro-preview</code> for complex policy trade-offs, spatial demographic optimization, and multilateral capital structuring.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-medium">Digital Public Good Secretariat</span>
          </div>
        </div>
      </div>

      {/* Chat Thread Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col h-[560px]">
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => {
            const isModel = msg.role === 'model';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${isModel ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isModel ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30' : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {isModel ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Body */}
                <div className={`max-w-[85%] rounded-2xl p-4 space-y-2 ${
                  isModel
                    ? 'bg-slate-950 border border-slate-800 text-slate-200'
                    : 'bg-emerald-950/30 border border-emerald-500/30 text-white'
                }`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      {isModel ? 'VoxBRICS Senior Strategist (gemini-3.1-pro-preview)' : 'Policymaker / Citizen'}
                    </span>
                    <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                  </div>

                  <p className="leading-relaxed whitespace-pre-line text-slate-200 font-sans">
                    {msg.text}
                  </p>

                  {isModel && (
                    <div className="pt-2 flex items-center gap-2 border-t border-slate-800/80">
                      <button
                        onClick={() => handleSpeakMessage(msg.id, msg.text)}
                        disabled={activeSpeechId === msg.id}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer bg-slate-900 px-2 py-1 rounded"
                      >
                        <Volume2 className="w-3 h-3" />
                        {activeSpeechId === msg.id ? 'Speaking with gemini-3.8-flash-tts...' : 'Listen via TTS'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-cyan-400 p-3 bg-slate-950 rounded-xl border border-slate-800 w-fit">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing cross-regional demographic and CapEx matrices with gemini-3.1-pro-preview...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase font-bold shrink-0">Prompts:</span>
          {[
            `How should ${currentNation.name} prioritize urban water vs microgrid CapEx under $50M limit?`,
            `What are the top 3 co-benefits of NDB sovereign green bonds for peri-urban slums?`,
            `How can citizen telemetry reduce non-revenue water losses by 30%?`
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(prompt);
              }}
              className="text-[11px] text-slate-400 hover:text-white bg-slate-950 border border-slate-800 hover:border-cyan-500/40 px-2.5 py-1 rounded-lg whitespace-nowrap transition cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask high-level policy questions regarding ${currentNation.name}...`}
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-950/40 transition disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </form>

      </div>

    </div>
  );
};
