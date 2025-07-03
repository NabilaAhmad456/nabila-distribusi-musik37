"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  Music,
  Image,
  FileText,
  ArrowLeft,
  MessageCircle,
  Calendar,
  Globe,
  User,
  Tag,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";

export default function SubmitPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Basic Information
    releaseType: "single", // single, ep, album
    primaryArtist: "",
    featuredArtists: "",
    songTitle: "",
    albumTitle: "",
    version: "",

    // Release Details
    genre: "",
    subgenre: "",
    mood: "",
    language: "Indonesian",
    explicitContent: false,
    releaseDate: "",
    timezone: "Asia/Jakarta",

    // Distribution Settings
    selectedPackage: "professional",
    distributionTerritories: "worldwide",
    platforms: [],

    // Rights & Royalties
    copyrightOwner: "",
    publishingRights: "",
    splitPercentages: "",

    // Additional Info
    songDescription: "",
    lyrics: "",
    credits: "",
    tags: [],

    // Contact & Marketing
    contactEmail: "",
    socialMedia: {
      instagram: "",
      tiktok: "",
      youtube: "",
      twitter: "",
    },
  });

  const [files, setFiles] = useState({
    audioFile: null as File | null,
    artwork: null as File | null,
    lyrics: null as File | null,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { user, error } = await getCurrentUser();
      if (!user && !error) {
        router.push("/login");
        return;
      }
      setUser(user);
      if (user) {
        setFormData((prev) => ({
          ...prev,
          primaryArtist: user.user_metadata?.name || "",
          contactEmail: user.email || "",
        }));
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Basic Info", icon: Music },
    { id: 2, title: "Release Details", icon: Calendar },
    { id: 3, title: "Files Upload", icon: Upload },
    { id: 4, title: "Distribution", icon: Globe },
    { id: 5, title: "Rights & Credits", icon: User },
    { id: 6, title: "Review & Submit", icon: CheckCircle2 },
  ];

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
    "Indie",
    "Alternative",
    "Punk",
    "Metal",
    "Blues",
    "Soul",
    "Funk",
  ];

  const moods = [
    "Happy",
    "Sad",
    "Energetic",
    "Calm",
    "Romantic",
    "Angry",
    "Nostalgic",
    "Uplifting",
    "Melancholic",
    "Dreamy",
    "Aggressive",
    "Peaceful",
  ];

  const platforms = [
    { id: "spotify", name: "Spotify", required: true },
    { id: "apple", name: "Apple Music", required: true },
    { id: "youtube", name: "YouTube Music", required: true },
    { id: "deezer", name: "Deezer", required: false },
    { id: "amazon", name: "Amazon Music", required: false },
    { id: "tidal", name: "Tidal", required: false },
    { id: "soundcloud", name: "SoundCloud", required: false },
    { id: "bandcamp", name: "Bandcamp", required: false },
  ];

  const packages = [
    {
      id: "starter",
      name: "Starter",
      price: "Rp 50.000/rilis",
      features: ["1 lagu", "50+ platform", "Royalti 85%", "Support email"],
    },
    {
      id: "professional",
      name: "Professional",
      price: "Rp 150.000/bulan",
      features: [
        "Unlimited lagu",
        "150+ platform",
        "Royalti 90%",
        "Support 24/7",
        "Analytics",
      ],
    },
    {
      id: "label",
      name: "Label",
      price: "Rp 500.000/bulan",
      features: [
        "Multi-artist",
        "White-label",
        "Royalti 95%",
        "Dedicated manager",
      ],
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: keyof typeof files,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({
        ...prev,
        [fileType]: e.target.files![0],
      }));
    }
  };

  const handlePlatformToggle = (platformId: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId],
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.primaryArtist &&
          formData.songTitle &&
          formData.releaseType
        );
      case 2:
        return !!(formData.genre && formData.language && formData.releaseDate);
      case 3:
        return !!(files.audioFile && files.artwork);
      case 4:
        return !!(formData.selectedPackage && formData.platforms.length > 0);
      case 5:
        return !!formData.copyrightOwner;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    } else {
      alert("Mohon lengkapi semua field yang wajib diisi");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const generateWhatsAppMessage = () => {
    const message = `*PENGAJUAN RILIS MUSIK*
*Nabila Ahmad Studio Distribution*

*BASIC INFO:*
- Tipe Rilis: ${formData.releaseType.toUpperCase()}
- Artis Utama: ${formData.primaryArtist}
- Featuring: ${formData.featuredArtists || "Tidak ada"}
- Judul Lagu: ${formData.songTitle}
- Album/EP: ${formData.albumTitle || "Single"}

*RELEASE DETAILS:*
- Genre: ${formData.genre}
- Sub-genre: ${formData.subgenre || "Tidak ada"}
- Mood: ${formData.mood || "Tidak ada"}
- Bahasa: ${formData.language}
- Konten Eksplisit: ${formData.explicitContent ? "Ya" : "Tidak"}
- Tanggal Rilis: ${formData.releaseDate}

*PAKET & DISTRIBUSI:*
- Paket: ${packages.find((p) => p.id === formData.selectedPackage)?.name}
- Platform: ${formData.platforms.join(", ")}
- Wilayah: ${formData.distributionTerritories}

*HAK CIPTA:*
- Pemilik Hak Cipta: ${formData.copyrightOwner}
- Publishing Rights: ${formData.publishingRights || "Tidak ada"}

*FILE:*
- Audio: ${files.audioFile?.name || "Belum diupload"}
- Artwork: ${files.artwork?.name || "Belum diupload"}
- Lirik: ${files.lyrics?.name || "Tidak ada"}

*KONTAK:*
- Email: ${formData.contactEmail}
- Instagram: ${formData.socialMedia.instagram || "Tidak ada"}

*DESKRIPSI:*
${formData.songDescription || "Tidak ada deskripsi"}

*STATUS PEMBAYARAN:*
[ ] Transfer GoPay ke 0895340205302
[ ] Bukti transfer terlampir

Mohon konfirmasi dan proses distribusi musik ini. Terima kasih!`;

    return encodeURIComponent(message);
  };

  const handleSubmit = () => {
    if (!validateStep(5)) {
      alert("Mohon lengkapi semua informasi yang diperlukan");
      return;
    }

    const whatsappUrl = `https://wa.me/6285810526151?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
          <p className="text-gray-300 mb-6">
            Please login to submit your music
          </p>
          <Link
            href="/login"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Submit Musik Anda
            </h1>
            <p className="text-gray-300 text-lg">
              Formulir distribusi musik profesional - Lengkapi semua tahap untuk
              proses yang optimal
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-400 text-white"
                        : "border-white/30 text-gray-400"
                    }`}
                  >
                    <step.icon size={20} />
                    {currentStep > step.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle2 size={20} className="text-white" />
                      </div>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                        currentStep > step.id ? "bg-purple-400" : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <p className="text-white font-semibold">
                Step {currentStep} of {steps.length}:{" "}
                {steps[currentStep - 1].title}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Basic Information
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-white font-medium mb-2">
                      Release Type *
                    </label>
                    <div className="flex gap-4">
                      {["single", "ep", "album"].map((type) => (
                        <label key={type} className="cursor-pointer">
                          <input
                            type="radio"
                            name="releaseType"
                            value={type}
                            checked={formData.releaseType === type}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`px-6 py-3 rounded-lg border-2 transition-all ${
                              formData.releaseType === type
                                ? "border-purple-400 bg-purple-400/20 text-white"
                                : "border-white/20 bg-white/5 text-gray-300"
                            }`}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Primary Artist *
                    </label>
                    <input
                      type="text"
                      name="primaryArtist"
                      value={formData.primaryArtist}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="Nama artis utama"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Featured Artists
                    </label>
                    <input
                      type="text"
                      name="featuredArtists"
                      value={formData.featuredArtists}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="Feat. Artist Name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Version/Remix
                    </label>
                    <input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="Remix, Acoustic, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Song Title *
                    </label>
                    <input
                      type="text"
                      name="songTitle"
                      value={formData.songTitle}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="Judul lagu"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Album/EP Title
                    </label>
                    <input
                      type="text"
                      name="albumTitle"
                      value={formData.albumTitle}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="Nama album/EP"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Release Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Release Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Primary Genre *
                    </label>
                    <select
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="">Select Genre</option>
                      {genres.map((genre) => (
                        <option
                          key={genre}
                          value={genre}
                          className="bg-gray-800"
                        >
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Sub-genre
                    </label>
                    <input
                      type="text"
                      name="subgenre"
                      value={formData.subgenre}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="Sub-genre if any"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Mood
                    </label>
                    <select
                      name="mood"
                      value={formData.mood}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="">Select Mood</option>
                      {moods.map((mood) => (
                        <option key={mood} value={mood} className="bg-gray-800">
                          {mood}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Language *
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="Indonesian" className="bg-gray-800">
                        Indonesian
                      </option>
                      <option value="English" className="bg-gray-800">
                        English
                      </option>
                      <option value="Javanese" className="bg-gray-800">
                        Javanese
                      </option>
                      <option value="Sundanese" className="bg-gray-800">
                        Sundanese
                      </option>
                      <option value="Other" className="bg-gray-800">
                        Other
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Release Date *
                    </label>
                    <input
                      type="date"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="Asia/Jakarta" className="bg-gray-800">
                        Asia/Jakarta (WIB)
                      </option>
                      <option value="Asia/Makassar" className="bg-gray-800">
                        Asia/Makassar (WITA)
                      </option>
                      <option value="Asia/Jayapura" className="bg-gray-800">
                        Asia/Jayapura (WIT)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="explicitContent"
                      checked={formData.explicitContent}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                    />
                    <span className="text-white">
                      This track contains explicit content
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Song Description
                  </label>
                  <textarea
                    name="songDescription"
                    value={formData.songDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Describe your song, inspiration, story behind it..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Files Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Upload Files
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Audio File */}
                  <div>
                    <label className="block text-white font-medium mb-4">
                      Audio File * (WAV, FLAC, MP3 - Minimum 16-bit/44.1kHz)
                    </label>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                      <Music className="mx-auto text-gray-400 mb-4" size={48} />
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "audioFile")}
                        accept=".wav,.mp3,.flac,.aiff"
                        className="hidden"
                        id="audioFile"
                        required
                      />
                      <label htmlFor="audioFile" className="cursor-pointer">
                        {files.audioFile ? (
                          <div>
                            <p className="text-white font-medium">
                              {files.audioFile.name}
                            </p>
                            <p className="text-green-400 text-sm">
                              File uploaded successfully
                            </p>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-300 mb-2">
                              Click to upload audio file
                            </p>
                            <p className="text-gray-400 text-sm">
                              Maximum 100MB
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Artwork */}
                  <div>
                    <label className="block text-white font-medium mb-4">
                      Artwork/Cover * (JPG, PNG - Minimum 1400x1400px)
                    </label>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                      <Image className="mx-auto text-gray-400 mb-4" size={48} />
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "artwork")}
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        id="artwork"
                        required
                      />
                      <label htmlFor="artwork" className="cursor-pointer">
                        {files.artwork ? (
                          <div>
                            <p className="text-white font-medium">
                              {files.artwork.name}
                            </p>
                            <p className="text-green-400 text-sm">
                              Artwork uploaded successfully
                            </p>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-300 mb-2">
                              Click to upload artwork
                            </p>
                            <p className="text-gray-400 text-sm">
                              Square format recommended
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Lyrics File (Optional) */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-medium mb-4">
                      Lyrics File (Optional - TXT, PDF, DOCX)
                    </label>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                      <FileText
                        className="mx-auto text-gray-400 mb-4"
                        size={40}
                      />
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "lyrics")}
                        accept=".txt,.pdf,.doc,.docx"
                        className="hidden"
                        id="lyricsFile"
                      />
                      <label htmlFor="lyricsFile" className="cursor-pointer">
                        {files.lyrics ? (
                          <div>
                            <p className="text-white font-medium">
                              {files.lyrics.name}
                            </p>
                            <p className="text-green-400 text-sm">
                              Lyrics file uploaded
                            </p>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-300 mb-2">
                              Click to upload lyrics (optional)
                            </p>
                            <p className="text-gray-400 text-sm">
                              Helps with content matching and discoverability
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Inline Lyrics */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Lyrics (Text)
                  </label>
                  <textarea
                    name="lyrics"
                    value={formData.lyrics}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Paste your song lyrics here..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Distribution Settings */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Distribution Settings
                </h2>

                {/* Package Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Select Package *
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
                          className={`p-6 rounded-xl border-2 transition-all ${
                            formData.selectedPackage === pkg.id
                              ? "border-purple-400 bg-purple-400/20"
                              : "border-white/20 bg-white/5"
                          }`}
                        >
                          <h4 className="text-white font-semibold text-lg mb-2">
                            {pkg.name}
                          </h4>
                          <p className="text-purple-300 font-medium mb-3">
                            {pkg.price}
                          </p>
                          <ul className="text-gray-300 text-sm space-y-1">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Platform Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Select Platforms *
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {platforms.map((platform) => (
                      <label key={platform.id} className="cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            formData.platforms.includes(platform.id) ||
                            platform.required
                          }
                          onChange={() =>
                            !platform.required &&
                            handlePlatformToggle(platform.id)
                          }
                          disabled={platform.required}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.platforms.includes(platform.id) ||
                            platform.required
                              ? "border-purple-400 bg-purple-400/20 text-white"
                              : "border-white/20 bg-white/5 text-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{platform.name}</span>
                            {platform.required && (
                              <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                                Required
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Territory Selection */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Distribution Territory
                  </label>
                  <select
                    name="distributionTerritories"
                    value={formData.distributionTerritories}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="worldwide" className="bg-gray-800">
                      Worldwide
                    </option>
                    <option value="indonesia" className="bg-gray-800">
                      Indonesia Only
                    </option>
                    <option value="asia" className="bg-gray-800">
                      Asia
                    </option>
                    <option value="custom" className="bg-gray-800">
                      Custom Selection
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 5: Rights & Credits */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Rights & Credits
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Copyright Owner *
                    </label>
                    <input
                      type="text"
                      name="copyrightOwner"
                      value={formData.copyrightOwner}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="Who owns the copyright?"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Publishing Rights
                    </label>
                    <input
                      type="text"
                      name="publishingRights"
                      value={formData.publishingRights}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="Publishing company/administrator"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Split Percentages
                    </label>
                    <input
                      type="text"
                      name="splitPercentages"
                      value={formData.splitPercentages}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      placeholder="Artist 1: 50%, Artist 2: 50%"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Credits
                  </label>
                  <textarea
                    name="credits"
                    value={formData.credits}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Producer: John Doe&#10;Songwriter: Jane Smith&#10;Mixed by: Studio ABC..."
                  />
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Social Media (Optional)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Instagram
                      </label>
                      <input
                        type="text"
                        name="socialMedia.instagram"
                        value={formData.socialMedia.instagram}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                        placeholder="@yourusername"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        TikTok
                      </label>
                      <input
                        type="text"
                        name="socialMedia.tiktok"
                        value={formData.socialMedia.tiktok}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                        placeholder="@yourusername"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        YouTube
                      </label>
                      <input
                        type="text"
                        name="socialMedia.youtube"
                        value={formData.socialMedia.youtube}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                        placeholder="Channel name or URL"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Twitter
                      </label>
                      <input
                        type="text"
                        name="socialMedia.twitter"
                        value={formData.socialMedia.twitter}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                        placeholder="@yourusername"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Review & Submit */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Review & Submit
                </h2>

                <div className="bg-white/5 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Release Summary
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-300">
                        <strong className="text-white">Artist:</strong>{" "}
                        {formData.primaryArtist}
                        {formData.featuredArtists &&
                          ` feat. ${formData.featuredArtists}`}
                      </p>
                      <p className="text-gray-300">
                        <strong className="text-white">Title:</strong>{" "}
                        {formData.songTitle}
                        {formData.version && ` (${formData.version})`}
                      </p>
                      <p className="text-gray-300">
                        <strong className="text-white">Album:</strong>{" "}
                        {formData.albumTitle || "Single"}
                      </p>
                      <p className="text-gray-300">
                        <strong className="text-white">Genre:</strong>{" "}
                        {formData.genre}
                        {formData.subgenre && ` / ${formData.subgenre}`}
                      </p>
                      <p className="text-gray-300">
                        <strong className="text-white">Release Date:</strong>{" "}
                        {formData.releaseDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-300">
                        <strong className="text-white">Package:</strong>{" "}
                        {
                          packages.find(
                            (p) => p.id === formData.selectedPackage,
                          )?.name
                        }
                      </p>
                      <p className="text-gray-300">
                        <strong className="text-white">Platforms:</strong>{" "}
                        {formData.platforms.length} selected
                      </p>
                      <p className="text-gray-300">
                        <strong className="text-white">Territory:</strong>{" "}
                        {formData.distributionTerritories}
                      </p>
                      <p className="text-gray-300">
                        <strong className="text-white">Files:</strong>
                        {files.audioFile && " Audio ✓"}
                        {files.artwork && " Artwork ✓"}
                        {files.lyrics && " Lyrics ✓"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-400/30 rounded-xl p-6">
                  <h4 className="text-blue-300 font-semibold mb-3">
                    Next Steps:
                  </h4>
                  <ol className="text-gray-300 space-y-2">
                    <li>1. Complete payment via GoPay (0895340205302)</li>
                    <li>2. Submit this form to WhatsApp Admin</li>
                    <li>3. Upload your files as instructed by admin</li>
                    <li>4. Wait for review and approval (1-3 days)</li>
                    <li>5. Your music will be live on platforms (3-5 days)</li>
                  </ol>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
                  >
                    <MessageCircle size={24} />
                    Submit to WhatsApp Admin
                  </button>

                  <p className="text-gray-300 mt-4 text-sm">
                    By submitting, you agree to our terms and confirm that you
                    own all rights to this content.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={20} />
                Previous
              </button>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Step {currentStep} of {steps.length}
                </p>
              </div>

              {currentStep < 6 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Next Step
                  <ArrowLeft size={20} className="rotate-180" />
                </button>
              ) : (
                <div className="w-24"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
