"use client";

import {
  Globe,
  TrendingUp,
  Shield,
  Users,
  Headphones,
  Zap,
  Music,
  Clock,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Distribusi Global",
    description:
      "Bagikan musik Anda ke 150+ platform streaming di seluruh dunia termasuk Spotify, Apple Music, YouTube Music, dan lainnya.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Analytics Mendalam",
    description:
      "Dapatkan laporan detail tentang performa musik Anda dengan data streaming, royalti, dan demografi pendengar.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Perlindungan Hak Cipta",
    description:
      "Sistem keamanan tingkat tinggi untuk melindungi hak cipta dan mencegah pembajakan musik Anda.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Users,
    title: "Management Support",
    description:
      "Tim support profesional dan AI canggih siap membantu 24/7 untuk semua kebutuhan distribusi musik Anda.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Headphones,
    title: "Kualitas Audio Tinggi",
    description:
      "Dukungan format audio berkualitas tinggi hingga 24-bit/192kHz untuk pengalaman mendengar terbaik.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Proses Cepat",
    description:
      "Musik Anda akan live di platform streaming dalam 1-3 hari kerja dengan proses otomatis yang efisien.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Music,
    title: "Unlimited Releases",
    description:
      "Rilis musik tanpa batas dengan paket professional. Tidak ada batasan jumlah lagu atau album.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Clock,
    title: "Royalti Real-time",
    description:
      "Pantau pendapatan Anda secara real-time dengan sistem tracking yang akurat dan transparan.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Sertifikasi Resmi",
    description:
      "Dapatkan ISRC code dan sertifikasi resmi untuk setiap rilis musik Anda.",
    color: "from-violet-500 to-purple-500",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 rounded-full px-4 py-2 mb-6">
            <span className="text-purple-700 font-medium text-sm">
              Fitur Unggulan
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Semua yang Anda Butuhkan untuk{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sukses di Musik
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Platform lengkap dengan fitur profesional untuk mendistribusikan
            musik Anda ke seluruh dunia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-3xl`}
              ></div>

              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="text-white" size={32} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Memulai Karir Musik Anda?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Bergabunglah dengan ribuan artis yang sudah mempercayai platform
              kami
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Mulai Sekarang - Gratis!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
