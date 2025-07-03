"use client";

import {
  Globe,
  TrendingUp,
  Shield,
  Users,
  Headphones,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Distribusi Global",
    description:
      "Bagikan musik Anda ke 150+ platform streaming di seluruh dunia termasuk Spotify, Apple Music, YouTube Music, dan lainnya.",
  },
  {
    icon: TrendingUp,
    title: "Analytics Mendalam",
    description:
      "Dapatkan laporan detail tentang performa musik Anda dengan data streaming, royalti, dan demografi pendengar.",
  },
  {
    icon: Shield,
    title: "Perlindungan Hak Cipta",
    description:
      "Sistem keamanan tingkat tinggi untuk melindungi hak cipta dan mencegah pembajakan musik Anda.",
  },
  {
    icon: Users,
    title: "Management Support",
    description:
      "Tim support profesional dan AI canggih siap membantu 24/7 untuk semua kebutuhan distribusi musik Anda.",
  },
  {
    icon: Headphones,
    title: "Kualitas Audio Tinggi",
    description:
      "Dukungan format audio berkualitas tinggi hingga 24-bit/192kHz untuk pengalaman mendengar terbaik.",
  },
  {
    icon: Zap,
    title: "Proses Cepat",
    description:
      "Musik Anda akan live di platform streaming dalam 1-3 hari kerja dengan proses otomatis yang efisien.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fitur Unggulan Platform
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk mendistribusikan musik secara
            profesional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 shadow-lg"
            >
              <feature.icon className="text-purple-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
