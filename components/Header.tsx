"use client";

import { Music, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="text-purple-400" size={32} />
            <h1 className="text-xl font-bold text-white">
              Nabila Ahmad Studio
            </h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/pricing"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Harga
            </Link>
            <Link
              href="/submit"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Submit Musik
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/contracts"
              className="text-white hover:text-purple-400 transition-colors"
            >
              Kontrak
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Beranda
              </Link>
              <Link
                href="/pricing"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Harga
              </Link>
              <Link
                href="/submit"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Submit Musik
              </Link>
              <Link
                href="/dashboard"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/contracts"
                className="text-white hover:text-purple-400 transition-colors"
              >
                Kontrak
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
