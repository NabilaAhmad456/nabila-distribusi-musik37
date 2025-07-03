"use client";

import { Check, Star } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "50.000",
    period: "per rilis",
    description: "Cocok untuk musisi pemula",
    features: [
      "1 lagu per rilis",
      "Distribusi ke 50+ platform",
      "Laporan streaming dasar",
      "Support email",
      "Royalti 85%",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "150.000",
    period: "per bulan",
    description: "Untuk musisi profesional",
    features: [
      "Unlimited rilis",
      "Distribusi ke 150+ platform",
      "Analytics mendalam",
      "Support 24/7 + AI",
      "Royalti 90%",
      "Perlindungan hak cipta",
      "Custom label",
    ],
    popular: true,
  },
  {
    name: "Label",
    price: "500.000",
    period: "per bulan",
    description: "Untuk label musik dan manajemen",
    features: [
      "Multi-artist management",
      "White-label platform",
      "Dedicated account manager",
      "Priority support",
      "Royalti 95%",
      "Advanced analytics",
      "Custom contracts",
      "Bulk upload tools",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Paket Harga Terjangkau
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan distribusi musik Anda
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white border rounded-xl p-8 hover:shadow-xl transition-all duration-300 shadow-lg ${
                plan.popular
                  ? "border-purple-400 scale-105 ring-2 ring-purple-200"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={16} />
                    Paling Populer
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  Rp {plan.price}
                  <span className="text-lg text-gray-600 font-normal">
                    /{plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check
                      className="text-purple-600 mt-1 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/submit"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg"
                    : "border border-white/30 text-white hover:bg-white/10"
                }`}
              >
                Pilih Paket
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
          <p className="text-gray-700 mb-4">
            <strong>Pembayaran:</strong> GoPay ke 0895340205302 (Admin)
          </p>
          <p className="text-gray-600">
            Semua paket termasuk dukungan AI 24/7 dan integrasi WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
