"use client";

import { useState } from "react";
import {
  Music,
  Users,
  Globe,
  TrendingUp,
  MessageCircle,
  Shield,
  Headphones,
} from "lucide-react";
import ChatBot from "@/components/ChatBot";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0 luxury-gradient opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl floating-animation"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <Pricing />
        <Footer />
      </div>

      {/* AI Chat Bot */}
      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 z-50 premium-shadow floating-animation"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
