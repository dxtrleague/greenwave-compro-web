import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";

export interface HeroSlide {
  src: string;
  alt?: string;
  // optional low‑quality placeholder encoded as base64
  blurDataURL?: string;
}

interface HeroSectionProps {
  slides: HeroSlide[];
  /**
   * fallback fill color used when there are no slides (or while loading).
   * defaults to transparent so the first slide is visible immediately.
   */
  baseColor?: string;
  /**
   * Tailwind color class for the overlay layer. Set to "" to disable.
   * the previous design used "bg-black/50"; default is transparent.
   */
  overlayClass?: string;
  children?: ReactNode; // allow page-specific overlay content
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function HeroSection({ slides, baseColor = "transparent", overlayClass = "", children }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="beranda"
      className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 lg:px-24 min-h-[90vh] flex flex-col justify-center relative overflow-hidden"
    >
      {/* background carousel */}
      <div className="absolute inset-0 z-0" style={{ background: baseColor }}>
        {slides.length > 0 && (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {overlayClass && <div className={`absolute inset-0 ${overlayClass} z-10`} />}
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt || `Hero slide ${currentSlide + 1}`}
                fill
                className="object-cover"
                priority
                placeholder={slides[currentSlide].blurDataURL ? "blur" : "empty"}
                blurDataURL={slides[currentSlide].blurDataURL}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* content passed from parent */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 max-w-[1440px] mx-auto w-full"
      >
        {children}
      </motion.div>

      {/* indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 pointer-events-auto ${
              currentSlide === idx ? "w-8 bg-[#61B58E]" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
