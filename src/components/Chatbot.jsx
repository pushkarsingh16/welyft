import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Exactly 4 Primary Chains (Max 4 Topic Questions + 1 Other option = 5 Buttons Max on Main Menu)
// All answers are transcribed with 100% accuracy from official Welyft documentation.
const faqData = {
  q1: {
    text: "What is Welyft?",
    answer: "Welyft is a Singapore-based EV logistics and technology platform. We combine a 100% electric delivery fleet with a smart logistics platform to offer B2B enterprise logistics, last-mile B2C/C2C delivery (WeMove), EV van rental, and a SaaS/PaaS platform for fleet and dispatch management.",
    subQuestions: [
      {
        id: "q1_1",
        text: "Is Welyft a courier company or a technology company?",
        answer: "Both. Welyft operates its own electric fleet for deliveries, and also offers its underlying logistics platform as a SaaS/PaaS solution that other businesses can use to run and manage their own delivery operations."
      },
      {
        id: "q1_2",
        text: "Where does Welyft operate?",
        answer: "Welyft currently operates across Singapore, with a 100% electric fleet supporting enterprise, business, and individual delivery needs island-wide."
      },
      {
        id: "q1_3",
        text: "Why should I choose Welyft over a traditional courier?",
        answer: "Welyft pairs a fully electric fleet with live tracking, transparent pricing, and real-time CO₂ reporting, so you get reliable delivery along with a verifiable sustainability record for every shipment."
      },
      {
        id: "q1_4",
        text: "Is Welyft hiring / how do I apply for a job?",
        answer: "Yes, we're often hiring across operations, tech, and marketing. You can view open roles on our Careers page, or I can point you there now."
      }
    ]
  },
  q2: {
    text: "What B2B enterprise logistics services does Welyft offer?",
    answer: "Welyft's B2B service covers bulk shipping, dedicated fleet capacity, real-time GPS tracking, SLA-backed delivery, ePOD (electronic proof of delivery), and automated enterprise invoicing — all built for businesses managing regular or high-volume deliveries.",
    subQuestions: [
      {
        id: "q2_1",
        text: "Can Welyft handle bulk or recurring business deliveries?",
        answer: "Yes. Our enterprise logistics service is built for bulk shipping and recurring distribution needs, with a dedicated fleet and route optimisation to keep costs predictable."
      },
      {
        id: "q2_2",
        text: "Do you provide carbon or sustainability reporting for business shipments?",
        answer: "Yes. Welyft provides live Scope-3 carbon reporting, so enterprise clients can track the emissions impact of their delivery operations in real time."
      },
      {
        id: "q2_3",
        text: "How do I get a price quote or get started as a new business client?",
        answer: "You can request a quote directly through our 'Get Quote' page, or share your delivery volume and locations with us and our team will follow up with a tailored proposal."
      }
    ]
  },
  q3: {
    text: "What is WeMove parcel delivery & EV van rental?",
    answer: "WeMove is Welyft's on-demand parcel delivery service for individuals and small businesses offering instant booking, live tracking, transparent pricing, and digital proof of delivery. We also offer EV van rental with half-day and full-day options.",
    subQuestions: [
      {
        id: "q3_1",
        text: "How do I book a delivery with WeMove?",
        answer: "You can book instantly through the WeMove app using the instant booking system. Simply enter your pickup and drop-off details to get a live price estimate before confirming. Bookings aren't currently available through the Welyft website — you'll need to download the WeMove app to book."
      },
      {
        id: "q3_2",
        text: "Can I track my parcel in real time & get proof of delivery (ePOD)?",
        answer: "Yes, every WeMove delivery includes live tracking so you can follow your parcel's journey from pickup to drop-off, plus digital security proof (ePOD) confirming successful delivery."
      },
      {
        id: "q3_3",
        text: "Does Welyft rent out electric vehicles with drivers?",
        answer: "Yes, Welyft offers EV van rental with half-day and full-day hire options, backed by our 100% electric fleet commitment. On-call driver support is also available."
      },
      {
        id: "q3_4",
        text: "How is WeMove pricing calculated?",
        answer: "WeMove offers transparent, upfront pricing — you'll see a price estimate based on your pickup and drop-off details before you confirm your booking, with no hidden charges."
      }
    ]
  },
  q4: {
    text: "What is the Welyft SaaS/PaaS platform & how do I contact support?",
    answer: "The Welyft platform is our logistics management software (SaaS/PaaS) giving businesses tools for fleet management, dispatch automation, route optimisation, ePOD workflows, and Singapore's first live CO₂ ledger.",
    subQuestions: [
      {
        id: "q4_1",
        text: "Can other businesses use Welyft's platform for their own fleets?",
        answer: "Yes. The platform is designed so other businesses can license and use it to manage their own vehicle fleets, dispatch, and delivery operations, independent of Welyft's own delivery fleet."
      },
      {
        id: "q4_2",
        text: "What is the 'live CO₂ ledger' & what makes Welyft different?",
        answer: "It's a real-time carbon tracking feature within the Welyft platform — one of the first of its kind in Singapore — that records and reports emissions savings as deliveries happen."
      },
      {
        id: "q4_3",
        text: "How do I contact Welyft or speak to a real person?",
        answer: "You can reach us by email at info@welyft.org, by phone/WhatsApp at +65 8760 1984, or visit Welyft Pte. Ltd. at 101 Cecil Street, #18-11 Tong Eng Building, Singapore 069533."
      }
    ]
  }
};

// Max 4 Main Topic Questions + 1 Other option = 5 Options Max
const topLevelOptions = [
  { text: faqData.q1.text, id: 'q1' },
  { text: faqData.q2.text, id: 'q2' },
  { text: faqData.q3.text, id: 'q3' },
  { text: faqData.q4.text, id: 'q4' },
  { text: "Other", id: 'other' }
];

// Helper Component for the Typing effect
const MessageBubble = ({ msg, onTypingComplete }) => {
  const [simulatedLength, setSimulatedLength] = useState(msg.isSimulatedStream ? 0 : msg.text.length);
  const completedRef = useRef(false);

  useEffect(() => {
    if (msg.isSimulatedStream && simulatedLength < msg.text.length) {
      const timeout = setTimeout(() => {
        setSimulatedLength(prev => Math.min(prev + 3, msg.text.length)); // type 3 chars at a time
      }, 15);
      return () => clearTimeout(timeout);
    } else if (msg.isSimulatedStream && simulatedLength === msg.text.length && !completedRef.current) {
      completedRef.current = true;
      if (onTypingComplete) onTypingComplete();
    }
  }, [simulatedLength, msg.isSimulatedStream, msg.text.length, onTypingComplete]);

  useEffect(() => {
    if (!msg.isSimulatedStream) {
      setSimulatedLength(msg.text.length);
    }
  }, [msg.text, msg.isSimulatedStream]);

  const displayedText = msg.text.slice(0, Math.max(0, simulatedLength));

  return (
    <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
      <div className={`p-3 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm ${
        msg.type === 'user' 
          ? 'bg-[#0A1F44] text-white rounded-tr-sm' 
          : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
      }`}>
        {msg.type === 'bot' ? (
          <div className="prose prose-sm max-w-none prose-p:leading-snug prose-a:text-[#F8D12F] prose-a:font-semibold prose-a:underline">
            <ReactMarkdown>
              {displayedText + (msg.isLlmStream ? ' ▋' : '')}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-white">
            {displayedText}
          </div>
        )}
      </div>

      {msg.options && msg.showOptions && (
        <div className="flex flex-col mt-3 space-y-2 w-full max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300">
          {msg.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => msg.onOptionClick(opt)}
              className="text-left px-4 py-2 text-sm bg-white border border-[#F8D12F] text-[#0A1F44] font-medium rounded-xl hover:bg-[#F8D12F] transition-colors shadow-sm"
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [threadId] = useState(() => "session_" + Math.random().toString(36).substring(2, 10));
  
  const messagesEndRef = useRef(null);

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          type: 'bot', 
          text: "Hello! Welcome to Welyft. I'm your AI assistant for logistics, deliveries, fleet services, enterprise shipping, and platform support. How can I help you today?",
          isSimulatedStream: true,
          showOptions: false,
          options: topLevelOptions,
          onOptionClick: handleOptionClick
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleOptionClick = (option) => {
    const userMsg = { type: 'user', text: option.text, isSimulatedStream: false };
    
    // Other option selected -> enable text input box
    if (option.id === 'other') {
      setShowInput(true);
      setMessages(prev => [...prev, userMsg, { 
        type: 'bot', 
        text: "Please type your question below and I'll do my best to answer it!",
        isSimulatedStream: true,
        showOptions: false
      }]);
      return;
    }

    // Go Back option selected -> return to original 4 topic menu + Enable text input
    if (option.id === 'go_back') {
      setShowInput(true);
      setMessages(prev => [...prev, userMsg, { 
        type: 'bot', 
        text: "What else would you like to know?",
        isSimulatedStream: true,
        showOptions: false,
        options: topLevelOptions,
        onOptionClick: handleOptionClick
      }]);
      return;
    }

    // Top-level topic selected (q1, q2, q3, q4) -> show answer + subQuestions + Go Back + Enable Typing
    if (faqData[option.id]) {
      setShowInput(true);
      const data = faqData[option.id];
      const nextOptions = [
        ...data.subQuestions.map(sq => ({ text: sq.text, id: sq.id, parentId: option.id })),
        { text: "Go Back", id: "go_back" }
      ];
      
      setMessages(prev => [...prev, userMsg, { 
        type: 'bot', 
        text: data.answer,
        isSimulatedStream: true,
        showOptions: false,
        options: nextOptions,
        onOptionClick: handleOptionClick
      }]);
      return;
    }

    // Sub-question selected -> show detailed answer + Go Back option + Enable Typing
    if (option.parentId && faqData[option.parentId]) {
      setShowInput(true);
      const parentData = faqData[option.parentId];
      const subQ = parentData.subQuestions.find(sq => sq.id === option.id);
      if (subQ) {
        setMessages(prev => [...prev, userMsg, { 
          type: 'bot', 
          text: subQ.answer,
          isSimulatedStream: true,
          showOptions: false,
          options: [{ text: "Go Back", id: "go_back" }],
          onOptionClick: handleOptionClick
        }]);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setMessages(prev => [...prev, { type: 'user', text: userText, isSimulatedStream: false }]);
    setInputText("");
    setIsTyping(true); // show pulse indicator

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000);

    try {
      const response = await fetch(`${BACKEND_URL}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          q: userText,
          thread_id: threadId
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      
      const data = await response.json();

      setIsTyping(false); // remove pulse indicator, start simulated stream

      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: data.answer || "Sorry, I didn't get a response.",
        isSimulatedStream: true,
        showOptions: false,
        options: [{ text: "Go Back", id: "go_back" }],
        onOptionClick: handleOptionClick
      }]);

    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Chatbot request error:", error);
      setIsTyping(false);
      const isTimeout = error.name === 'AbortError';
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: isTimeout 
          ? "The server is taking longer than expected due to high traffic. Please try again in a moment!"
          : "Sorry, I'm having trouble connecting to the backend right now. Please ensure the server is running.",
        isSimulatedStream: true,
        showOptions: false,
        options: [{ text: "Go Back", id: "go_back" }],
        onOptionClick: handleOptionClick
      }]);
    }
  };

  const setOptionsVisible = (index) => {
    setMessages(prev => {
      const newMsgs = [...prev];
      if (newMsgs[index]) newMsgs[index].showOptions = true;
      return newMsgs;
    });
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <div className="chatbot-hover-icon group" onClick={() => setIsOpen(true)}>
          <MessageCircle size={32} color="#0A1F44" className="group-hover:scale-110 transition-transform duration-200" />
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed top-[110px] right-[5%] w-[350px] max-w-[90vw] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden border border-gray-200 font-sans">
          {/* Header */}
          <div className="bg-[#0A1F44] text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} className="text-[#F8D12F]" />
              <h3 className="font-semibold text-lg">Welyft Support</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-[#F8D12F] transition-colors p-1 rounded-full hover:bg-white/10">
              <X size={20} />
            </button>
          </div>
          
          {/* Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
             {messages.map((msg, index) => (
               <MessageBubble 
                 key={index} 
                 msg={msg} 
                 onTypingComplete={() => setOptionsVisible(index)} 
               />
             ))}
             
             {isTyping && (
               <div className="flex items-start">
                 <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm shadow-sm flex space-x-1.5 items-center">
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className={`p-3 bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${showInput ? 'block' : 'hidden'}`}>
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-[#0A1F44] text-white placeholder-gray-400 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#F8D12F] border-transparent"
              />
              <button 
                type="submit" 
                disabled={!inputText.trim()}
                className="bg-[#0A1F44] text-white p-2.5 rounded-full hover:bg-[#0A1F44]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
          
        </div>
      )}
    </>
  );
};

export default Chatbot;
