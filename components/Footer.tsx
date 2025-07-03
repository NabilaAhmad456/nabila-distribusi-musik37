"use client";

import { Music, Mail, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="text-purple-400" size={32} />
              <h3 className="text-xl font-bold text-white">
                Nabila Ahmad Studio
              </h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Platform distribusi musik terdepan di Indonesia dengan teknologi
              AI canggih untuk mendukung karir musik Anda.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <MessageCircle size={16} />
                <span>WhatsApp Admin: 085810526151</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} />
                <span>GoPay: 0895340205302</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <span>jesikamahjong@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/submit"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Submit Musik
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Paket Harga
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/contracts"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Kontrak & Syarat
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Dukungan</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">AI Support 24/7</span>
              </li>
              <li>
                <span className="text-gray-300">WhatsApp Support</span>
              </li>
              <li>
                <span className="text-gray-300">Email Support</span>
              </li>
              <li>
                <span className="text-gray-300">Management Team</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Nabila Ahmad Studio Distribution Music Platform. All rights
            reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Powered by AI Technology & Professional Music Management
          </p>
        </div>
      </div>
    </footer>
  );
}
