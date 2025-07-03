"use client";

import { Check, Star, Crown, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "50.000",
    period: "per rilis",
    description: "Cocok untuk musisi pemula",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    features: [
      "1 lagu per rilis",
      "Distribusi ke 50+ platform",
      "Laporan streaming dasar",
      "Support email",
      "Royalti 85%",
      "Format audio standar",
      "Metadata dasar",
    ],
    popular: false,
    badge: null,
  },
  {
    name: "Professional",
    price: "150.000",
    period: "per bulan",
    description: "Untuk musisi profesional",
    icon: Star,
    color: "from-purple-500 to-violet-500",
    features: [
      "Unlimited rilis",
      "Distribusi ke 150+ platform",
      "Analytics mendalam",
      "Support 24/7 + AI",
      "Royalti 90%",
      "Perlindungan hak cipta",
      "Custom label",
      "Pre-order scheduling",
      "ISRC code gratis",
      "Laporan real-time",
    ],
    popular: true,
    badge: "Paling Populer",
  },
  {
    name: "Label",
    price: "500.000",
    period: "per bulan",
    description: "Untuk label musik dan manajemen",
    icon: Crown,
    color: "from-orange-500 to-red-500",
    features: [
      "Multi-artist management",
      "White-label platform",
      "Dedicated account manager",
      "Priority support",
      "Royalti 95%",
      "Advanced analytics",
      "Custom contracts",
      "Bulk upload tools",
      "API access",
      "Marketing tools",
      "Revenue tracking",
      "Custom branding",
    ],
    popular: false,
    badge: "Enterprise",
  },
];

export default function Pricing() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-2 mb-6">
            <span className="text-green-700 font-medium text-sm">
              Harga Terjangkau
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pilih Paket yang{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Tepat untuk Anda
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mulai dari yang gratis hingga fitur enterprise. Semua paket termasuk
            dukungan AI 24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white border-2 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 ${
                plan.popular
                  ? "border-purple-400 scale-105 shadow-xl ring-4 ring-purple-100"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`bg-gradient-to-r ${plan.color} text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg`}
                  >
                    <plan.icon size={16} />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <plan.icon className="text-white" size={40} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    Rp {plan.price}
                  </div>
                  <div className="text-gray-600">/{plan.period}</div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <Check className="text-white" size={14} />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/submit"
                className={`block w-full text-center py-4 rounded-2xl font-bold transition-all duration-300 ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-xl hover:scale-105`
                    : "border-2 border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-600 hover:shadow-lg"
                }`}
              >
                {plan.popular ? "Pilih Paket Terbaik" : `Pilih ${plan.name}`}
              </Link>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-3xl p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Informasi Pembayaran
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="text-gray-900 font-bold mb-4 text-lg">
                Metode Pembayaran:
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GoPay</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">GoPay</p>
                    <p className="text-gray-600 text-sm">
                      0895340205302 (Admin)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="text-gray-900 font-bold mb-4 text-lg">
                Proses Mudah:
              </h4>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Transfer ke GoPay 0895340205302
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Screenshot bukti pembayaran
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Kirim via WhatsApp ke 085810526151
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  Mulai upload musik Anda
                </li>
              </ol>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-700">
              <strong>WhatsApp Admin:</strong> 085810526151 |
              <strong> Email:</strong> jesikamahjong@gmail.com
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Dukungan AI 24/7 tersedia untuk semua paket
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
