import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { 
    products, 
    orders, 
    soundEnabled, 
    toggleSound, 
    playNotificationSound,
    navigateTo,
    formatPrice,
    showToast 
  } = useStore();

  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  // Embedded Contact Page Assistant State
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'cp-1',
      sender: 'bot',
      text: '🌸 আসসালামু আলাইকুম! ANUSMITA হেল্প ডেস্কে স্বাগতম। আপনি এখান থেকেই সরাসরি আমাদের প্রোডাক্ট সম্পর্কে জানতে পারেন, অর্ডার ট্র্যাক করতে পারেন অথবা পছন্দের প্রোডাক্ট প্রি-অর্ডার করতে পারেন। কীভাবে সাহায্য করতে পারি?'
    }
  ]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formContact || !formMessage) return;

    setFormSent(true);
    showToast('Your message has been received! Our support team will respond shortly.');
  };

  const handleChatSend = (queryToSend?: string) => {
    const q = queryToSend || chatInput;
    if (!q.trim()) return;

    const userMessage = { id: `usr-${Date.now()}`, sender: 'user', text: q };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'ANUSMITA বিউটি অ্যাসিস্ট্যান্টে স্বাগতম! আমাদের ১০০% অরিজিনাল জাপানি, কোরিয়ান ও চাইনিজ বিউটি বা পারফিউম সম্পর্কে জানতে প্রোডাক্টের নাম লিখুন অথবা সরাসরি আমাদের WhatsApp-এ কথা বলুন।';
      const cleanQ = q.toLowerCase();

      if (cleanQ.includes('delivery') || cleanQ.includes('ডেলিভারি') || cleanQ.includes('চার্জ')) {
        replyText = '🚚 ANUSMITA ডেলিভারি চার্জ:\n• ঢাকার ভেতরে: ৮০ টাকা (২৪-৪৮ ঘণ্টা)\n• ঢাকার বাইরে: ১৫০ টাকা (২-৩ কার্যদিবস)\nআমরা ক্যাশ অন ডেলিভারি নিশ্চিত করে থাকি!';
      } else if (cleanQ.includes('track') || cleanQ.includes('স্ট্যাটাস') || cleanQ.includes('anus-')) {
        const lastOrder = orders[0];
        replyText = `📦 অর্ডার #${lastOrder.id} এর বর্তমান অবস্থা:\n• কাস্টমার: ${lastOrder.customerName}\n• স্ট্যাটাস: ${lastOrder.orderStatus}\n• কুরিয়ার: ${lastOrder.courierName} (${lastOrder.consignmentId})\n• মোট বিল: ৳${lastOrder.total}`;
      } else if (cleanQ.includes('sunscreen') || cleanQ.includes('সানস্ক্রিন') || cleanQ.includes('অয়েলি')) {
        replyText = '✨ অয়েলি স্কিনের জন্য সেরা চয়েস: Beauty of Joseon Relief Sun Rice + Probiotics SPF50+ (৳1,550)। কোনো হোয়াইট কাস্ট নেই এবং ত্বক তেলতেলে করে না!';
      } else if (cleanQ.includes('coupon') || cleanQ.includes('কুপন') || cleanQ.includes('discount')) {
        replyText = '🎉 এক্সক্লুসিভ অফার! চেকআউটে কোড ANUSMITA10 বসালে পাচ্ছেন ফ্ল্যাট ১০% ডিসকাউন্ট!';
      } else if (cleanQ.includes('017') || cleanQ.includes('018') || cleanQ.includes('019') || cleanQ.includes('013')) {
        replyText = '✅ আপনার মোবাইল নম্বরটি সিস্টেমে ভেরিফাই হয়েছে। আমাদের প্রতিনিধি শীঘ্রই যোগাযোগ করবেন!';
      }

      setChatMessages(prev => [...prev, { id: `bot-${Date.now()}`, sender: 'bot', text: replyText }]);
      setIsTyping(false);
      playNotificationSound('message');
    }, 600);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-[#746B70] flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#B74764]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#211D20] font-bold">Contact & Customer Support</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#B74764] uppercase tracking-widest">
          We Are Here For You
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211D20]">
          Connect with ANUSMITA
        </h1>
        <p className="text-xs sm:text-sm text-[#746B70] leading-relaxed">
          Questions about authentic batch numbers, skin matching, or nationwide delivery? Reach our Dhaka concierge directly.
        </p>
      </div>

      {/* Official Contact Channels Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Telephone */}
        <a 
          href="tel:+8801310339192" 
          className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs hover:border-[#B74764] hover:shadow-md transition space-y-2 block"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FDF1F3] text-[#B74764] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#746B70] block">Official Hotline</span>
          <p className="font-bold text-[#211D20] text-base">+880 1310-339192</p>
          <p className="text-[11px] text-[#746B70]">Daily 10:00 AM – 10:00 PM</p>
        </a>

        {/* WhatsApp */}
        <a 
          href="https://wa.me/8801310339192" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs hover:border-green-600 hover:shadow-md transition space-y-2 block"
        >
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#746B70] block">Direct WhatsApp Chat</span>
          <p className="font-bold text-green-700 text-base">Chat on WhatsApp</p>
          <p className="text-[11px] text-[#746B70]">Instant product queries & quick orders</p>
        </a>

        {/* Email */}
        <a 
          href="mailto:anusmitashopbd@gmail.com" 
          className="bg-white p-6 rounded-3xl border border-[#EADDE0] shadow-xs hover:border-[#B74764] hover:shadow-md transition space-y-2 block"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FDF1F3] text-[#B74764] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#746B70] block">Official Email</span>
          <p className="font-bold text-[#211D20] text-sm truncate">anusmitashopbd@gmail.com</p>
          <p className="text-[11px] text-[#746B70]">Invoicing & Wholesale Inquiries</p>
        </a>
      </div>

      {/* Main Grid: Contact Form + Embedded AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Traditional Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-3xl border border-[#EADDE0] shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-[#211D20]">Send an Inquiry Message</h2>
            <p className="text-xs text-[#746B70]">Fill in your details and we will reply within 4 hours.</p>
          </div>

          {formSent ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-green-700 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-green-900">Message Received</h3>
              <p className="text-xs text-green-800">
                Thank you, {formName}. We have logged your ticket and our representative will reach out at {formContact}.
              </p>
              <button
                onClick={() => setFormSent(false)}
                className="text-xs font-bold text-[#B74764] underline pt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#514950]">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tahmina Chowdhury"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full mt-1 p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Mobile Number or Email *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 01711223344 or email@domain.com"
                  value={formContact}
                  onChange={(e) => setFormContact(e.target.value)}
                  className="w-full mt-1 p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Inquiry Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Shade match advice / Bulk pre-order"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full mt-1 p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#514950]">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your question or order requirement in detail..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full mt-1 p-3 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl focus:outline-none focus:border-[#B74764]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#B74764] hover:bg-[#9F3652] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}

          {/* Messenger link per specification */}
          <div className="pt-2 border-t border-[#EADDE0] flex items-center justify-between text-xs text-[#746B70]">
            <span>Facebook Messenger:</span>
            <a 
              href="https://m.me/AnusmitaBD" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#B74764] font-bold hover:underline flex items-center gap-1"
            >
              <span>m.me/AnusmitaBD</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Column: Embedded ANUSMITA Assistant */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#EADDE0] shadow-xs overflow-hidden flex flex-col h-[540px]">
          
          {/* Assistant Header */}
          <div className="bg-[#B74764] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-white" />
              <div>
                <h3 className="font-serif text-base font-bold">ANUSMITA AI Order & Support Assistant</h3>
                <p className="text-[10px] text-white/80">● Online · 100% Free · Real-time Catalog & Order Sync</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleSound} className="text-white/80 hover:text-white">
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick chips bar */}
          <div className="p-2.5 bg-[#FFF7F3] border-b border-[#EADDE0] flex gap-2 overflow-x-auto text-[11px]">
            <button 
              onClick={() => handleChatSend('ডেলিভারি চার্জ কত?')}
              className="px-2.5 py-1 bg-white border border-[#EADDE0] rounded-full text-[#B74764] font-medium whitespace-nowrap hover:bg-[#FDF1F3]"
            >
              🚚 ডেলিভারি চার্জ
            </button>
            <button 
              onClick={() => handleChatSend('অর্ডার ট্র্যাকিং')}
              className="px-2.5 py-1 bg-white border border-[#EADDE0] rounded-full text-[#B74764] font-medium whitespace-nowrap hover:bg-[#FDF1F3]"
            >
              📦 অর্ডার স্ট্যাটাস
            </button>
            <button 
              onClick={() => handleChatSend('অয়েলি স্কিনের সানস্ক্রিন')}
              className="px-2.5 py-1 bg-white border border-[#EADDE0] rounded-full text-[#B74764] font-medium whitespace-nowrap hover:bg-[#FDF1F3]"
            >
              🌿 স্কিনকেয়ার সাজেশন
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FFFAF7]/60 text-xs">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#B74764] text-white rounded-br-none shadow-xs'
                    : 'bg-white text-[#211D20] border border-[#EADDE0] rounded-bl-none shadow-xs'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-[#746B70] text-xs bg-white p-2 rounded-xl border border-[#EADDE0] w-24">
                <span className="w-1.5 h-1.5 bg-[#B74764] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#B74764] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#B74764] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-[#EADDE0] flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
              placeholder="প্রোডাক্টের নাম বা অর্ডার সম্পর্কিত কিছু লিখুন..."
              className="flex-1 bg-[#FFFAF7] border border-[#EADDE0] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B74764]"
            />
            <button
              onClick={() => handleChatSend()}
              className="bg-[#B74764] text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-[#9F3652] transition shadow-xs"
            >
              Send
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
