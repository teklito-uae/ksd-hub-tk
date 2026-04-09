import { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Search, 
  MapPin, 
  Phone,
  ArrowRight,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { dummyBusinesses, categories } from '@/lib/dummy-data';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  results?: any[];
}

export function HubBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm HubBot, your Kasaragod assistant. How can I help you today? You can ask things like 'find a plumber' or 'best food near me'.",
      sender: 'bot'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Discovery Logic
    setTimeout(() => {
      const query = input.toLowerCase();
      let responseText = "I found a few things that might help you:";
      
      // Simple Keyword Mapping
      const foundBusinesses = dummyBusinesses.filter(b => 
        b.name.toLowerCase().includes(query) || 
        b.description.toLowerCase().includes(query) ||
        categories.find(c => c.id === b.category_id)?.name.toLowerCase().includes(query)
      ).slice(0, 3);

      if (foundBusinesses.length === 0) {
        responseText = "I couldn't find a direct match for that. Would you like to check our main directory?";
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        results: foundBusinesses
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-secondary text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Bot className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">HubBot Discovery</h3>
                  <p className="text-[10px] text-white/60">Powered by Kasaragod Hub</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 rounded-xl">
                <X className="size-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex flex-col", msg.sender === 'user' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed",
                    msg.sender === 'user' 
                      ? "bg-primary text-white rounded-tr-none shadow-md shadow-primary/10" 
                      : "bg-gray-50 text-secondary rounded-tl-none border border-gray-100"
                  )}>
                    {msg.text}
                  </div>
                  
                  {msg.results && msg.results.length > 0 && (
                    <div className="mt-3 w-full space-y-2">
                      {msg.results.map((b) => (
                        <Link 
                          key={b.id} 
                          to={`/business/${b.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                        >
                          <div className="size-10 rounded-lg overflow-hidden shrink-0 border border-gray-50">
                            <img src={b.logo_url} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[10px] font-bold text-secondary truncate">{b.name}</h4>
                            <p className="text-[9px] text-muted-foreground flex items-center gap-1">
                              <MapPin className="size-2.5" /> {b.location}
                            </p>
                          </div>
                          <ArrowRight className="size-3 text-gray-300 group-hover:text-primary transition-colors" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-1.5 p-3 rounded-xl bg-gray-50 w-12 items-center justify-center">
                   <div className="size-1 bg-gray-300 rounded-full animate-bounce" />
                   <div className="size-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="size-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-50">
              <div className="relative">
                 <Input 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="Ask anything about Kasaragod..."
                   className="h-12 rounded-2xl border-gray-100 bg-gray-50 pr-12 focus-visible:bg-white transition-all text-sm"
                 />
                 <Button 
                   onClick={handleSend}
                   size="icon" 
                   className="absolute right-1.5 top-1.5 size-9 rounded-xl shadow-lg shadow-primary/20"
                 >
                   <Send className="size-4" />
                 </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Orb */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "size-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all relative overflow-hidden group",
          isOpen ? "bg-white text-secondary rotate-90" : "bg-primary text-white shadow-primary/40"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X className="size-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="size-6" />
            <div className="absolute -top-1 -right-1 size-3 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="size-2 text-primary" />
            </div>
          </div>
        )}
      </motion.button>
    </div>
  );
}
