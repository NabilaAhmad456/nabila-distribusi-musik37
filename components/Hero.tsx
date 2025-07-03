"use client";

import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Distribusi Musik
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            Profesional
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Platform distribusi musik terdepan di Indonesia. Bagikan musik Anda ke
          seluruh platform streaming dunia dengan dukungan AI canggih dan harga
          terjangkau.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            Mulai Distribusi
            <ArrowRight size={20} />
          </Link>

          <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
            <Play size={20} />
            Lihat Demo
          </button>
        </div>

        {/* Platform Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
          <div className="bg-white/10 rounded-lg p-4 text-white text-center">
            Spotify
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-white text-center">
            Apple Music
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-white text-center">
            YouTube Music
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-white text-center">
            Deezer
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-white text-center">
            Amazon Music
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-white text-center">
            Tidal
          </div>
        </div>
      </div>
    </section>
  );
}
