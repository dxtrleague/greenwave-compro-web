"use client";

export const dynamic = "force-static";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, TrendingUp, HandHeart, Sprout, Landmark, Presentation, BriefcaseBusiness, Users, ShieldCheck, Mail, MapPin, Instagram, Linkedin, Facebook, Wheat, GraduationCap, Network, Lightbulb, CheckCircle2 } from "lucide-react";

import dbData from "@/data/production-data.json";
import BoardMembers from "@/components/BoardMembers";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamic CMS Data States (Source: production-data.json)
  const [impactData, setImpactData] = useState<any[]>(dbData.impactMetrics);
  const [programsData, setProgramsData] = useState<any[]>(dbData.programs);
  const [productsData, setProductsData] = useState<any[]>(dbData.products);
  const [boardMembersData, setBoardMembersData] = useState<any[]>(dbData.boardMembers || []);

  // Form State
  const [collabForm, setCollabForm] = useState({ companyName: "", email: "", focusArea: "", message: "" });
  const [collabStatus, setCollabStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [collabMsg, setCollabMsg] = useState("");

  const handleCollabSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCollabStatus("loading");
    setCollabMsg("");

    try {
      // WA.me configuration
      const phoneNumber = "6281314337183";

      // Determine label for focus area
      const focusLabels: Record<string, string> = {
        csr: "Corporate Social Responsibility (CSR)",
        esg: "Environmental, Social, & Governance (ESG)",
        donor: "Donor & Filantropi",
        other: "Bentuk Kolaborasi Lainnya"
      };
      const focusLabel = focusLabels[collabForm.focusArea] || collabForm.focusArea;

      // Construct WhatsApp message
      const message = `Halo Greenwave, saya ingin berkolaborasi.%0A%0A` +
        `*Nama Instansi:* ${collabForm.companyName}%0A` +
        `*Email:* ${collabForm.email}%0A` +
        `*Fokus:* ${focusLabel}%0A` +
        `*Pesan:* ${collabForm.message}`;

      const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

      // Simulate a small delay for visual feedback before redirecting
      setTimeout(() => {
        setCollabStatus("success");
        setCollabMsg("Membuka WhatsApp... Mohon selesaikan pengiriman pesan Anda melalui aplikasi.");

        // Open WhatsApp in a new tab/app
        window.open(waUrl, "_blank");

        // Reset form after a brief period
        setTimeout(() => {
          setCollabStatus("idle");
          setCollabForm({ companyName: "", email: "", focusArea: "", message: "" });
        }, 1500);
      }, 800);

    } catch (err) {
      setCollabStatus("error");
      setCollabMsg("Gagal memproses permintaan WhatsApp.");
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

  useEffect(() => {
    setImpactData(dbData.impactMetrics);
    setProgramsData(dbData.programs);
    setProductsData(dbData.products);
    setBoardMembersData(dbData.boardMembers || []);
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
            <img src="/gre.svg" alt="Greenwave" className="h-14 w-auto" />
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
            <motion.h1 variants={fadeIn} className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight mb-6 text-white">
              Menumbuhkan Kemandirian Pangan, <br className="hidden md:block" />
              <span className="text-[#61B58E]">Menjaga Keberlanjutan Masa Depan.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed mx-auto md:mx-0">
              Gerakan kemandirian pangan yang dimulai pada tingkat tapak, dengan membangun sistem yang tangguh dari akar komunitas.
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
            <h2 className="font-mono text-3xl md:text-5xl font-bold mb-6 text-[#016b62]">
              Dari Pekarangan, Lahir Ketahanan
            </h2>
            <p className="text-lg md:text-xl text-[#333333] leading-relaxed">
              Perubahan iklim meningkatkan tekanan terhadap ketahanan pangan. Di sisi lain, fluktuasi harga bahan pokok hingga ketergantungan pada rantai pasok yang panjang membutuhkan  pendekatan yang lebih kuat dari tingkat paling dasar: rumah tangga dan komunitas.
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
                Program ini hadir untuk menjawab tantangan tersebut dengan menggerakkan komunitas di tingkat RT/RW untuk menciptakan fondasi sistem pangan yang tangguh dan mandiri. Dimulai dengan pemanfaatan lahan terbatas, penguatan kapasitas, serta pendampingan berkelanjutan, komunitas didorong menjadi bagian dari solusi pangan. Tidak hanya sebagai konsumen, tapi sekaligus sebagai produsen.
              </p>
              <p className="text-lg md:text-xl text-[#333333] font-medium leading-relaxed">
                Kemandirian pangan yang kuat, selalu dimulai dari tingkat tapak.
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
              "Berpartisipasi secara aktif dalam upaya penguatan pangan nasional melalui penguatan produksi di tingkat rumah tangga, serta berbasis komunitas demi mendorong pemerataan dan percepatan."
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-20">
            <div className="text-center mb-12">
              <h3 className="font-heading text-2xl md:text-4xl font-bold text-[#016b62]">5 Pilar Misi</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: "Produksi Pangan Berbasis Komunitas", icon: <Wheat className="text-[#61B58E]" size={32} />, desc: "Mendorong optimalisasi penggunaan pekarangan sebagai lahan pangan produktif di tingkat RT/RW." },
                { title: "Penguatan Kapasitas Masyarakat", icon: <GraduationCap className="text-[#79BDB7]" size={32} />, desc: "Menyediakan pelatihan dan pendampingan teknis dengan model Training Of Trainers (ToT) untuk meningkatkan keterampilan produksi dan pengelolaan pangan." },
                { title: "Pengembangan Ekosistem Pangan Berbasis Wilayah", icon: <Network className="text-[#357427]" size={32} />, desc: "Memperkuat jejaring dan kolaborasi di tingkat RT/RW untuk membangun sistem pangan lokal yang terintegrasi." },
                { title: "Praktik Pangan Berkelanjutan", icon: <Sprout className="text-[#016b62]" size={32} />, desc: "Mendorong adopsi praktik produksi pangan yang efisien dari sisi biaya, serta ramah lingkungan dan adaptif terhadap perubahan iklim." },
                { title: "Transformasi Pola Pikir Pangan", icon: <Lightbulb className="text-[#61B58E]" size={32} />, desc: "Menciptakan pemimpin-pemimpin ketahanan pangan baru di tingkat tapak dengan mengarusutamakan peran Ketua RT/RW." }
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
      <section id="program" className="py-12 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          
          {programsData.length > 0 && programsData.map((prog) => (
            <div key={prog.id} className="flex flex-col gap-6 lg:gap-16">
              {/* Editorial Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-6 lg:mb-10 relative">
                <div className="lg:col-span-8 relative z-10">
                  <span className="text-[#61B58E] font-bold tracking-wider uppercase text-sm mb-4 block">
                    Program & Dampak
                  </span>
                  <h2 className="font-heading text-5xl md:text-7xl font-bold text-[#016b62] mb-4 lg:mb-8 leading-tight">
                    {prog.title}.
                  </h2>
                  <p className="text-xl text-[#333333] leading-relaxed mb-4 lg:mb-8">
                    {prog.description.lead}
                  </p>

                  {prog.description.columns && prog.description.columns.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-neutral-600 leading-relaxed text-[16px]">
                      {prog.description.columns.map((col: string, cIdx: number) => (
                        <p key={cIdx}>{col}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Decorative Watermark (Right Column) */}
                <div className="hidden lg:flex lg:col-span-4 items-center justify-center relative select-none">
                  <Users size={320} className="text-[#016b62] opacity-5 transform rotate-12" />
                </div>
              </div>

              {/* Bottom Split (Dampak & KPI) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                {/* Kolom Kiri (Dampak) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="bg-[#F8FDFB] rounded-[32px] p-8 md:p-10 border border-[#D9EEF3] shadow-sm h-full"
                >
                  <h4 className="font-heading text-xl md:text-2xl font-bold text-[#357427] mb-4 lg:mb-6 flex items-center gap-2">
                    <Sprout size={24} className="text-[#61B58E]" /> Dampak yang Diharapkan
                  </h4>
                  <ul className="space-y-4">
                    {prog.impacts && prog.impacts.map((imp: string, iIdx: number) => (
                      <li key={iIdx} className="flex items-start gap-3 text-[#333333]">
                        <CheckCircle2 size={20} className="text-[#61B58E] shrink-0 mt-1" />
                        <span className="leading-relaxed text-[15px]">{imp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Kolom Kanan (KPI / Indikator) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="h-full"
                >
                  <h4 className="font-heading text-xl md:text-2xl font-bold text-[#357427] mb-4 lg:mb-6 flex items-center gap-2 px-2">
                    <TrendingUp size={24} className="text-[#61B58E]" /> Indikator Keberhasilan
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {prog.kpis && prog.kpis.map((kpi: any, kIdx: number) => (
                      <div
                        key={kIdx}
                        className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-[#D9EEF3] shadow-sm hover:shadow-md hover:bg-[#F8FDFB]/50 transition-all duration-300 flex flex-col justify-between"
                      >
                        <span className="font-heading text-[16px] font-bold text-[#016b62] block mb-2 leading-snug">
                          {kpi.title}
                        </span>
                        <span className="text-xs text-neutral-600 leading-normal">
                          {kpi.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}

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

      {/* Profil Pengurus Section */}
      <section id="pengurus" className="py-20 bg-[#F8FDFB]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#357427] mb-4">
              Profil Pengurus
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Kenali lebih dekat jajaran pengurus dan dewan pembina Yayasan Greenwave yang berdedikasi tinggi untuk keberlanjutan lingkungan.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <BoardMembers data={boardMembersData} />
          </motion.div>
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
              <div className="mb-0">
                <img src="/gre.svg" alt="Greenwave" className="h-16 w-auto" />
              </div>
              <p className="text-white/70 leading-relaxed mb-3">
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