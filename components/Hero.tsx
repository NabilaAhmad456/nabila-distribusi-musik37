"use client";

import { Play, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-indigo-600/5"></div>

      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full px-6 py-2 mb-8">
          <Sparkles className="text-purple-600" size={16} />
          <span className="text-purple-700 font-medium text-sm">
            Platform Distribusi Musik #1 di Indonesia
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Distribusi Musik{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Profesional
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Bagikan musik Anda ke{" "}
          <span className="font-semibold text-purple-600">
            150+ platform streaming
          </span>{" "}
          dunia dengan dukungan AI canggih dan harga terjangkau
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/submit"
            className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg"
          >
            <span>Mulai Distribusi</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:border-purple-400 hover:text-purple-600 hover:shadow-lg transition-all duration-300 flex items-center gap-3 text-lg">
            <Play
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span>Lihat Demo</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              150+
            </div>
            <div className="text-gray-600 font-medium">Platform Streaming</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              10K+
            </div>
            <div className="text-gray-600 font-medium">Artis Terdaftar</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              50M+
            </div>
            <div className="text-gray-600 font-medium">Total Streams</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              95%
            </div>
            <div className="text-gray-600 font-medium">Royalti Artis</div>
          </div>
        </div>

        {/* Platform Showcase */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Musik Anda akan tersedia di:
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Spotify", color: "from-green-500 to-green-600" },
              { name: "Apple Music", color: "from-pink-500 to-rose-600" },
              { name: "YouTube Music", color: "from-red-500 to-red-600" },
              { name: "Deezer", color: "from-orange-500 to-orange-600" },
              { name: "Amazon Music", color: "from-blue-500 to-blue-600" },
              { name: "Tidal", color: "from-indigo-500 to-purple-600" },
            ].map((platform, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl mx-auto mb-3 flex items-center justify-center`}
                >
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div className="text-gray-800 font-semibold text-sm">
                  {platform.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
