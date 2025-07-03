"use client";

import { useState } from "react";
import {
  Upload,
  Music,
  Image,
  FileText,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    artistName: "",
    songTitle: "",
    albumTitle: "",
    genre: "",
    releaseDate: "",
    price: "",
    language: "Indonesian",
    description: "",
    selectedPackage: "professional",
  });

  const [files, setFiles] = useState({
    audioFile: null as File | null,
    artwork: null as File | null,
  });

  const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Electronic",
    "Jazz",
    "Classical",
    "Country",
    "Folk",
    "Reggae",
    "Dangdut",
    "Keroncong",
    "Campursari",
  ];

  const packages = [
    { id: "starter", name: "Starter", price: "Rp 50.000/rilis" },
    { id: "professional", name: "Professional", price: "Rp 150.000/bulan" },
    { id: "label", name: "Label", price: "Rp 500.000/bulan" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "audioFile" | "artwork",
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({
        ...files,
        [fileType]: e.target.files[0],
      });
    }
  };

  const generateWhatsAppMessage = () => {
    const message = `*PENGAJUAN RILIS MUSIK*
*Nabila Ahmad Studio Distribution*

*DATA ARTIS:*
- Nama Artis: ${formData.artistName}
- Judul Lagu: ${formData.songTitle}
- Album: ${formData.albumTitle || "Single"}
- Genre: ${formData.genre}
- Bahasa: ${formData.language}
- Tanggal Rilis: ${formData.releaseDate}

*PAKET DIPILIH:*
${packages.find((p) => p.id === formData.selectedPackage)?.name} - ${packages.find((p) => p.id === formData.selectedPackage)?.price}

*DESKRIPSI:*
${formData.description || "Tidak ada deskripsi"}

*FILE YANG AKAN DIKIRIM:*
- Audio: ${files.audioFile?.name || "Belum dipilih"}
- Artwork: ${files.artwork?.name || "Belum dipilih"}

*STATUS PEMBAYARAN:*
[ ] Transfer GoPay ke 0895340205302
[ ] Bukti transfer terlampir

Mohon konfirmasi dan proses lebih lanjut. Terima kasih!`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.artistName || !formData.songTitle || !files.audioFile) {
      alert(
        "Mohon lengkapi data wajib: Nama Artis, Judul Lagu, dan File Audio",
      );
      return;
    }

    const whatsappUrl = `https://wa.me/6285810526151?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");
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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Submit Musik Anda
            </h1>
            <p className="text-gray-300 text-lg">
              Isi form di bawah untuk mengajukan distribusi musik ke platform
              streaming global
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Package Selection */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Pilih Paket Distribusi
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <label key={pkg.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="selectedPackage"
                      value={pkg.id}
                      checked={formData.selectedPackage === pkg.id}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.selectedPackage === pkg.id
                          ? "border-purple-400 bg-purple-400/20"
                          : "border-white/20 bg-white/5"
                      }`}
                    >
                      <h4 className="text-white font-semibold">{pkg.name}</h4>
                      <p className="text-gray-300 text-sm">{pkg.price}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Informasi Dasar
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Nama Artis *
                  </label>
                  <input
                    type="text"
                    name="artistName"
                    value={formData.artistName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Contoh: John Doe"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Judul Lagu *
                  </label>
                  <input
                    type="text"
                    name="songTitle"
                    value={formData.songTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Contoh: My Song Title"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Album/EP (Opsional)
                  </label>
                  <input
                    type="text"
                    name="albumTitle"
                    value={formData.albumTitle}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Contoh: My First Album"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Genre
                  </label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="">Pilih Genre</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre} className="bg-gray-800">
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Tanggal Rilis
                  </label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Bahasa
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="Indonesian" className="bg-gray-800">
                      Indonesia
                    </option>
                    <option value="English" className="bg-gray-800">
                      English
                    </option>
                    <option value="Javanese" className="bg-gray-800">
                      Jawa
                    </option>
                    <option value="Sundanese" className="bg-gray-800">
                      Sunda
                    </option>
                    <option value="Other" className="bg-gray-800">
                      Lainnya
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-white font-medium mb-2">
                  Deskripsi/Cerita di Balik Lagu
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="Ceritakan tentang lagu Anda, inspirasi, atau pesan yang ingin disampaikan..."
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Upload File
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    File Audio * (WAV, MP3, FLAC)
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <Music className="mx-auto text-gray-400 mb-4" size={48} />
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, "audioFile")}
                      accept=".wav,.mp3,.flac"
                      className="hidden"
                      id="audioFile"
                    />
                    <label htmlFor="audioFile" className="cursor-pointer">
                      {files.audioFile ? (
                        <p className="text-white">{files.audioFile.name}</p>
                      ) : (
                        <>
                          <p className="text-gray-300">
                            Klik untuk upload audio
                          </p>
                          <p className="text-gray-400 text-sm">
                            Maksimal 100MB
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Artwork/Cover (JPG, PNG)
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <Image className="mx-auto text-gray-400 mb-4" size={48} />
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, "artwork")}
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      id="artwork"
                    />
                    <label htmlFor="artwork" className="cursor-pointer">
                      {files.artwork ? (
                        <p className="text-white">{files.artwork.name}</p>
                      ) : (
                        <>
                          <p className="text-gray-300">
                            Klik untuk upload cover
                          </p>
                          <p className="text-gray-400 text-sm">
                            Minimal 1400x1400px
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <MessageCircle size={20} />
                Kirim ke WhatsApp Admin
              </button>

              <p className="text-gray-300 mt-4 text-sm">
                Setelah klik tombol di atas, Anda akan diarahkan ke WhatsApp
                Admin.
                <br />
                Jangan lupa sertakan bukti pembayaran GoPay ke 0895340205302
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
