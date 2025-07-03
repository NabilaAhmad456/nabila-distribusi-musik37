"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Music,
  User,
  Calendar,
  DollarSign,
  ArrowLeft,
  Play,
  Download,
  Eye,
  MessageCircle,
  Zap,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MusicRequest {
  id: string;
  artistName: string;
  artistEmail: string;
  songTitle: string;
  albumTitle?: string;
  genre: string;
  releaseDate: string;
  package: string;
  platforms: string[];
  status: "pending" | "approved" | "rejected" | "distributed";
  submittedAt: string;
  paymentStatus: "pending" | "confirmed" | "failed";
  paymentAmount: number;
  audioFile?: string;
  artwork?: string;
  notes?: string;
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("pending");
  const [requests, setRequests] = useState<MusicRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<MusicRequest | null>(
    null,
  );

  // Demo data
  useEffect(() => {
    const demoRequests: MusicRequest[] = [
      {
        id: "1",
        artistName: "John Doe",
        artistEmail: "john@example.com",
        songTitle: "Summer Vibes",
        albumTitle: "First Album",
        genre: "Pop",
        releaseDate: "2024-02-15",
        package: "Professional",
        platforms: ["Spotify", "Apple Music", "YouTube Music", "Deezer"],
        status: "pending",
        submittedAt: "2024-01-20T10:30:00Z",
        paymentStatus: "confirmed",
        paymentAmount: 150000,
        audioFile: "summer-vibes.wav",
        artwork: "cover-art.jpg",
        notes: "Lagu ini terinspirasi dari liburan musim panas",
      },
      {
        id: "2",
        artistName: "Sarah Music",
        artistEmail: "sarah@example.com",
        songTitle: "Midnight Dreams",
        genre: "R&B",
        releaseDate: "2024-02-20",
        package: "Starter",
        platforms: ["Spotify", "Apple Music"],
        status: "approved",
        submittedAt: "2024-01-18T14:20:00Z",
        paymentStatus: "confirmed",
        paymentAmount: 50000,
        audioFile: "midnight-dreams.mp3",
        artwork: "midnight-cover.png",
      },
      {
        id: "3",
        artistName: "The Rock Band",
        artistEmail: "band@example.com",
        songTitle: "Electric Storm",
        albumTitle: "Thunder Road",
        genre: "Rock",
        releaseDate: "2024-02-25",
        package: "Label",
        platforms: [
          "Spotify",
          "Apple Music",
          "YouTube Music",
          "Deezer",
          "Amazon Music",
          "Tidal",
        ],
        status: "distributed",
        submittedAt: "2024-01-15T09:00:00Z",
        paymentStatus: "confirmed",
        paymentAmount: 500000,
        audioFile: "electric-storm.flac",
        artwork: "storm-cover.jpg",
      },
      {
        id: "4",
        artistName: "Indie Artist",
        artistEmail: "indie@example.com",
        songTitle: "Coffee Shop",
        genre: "Indie",
        releaseDate: "2024-03-01",
        package: "Professional",
        platforms: ["Spotify", "Apple Music", "YouTube Music"],
        status: "pending",
        submittedAt: "2024-01-22T16:45:00Z",
        paymentStatus: "pending",
        paymentAmount: 150000,
        audioFile: "coffee-shop.wav",
      },
    ];
    setRequests(demoRequests);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      credentials.email === "jesikamahjong@gmail.com" &&
      credentials.password === "axis2019"
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Email atau password salah!");
    }
  };

  const handleStatusChange = (
    requestId: string,
    newStatus: "approved" | "rejected" | "distributed",
  ) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: newStatus } : req,
      ),
    );

    const request = requests.find((r) => r.id === requestId);
    if (request) {
      // Send WhatsApp notification to artist
      const message = `*UPDATE STATUS RILIS MUSIK*
*Nabila Ahmad Studio*

Halo ${request.artistName},

Status rilis musik Anda telah diupdate:
- Lagu: ${request.songTitle}
- Status: ${newStatus.toUpperCase()}
- Tanggal Update: ${new Date().toLocaleDateString("id-ID")}

${
  newStatus === "approved"
    ? "Musik Anda telah disetujui dan sedang dalam proses distribusi."
    : newStatus === "distributed"
      ? "Musik Anda telah berhasil didistribusikan ke semua platform!"
      : "Maaf, musik Anda tidak dapat diproses. Silakan hubungi admin untuk informasi lebih lanjut."
}

Terima kasih telah menggunakan layanan kami!`;

      // In a real app, this would send via WhatsApp API
      console.log("WhatsApp message would be sent:", message);
      alert(
        `Status berhasil diubah ke ${newStatus}. Notifikasi WhatsApp akan dikirim ke artis.`,
      );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="text-orange-500" size={20} />;
      case "approved":
        return <CheckCircle className="text-blue-500" size={20} />;
      case "rejected":
        return <XCircle className="text-red-500" size={20} />;
      case "distributed":
        return <Zap className="text-green-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "approved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "distributed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (activeTab === "pending") return req.status === "pending";
    if (activeTab === "approved") return req.status === "approved";
    if (activeTab === "distributed") return req.status === "distributed";
    if (activeTab === "rejected") return req.status === "rejected";
    return true;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="container mx-auto px-4 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="text-white" size={32} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Admin Panel
                </h1>
                <p className="text-gray-600">
                  Kelola semua request distribusi musik
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Email Admin
                  </label>
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors"
                    placeholder="jesikamahjong@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Login ke Admin Panel
                </button>
              </form>

              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  Demo: jesikamahjong@gmail.com / axis2019
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Panel - Music Requests
            </h1>
            <p className="text-gray-600">
              Kelola semua request distribusi musik dari artis
            </p>
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium"
          >
            Logout
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Requests</p>
                <p className="text-3xl font-bold text-orange-600">
                  {requests.filter((r) => r.status === "pending").length}
                </p>
              </div>
              <Clock className="text-orange-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-3xl font-bold text-blue-600">
                  {requests.filter((r) => r.status === "approved").length}
                </p>
              </div>
              <CheckCircle className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Distributed</p>
                <p className="text-3xl font-bold text-green-600">
                  {requests.filter((r) => r.status === "distributed").length}
                </p>
              </div>
              <Zap className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(
                    requests.reduce(
                      (sum, r) =>
                        sum +
                        (r.paymentStatus === "confirmed" ? r.paymentAmount : 0),
                      0,
                    ),
                  )}
                </p>
              </div>
              <DollarSign className="text-purple-500" size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-md">
            {[
              {
                id: "pending",
                label: "Pending",
                count: requests.filter((r) => r.status === "pending").length,
              },
              {
                id: "approved",
                label: "Approved",
                count: requests.filter((r) => r.status === "approved").length,
              },
              {
                id: "distributed",
                label: "Distributed",
                count: requests.filter((r) => r.status === "distributed")
                  .length,
              },
              {
                id: "rejected",
                label: "Rejected",
                count: requests.filter((r) => r.status === "rejected").length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {request.songTitle}
                      </h3>
                      {request.albumTitle && (
                        <span className="text-gray-500">
                          • {request.albumTitle}
                        </span>
                      )}
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}
                      >
                        {request.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                      <div>
                        <p>
                          <strong>Artis:</strong> {request.artistName}
                        </p>
                        <p>
                          <strong>Email:</strong> {request.artistEmail}
                        </p>
                        <p>
                          <strong>Genre:</strong> {request.genre}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Paket:</strong> {request.package}
                        </p>
                        <p>
                          <strong>Rilis:</strong>{" "}
                          {formatDate(request.releaseDate)}
                        </p>
                        <p>
                          <strong>Submitted:</strong>{" "}
                          {formatDate(request.submittedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p>
                        <strong>Platforms:</strong>{" "}
                        {request.platforms.join(", ")}
                      </p>
                      {request.notes && (
                        <p className="mt-2">
                          <strong>Notes:</strong> {request.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.paymentStatus === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        Payment: {request.paymentStatus} -{" "}
                        {formatCurrency(request.paymentAmount)}
                      </div>

                      {request.audioFile && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Music size={16} />
                          <span className="text-sm">{request.audioFile}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {getStatusIcon(request.status)}
                  </div>
                </div>

                {/* Action Buttons */}
                {request.status === "pending" && (
                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleStatusChange(request.id, "approved")}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.id, "rejected")}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        const whatsappUrl = `https://wa.me/62${request.artistEmail.replace(/[^0-9]/g, "")}?text=Halo ${request.artistName}, terima kasih telah submit musik "${request.songTitle}". Kami sedang review submission Anda dan akan memberikan update segera.`;
                        window.open(whatsappUrl, "_blank");
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </button>
                  </div>
                )}

                {request.status === "approved" && (
                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() =>
                        handleStatusChange(request.id, "distributed")
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Zap size={16} />
                      Mark as Distributed
                    </button>
                    <button
                      onClick={() => {
                        const whatsappUrl = `https://wa.me/62${request.artistEmail.replace(/[^0-9]/g, "")}?text=Update: Musik "${request.songTitle}" telah diapprove dan sedang dalam proses distribusi ke platform streaming. Estimasi live dalam 2-3 hari kerja.`;
                        window.open(whatsappUrl, "_blank");
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <MessageCircle size={16} />
                      Notify Artist
                    </button>
                  </div>
                )}

                {request.status === "distributed" && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium">
                        ✅ Musik telah berhasil didistribusikan ke semua
                        platform streaming
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <Music className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Tidak ada request dengan status {activeTab}
              </h3>
              <p className="text-gray-500">
                Request akan muncul di sini ketika artis melakukan submission
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
