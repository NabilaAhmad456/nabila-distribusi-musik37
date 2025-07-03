"use client";

import { useState, useEffect } from "react";
import {
  User,
  TrendingUp,
  DollarSign,
  Music,
  Download,
  Wallet,
  Settings,
  Crown,
  Star,
  BarChart3,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistStats from "@/components/artist/ArtistStats";
import RealtimeChart from "@/components/artist/RealtimeChart";
import WithdrawalPanel from "@/components/artist/WithdrawalPanel";
import UserProfile from "@/components/artist/UserProfile";
import { supabase, getCurrentUser, Artist, Song } from "@/lib/supabase/client";

export default function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtistData();
  }, []);

  const loadArtistData = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        // Redirect to login or show demo data
        setArtist({
          id: "demo",
          name: "Demo Artist",
          email: "demo@example.com",
          avatar_url: "/avatar-placeholder.jpg",
          bio: "Rising star in Indonesian music scene",
          phone: "+62 812-3456-7890",
          total_streams: 2847653,
          total_revenue: 45200000,
          created_at: "2024-01-01",
          updated_at: "2024-01-15",
        });
        setSongs([
          {
            id: "1",
            artist_id: "demo",
            title: "Memories of Love",
            album: "First Album",
            genre: "Pop",
            artwork_url: "/song-artwork-1.jpg",
            release_date: "2024-01-10",
            streams: 856432,
            revenue: 12850000,
            status: "live",
            created_at: "2024-01-01",
          },
          {
            id: "2",
            artist_id: "demo",
            title: "Sunset Dreams",
            album: "First Album",
            genre: "R&B",
            artwork_url: "/song-artwork-2.jpg",
            release_date: "2024-01-15",
            streams: 1245678,
            revenue: 18720000,
            status: "live",
            created_at: "2024-01-05",
          },
          {
            id: "3",
            artist_id: "demo",
            title: "City Lights",
            genre: "Electronic",
            release_date: "2024-01-20",
            streams: 745543,
            revenue: 13630000,
            status: "live",
            created_at: "2024-01-10",
          },
        ]);
      } else {
        // Load real data from Supabase
        const { data: artistData } = await supabase
          .from("artists")
          .select("*")
          .eq("id", user.id)
          .single();

        const { data: songsData } = await supabase
          .from("songs")
          .select("*")
          .eq("artist_id", user.id)
          .order("created_at", { ascending: false });

        setArtist(artistData);
        setSongs(songsData || []);
      }
    } catch (error) {
      console.error("Error loading artist data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Premium Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <Crown className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {artist?.name}
                <Star className="inline ml-2 text-yellow-400" size={24} />
              </h1>
              <p className="text-purple-200 text-lg">
                Premium Artist Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-black/20 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
              { id: "withdraw", label: "Withdraw", icon: Wallet },
              { id: "profile", label: "Profile", icon: User },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-600 rounded-xl">
                    <Music className="text-white" size={24} />
                  </div>
                  <span className="text-purple-300 text-sm font-medium">
                    Total Streams
                  </span>
                </div>
                <p className="text-3xl font-bold text-white mb-2">
                  {formatNumber(artist?.total_streams || 0)}
                </p>
                <p className="text-green-400 text-sm">+12.5% this month</p>
              </div>

              <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-600 rounded-xl">
                    <DollarSign className="text-white" size={24} />
                  </div>
                  <span className="text-green-300 text-sm font-medium">
                    Total Revenue
                  </span>
                </div>
                <p className="text-3xl font-bold text-white mb-2">
                  {formatCurrency(artist?.total_revenue || 0)}
                </p>
                <p className="text-green-400 text-sm">+8.3% this month</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <span className="text-blue-300 text-sm font-medium">
                    Active Songs
                  </span>
                </div>
                <p className="text-3xl font-bold text-white mb-2">
                  {songs.filter((s) => s.status === "live").length}
                </p>
                <p className="text-green-400 text-sm">All performing well</p>
              </div>
            </div>

            {/* Recent Songs */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Music className="text-purple-400" size={28} />
                Your Latest Releases
              </h3>
              <div className="grid gap-4">
                {songs.slice(0, 3).map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <Music className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          {song.title}
                        </h4>
                        <p className="text-gray-300">
                          {song.album || "Single"} • {song.genre}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {song.release_date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-lg">
                        {formatNumber(song.streams)} streams
                      </p>
                      <p className="text-green-400 font-semibold">
                        {formatCurrency(song.revenue)}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          song.status === "live"
                            ? "bg-green-600 text-white"
                            : song.status === "pending"
                              ? "bg-yellow-600 text-white"
                              : "bg-gray-600 text-white"
                        }`}
                      >
                        {song.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && <RealtimeChart songs={songs} />}
        {activeTab === "withdraw" && <WithdrawalPanel artist={artist} />}
        {activeTab === "profile" && (
          <UserProfile artist={artist} setArtist={setArtist} />
        )}
      </div>

      <Footer />
    </div>
  );
}
