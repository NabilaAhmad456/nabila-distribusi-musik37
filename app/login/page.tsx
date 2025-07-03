"use client";

import { useState } from "react";
import { Mail, Lock, ArrowLeft, Chrome, User, Music } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "@/lib/auth";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        alert(`Error: ${error.message}`);
      }
      // Redirect will be handled by the OAuth flow
    } catch (error) {
      console.error("Google sign in error:", error);
      alert("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await signInWithEmail(
          formData.email,
          formData.password,
        );
        if (error) {
          alert(`Login Error: ${error.message}`);
        } else if (data.user) {
          router.push("/artist");
        }
      } else {
        // Sign up validation
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          setLoading(false);
          return;
        }

        const { data, error } = await signUpWithEmail(
          formData.email,
          formData.password,
          {
            name: formData.name,
            role: "artist",
          },
        );

        if (error) {
          alert(`Sign Up Error: ${error.message}`);
        } else {
          alert(
            "Registration successful! Please check your email to verify your account.",
          );
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"
        >
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="max-w-md mx-auto">
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="text-white" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {isLogin ? "Masuk ke Akun" : "Daftar Artis Baru"}
              </h1>
              <p className="text-gray-300">
                {isLogin
                  ? "Akses dashboard artis Anda"
                  : "Bergabung dengan ribuan artis lainnya"}
              </p>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 p-4 rounded-xl font-semibold transition-all duration-300 mb-6 disabled:opacity-50"
            >
              <Chrome size={20} />
              {loading
                ? "Loading..."
                : `${isLogin ? "Masuk" : "Daftar"} dengan Google`}
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black/20 text-gray-300">atau</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-white font-medium mb-2">
                    Nama Artis *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                      placeholder="Nama panggung Anda"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-white font-medium mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-white font-medium mb-2">
                    Konfirmasi Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Loading..." : isLogin ? "Masuk" : "Daftar Sekarang"}
              </button>
            </form>

            {/* Toggle Login/Register */}
            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-300">
                {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-400 hover:text-purple-300 font-semibold ml-2 transition-colors"
                >
                  {isLogin ? "Daftar di sini" : "Masuk di sini"}
                </button>
              </p>
            </div>

            {/* Admin Access */}
            <div className="text-center mt-4">
              <Link
                href="/dashboard"
                className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
