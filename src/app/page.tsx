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
                hours: Math.floor(easeProgress * 24),
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
              Un coworking moderne, calme et inspirant — ouvert 24h/24 pour libérer votre créativité et booster votre concentration.
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
      <section className="w-full bg-white py-24 reveal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl sm:text-5xl text-navy mb-4">À l'intérieur de Smart Study</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600">Découvrez une atmosphère conçue pour votre concentration absolue et votre réussite.</p>
          </div>
          
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-navy transition-all duration-500 border-8 border-cream">
            {!isPlaying ? (
              <div 
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <Image
                  src="/assets/video-thumb.png"
                  alt="Visionner la vidéo Smart Study"
                  fill
                  className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-60"
                  unoptimized
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal rounded-full animate-ping opacity-75" />
                    <div className="relative w-28 h-28 bg-teal rounded-full flex items-center justify-center text-white transition-all group-hover:scale-110 shadow-2xl">
                      <Play size={44} fill="currentColor" className="ml-2" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 glass-dark px-6 py-3 rounded-full text-white font-bold text-sm flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  CLIQUER POUR LIRE
                </div>
              </div>
            ) : (
              <video 
                src="/assets/Smart Study Coworking SpaceYour daily space to work better. ✨Book your spot. 📍💻📍 LOCATION- En.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-cover bg-black"
                onEnded={() => setIsPlaying(false)}
              >
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            )}
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
              <h3 className="font-display text-4xl text-navy mb-6">Ouvert 7j/7, 24h/24</h3>
              <div className="w-12 h-1 bg-gold mb-6 rounded-full" />
              <p className="text-xl text-navy/80 font-light mb-8">Votre inspiration ne connaît pas d'horaires. C'est pourquoi nos portes vous sont ouvertes jour et nuit, pour vous offrir une flexibilité totale.</p>
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

      {/* 6.7. Gourmet Menu Section */}
      <section className="w-full bg-white py-24 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in">
            <h2 className="font-display text-4xl sm:text-5xl text-navy mb-4">La Carte Gourmande</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600 font-light">
              Des saveurs pour accompagner vos idées. <br /> 
              Profitez d'une sélection de boissons et de douceurs soigneusement choisies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Boissons Chaudes Category */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-cream pb-4">
                <Coffee className="text-teal" size={24} />
                <h3 className="font-display text-2xl text-navy font-semibold">Les Incontournables</h3>
              </div>
              <div className="space-y-6">
                {[
                  { name: "Americano", price: "2.5 / 3.0", soon: false },
                  { name: "Cappuccino", price: "3.0 / 3.5", soon: false },
                  { name: "Cappuccino Plus", price: "3.5 / 4.0", soon: true },
                  { name: "Espresso", price: "2.2 / 2.7", soon: false },
                  { name: "Café Crème", price: "2.8 / 3.3", soon: true },
                  { name: "Café au Chocolat", price: "3.0 / 3.5", soon: false },
                  { name: "Latte Macchiato", price: "3.5 / 4.0", soon: true },
                  { name: "Chocolat Chaud (Milk/Soya)", price: "3.3 / 4.0", soon: true },
                  { name: "Double Espresso", price: "3.0 / 3.5", soon: false },
                  { name: "Golden Coffee", price: "2.2", soon: true },
                  { name: "Thé Kyufi", price: "1.8", soon: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div className="flex flex-col gap-1">
                      <span className="text-navy font-medium text-lg leading-tight transition-colors group-hover:text-teal">{item.name}</span>
                      {item.soon && (
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full w-fit">
                          Bientôt disponible
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-navy/70 font-semibold">{item.price} <span className="text-[10px] text-gray-400">DT</span></span>
                      <div className="w-4 h-0.5 bg-cream/50 transition-all group-hover:w-8 group-hover:bg-teal/30" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Snacks Category */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-cream pb-4">
                <Users className="text-teal" size={24} />
                <h3 className="font-display text-2xl text-navy font-semibold">Les Douceurs</h3>
              </div>
              <div className="space-y-6">
                {[
                  { name: "Croissant Snapy", price: "1.5", soon: false },
                  { name: "Browniz", price: "1.2", soon: false },
                  { name: "Tigato", price: "2.2", soon: false },
                  { name: "D'croc", price: "2.2", soon: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div className="flex flex-col gap-1">
                      <span className="text-navy font-medium text-lg leading-tight transition-colors group-hover:text-teal">{item.name}</span>
                      {item.soon && (
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full w-fit">
                          Bientôt disponible
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-navy/70 font-semibold">{item.price} <span className="text-[10px] text-gray-400">DT</span></span>
                      <div className="w-4 h-0.5 bg-cream/50 transition-all group-hover:w-8 group-hover:bg-teal/30" />
                    </div>
                  </div>
                ))}
                
                {/* Visual Accent */}
                <div className="mt-12 p-6 bg-cream/30 rounded-3xl border border-cream/50 text-center">
                  <p className="text-sm italic text-gray-500">Accompagnements parfaits pour une séance de travail productive ✨</p>
                </div>
              </div>
            </div>

            {/* Cold Category */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-cream pb-4">
                <Navigation className="text-teal" size={24} />
                <h3 className="font-display text-2xl text-navy font-semibold">Rafraîchissements</h3>
              </div>
              <div className="space-y-6">
                {[
                  { name: "Eau Minérale 1.5L", price: "1.5", soon: false },
                  { name: "Eau Minérale 0.5L", price: "0.8", soon: false },
                  { name: "Jus Oh! (Pêche)", price: "1.8", soon: false },
                  { name: "Tropico", price: "1.2", soon: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div className="flex flex-col gap-1">
                      <span className="text-navy font-medium text-lg leading-tight transition-colors group-hover:text-teal">{item.name}</span>
                      {item.soon && (
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full w-fit">
                          Bientôt disponible
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-navy/70 font-semibold">{item.price} <span className="text-[10px] text-gray-400">DT</span></span>
                      <div className="w-4 h-0.5 bg-cream/50 transition-all group-hover:w-8 group-hover:bg-teal/30" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="relative h-48 rounded-3xl shadow-xl overflow-hidden mt-8 hidden lg:block group">
                <Image 
                  src="/assets/coffee-space.png" 
                  alt="Ambiance menu" 
                  fill 
                  className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110" 
                  unoptimized 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end p-6">
                   <p className="text-white text-xs font-semibold tracking-wide">SMART STUDY GOURMET CORNER</p>
                </div>
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
          
          <div className="relative w-full lg:w-4/5 mx-auto rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] aspect-[21/9] bg-black group border border-white/5">
            <Image 
              src="/assets/community-reel.png" 
              alt="Reel Community" 
              fill 
              className="object-cover opacity-70 transition-transform duration-[6s] group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
               <h3 className="font-display text-3xl sm:text-5xl text-white mb-10 text-shadow-md font-light">Une communauté <br /> qui vous pousse <span className="font-bold underline decoration-gold underline-offset-8">vers le haut</span></h3>
               <a 
                 href="https://instagram.com/smart.study.tn" 
                 target="_blank" 
                 rel="noreferrer"
                 className="inline-flex items-center gap-4 bg-white text-navy hover:bg-gold hover:text-white px-10 py-5 rounded-full font-bold transition-all shadow-2xl hover:-translate-y-1"
               >
                 <Instagram size={28} /> Suivre sur Instagram
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
              <div className="bg-cream/40 p-10 rounded-[2.5rem] border border-cream hover:border-gold transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group flex flex-col">
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
              <div className="bg-cream/40 p-10 rounded-[2.5rem] border border-cream hover:border-gold transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group flex flex-col">
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
              <div className="bg-navy p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col scale-105 border-4 border-gold">
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

      {/* 8. Testimonials */}
      <section id="temoignages" className="w-full bg-cream py-24 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl sm:text-5xl text-navy mb-4">Ils nous font confiance</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600">Ce que nos membres disent de leur expérience chez Smart Study Space.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
               <div className="flex justify-center gap-1 text-gold mb-6">
                 {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
               </div>
               <Quote className="mx-auto text-cream w-16 h-16 -mt-12 mb-4" fill="currentColor" />
               <p className="text-gray-700 italic mb-8 leading-relaxed">"L'endroit parfait pour préparer mes examens de fin d'année. L'atmosphère est incroyablement calme et le café à volonté est un gros plus !"</p>
               <div className="flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full overflow-hidden mb-4 bg-teal text-white flex items-center justify-center font-display text-2xl font-bold">A</div>
                 <h4 className="font-semibold text-navy">Ahmed B.</h4>
                 <span className="text-sm text-gray-500">Étudiant en Médecine</span>
               </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
               <div className="flex justify-center gap-1 text-gold mb-6">
                 {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
               </div>
               <Quote className="mx-auto text-cream w-16 h-16 -mt-12 mb-4" fill="currentColor" />
               <p className="text-gray-700 italic mb-8 leading-relaxed">"En tant que freelance, j'ai besoin d'un espace fiable pour travailler. La connexion WiFi ici est irréprochable et j'ai fait de supers rencontres."</p>
               <div className="flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full overflow-hidden mb-4 bg-gold text-white flex items-center justify-center font-display text-2xl font-bold">S</div>
                 <h4 className="font-semibold text-navy">Sarah K.</h4>
                 <span className="text-sm text-gray-500">Graphiste Freelance</span>
               </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm text-center flex flex-col justify-between">
               <div>
                  <div className="flex justify-center gap-1 text-gold/30 mb-6">
                    {[1,2,3,4,5].map(i => <Star key={i} size={20} />)}
                  </div>
                  <UserPlus className="mx-auto text-cream w-16 h-16 -mt-12 mb-4" fill="currentColor" />
                  <p className="text-gray-700 font-medium text-lg mt-6">Découvrez notre espace par vous-même !</p>
               </div>
               <div className="bg-cream p-4 rounded-xl mt-8">
                  <p className="text-sm font-medium text-navy/80">Soyez parmi les premiers à laisser votre avis ⭐</p>
               </div>
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
                      <p className="text-teal font-semibold">Toujours ouvert (24h/24, 7j/7)</p>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
               <div>
                  <h2 className="font-display text-4xl sm:text-5xl text-white mb-6">Prêt à rejoindre Smart Study Space?</h2>
                  <p className="text-white/80 text-xl font-light mb-10">Remplissez le formulaire, ou contactez-nous directement sur WhatsApp pour réserver votre place.</p>
                  <a href="https://wa.me/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-gold hover:bg-yellow-500 text-navy px-8 py-4 rounded-full font-bold transition shadow-lg text-lg">
                     <WhatsappIcon className="w-6 h-6" /> Discuter via WhatsApp
                  </a>
               </div>

               <div className="bg-white rounded-3xl p-8 shadow-xl">
                  <form onSubmit={(e) => { e.preventDefault(); alert("C'est une démo. Utilisez Whatsapp SVP !"); }}>
                     <div className="mb-6">
                        <label htmlFor="name" className="block text-navy font-semibold mb-2">Nom complet</label>
                        <input type="text" id="name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition" placeholder="Votre nom" required />
                     </div>
                     <div className="mb-6">
                        <label htmlFor="email" className="block text-navy font-semibold mb-2">Email</label>
                        <input type="email" id="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition" placeholder="votre@email.com" required />
                     </div>
                     <div className="mb-6">
                        <label htmlFor="message" className="block text-navy font-semibold mb-2">Message</label>
                        <textarea id="message" rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition" placeholder="Comment pouvons-nous aider?" required></textarea>
                     </div>
                     <button type="submit" className="w-full bg-teal hover:bg-teal/90 text-white font-bold py-4 rounded-xl transition shadow-md">
                        Envoyer le message
                     </button>
                  </form>
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
