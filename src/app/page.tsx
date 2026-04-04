"use client";

import { useEffect, useState } from "react";
import {
  Lightbulb,
  MapPin,
  Play,
  Monitor,
  Users,
  Presentation,
  CheckCircle,
  Star,
  Quote,
  UserPlus,
  Clock,
  Menu,
  X,
  Navigation,
  Coffee,
  Plus,
} from "lucide-react";
import Image from "next/image";

// WhatsApp Icon svg component
function WhatsappIcon({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

// Instagram Icon component (since Lucide v1 removed brand icons)
function Instagram({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ members: 0, hours: 0, spaces: 0, wifi: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation for counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start: number | null = null;
            const duration = 2000;
            const step = (timestamp: number) => {
              if (start === null) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 4);

              setStats({
                members: Math.floor(easeProgress * 118),
                hours: Math.floor(easeProgress * 16),
                spaces: Math.floor(easeProgress * 3),
                wifi: Math.floor(easeProgress * 100),
              });

              if (progress < 1) {
                window.requestAnimationFrame(step);
              }
            };
            window.requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById("stats-section");
    if (statsSection) observer.observe(statsSection);

    return () => {
      if (statsSection) observer.unobserve(statsSection);
    };
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => revealElements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* 1. Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-4 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#" className={`flex items-center gap-2 font-display text-2xl font-bold transition-colors ${
            isScrolled || isMobileMenuOpen ? "text-navy" : "text-white"
          }`}>
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-teal rounded-full flex items-center justify-center text-white shadow-md">
              <Lightbulb size={20} fill="currentColor" />
            </div>
            Smart Study
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className={`font-medium transition ${isScrolled ? "text-navy hover:text-teal" : "text-white/90 hover:text-white"}`}>Accueil</a>
            <a href="#espaces" className={`font-medium transition ${isScrolled ? "text-navy hover:text-teal" : "text-white/90 hover:text-white"}`}>Espaces</a>
            <a href="#avantages" className={`font-medium transition ${isScrolled ? "text-navy hover:text-teal" : "text-white/90 hover:text-white"}`}>Avantages</a>
            <a href="#temoignages" className={`font-medium transition ${isScrolled ? "text-navy hover:text-teal" : "text-white/90 hover:text-white"}`}>Témoignages</a>
            <a href="#contact" className={`font-medium transition ${isScrolled ? "text-navy hover:text-teal" : "text-white/90 hover:text-white"}`}>Contact</a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="bg-teal hover:bg-teal/90 text-white px-6 py-2.5 rounded-full font-medium transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Réserver une visite
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors ${isScrolled || isMobileMenuOpen ? "text-navy" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col items-center py-10 gap-8 animate-fade-in animation-duration-300">
             <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-navy font-bold text-xl hover:text-teal transition">Accueil</a>
             <a href="#espaces" onClick={() => setIsMobileMenuOpen(false)} className="text-navy font-bold text-xl hover:text-teal transition">Espaces</a>
             <a href="#avantages" onClick={() => setIsMobileMenuOpen(false)} className="text-navy font-bold text-xl hover:text-teal transition">Avantages</a>
             <a href="#temoignages" onClick={() => setIsMobileMenuOpen(false)} className="text-navy font-bold text-xl hover:text-teal transition">Témoignages</a>
             <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-navy font-bold text-xl hover:text-teal transition">Contact</a>
             <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-teal text-white px-10 py-4 rounded-full font-bold shadow-lg mt-2"
            >
              Réserver une visite
            </a>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section id="home" className="relative w-full min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/smartstudy.png"
            alt="Smart Study Coworking Space"
            fill
            className="object-cover transition-transform duration-[20s] hover:scale-110"
            priority
            unoptimized
          />
          {/* Subtle Blur & Gradient Overlay */}
          <div className="absolute inset-0 bg-navy/40 backdrop-blur-[4px] bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
          <div className="flex flex-col gap-8 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold font-semibold text-sm w-fit animate-fade-in">
              <Star size={16} fill="currentColor" />
              <span>L'espace #1 à Monastir</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-7xl leading-[1.1] text-white">
              Votre espace de travail <br />
              idéal à <span className="text-gold">Monastir</span>
            </h1>
            
            <p className="text-lg sm:text-2xl text-white/90 font-light leading-relaxed max-w-xl">
              Un coworking moderne, calme et inspirant — ouvert 16h/24h (de 8h à 00h) pour libérer votre créativité et booster votre concentration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mt-4">
              <a
                href="#espaces"
                className="bg-gold hover:bg-yellow-500 text-navy px-10 py-5 rounded-full font-bold transition shadow-xl hover:shadow-gold/20 hover:-translate-y-1 text-center text-lg"
              >
                Découvrir nos espaces
              </a>
              <a
                href="#contact"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-10 py-5 rounded-full font-bold transition text-center text-lg shadow-lg"
              >
                Réserver une visite
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Bar */}
      <section id="stats-section" className="w-full bg-navy py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-cream divide-x divide-white/10">
          <div className="flex flex-col items-center">
            <span className="font-display text-5xl text-gold mb-2">{stats.members}+</span>
            <span className="text-sm tracking-widest uppercase opacity-80 font-medium">Membres Actifs</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-5xl text-gold mb-2">{stats.hours}/7</span>
            <span className="text-sm tracking-widest uppercase opacity-80 font-medium">Horaires Ouverts</span>
          </div>
          <div className="flex flex-col items-center border-t md:border-t-0 border-white/10 pt-8 md:pt-0">
            <span className="font-display text-5xl text-gold mb-2">{stats.spaces}</span>
            <span className="text-sm tracking-widest uppercase opacity-80 font-medium">Types D'espaces</span>
          </div>
          <div className="flex flex-col items-center border-t md:border-t-0 border-white/10 pt-8 md:pt-0">
            <span className="font-display text-5xl text-gold mb-2">{stats.wifi}%</span>
            <span className="text-sm tracking-widest uppercase opacity-80 font-medium">WiFi Ultra-Rapide</span>
          </div>
        </div>
      </section>

      {/* 4. Video Section */}
      <section className="w-full bg-cream/30 py-32 overflow-hidden reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Column: Animated Text Storytelling */}
            <div className="flex flex-col gap-8 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy text-gold font-bold text-[10px] w-fit tracking-[0.2em] uppercase">
                <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                Visez l'excellence
              </div>
              
              <h2 className="font-display text-5xl sm:text-7xl text-navy leading-[1.1]">
                Plongez dans <br />
                <span className="text-teal italic">l'expérience</span> <br />
                Smart Study
              </h2>
              
              <div className="w-20 h-1.5 bg-gold rounded-full" />
              
              <p className="text-xl text-navy/70 font-light leading-relaxed max-w-lg">
                Découvrez un espace où chaque détail a été conçu pour votre productivité. Du calme absolu au café à volonté, vivez une journée type en vidéo.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 w-full">
                <div className="flex items-center gap-4 group justify-center lg:justify-start">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-teal shadow-md group-hover:bg-teal group-hover:text-white transition-all">
                    <CheckCircle size={24} />
                  </div>
                  <span className="font-bold text-navy">Design Premium</span>
                </div>
                <div className="flex items-center gap-4 group justify-center lg:justify-start">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-teal shadow-md group-hover:bg-teal group-hover:text-white transition-all">
                    <CheckCircle size={24} />
                  </div>
                  <span className="font-bold text-navy">Smart Community</span>
                </div>
              </div>
            </div>

            {/* Right Column: Larger Cinematic Showcase */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end w-full">
              <div className="relative aspect-[4/3] w-full max-w-[720px] rounded-[3.5rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] bg-navy group/vid transition-all duration-500">
                {!isPlaying ? (
                  <div 
                    className="absolute inset-0 z-10 cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                  >
                    <Image
                      src="/assets/video-thumb.png"
                      alt="Story Preview"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-all" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative">
                          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 scale-150" />
                          <div className="relative w-28 h-28 bg-white text-navy rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 group-hover:bg-gold group-hover:text-white">
                             <Play size={44} fill="currentColor" className="ml-1.5" />
                          </div>
                       </div>
                    </div>
                    
                    <div className="absolute bottom-10 left-0 right-0 text-center text-white/50 font-bold text-[10px] tracking-[0.4em] uppercase">
                       Cliquer pour lire
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-black animate-fade-in relative">
                    <video 
                      src="/assets/SmartStudyVideo.mp4" 
                      controls 
                      autoPlay 
                      className="w-full h-full object-cover"
                      onEnded={() => setIsPlaying(false)}
                    >
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="absolute top-6 right-6 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center text-white transition-all border border-white/10"
                    >
                      <X size={24} />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Subtle background glow elements */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-teal/5 rounded-full blur-3xl -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* 5. Spaces Section */}
      <section id="espaces" className="w-full bg-cream py-24 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl sm:text-5xl text-navy mb-4">Nos Espaces</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600">Des environnements de travail adaptés à tous vos besoins, du travail en profondeur à la collaboration d'équipe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col items-start hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-teal origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center text-gold mb-6">
                <Monitor size={40} />
              </div>
              <h3 className="font-display text-2xl text-navy mb-4 font-semibold">Bureau Privé</h3>
              <p className="text-gray-600 mb-8 flex-grow">Un bureau isolé et ergonomique parfait pour les sessions de deep work et la concentration absolue.</p>
              <a href="#contact" className="text-teal font-semibold flex items-center gap-2 group/link">
                En savoir plus <span className="transition-transform group-hover/link:translate-x-1">→</span>
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col items-start hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-teal origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center text-gold mb-6">
                <Users size={40} />
              </div>
              <h3 className="font-display text-2xl text-navy mb-4 font-semibold">Espace Collaboratif</h3>
              <p className="text-gray-600 mb-8 flex-grow">Une zone ouverte et lumineuse idéale pour échanger, networker et travailler en équipe sur vos projets.</p>
              <a href="#contact" className="text-teal font-semibold flex items-center gap-2 group/link">
                En savoir plus <span className="transition-transform group-hover/link:translate-x-1">→</span>
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col items-start hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-teal origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center text-gold mb-6">
                <Presentation size={40} />
              </div>
              <h3 className="font-display text-2xl text-navy mb-4 font-semibold">Salle de Réunion</h3>
              <p className="text-gray-600 mb-8 flex-grow">Des salles équipées pour vos présentations, réunions clients et workshops créatifs. Réservation à l'heure.</p>
              <a href="#contact" className="text-teal font-semibold flex items-center gap-2 group/link">
                En savoir plus <span className="transition-transform group-hover/link:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section id="avantages" className="w-full bg-white py-24 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-gray-100 space-y-24">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-8">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/assets/calm-ambiance.png" alt="Ambiance Calme" fill className="object-cover" unoptimized/>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
            <div>
              <h3 className="font-display text-4xl text-navy mb-6">Ambiance Calme & Productive</h3>
              <div className="w-12 h-1 bg-gold mb-6 rounded-full" />
              <p className="text-xl text-navy/80 font-light mb-8">Nous avons conçu chaque mètre carré de Smart Study Space pour limiter les distractions et maximiser votre efficacité.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-lg text-gray-700">
                  <CheckCircle className="text-teal flex-shrink-0" size={24} /> Design acoustique optimisé
                </li>
                <li className="flex items-center gap-4 text-lg text-gray-700">
                  <CheckCircle className="text-teal flex-shrink-0" size={24} /> Chaises ergonomiques premium
                </li>
                <li className="flex items-center gap-4 text-lg text-gray-700">
                  <CheckCircle className="text-teal flex-shrink-0" size={24} /> Éclairage naturel et chaud
                </li>
              </ul>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-24 pb-8">
            <div className="order-2 lg:order-1">
              <h3 className="font-display text-4xl text-navy mb-6">Ouvert 7j/7, 16h/24</h3>
              <div className="w-12 h-1 bg-gold mb-6 rounded-full" />
              <p className="text-xl text-navy/80 font-light mb-8">Votre inspiration a besoin du bon cadre. C'est pourquoi nos portes vous sont ouvertes de 8h à 00h, pour vous offrir une large plage horaire de productivité.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-lg text-gray-700">
                  <CheckCircle className="text-teal flex-shrink-0" size={24} /> Accès sécurisé par badge
                </li>
                <li className="flex items-center gap-4 text-lg text-gray-700">
                  <CheckCircle className="text-teal flex-shrink-0" size={24} /> Caméras de surveillance 24/7
                </li>
                <li className="flex items-center gap-4 text-lg text-gray-700">
                  <CheckCircle className="text-teal flex-shrink-0" size={24} /> Café et thé à volonté
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
               <Image src="/assets/24-7-access.png" alt="Ouvert 24/7" fill className="object-cover" unoptimized/>
               <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* 6.5. Coffee Section */}
      <section className="w-full bg-cream py-24 relative overflow-hidden reveal">
        {/* Decorative circle */}
        <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] rounded-full bg-navy/5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal shadow-md mb-8">
                    <Coffee size={32} />
                 </div>
                 <h2 className="font-display text-4xl sm:text-5xl text-navy mb-6">Espace Café & Détente</h2>
                 <div className="w-12 h-1 bg-gold mb-10 rounded-full" />
                 <p className="text-xl text-navy/80 font-light mb-8 leading-relaxed">
                   Parce qu'une pause bien méritée booste votre productivité, profitez de notre espace détente avec café et thé — le tout dans une atmosphère chaleureuse et conviviale.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="bg-white/50 p-6 rounded-2xl border border-white/80">
                       <h4 className="font-bold text-navy mb-2 text-lg">Café & Thé ☕</h4>
                       <p className="text-gray-600 text-sm italic">Un vrai délice ! À déguster sans modération.</p>
                    </div>
                    <div className="bg-white/50 p-6 rounded-2xl border border-white/80">
                       <h4 className="font-bold text-navy mb-2 text-lg">Zone Chill & Prière ✨</h4>
                       <p className="text-gray-600 text-sm italic">Un canapé confortable pour se ressourcer, avec un coin calme dédié à la prière.</p>
                    </div>
                 </div>

                 <a href="https://www.instagram.com/reel/DVw0UirjD9E/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-teal hover:bg-teal/90 text-white px-8 py-4 rounded-full font-bold transition shadow-lg text-center">
                    Découvrir l'endroit
                 </a>
              </div>

              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                 <Image 
                    src="/assets/coffee-space.png" 
                    alt="Espace Café Smart Study" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                 {/* Floating badge */}
                 <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-navy font-bold text-sm tracking-wide uppercase">Ouvert</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section id="menu" className="w-full bg-white py-32 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-teal font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Saveurs & Douceurs</span>
            <h2 className="font-display text-4xl sm:text-6xl text-navy mb-8">La Carte Gourmande</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-8 rounded-full" />
            <p className="text-xl text-navy/60 leading-relaxed font-light">
              Une sélection raffinée de boissons et de snacks pour accompagner vos sessions de travail. 
            </p>
          </div>

          {/* Category: Hot Drinks */}
          <div className="mb-28">
            <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-8">
              <div className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center text-gold shadow-lg">
                <Coffee size={24} />
              </div>
              <h3 className="font-display text-3xl text-navy font-bold">Les Incontournables</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-8">
              {[
                { name: "Americano", price: "2.500 / 3.000" },
                { name: "Cappuccino", price: "3.000 / 3.500", bestseller: true },
                { name: "Cappuccino Plus", price: "3.500 / 4.000" },
                { name: "Espresso", price: "2.200 / 2.700" },
                { name: "Café Crème", price: "2.800 / 3.300" },
                { name: "Café au Chocolat", price: "3.000 / 3.500" },
                { name: "Latte Macchiato", price: "3.500 / 4.000" },
                { name: "Double Espresso", price: "3.000 / 3.500" },
                { name: "Chocolat Chaud (Lait)", price: "3.500 / 4.000" },
                { name: "Chocolat Chaud (Sans Lait)", price: "3.300 / 3.800" },
                { name: "Golden Coffee", price: "2.200" },
                { name: "Thé Kyufi", price: "1.800" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-baseline group border-b border-gray-50 pb-4 transition-all hover:pl-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium text-navy group-hover:text-teal transition-colors">{item.name}</span>
                    {item.bestseller && (
                      <span className="text-[10px] bg-gold/20 text-gold font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Bestseller</span>
                    )}
                  </div>
                  <div className="flex-grow border-b border-dotted border-gray-300 mx-4 opacity-50" />
                  <span className="text-teal font-bold font-display whitespace-nowrap">{item.price} <span className="text-[10px] uppercase opacity-60">DT</span></span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Category: Snacks */}
            <div>
              <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-8">
                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold shadow-sm">
                  <Star size={24} />
                </div>
                <h3 className="font-display text-3xl text-navy font-bold">Les Douceurs</h3>
              </div>
              <div className="space-y-6">
                {[
                  { name: "Croissant Snapy", price: "1.500" },
                  { name: "Browniz", price: "1.200" },
                  { name: "Tigato", price: "2.200" },
                  { name: "D'croc", price: "2.200" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-baseline group border-b border-gray-50 pb-4 transition-all hover:pl-2">
                    <span className="text-lg font-medium text-navy group-hover:text-gold transition-colors">{item.name}</span>
                    <div className="flex-grow border-b border-dotted border-gray-300 mx-4 opacity-50" />
                    <span className="text-teal font-bold font-display whitespace-nowrap">{item.price} <span className="text-[10px] uppercase opacity-60">DT</span></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Refreshments */}
            <div>
              <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-8">
                <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center text-teal shadow-sm">
                  <Navigation size={24} />
                </div>
                <h3 className="font-display text-3xl text-navy font-bold">Rafraîchissements</h3>
              </div>
              <div className="space-y-6">
                {[
                  { name: "Eau Safia 1.5L", price: "1.500" },
                  { name: "Eau Safia 0.5L", price: "0.800" },
                  { name: "Jus Oh!", price: "1.800" },
                  { name: "Tropico", price: "1.200" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-baseline group border-b border-gray-50 pb-4 transition-all hover:pl-2">
                    <span className="text-lg font-medium text-navy group-hover:text-teal transition-colors">{item.name}</span>
                    <div className="flex-grow border-b border-dotted border-gray-300 mx-4 opacity-50" />
                    <span className="text-teal font-bold font-display whitespace-nowrap">{item.price} <span className="text-[10px] uppercase opacity-60">DT</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Reel Section */}
      <section className="w-full bg-navy py-32 text-center relative overflow-hidden reveal">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/10 rounded-full blur-[120px] -ml-48 -mb-48" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-display text-4xl sm:text-6xl text-white mb-20 tracking-tight">Vivez l'expérience <span className="text-gold italic">Smart Study</span></h2>
          
          <div className="relative w-full lg:w-4/5 mx-auto rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] aspect-[14/16] sm:aspect-[21/9] bg-black group border border-white/5">
            <Image 
              src="/assets/community-reel.png" 
              alt="Reel Community" 
              fill 
              className="object-cover opacity-70 transition-transform duration-[6s] group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 text-center">
               <h3 className="font-display text-4xl sm:text-5xl text-white mb-10 text-shadow-md font-light leading-tight">
                 Une communauté <br /> qui vous pousse <br className="sm:hidden" />
                 <span className="font-bold underline decoration-gold underline-offset-8">vers le haut</span>
               </h3>
               <a 
                 href="https://instagram.com/smart.study.tn" 
                 target="_blank" 
                 rel="noreferrer"
                 className="inline-flex items-center gap-3 bg-white text-navy hover:bg-gold hover:text-white px-6 py-4 sm:px-10 sm:py-5 rounded-full font-bold transition-all shadow-2xl hover:-translate-y-1 text-sm sm:text-base whitespace-nowrap"
               >
                 <Instagram size={22} className="sm:w-7 sm:h-7" /> Suivre sur Instagram
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5. Pricing Section */}
      <section id="tarifs" className="w-full bg-white py-32 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-teal font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Prêt à commencer ?</span>
              <h2 className="font-display text-4xl sm:text-6xl text-navy mb-8">Nos Forfaits Flexibles</h2>
              <div className="w-20 h-1 bg-gold mx-auto mb-8 rounded-full" />
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                 Choisissez l'offre qui correspond le mieux à votre rythme de travail. <br />
                 La productivité n'attend que vous.
              </p>
           </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Plan 1 */}
              <div className="bg-cream/40 p-10 rounded-[2.5rem] border border-cream hover:border-gold transition-all duration-500 hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-4 group flex flex-col">
                 <div className="mb-10">
                    <h3 className="font-display text-3xl text-navy mb-2 font-light">Pass Heure</h3>
                    <p className="text-gray-500 text-sm">Flexibilité maximale</p>
                 </div>
                 <div className="flex items-baseline gap-1 mb-10">
                    <span className="text-5xl font-bold font-display text-navy">1</span>
                    <span className="text-xl text-navy font-bold">DT</span>
                    <span className="text-gray-500">/ Heure</span>
                 </div>
                 <ul className="space-y-6 mb-12 flex-grow">
                    <li className="flex items-center gap-3 text-gray-700">
                       <CheckCircle size={20} className="text-teal" /> WiFi Illimité
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                       <CheckCircle size={20} className="text-teal" /> Café & Thé disponible
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                       <CheckCircle size={20} className="text-teal" /> Ambiance de travail
                    </li>
                 </ul>
                 <a href="#contact" className="w-full py-5 rounded-2xl border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-all text-center">
                    Choisir ce plan
                 </a>
              </div>

              {/* Plan 2 - Middle */}
              <div className="bg-cream/40 p-10 rounded-[2.5rem] border border-cream hover:border-gold transition-all duration-500 hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-4 group flex flex-col">
                 <div className="mb-10">
                    <h3 className="font-display text-3xl text-navy mb-2 font-light">Pass Journée</h3>
                    <p className="text-gray-500 text-sm">Productivité intense</p>
                 </div>
                 <div className="flex items-baseline gap-1 mb-10">
                    <span className="text-5xl font-bold font-display text-navy">5</span>
                    <span className="text-xl text-navy font-bold">DT</span>
                    <span className="text-gray-500">/ Jour</span>
                 </div>
                 <ul className="space-y-6 mb-12 flex-grow">
                    <li className="flex items-center gap-3 text-gray-700">
                       <CheckCircle size={20} className="text-teal" /> WiFi Très Haut Débit
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                       <CheckCircle size={20} className="text-teal" /> Accès de 8h à 00h
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                       <CheckCircle size={20} className="text-teal" /> Espace Détente
                    </li>
                 </ul>
                 <a href="#contact" className="w-full py-5 rounded-2xl border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-all text-center">
                    Choisir ce plan
                 </a>
              </div>

              {/* Plan 3 - Featured Monthly */}
              <div className="bg-navy p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-4 transition-all duration-500 flex flex-col scale-105 border-4 border-gold">
                 <div className="absolute top-0 right-0 bg-gold text-navy font-bold text-xs py-2 px-8 uppercase rotate-45 transform translate-x-10 translate-y-4">Populaire</div>
                 <div className="mb-10">
                    <h3 className="font-display text-3xl text-white mb-2">Abonnement Mensuel</h3>
                    <p className="text-white/50 text-sm italic">Votre second chez-vous</p>
                 </div>
                 <div className="flex items-baseline gap-1 mb-10">
                    <span className="text-6xl font-bold font-display text-gold">80</span>
                    <span className="text-2xl text-gold font-bold">DT</span>
                    <span className="text-white/50">/ Mois</span>
                 </div>
                 <ul className="space-y-6 mb-12 flex-grow">
                    <li className="flex items-center gap-3 text-white/90">
                       <CheckCircle size={20} className="text-gold" /> Accès de 08h à 00h
                    </li>
                    <li className="flex items-center gap-3 text-white/90">
                       <CheckCircle size={20} className="text-gold" /> Poste de travail Fixe
                    </li>
                    <li className="flex items-center gap-3 text-white/90">
                       <CheckCircle size={20} className="text-gold" /> Espace Calme & Inspirant
                    </li>
                    <li className="flex items-center gap-3 text-white/90">
                       <CheckCircle size={20} className="text-gold" /> WiFi Fibre Optique
                    </li>
                 </ul>
                 <a href="#contact" className="w-full py-5 rounded-2xl bg-gold text-navy font-bold hover:bg-white transition-all text-center shadow-xl">
                    Réserver ma place
                 </a>
              </div>
            </div>
        </div>
      </section>

      {/* 8. Testimonials - Real Google Reviews Slider */}
      <section id="temoignages" className="w-full bg-white py-32 reveal overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-2 mb-6 text-navy/40 font-bold uppercase tracking-[0.3em] text-[10px]">
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" width={60} height={20} className="opacity-70" />
              <span>Reviews</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-navy mb-6 leading-tight">Ils nous font confiance</h2>
            <div className="flex items-center justify-center gap-4 text-gold mb-8">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <span className="text-navy font-bold text-lg">5.0 <span className="text-navy/40 font-normal">/ 5</span></span>
            </div>
            <p className="text-xl text-navy/60 font-light max-w-xl mx-auto">Découvrez pourquoi Smart Study est l'espace de coworking le mieux noté de Monastir.</p>
          </div>

          <div className="relative group/slider px-4">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 transition-all">
              {[
                {
                  name: "Mohamad R.",
                  text: "An amazing and clean space! Very good to study/work and just concentrate. Would recommend to everyone! :)",
                  role: "Verified Local Guide"
                },
                {
                  name: "Rami Jawadi",
                  text: "A very productive space, I highly recommend it 🎈",
                  role: "Smart Member"
                },
                {
                  name: "Taha Khouildi",
                  text: "Amazing atmosphere and top quality service. Best place in Monastir.",
                  role: "Verified Reviewer"
                },
                {
                  name: "Amine Dabbabi",
                  text: "A7san blasa trevez fiha fi mestir! Super ambiance et calme absolu.",
                  role: "Local Guide"
                },
                {
                  name: "Bassem Barka",
                  text: "Very good experience, highly recommended for productivity boosters.",
                  role: "Verified Reviewer"
                },
                {
                  name: "Jawher Barhoumi",
                  text: "Excellent space for productivity and networking with high-level professionals.",
                  role: "Verified Reviewer"
                }
              ].map((rev, idx) => (
                <div key={idx} className="min-w-[320px] sm:min-w-[400px] snap-center">
                  <div className="bg-cream/40 p-10 rounded-[3rem] border border-cream/50 h-full flex flex-col justify-between transition-all hover:bg-white hover:shadow-2xl hover:border-gold/30 hover:-translate-y-2 group">
                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex gap-1 text-gold">
                          {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" width={40} height={13} className="opacity-40 grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <p className="text-navy/80 text-lg leading-relaxed italic mb-10 font-light">"{rev.text}"</p>
                    </div>
                    
                    <div className="flex items-center gap-4 border-t border-navy/5 pt-8">
                      <div className="w-14 h-14 rounded-2xl bg-navy text-gold flex items-center justify-center font-display text-xl font-bold border-4 border-white shadow-lg">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-navy">{rev.name}</h4>
                        <div className="flex items-center gap-1.5 text-teal text-[10px] font-bold uppercase tracking-widest">
                          <CheckCircle size={10} /> {rev.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* QR Code CTA Card */}
              <div className="min-w-[300px] sm:min-w-[340px] snap-center">
                <div className="bg-gold/5 p-8 rounded-[3rem] border-4 border-dashed border-gold/30 h-full flex flex-col items-center justify-center text-center transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-2 group">
                  <div className="relative mb-6 p-4 bg-white rounded-2xl shadow-xl transition-transform group-hover:rotate-1 group-hover:scale-105">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://search.google.com/local/writereview?placeid=ChIJzZdRQi7Z6IMRaHxtsC2h2dw" 
                      alt="Review QR Code" 
                      width={180} 
                      height={180} 
                      className="mx-auto"
                    />
                  </div>
                  <h4 className="font-display text-2xl text-navy mb-2">Donnez votre avis</h4>
                  <p className="text-navy/60 text-sm font-medium mb-6">Scannez ce QR Code <br /> pour nous noter sur Google</p>
                  <div className="flex gap-1 text-gold">
                    {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                </div>
              </div>

            </div>

            {/* Hint for scrolling */}
            <div className="flex justify-center gap-2 mt-4 text-navy/20">
              <div className="w-2 h-2 rounded-full bg-teal/40 animate-pulse" />
              <div className="w-2 h-4 rounded-full bg-navy/10" />
              <div className="w-2 h-2 rounded-full bg-navy/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Location */}
      <section className="w-full bg-cream pb-12 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              
              <div className="lg:col-span-3 h-[450px] bg-gray-200 rounded-3xl overflow-hidden shadow-xl">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1513.3639558500204!2d10.8042515!3d35.7630227!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x83e8d92e425197cd%3A0xdcd9a12db06d7c68!2sSmart%20Study%20coworking%20space!5e1!3m2!1sen!2stn!4v1774983765799!5m2!1sen!2stn" 
                    width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                 ></iframe>
              </div>

              <div className="lg:col-span-2">
                 <h3 className="font-display text-4xl text-navy mb-6">Où nous trouver</h3>
                 <div className="w-12 h-1 bg-gold mb-10 rounded-full" />
                 
                 <div className="flex gap-4 mb-8">
                    <MapPin className="text-gold flex-shrink-0" size={32} />
                    <div>
                      <h4 className="font-bold text-navy text-xl mb-1">Adresse</h4>
                      <p className="text-gray-600">Près de la Faculté des Sciences<br/>Monastir, Tunisie</p>
                    </div>
                 </div>

                 <div className="flex gap-4 mb-10">
                    <Clock className="text-gold flex-shrink-0" size={32} />
                    <div>
                      <h4 className="font-bold text-navy text-xl mb-1">Horaires</h4>
                      <p className="text-teal font-semibold">8h à 00h (16h/24h, 7j/7)</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <a href="https://wa.me/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center hover:bg-teal transition-colors shadow-md">
                       <WhatsappIcon className="w-6 h-6" />
                    </a>
                    <a href="https://instagram.com/smart.study.tn" target="_blank" rel="noreferrer" className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center hover:bg-teal transition-colors shadow-md">
                       <Instagram size={24} />
                    </a>
                    <a href="https://www.google.com/maps/place/Smart+Study+coworking+space/@35.7630227,10.8042515,184m/data=!3m1!1e3!4m16!1m9!2m8!1sfacult%C3%A9+des+sciences!3m6!1sfacult%C3%A9+des+sciences!2sMonastir,+Tunisia!3s0x130212b61d744f59:0xf284743e1d3e40ef!4m2!1d10.8112885!2d35.7642515!3m5!1s0x83e8d92e425197cd:0xdcd9a12db06d7c68!8m2!3d35.7631445!4d10.8056215!16s%2Fg%2F11ylmc6b62?hl=en&entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center hover:bg-teal transition-colors shadow-md">
                       <Navigation size={24} fill="currentColor" className="ml-1" />
                    </a>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* 10. Contact CTA (Overlapping Footer) */}
      <section id="contact" className="w-full px-4 sm:px-6 lg:px-8 relative z-30 -mb-24">
         <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-gradient-to-br from-teal to-navy p-10 sm:p-16 lg:p-20">
            {/* Decor ring */}
            <div className="absolute -top-[250px] -right-[150px] w-[500px] h-[500px] rounded-full border-[60px] border-white/5 blur-xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
               <div className="lg:w-1/2">
                  <h2 className="font-display text-4xl sm:text-6xl text-white mb-6 leading-tight font-bold">Rejoignez-nous <br /> dès <span className="text-gold">aujourd'hui</span></h2>
                  <p className="text-white/80 text-xl font-light mb-10 leading-relaxed">
                    Envie de découvrir l'espace ou de réserver votre place ? <br />
                    Contactez-nous directement. Nous sommes réactifs !
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    <a href="https://wa.me/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-gold hover:bg-yellow-500 text-navy px-10 py-5 rounded-2xl font-bold transition shadow-xl text-lg hover:-translate-y-1">
                       <WhatsappIcon size={28} /> WhatsApp
                    </a>
                    <a href="https://instagram.com/smart.study.tn" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-10 py-5 rounded-2xl font-bold transition shadow-lg text-lg hover:-translate-y-1">
                       <Instagram size={28} /> Instagram
                    </a>
                  </div>
               </div>

               <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                    <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-navy mb-6 group-hover:scale-110 transition-transform">
                      <WhatsappIcon size={32} />
                    </div>
                    <h4 className="text-white font-bold text-xl mb-2">WhatsApp Fast Track</h4>
                    <p className="text-white/60 text-sm italic">Réponse en moins de 15 minutes</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                    <div className="w-14 h-14 bg-teal rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      <MapPin size={32} />
                    </div>
                    <h4 className="text-white font-bold text-xl mb-2">Visite Directe</h4>
                    <p className="text-white/60 text-sm italic">Passer nous voir à Monastir</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group sm:col-span-2">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                        <Star size={32} fill="currentColor" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xl mb-1">Pas d'engagement requis</h4>
                        <p className="text-white/60 text-sm">Venez tester une heure gratuitement !</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 11. Footer */}
      <footer className="w-full bg-navy pt-40 pb-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
              
              <div className="lg:col-span-2">
                 <a href="#" className="flex items-center gap-2 font-display text-2xl font-semibold text-white mb-6">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-navy">
                      <Lightbulb size={20} fill="currentColor" />
                    </div>
                    Smart Study
                 </a>
                 <p className="text-white/70 leading-relaxed pr-8">
                    Un espace de coworking moderne conçu pour les professionnels, créatifs et étudiants à la recherche d'un environnement calme et inspirant.
                 </p>
              </div>

              <div>
                 <h4 className="font-bold text-lg mb-6 tracking-wide">Navigation</h4>
                 <ul className="space-y-4 text-white/70">
                    <li><a href="#home" className="hover:text-gold transition-colors">Accueil</a></li>
                    <li><a href="#espaces" className="hover:text-gold transition-colors">Nos Espaces</a></li>
                    <li><a href="#avantages" className="hover:text-gold transition-colors">Avantages</a></li>
                 </ul>
              </div>

              <div>
                 <h4 className="font-bold text-lg mb-6 tracking-wide">Infos</h4>
                 <ul className="space-y-4 text-white/70">
                    <li><a href="#tarifs" className="hover:text-gold transition-colors">Tarifs</a></li>
                    <li><a href="#temoignages" className="hover:text-gold transition-colors">Témoignages</a></li>
                    <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
                 </ul>
              </div>

              <div>
                 <h4 className="font-bold text-lg mb-6 tracking-wide">Suivez-nous</h4>
                 <ul className="space-y-4 text-white/70">
                    <li className="flex items-center gap-3">
                       <Instagram size={20} className="text-gold" />
                       <a href="https://instagram.com/smart.study.tn" target="_blank" rel="noreferrer" className="hover:text-white transition">@smart.study.tn</a>
                    </li>
                    <li className="flex items-center gap-3 space-y-0">
                       <MapPin size={20} className="text-gold flex-shrink-0" />
                       <span>Monastir, Tunisie</span>
                    </li>
                 </ul>
              </div>

           </div>
           
           <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm font-medium">
              <p>&copy; 2026 Smart Study Space — Monastir. Tous droits réservés.</p>
              <p className="flex items-center gap-1">Créé avec passion <Star size={14} fill="currentColor" className="text-gold"/></p>
           </div>
        </div>
      </footer>
    </main>
  );
}
