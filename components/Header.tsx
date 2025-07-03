"use client";

import { Music, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="text-purple-600" size={32} />
            <h1 className="text-xl font-bold text-gray-900">
              Nabila Ahmad Studio
            </h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Harga
            </Link>
            <Link
              href="/submit"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Submit Musik
            </Link>
            <Link
              href="/artist"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Artist Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Admin Dashboard
            </Link>
            <Link
              href="/contracts"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Kontrak
            </Link>
            <Link
              href="/login"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white/95">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Beranda
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Harga
              </Link>
              <Link
                href="/submit"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Submit Musik
              </Link>
              <Link
                href="/artist"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Artist Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Admin Dashboard
              </Link>
              <Link
                href="/contracts"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Kontrak
              </Link>
              <Link
                href="/login"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-center transition-all duration-300 shadow-lg"
              >
                Login
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
