"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, TrendingUp, HandHeart, Sprout, Landmark, Presentation, BriefcaseBusiness, Users, ShieldCheck, Mail, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamic CMS Data States
  const [impactData, setImpactData] = useState<any[]>([]);
  const [programsData, setProgramsData] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);

  // Default Fallback Data if DB is empty / failing
  const fallbackImpact = [
    { value: "125k+", title: "Pohon Mangrove Ditanam", iconName: "Sprout" },
    { value: "58%", title: "Peningkatan Pendapatan Masyarakat", iconName: "TrendingUp" },
    { value: "73%", title: "Tingkat Kelulushidupan", iconName: "ShieldCheck" },
    { value: "120+", title: "Desa Terberdayakan", iconName: "Users" }
  ];

  // Form State
  const [collabForm, setCollabForm] = useState({ companyName: "", email: "", focusArea: "", message: "" });
  const [collabStatus, setCollabStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [collabMsg, setCollabMsg] = useState("");

  const handleCollabSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCollabStatus("loading");
    setCollabMsg("");
    try {
      const res = await fetch("/api/v1/collaborate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collabForm),
      });
      const data = await res.json();
      if (res.ok) {
        setCollabStatus("success");
        setCollabMsg(data.message);
        setCollabForm({ companyName: "", email: "", focusArea: "", message: "" });
      } else {
        setCollabStatus("error");
        setCollabMsg(data.message || data.errors?.[0]?.message || "Gagal mengirim formulir.");
      }
    } catch (err) {
      setCollabStatus("error");
      setCollabMsg("Gangguan koneksi dari browser.");
    }
  };

  // BAGIAN YANG DIPERBAIKI:
  const slides = [
    "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1600"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Fetch Public CMS Data
  useEffect(() => {
    async function fetchData() {
      try {
        const [impactRes, programsRes, productsRes] = await Promise.all([
          fetch("/api/v1/impact"),
          fetch("/api/v1/programs"),
          fetch("/api/v1/products"),
        ]);

        const impactJson = await impactRes.json();
        if (impactJson.status === "success" && impactJson.data.impactMetrics.length > 0) {
          setImpactData(impactJson.data.impactMetrics);
        } else {
          setImpactData(fallbackImpact);
        }

        const programsJson = await programsRes.json();
        if (programsJson.status === "success" && programsJson.data.programs.length > 0) {
          setProgramsData(programsJson.data.programs);
        }

        const productsJson = await productsRes.json();
        if (productsJson.status === "success" && productsJson.data.products.length > 0) {
          setProductsData(productsJson.data.products);
        }

      } catch (e) {
        setImpactData(fallbackImpact);
      }
    }
    fetchData();
  }, []);

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000000] overflow-x-hidden font-body">
      {/* 1. GLOBAL NAVIGATION */}
      <header className="fixed top-0 w-full z-50 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#D9EEF3]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-[3px] border-[#61B58E] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#61B58E] to-[#79BDB7] rounded-full opacity-30"></div>
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#016b62]" stroke="currentColor" strokeWidth="2">
                <path d="M2 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z" strokeDasharray="4 2" />
                <path d="M6 14c2-2 4-2 6 0s4-2 6 0" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-[#357427]">Greenwave</span>
          </div>

          <nav className="hidden md:flex gap-8 text-[15px] font-medium text-[#171717]">
            <a href="#beranda" className="hover:text-[#61B58E] transition-colors">Beranda</a>
            <a href="#tentang-kami" className="hover:text-[#61B58E] transition-colors">Tentang Kami</a>
            <a href="#program" className="hover:text-[#61B58E] transition-colors">Program</a>
            <a href="#knowledge" className="hover:text-[#61B58E] transition-colors">Knowledge</a>
            <a href="#kolaborasi" className="hover:text-[#61B58E] transition-colors">Kolaborasi</a>
          </nav>

          <div className="hidden md:block">
            <a href="#kolaborasi" className="px-6 py-2.5 bg-[#61B58E] text-white rounded-full font-medium hover:bg-[#357427] transition-all duration-300">
              Mulai Kolaborasi
            </a>
          </div>

          <button className="md:hidden text-[#357427]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-4">
            <a href="#beranda" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Beranda</a>
            <a href="#tentang-kami" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Tentang Kami</a>
            <a href="#program" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Program</a>
            <a href="#knowledge" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Knowledge</a>
            <a href="#kolaborasi" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Kolaborasi</a>
            <a href="#kolaborasi" className="mt-4 text-center py-3 bg-[#61B58E] text-white rounded-full font-medium" onClick={() => setIsMenuOpen(false)}>
              Mulai Kolaborasi
            </a>
          </motion.div>
        )}
      </header>

      {/* 2. PAGE: HOME (BERANDA) */}

      {/* Hero Section */}
      <section id="beranda" className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 lg:px-24 min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0 z-0 bg-[#357427]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-black/50 z-10" />
              <img
                src={slides[currentSlide]}
                alt={`Hero slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 max-w-[1440px] mx-auto w-full">
          <div className="max-w-4xl text-center md:text-left mx-auto md:mx-0">
            <motion.h1 variants={fadeIn} className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight mb-6 text-white">
              Memberdayakan Pesisir, <br className="hidden md:block" />
              <span className="text-[#61B58E]">Menjaga Masa Depan.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed mx-auto md:mx-0">
              Mengubah mindset konservasi dari sekadar menanam menjadi menciptakan nilai ekonomi yang nyata bagi masyarakat.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#impact" className="px-8 py-3 bg-[#61B58E] text-white rounded-full font-semibold flex items-center justify-center transition-colors hover:bg-[#79BDB7]">
                Lihat Dampak Kami
              </a>
              <a href="#program" className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border-2 border-white/50 rounded-full font-semibold flex items-center justify-center transition-colors hover:bg-white/20">
                Pelajari Program
              </a>
            </motion.div>

            {/* Slider Indicators */}
            <div className="mt-16 flex gap-3 justify-center md:justify-start">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 pointer-events-auto ${currentSlide === idx ? 'w-8 bg-[#61B58E]' : 'w-2 bg-white/50'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Challenge (Problem) */}
      <section className="py-20 md:py-28 bg-[#D9EEF3]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-[#016b62]">
              Ketika Mangrove Hilang, Harapan Tenggelam.
            </h2>
            <p className="text-lg md:text-xl text-[#333333] leading-relaxed">
              Indonesia menghadapi degradasi ekosistem pesisir dan tingginya angka kemiskinan masyarakat pesisir. Tanpa intervensi, kita tidak hanya kehilangan pohon, tapi juga masa depan komunitas pesisir.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Solution (Hope & Solution) */}
      <section className="py-20 md:py-28 bg-[#ffffff]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-[#357427]">
                Solusi Berkelanjutan untuk Ekosistem Pesisir.
              </h2>
              <p className="text-lg md:text-xl text-[#333333] leading-relaxed mb-6">
                Greenwave hadir melalui pemberdayaan masyarakat pesisir dan pelestarian lingkungan dengan mangrove sebagai pilot project utama.
              </p>
              <p className="text-lg md:text-xl text-[#333333] font-medium leading-relaxed">
                Kami percaya kelestarian lingkungan dan peningkatan ekonomi harus berjalan bersamaan.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative h-[400px] rounded-[32px] overflow-hidden bg-gradient-to-tr from-[#61B58E] to-[#79BDB7] shadow-xl flex items-center justify-center">
              <ShieldCheck size={120} className="text-white opacity-90" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Highlights (Data-Driven from CMS) */}
      <section id="impact" className="py-20 bg-[#D9EEF3]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactData.map((metric, idx) => {
              let IconComp = TrendingUp;
              if (metric.iconName === 'Sprout') IconComp = Sprout;
              if (metric.iconName === 'Users') IconComp = Users;
              if (metric.iconName === 'ShieldCheck') IconComp = ShieldCheck;

              return (
                <motion.div key={idx} variants={fadeIn} className="bg-white p-8 rounded-[32px] shadow-sm text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                  <IconComp size={32} className="text-[#357427] mb-4" />
                  <span className="font-heading text-4xl lg:text-5xl font-bold text-[#016b62] block mb-2">
                    {metric.value}
                  </span>
                  <span className="text-[#333333] font-medium leading-tight">{metric.title}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. PAGE: TENTANG KAMI (ABOUT US) */}
      <section id="tentang-kami" className="py-20 md:py-32 bg-[#ffffff]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-[#357427]">Visi Kami</h2>
            <p className="text-xl md:text-2xl text-[#171717] italic leading-relaxed font-heading">
              "Mewujudkan ekosistem ekonomi masyarakat pesisir yang mandiri, berdaya saing, dan berkelanjutan melalui konservasi lingkungan."
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-20">
            <div className="text-center mb-12">
              <h3 className="font-heading text-2xl md:text-4xl font-bold text-[#016b62]">5 Pilar Misi</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: "Ekonomi", icon: <TrendingUp className="text-[#61B58E]" size={32} />, desc: "Mengembangkan program pemberdayaan ekonomi berbasis mangrove." },
                { title: "Kolaborasi", icon: <HandHeart className="text-[#79BDB7]" size={32} />, desc: "Membangun kolaborasi pemerintah, swasta, dan donor." },
                { title: "Mindset", icon: <Sprout className="text-[#357427]" size={32} />, desc: "Mengubah mindset dari sekadar menanam menjadi menciptakan nilai ekonomi." },
                { title: "Akses Pasar", icon: <Landmark className="text-[#016b62]" size={32} />, desc: "Membuka akses pasar bagi produk turunan mangrove." },
                { title: "Knowledge", icon: <Presentation className="text-[#61B58E]" size={32} />, desc: "Menyebarkan pengetahuan dan praktik terbaik ke pesisir Indonesia." }
              ].map((pillar, idx) => (
                <motion.div key={idx} variants={fadeIn} className="bg-[#D9EEF3]/30 p-8 rounded-[32px] border border-[#D9EEF3] hover:bg-[#D9EEF3]/50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    {pillar.icon}
                  </div>
                  <h4 className="font-heading text-xl font-bold mb-3 text-[#000000]">{pillar.title}</h4>
                  <p className="text-[#555555] leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-[#016b62] text-white p-10 md:p-16 rounded-[40px] text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px]"></div>
            <h3 className="font-heading text-2xl md:text-4xl font-bold mb-6 relative z-10">Bersama Menciptakan Dampak Jangka Panjang</h3>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto relative z-10">
              Kami bekerja bersama Perusahaan (CSR/ESG), Donor, dan Pemerintah untuk menciptakan dampak jangka panjang bagi pesisir Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. PAGE: PROGRAM & DAMPAK */}
      <section id="program" className="py-20 md:py-32 bg-[#D9EEF3]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#357427]">Program & Dampak</h2>
            <p className="text-lg mt-4 text-[#333333] max-w-2xl mx-auto">Kami berfokus pada pendekatan komprehensif, mulai dari lingkungan hingga ekonomi mandiri.</p>
          </motion.div>

          <div className="flex flex-col gap-12">
            {programsData.length > 0 ? (
              programsData.map((prog, idx) => {
                let IconComp = ShieldCheck;
                if (prog.iconName === 'Target' || prog.iconName === 'BriefcaseBusiness') IconComp = BriefcaseBusiness;
                if (prog.iconName === 'Presentation') IconComp = Presentation;

                const isEven = idx % 2 === 0;
                return (
                  <motion.div key={prog.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className={`${isEven ? 'bg-white text-[#357427] border-[#D9EEF3]' : 'bg-gradient-to-br from-[#61B58E] to-[#357427] text-white'} rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 border`}>
                    <div className="w-full md:w-1/3 flex justify-center">
                      <div className={`w-32 h-32 ${isEven ? 'bg-[#D9EEF3]' : 'bg-white/20 backdrop-blur-md'} rounded-full flex items-center justify-center`}>
                        <IconComp size={64} className={isEven ? "text-[#016b62]" : "text-white"} />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">{prog.title}</h3>
                      <p className={`${isEven ? 'text-[#555555]' : 'text-white/90'} text-lg leading-relaxed`}>
                        {prog.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8 border border-[#D9EEF3]">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-32 h-32 bg-[#D9EEF3] rounded-full flex items-center justify-center">
                      <ShieldCheck size={64} className="text-[#016b62]" />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#357427] mb-4">Pemulihan Ekosistem Pesisir (Environmental Protection)</h3>
                    <p className="text-[#555555] text-lg leading-relaxed">
                      Konservasi mangrove berbasis inovasi teknologi untuk memastikan pertumbuhan maksimal dan restorasi garis pantai secara efektif.
                    </p>
                  </div>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-gradient-to-br from-[#61B58E] to-[#357427] rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row-reverse items-center gap-8 text-white">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                      <BriefcaseBusiness size={64} className="text-white" />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">Produk Turunan Mangrove (Economic Empowerment)</h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      Menciptakan nilai tambah ekonomi tanpa merusak alam. Pendekatan sirkuler ini memberdayakan komunitas akar rumput.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-white text-[#357427] px-4 py-2 rounded-full font-medium text-sm">Madu Hutan Bakau</span>
                      <span className="bg-white text-[#357427] px-4 py-2 rounded-full font-medium text-sm">Keripik Buah Lindur</span>
                      <span className="bg-white text-[#357427] px-4 py-2 rounded-full font-medium text-sm">Batik Pewarna Alami</span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>

          {productsData.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mt-20">
              <div className="text-center mb-12">
                <h3 className="font-heading text-2xl md:text-4xl font-bold text-[#016b62]">Katalog Produk Komunitas</h3>
                <p className="text-[#555555] mt-4 max-w-2xl mx-auto text-lg hover:text-[#357427] transition-colors">Produk unggulan hasil pemberdayaan dan olahan turunan mangrove dari mitra lokal.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsData.map(product => (
                  <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D9EEF3]">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                    ) : (
                      <div className="w-full h-48 bg-[#D9EEF3]/50 flex items-center justify-center">
                        <Sprout size={48} className="text-[#61B58E]" />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#61B58E]">{product.category}</span>
                      <h4 className="font-heading text-xl font-bold text-[#357427] mt-2 mb-3">{product.name}</h4>
                      <p className="text-[#555555] text-sm mb-4 leading-relaxed">{product.description}</p>
                      <div className="font-bold text-[#016b62] text-lg">
                        Rp {product.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. PAGE: KOLABORASI (COLLABORATION) */}
      <section id="kolaborasi" className="py-20 md:py-32 bg-[#ffffff]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="bg-[#D9EEF3]/40 rounded-[40px] p-8 md:p-16 border border-[#D9EEF3]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-[#016b62]">
                  Ciptakan Long-term Impact Bersama Kami.
                </h2>
                <p className="text-lg md:text-xl text-[#555555] leading-relaxed mb-8">
                  Kami tidak sekadar menjalankan aktivitas, kami mengelola dampak yang terukur bagi ekosistem dan manusia. Mari wujudkan visi ini bersama.
                </p>
                <div className="hidden lg:block w-32 h-32 bg-gradient-to-tr from-[#61B58E] to-[#79BDB7] rounded-full opacity-50 blur-2xl"></div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white p-8 rounded-[32px] shadow-lg">
                <h3 className="font-heading text-2xl font-bold text-[#357427] mb-8">Formulir Kemitraan</h3>

                {collabStatus === "success" && (
                  <div className="mb-6 p-4 bg-[#E0F3EA] border border-[#61B58E] rounded-xl text-[#357427] font-medium text-sm">
                    {collabMsg}
                  </div>
                )}
                {collabStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-sm">
                    {collabMsg}
                  </div>
                )}

                <form className="flex flex-col gap-6" onSubmit={handleCollabSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Nama Perusahaan / Lembaga</label>
                    <input type="text" required value={collabForm.companyName} onChange={e => setCollabForm({ ...collabForm, companyName: e.target.value })} className="w-full px-5 py-3 rounded-xl border border-[#D9EEF3] focus:outline-none focus:ring-2 focus:ring-[#61B58E] bg-[#F8FDFB]" placeholder="Cth: PT Makmur Sejahtera" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Email Profesional</label>
                    <input type="email" required value={collabForm.email} onChange={e => setCollabForm({ ...collabForm, email: e.target.value })} className="w-full px-5 py-3 rounded-xl border border-[#D9EEF3] focus:outline-none focus:ring-2 focus:ring-[#61B58E] bg-[#F8FDFB]" placeholder="Cth: csr@perusahaan.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Bidang Fokus</label>
                    <select required value={collabForm.focusArea} onChange={e => setCollabForm({ ...collabForm, focusArea: e.target.value })} className="w-full px-5 py-3 rounded-xl border border-[#D9EEF3] focus:outline-none focus:ring-2 focus:ring-[#61B58E] bg-[#F8FDFB] text-[#555555]">
                      <option value="">Pilih Fokus...</option>
                      <option value="csr">Corporate Social Responsibility (CSR)</option>
                      <option value="esg">Environmental, Social, & Governance (ESG)</option>
                      <option value="donor">Donor & Filantropi</option>
                      <option value="other">Bentuk Kolaborasi Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Pesan Kolaborasi</label>
                    <textarea required value={collabForm.message} onChange={e => setCollabForm({ ...collabForm, message: e.target.value })} rows={4} className="w-full px-5 py-3 rounded-xl border border-[#D9EEF3] focus:outline-none focus:ring-2 focus:ring-[#61B58E] bg-[#F8FDFB] resize-none" placeholder="Ceritakan ide atau harapan kolaborasi Anda..."></textarea>
                  </div>
                  <button type="submit" disabled={collabStatus === "loading"} className="w-full py-4 bg-[#61B58E] hover:bg-[#357427] disabled:opacity-70 text-white rounded-xl font-bold transition-colors">
                    {collabStatus === "loading" ? "Mengirimkan Pesan..." : "Kirim Pesan"}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-[#016b62] pt-20 pb-10 text-white/90">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#016b62]" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z" />
                    <path d="M6 14c2-2 4-2 6 0s4-2 6 0" />
                  </svg>
                </div>
                <span className="font-heading font-bold text-2xl text-white">Greenwave</span>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Yayasan Greenwave berfokus pada konservasi lingkungan dan pemberdayaan masyarakat pesisir di Indonesia melalui model ekonomi sirkular.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:col-span-1">
              <div>
                <h4 className="font-bold mb-6 text-white uppercase tracking-wider text-sm">Navigasi</h4>
                <ul className="space-y-4">
                  <li><a href="#beranda" className="hover:text-[#61B58E] transition-colors">Beranda</a></li>
                  <li><a href="#tentang-kami" className="hover:text-[#61B58E] transition-colors">Tentang Kami</a></li>
                  <li><a href="#program" className="hover:text-[#61B58E] transition-colors">Program</a></li>
                  <li><a href="#kolaborasi" className="hover:text-[#61B58E] transition-colors">Kolaborasi</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-white uppercase tracking-wider text-sm">Informasi</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="hover:text-[#61B58E] transition-colors">Laporan Dampak</a></li>
                  <li><a href="#" className="hover:text-[#61B58E] transition-colors">Blog & Berita</a></li>
                  <li><a href="#" className="hover:text-[#61B58E] transition-colors">Kebijakan Privasi</a></li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h4 className="font-bold mb-6 text-white uppercase tracking-wider text-sm">Hubungi Kami</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="text-[#D9EEF3] shrink-0 mt-1" size={20} />
                  <span>partnership@greenwave.or.id</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-[#D9EEF3] shrink-0 mt-1" size={20} />
                  <span>Jakarta, Indonesia</span>
                </li>
                <li className="flex gap-4 mt-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#016b62] transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#016b62] transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#016b62] transition-colors">
                    <Facebook size={20} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>&copy; {new Date().getFullYear()} Yayasan Greenwave. Seluruh Hak Cipta Dilindungi.</p>
            <p>Dibuat dengan dedikasi untuk Pesisir Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}