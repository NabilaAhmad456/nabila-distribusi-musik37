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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Footer />

      {/* AI Chat Bot */}
      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
