"use client";

import {
  Music,
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Twitter,
  Youtube,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Music className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Nabila Ahmad Studio</h3>
                <p className="text-gray-400 text-sm">
                  Distribution Music Platform
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Platform distribusi musik terdepan di Indonesia dengan teknologi
              AI canggih untuk mendukung karir musik Anda ke tingkat global.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MessageCircle size={20} className="text-green-400" />
                <span>WhatsApp: 085810526151</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={20} className="text-blue-400" />
                <span>GoPay: 0895340205302</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={20} className="text-purple-400" />
                <span>jesikamahjong@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">Layanan</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/submit"
                  className="text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <span>Submit Musik</span>
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
                  href="/artist"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Artist Dashboard
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
              <li>
                <span className="text-gray-300">Analytics Real-time</span>
              </li>
              <li>
                <span className="text-gray-300">Royalty Withdrawal</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-bold mb-6">Dukungan</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">AI Support 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">WhatsApp Support</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Email Support</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Management Team</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Dedicated Manager</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                © 2024 Nabila Ahmad Studio Distribution Music Platform. All
                rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Powered by AI Technology & Professional Music Management
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
