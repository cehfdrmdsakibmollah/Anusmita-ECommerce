import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw, 
  Package, 
  Phone, 
  ExternalLink,
  ShoppingBag
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
  productCard?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export const Chatbot: React.FC = () => {
  const { 
    products, 
    orders, 
    soundEnabled, 
    toggleSound, 
    playNotificationSound,
    navigateTo,
    addToCart,
    formatPrice 
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: '🌸 আসসালামু আলাইকুম! ANUSMITA Assistant-এ আপনাকে স্বাগতম। আমি আপনাকে ১০০% অরিজিনাল কোরিয়ান, জাপানি ও চাইনিজ স্কিনকেয়ার ও ফ্যাশন প্রোডাক্ট খুঁজে পেতে, লাইভ স্টক চেক করতে বা অর্ডার ট্র্যাকিংয়ে সাহায্য করতে পারি। আজ আপনাকে কীভাবে সহায়তা করতে পারি?',
      timestamp: 'Just now',
      quickActions: [
        { label: '🚚 ডেলিভারি চার্জ কত?', action: 'delivery' },
        { label: '📦 অর্ডার ট্র্যাক করুন', action: 'track' },
        { label: '🌿 অয়েলি স্কিনের সানস্ক্রিন', action: 'oily_sunscreen' },
        { label: '🎟️ ডিসকাউন্ট কুপন', action: 'coupon' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    playNotificationSound('chime');
  };

  const resetChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: 'কথোপকথন রিস্টার্ট করা হয়েছে। নতুন কোনো প্রোডাক্ট বা অর্ডার সম্পর্কিত জিজ্ঞাসা থাকলে জানান!',
        timestamp: 'Just now',
        quickActions: [
          { label: '📦 অর্ডার স্ট্যাটাস', action: 'track' },
          { label: '✨ গ্লাস স্কিন রুটিন', action: 'glass_skin' }
        ]
      }
    ]);
  };

  const processUserQuery = (userQuery: string) => {
    const q = userQuery.toLowerCase().trim();

    // 1. Delivery & Shipping query
    if (q.includes('delivery') || q.includes('ডেলিভারি') || q.includes('শিপিং') || q.includes('charge')) {
      return {
        text: '🚚 ANUSMITA ডেলিভারি চার্জ:\n• ঢাকার ভেতরে: ৮০ টাকা (২৪-৪৮ ঘণ্টার মধ্যে)\n• ঢাকার বাইরে: ১৫০ টাকা (২-৩ কার্যদিবস)\n\nআমরা পাঠাও ও স্টিডফাস্ট কুরিয়ারের মাধ্যমে ক্যাশ অন ডেলিভারি (COD) নিশ্চিত করে থাকি।'
      };
    }

    // 2. Coupon & Discount
    if (q.includes('coupon') || q.includes('discount') || q.includes('কুপন') || q.includes('ছাড়') || q.includes('offer')) {
      return {
        text: '🎉 বিশেষ অফার! চেকআউটে কোড ANUSMITA10 ব্যবহার করলে পাচ্ছেন ফ্ল্যাট ১০% ডিসকাউন্ট। আর ঢাকার ভেতরে ৩,৫০০ টাকার অর্ডারে রয়েছে ফ্রি ডেলিভারি!'
      };
    }

    // 3. Order Tracking (e.g. ANUS-78219 or "tracking")
    const orderMatch = userQuery.match(/ANUS-\d{5}/i);
    if (orderMatch || q.includes('track') || q.includes('স্ট্যাটাস') || q.includes('ট্র্যাক')) {
      if (orderMatch) {
        const foundOrder = orders.find(o => o.id.toUpperCase() === orderMatch[0].toUpperCase());
        if (foundOrder) {
          return {
            text: `📦 অর্ডার আইডি #${foundOrder.id} এর বর্তমান অবস্থা:\n\n• কাস্টমার: ${foundOrder.customerName}\n• বর্তমান স্ট্যাটাস: ${foundOrder.orderStatus}\n• কুরিয়ার: ${foundOrder.courierName || 'Assigned soon'} (${foundOrder.consignmentId || 'Pending'})\n• মোট টাকা: ৳${foundOrder.total} (${foundOrder.paymentStatus})\n\nআমাদের প্রতিনিধি খুব শীঘ্রই ডেলিভারির জন্য যোগাযোগ করবেন।`
          };
        } else {
          return {
            text: `দুঃখিত, #${orderMatch[0]} নম্বরে কোনো অর্ডার খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক ৫-সংখ্যার অর্ডার আইডি লিখুন (যেমন: ANUS-78219)।`
          };
        }
      } else {
        const lastOrder = orders[0];
        return {
          text: `আপনার সাম্প্রতিক অর্ডার ট্র্যাক করতে অনুগ্রহ করে আপনার অর্ডার আইডি লিখুন (যেমন: #${lastOrder.id}) অথবা ফোন নম্বর লিখে জানান।`
        };
      }
    }

    // 4. Skin Concern / Sunscreen query
    if (q.includes('oily') || q.includes('অয়েলি') || q.includes('সানস্ক্রিন') || q.includes('sunscreen') || q.includes('acne') || q.includes('ব্রণ')) {
      const bojSun = products.find(p => p.id === 'prod-102') || products[1];
      return {
        text: '✨ অয়েলি ও সেন্সিটিভ স্কিনের জন্য আমাদের টপ রিকমেন্ডেশন হলো "Beauty of Joseon Relief Sun: Rice + Probiotics SPF50+". এটি হোয়াইট কাস্ট ছাড়া সম্পূর্ণ হালকা এবং ব্রণের উপশম করে।',
        productCard: {
          id: bojSun.id,
          name: bojSun.name,
          price: bojSun.price,
          image: bojSun.mainImage
        }
      };
    }

    // 5. Glass Skin / Routine
    if (q.includes('glass skin') || q.includes('গ্লাস স্কিন') || q.includes('routine') || q.includes('রুটিন')) {
      const centella = products.find(p => p.id === 'prod-101') || products[0];
      return {
        text: '🌸 কোরিয়ান গ্লাস স্কিনের জন্য আমাদের ৪-ধাপের রুটিন বান্ডেল দারুণ কার্যকর:\n1. Centella Ampoule\n2. Hada Labo Premium Lotion\n3. Rice Probiotics Sunscreen\n\nআপনি আমাদের "Bundles" পেজ থেকে ১০৫০ টাকা সাশ্রয়ে এটি এক ক্লিকে অর্ডার করতে পারেন!',
        productCard: {
          id: centella.id,
          name: centella.name,
          price: centella.price,
          image: centella.mainImage
        }
      };
    }

    // 6. Direct phone/order registration verification (anti-spam 11-digit check)
    const phoneMatch = userQuery.match(/01[3-9]\d{8}/);
    if (phoneMatch && (q.includes('order') || q.includes('অর্ডার') || q.includes('নিব') || q.includes('confirm'))) {
      return {
        text: `✅ ধন্যবাদ! আপনার মোবাইল নম্বর (${phoneMatch[0]}) সিস্টেমে ভেরিফাই করা হয়েছে। আমাদের সেলস এক্সিকিউটিভ কল করে আপনার ডেলিভারি ঠিকানা নিশ্চিত করবেন। অথবা আপনি শপ থেকে ডিরেক্ট চেকআউট করতে পারেন।`
      };
    }

    // 7. Search in catalog
    const matchedProd = products.find(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    if (matchedProd) {
      return {
        text: `✨ ${matchedProd.name} (${matchedProd.origin})\n\n• ব্র্যান্ড: ${matchedProd.brand}\n• দাম: ৳${matchedProd.price}\n• স্টক: ${matchedProd.stock > 0 ? `${matchedProd.stock} টি স্টকে রয়েছে` : 'আউট অব স্টক (প্রি-অর্ডার ওপেন)'}\n• সুবিধা: ${matchedProd.benefits || matchedProd.description.slice(0, 100)}...`,
        productCard: {
          id: matchedProd.id,
          name: matchedProd.name,
          price: matchedProd.price,
          image: matchedProd.mainImage
        }
      };
    }

    // Default Fallback
    return {
      text: 'ANUSMITA বিউটি অ্যাসিস্ট্যান্টে স্বাগতম! আমাদের ১০০% অরিজিনাল জাপানি, কোরিয়ান ও চাইনিজ বিউটি, সিল্ক ড্রেস বা ১৮কে গোল্ড প্লেটেড জুয়েলারি সম্পর্কে জানতে প্রোডাক্টের নাম লিখুন অথবা সরাসরি আমাদের WhatsApp-এ কথা বলুন।'
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processUserQuery(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: 'Just now',
        productCard: response.productCard
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      playNotificationSound('message');
    }, 600);
  };

  return (
    <div id="chatbot-container" className="fixed bottom-5 right-5 z-40">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="group relative bg-[#B74764] hover:bg-[#9F3652] text-white p-3.5 sm:p-4 rounded-full shadow-[0_8px_24px_rgba(183,71,100,0.35)] transition-all transform hover:scale-105 flex items-center justify-center border-2 border-white"
          aria-label="Open Anusmita Assistant"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B74764] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-400 border-2 border-white"></span>
          </span>
          <span className="hidden group-hover:inline-block absolute right-16 bg-[#211D20] text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg">
            Chat with ANUSMITA Assistant
          </span>
        </button>
      )}

      {/* Responsive Chat Box */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-[#EADDE0] flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#B74764] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold leading-tight">ANUSMITA Assistant</h3>
                <p className="text-[10px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online · Bengali & English Support
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-white/80">
              <button 
                onClick={toggleSound} 
                className="p-1 hover:text-white rounded"
                title={soundEnabled ? 'Mute' : 'Unmute'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button 
                onClick={resetChat} 
                className="p-1 hover:text-white rounded"
                title="Restart chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FFFAF7]/60 text-xs">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#B74764] text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-[#211D20] border border-[#EADDE0] rounded-bl-xs shadow-xs'
                  }`}
                >
                  {msg.text}

                  {/* Attached Product Card if recommended */}
                  {msg.productCard && (
                    <div className="mt-2.5 p-2 bg-[#FFF7F3] rounded-xl border border-[#EADDE0] flex items-center gap-2.5">
                      <img 
                        src={msg.productCard.image} 
                        alt={msg.productCard.name}
                        className="w-12 h-12 object-cover rounded-lg bg-white shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#211D20] truncate text-[11px]">{msg.productCard.name}</p>
                        <p className="font-bold text-[#B74764] text-xs">{formatPrice(msg.productCard.price)}</p>
                      </div>
                      <button
                        onClick={() => {
                          const p = products.find(prod => prod.id === msg.productCard?.id);
                          if (p) addToCart(p);
                        }}
                        className="bg-[#B74764] text-white p-2 rounded-lg hover:bg-[#9F3652] shrink-0"
                        title="Add to Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Action Chips */}
                {msg.quickActions && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickActions.map((qa, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(qa.label)}
                        className="px-2.5 py-1 bg-white hover:bg-[#FDF1F3] text-[#B74764] border border-[#EADDE0] rounded-full text-[10px] font-medium transition shadow-2xs"
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-[#746B70] text-xs bg-white p-2.5 rounded-xl border border-[#EADDE0] w-24">
                <span className="w-1.5 h-1.5 bg-[#B74764] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#B74764] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#B74764] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick WhatsApp Link Pill */}
          <div className="px-3 py-1.5 bg-[#FFF7F3] border-t border-[#EADDE0] flex items-center justify-between text-[11px] text-[#746B70]">
            <span>Need human agent assistance?</span>
            <a 
              href="https://wa.me/8801310339192?text=Hello%20ANUSMITA!%20I%20need%20assistance%20with%20my%20order."
              target="_blank"
              rel="noreferrer"
              className="text-green-700 font-bold flex items-center gap-1 hover:underline"
            >
              <span>WhatsApp +880 1310-339192</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#EADDE0] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skin routine, track order, stock..."
              className="flex-1 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl px-3 py-2 text-xs text-[#211D20] focus:outline-none focus:border-[#B74764]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-[#B74764] hover:bg-[#9F3652] disabled:opacity-40 text-white p-2.5 rounded-xl transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
