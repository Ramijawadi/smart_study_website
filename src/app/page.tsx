"use client";

import { useEffect, useState, useRef } from "react";
import {
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
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  CreditCard,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState('fr');
  const [stats, setStats] = useState({ members: 0, hours: 0, spaces: 0, wifi: 0 });
  const [dynamicReviews, setDynamicReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [ratingData, setRatingData] = useState<{ rating: number, total: number } | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [dynamicReviews]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 420; // card width + gap
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Translations Dictionary
  const content = {
    fr: {
      rtl: false,
      font: '',
      currency: "DT",
      nav: { services: "Services", spaces: "Espaces", pricing: "Tarifs", menu: "Menu", contact: "Contact" },
      hero: { badge: "Visez l'excellence", main: "Votre espace de travail idéal à Monastir", desc: "Un coworking moderne, calme et inspirant — ouvert 16h/24h (de 8h à 00h) pour libérer votre créativité et booster votre concentration.", cta_primary: "Découvrir nos espaces", cta_secondary: "Découvrez nos Tarifs", cta_visit: "Réserver une visite" },
      stats: { members: "Membres Actifs", hours: "Horaires Ouverts", spaces: "Zones Disponibles", wifi: "WiFi Ultra-Rapide" },
      video: { badge: "Visez l'excellence", title: ["Plongez dans", "l'expérience", "Smart Study"], desc: "Découvrez un espace où chaque détail a été conçu pour votre productivité. Du calme absolu à notre grande variété de boissons, vivez une journée type en vidéo.", feat_design: "Design Premium", feat_community: "Smart Community", cta: "Cliquer pour lire" },
      spaces: { 
        title: "Nos Espaces", 
        desc: "Des environnements de travail adaptés à tous vos besoins, du travail en profondeur à la collaboration d'équipe.", 
        hub: { title: "L'Open Hub", desc: "Un espace de travail lumineux et social, parfait pour brainstormer ou travailler dans une ambiance dynamique." },
        focus: { title: "Zone de Focus", desc: "Des bureaux individuels conçus pour une concentration absolue et une productivité maximale." },
        collective: { title: "Espace Collectif", desc: "Une zone spacieuse idéale pour le travail de groupe et le networking entre professionnels." },
        meeting: { title: "Salle de Réunion", desc: "Un espace privé équipé de technologies modernes pour vos réunions professionnelles et appels vidéo." },
        training: { title: "Salle de Training", desc: "Une salle polyvalente dédiée aux formations, ateliers et présentations académiques." },
        more: "Réserver cet espace" 
      },
      advantages: {
        row1: { title: "Ambiance Calme & Productive", desc: "Nous avons conçu chaque mètre carré de Smart Study Space pour limiter les distractions et maximiser votre efficacité.", items: ["Design acoustique optimisé", "Chaises ergonomiques premium", "Éclairage naturel et chaud"] },
        row2: { title: "Ouvert 7j/7, 16h/24", desc: "Votre inspiration a besoin du bon cadre. C'est pourquoi nos portes vous sont ouvertes de 8h à 00h, pour vous offrir une large plage horaire de productivité.", items: ["Accès sécurisé par badge", "Caméras de surveillance 24/7", "Plusieurs choix de café et thé"] }
      },
      coffee: { title: "Espace Café & Détente", desc: "Parce qu'une pause bien méritée booste votre productivité, profitez de notre espace détente avec café et thé — le tout dans une atmosphère chaleureuse et conviviale.", card_coffee: { title: "Café & Thé ☕", desc: "Plusieurs choix disponibles pour tous les goûts !" }, card_chill: { title: "Zone Chill & Prière ✨", desc: "Un canapé confortable pour se ressourcer, avec un coin calme dédié à la prière." }, cta: "Découvrir l'endroit", badge: "Ouvert" },
      menu: { badge: "Saveurs & Douceurs", title: "La Carte Gourmande", desc: "Une sélection raffinée de boissons et de snacks pour accompagner vos sessions de travail.", cat_hot: "Les Incontournables", cat_snacks: "Les Douceurs", cat_refresh: "Rafraîchissements", bestseller: "Bestseller" },
      reel: { title: ["Vivez l'expérience", "Smart Study"], subtitle: ["Une communauté", "qui vous pousse", "vers le haut"], cta: "Suivre sur Instagram" },
      pricing: { 
        badge: "Prêt à commencer ?", 
        title: "Nos Forfaits Flexibles", 
        desc: ["Choisissez l'offre qui correspond le mieux à votre rythme de travail.", "La productivité n'attend que vous."], 
        popular: "Populaire", 
        offer: "Promo",
        unit_hour: "/ Heure", 
        unit_day: "/ Jour", 
        unit_week: "/ Semaine", 
        unit_month: "/ Mois", 
        cta_plan: "Choisir ce plan", 
        cta_featured: "Réserver ma place", 
        plans: [
          { name: "Pass Heure", price: "1", unit: "hour", sub: "Flexibilité maximale", features: ["WiFi Illimité", "Café & Thé disponible", "Ambiance de travail"] }, 
          { name: "Pass Journée", price: "5", unit: "day", sub: "Productivité intense", features: ["WiFi Très Haut Débit", "Accès de 8h à 00h", "Espace Détente"] }, 
          { name: "Pass Semaine", price: "25", unit: "week", sub: "Votre routine idéale", features: ["Accès de 8h à 00h", "Bureau partagé", "Espace Calme & Inspirant"] }, 
          { name: "BACCALAURÉAT", price: "65", oldPrice: "80", unit: "month", sub: "Encouragement Réussite", highlight: true, features: ["Accès de 08h à 00h", "Poste de travail Fixe", "WiFi Fibre Optique", "Espace Motivé & Calme"] },
          { name: "Pass Mensuel", price: "80", unit: "month", sub: "Votre second chez-vous", features: ["Accès de 08h à 00h", "Poste de travail Fixe", "Espace Calme & Inspirant", "WiFi Fibre Optique"] }
        ] 
      },
      testimonials: { badge: "Reviews", title: "Ils nous font confiance", desc: "Découvrez pourquoi Smart Study est l'espace de coworking le mieux noté de Monastir.", cta_qr_title: "Donnez votre avis", cta_qr_desc: "Scannez ce QR Code pour nous noter sur Google" },
      location: { title: "Où nous trouver", card_addr: "Adresse", card_addr_desc: ["Près de la Faculté des Sciences", "Monastir, Tunisie"], card_hours: "Horaires", card_hours_desc: "8h à 00h (16h/24h, 7j/7)" },
      contact: { title: ["Rejoignez-nous", "dès", "aujourd'hui"], desc: ["Envie de découvrir l'espace ou de réserver votre place ?", "Contactez-nous directement."], card_whatsapp: { title: "WhatsApp Fast Track", desc: "Réponse en moins de 15 minutes" }, card_visit: { title: "Visite Directه", desc: "Passer nous voir à Monastir" }, card_gift: { title: "Pas d'engagement requis", desc: "Venez tester une heure gratuitement !" }, cta_reserver: "Réserver en 1 min" },
      footer: { about: "Un espace de coworking moderne conçu pour les professionnels, créatifs et étudiants à la recherche d'un environnement calme et inspirant.", nav_title: "Navigation", info_title: "Infos", social_title: "Suivez-nous", rights: "Smart Study Space — Monastir. Tous droits réservés.", passion: "Créé avec passion" }
    },
    tn: {
      rtl: true,
      font: 'font-cairo',
      currency: "د.ت",
      nav: { services: "الخدمات", spaces: "بلايصنا", pricing: "الأسوام", menu: "الكاتالوج", contact: "اتصل بينا" },
      hero: { badge: "السعي نحو التميز", main: "أحسن بلاصة تقرا وتخدم فيها في مستير", desc: "فضاء عمل عصري، هادئ ومحفز — محلول 16 ساعة في النهار باش تبدع وتركز في خدمتك.", cta_primary: "شوف بلايصنا", cta_secondary: "شوف الأسوام", cta_visit: "قيد لينا بلاصة" },
      stats: { members: "أعضاء مسجلين", hours: "نحلوا ديما", spaces: "بلايص القراية", wifi: "كونكسيون طيارة" },
      video: { badge: "السعي نحو التميز", title: ["خوذ فكرة", "على جو", "Smart Study"], desc: "اكتشف فضاء وين كل تفصيل معمول على خاطر راحتك وإنتاجيتك. من هدوء تام لقهوة بأنواعها، عيش معانا نهار في فيديو.", feat_design: "تصميم فاخر", feat_community: "مجتمع ذكي", cta: "أنقر للمشاهدة" },
      spaces: { 
        title: "البلايص متاعنا", 
        desc: "أجواء تعـاونية و هادئـة تناسب احتياجاتك الكل، من تركيزة الفردية للخدمة الجماعية.", 
        hub: { title: "الأوبن هاب", desc: "بلاصة مضواية و حيوية، تصلح برشا باش تطلع أفكار جديدة وتخدم في جو فيه طاقة." },
        focus: { title: "بلاصة التركيز", desc: "مكاتب فردية مخصصة للتركيز التام باش تعطي أحسن ما عندك في خدمتك." },
        collective: { title: "فضاء جماعي", desc: "بلاصة واسعة تصلح للخدمة في مجموعة والتعرف على ناس جدد في خدمتك." },
        meeting: { title: "بيت اجتماعات", desc: "بلاصة خاصة فيها أحسن التجهيزات لاجتماعاتك و المكالمات بالفيديو." },
        training: { title: "بيت التدريب", desc: "بيت كاملة مخصصة للدورات التدريبية، الورشات، و العروض الأكاديمية." },
        more: "احجز بلاصتك" 
      },
      advantages: {
        row1: { title: "أجواء هادئة و منتجة", desc: "كل متر مربع في Smart Study مصمم باش يبعدك على القلق ويخليك تركز في خدمتك.", items: ["تصميم صوتي مُحسَّن", "كراسي مريحة برشا", "ضوء طبيعي و دافئ"] },
        row2: { title: "8 سوايع في النهار، 7 أيام في الجمعة", desc: "بلاصتك حاضرة باش تبدع! نحلوا أبوابنا من 8 متاع الصباح لنص الليل، باش نعطيوك الوقت الكافي باش تخدم.", items: ["دخول مؤمن بالكارت", "كاميرات مراقبة 24/7", "برشا اختيارات من القهوة والتاي"] }
      },
      coffee: { title: "ركن القهوة والراحة", desc: "على خاطر الراحة لازمة باش ترجع أقوى، استمتع بركن الراحة وذوق قهوتنا وتاينا في جو عائلي ومزيان.", card_coffee: { title: "قهوة وتاي ☕", desc: "برشا اختيارات متوفرة! ذوق وما تندمش." }, card_chill: { title: "بلاصة الراحة والصلاة ✨", desc: "كنبات مريحة باش ترتاح، مع ركن هادئ مخصص للصلاة." }, cta: "اكتشف البلاصة", badge: "محلول" },
      menu: { badge: "بنة ومنفعة", title: "قائمة المأكولات والمشروبات", desc: "اختيارات بنينة من مشروبات وماكلة خفيفة باش ترافقك وأنت تخدم.", cat_hot: "الحاجات اللي ما تتفلتش", cat_snacks: "حاجه حلوة", cat_refresh: "مشروبات منعشة", bestseller: "الأكثر طلباً" },
      reel: { title: ["عيش الجو متاعنا", "Smart Study"], subtitle: ["مجتمع", "يدزك", "لفوق"], cta: "تبعنا على إنستغرام" },
      pricing: { 
        badge: "مستعد تبدا؟", 
        title: "الأسوام متاعنا", 
        desc: ["اختار العرض اللي يناسب الريتم متاعك في الخدمة.", "الخدمة والإنتاجية تستنى فيك."], 
        popular: "الأكثر طلباً", 
        offer: "تخفيض",
        unit_hour: "/ الساعة", 
        unit_day: "/ النهار", 
        unit_week: "/ الجمعة", 
        unit_month: "/ الشهر", 
        cta_plan: "اختار هذا", 
        cta_featured: "حجز بلاصتي", 
        plans: [
          { name: "عدي ساعة", price: "1", unit: "hour", sub: "فليكسيبل لدرجة كبيرة", features: ["ويفي بلاش", "أنواع مختلفة مالقهوة والتاي", "جو خدمة طالع"] }, 
          { name: "عدي نهار", price: "5", unit: "day", sub: "خدمة مكثفة", features: ["ويفي طيارة برشا", "من 8 لـ 00", "بلاصة راحة"] }, 
          { name: "بالجمعة", price: "25", unit: "week", sub: "الروتين المثالي للخدمة", features: ["من 8 لـ 00", "بيرو مشترك", "هدوء وإلهام"] }, 
          { name: "باكالوريا", price: "65", oldPrice: "80", unit: "month", sub: "عرض خاص بالتلامذة", highlight: true, features: ["من 08 لـ 00", "بلاصتك فيكس", "هدوء وتركيز", "ويفي فيبر أوبتيك"] },
          { name: "بالشهر", price: "80", unit: "month", sub: "دارك الثانية", features: ["من 08 لـ 00", "بلاصتك فيكس", "هدوء وإلهام", "ويفي فيبر أوبتيك"] }
        ] 
      },
      testimonials: { badge: "ريفـيو", title: "الناس اللي يثقوا فينا", desc: "اعرف علاش Smart Study هو أحسن فضاء عمل في مستير بشهادة ناسنا.", cta_qr_title: "أعطينا رايك", cta_qr_desc: "سكاني الكود باش تعطينا رايك في جوجل" },
      location: { title: "وين تلقانا", card_addr: "العنوان", card_addr_desc: ["بجنب كلية العلوم", "مستير، تونس"], card_hours: "الأوقات", card_hours_desc: "من 8 لـ 00 (نحلوا ديما)" },
      contact: { title: ["خلط علينا", "من", "اليوم"], desc: ["تحب تكتشف الفضاء وإلا تحجز بلاصتك؟", "كلمنا في فيسع، نجاوبوك في دقيقة!"], card_whatsapp: { title: "واتساب فيسع فيسع", desc: "نجاوبوك في أقل من 15 دقيقة" }, card_visit: { title: "زيارة مباشرة", desc: "تفضل بحذانا في مستير" }, card_gift: { title: "من غير التزامات", desc: "تفضل جرب ساعة بلاش!" }, cta_reserver: "حجز في دقيقة" },
      footer: { about: "فضاء عمل عصري مصمم للمهنيين، المبدعين والطلبة اللي لوجوا على بلاصة هادئة ومحفزة.", nav_title: "التنقل", info_title: "معلومات", social_title: "تبعنا", rights: "جميع الحقوق محفوظة - Smart Study Space", passion: "تصميم بكل حب" }
    }
  };

  const t = content[lang as keyof typeof content];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['accueil', 'espaces', 'tarifs', 'menu', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActivePath(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => window.removeEventListener('scroll', handleScroll);
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

  // Fetch dynamic Google Reviews
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) throw new Error('API unstable');
        const data = await res.json();
        if (data.reviews && data.reviews.length > 0) {
          setDynamicReviews(data.reviews);
        } else {
          // Fallback reviews if API returns empty list but status OK
          setDynamicReviews([
            { name: "Bokh Crypto", rating: 5, text: "Na9ra t9oul fi darna", date: "il y a 4 jours", photo: null },
            { name: "Ben Ahmed Youssfi", rating: 5, text: "Espace jolie", date: "il y a 5 jours", photo: null },
            { name: "bouthayna amri", rating: 5, text: "يعطيكم الصحة", date: "il y a une semaine", photo: null },
            { name: "Essia Bouazizi", rating: 5, text: "Clean, comfortable, and well-equipped. Highly recommend !", date: "il y a une semaine", photo: null },
            { name: "Yesser Ajil", rating: 5, text: "Ahlaa w a9waa co fl mestiir w ahla sohayb ❤️", date: "il y a une semaine", photo: null }
          ]);
        }
        if (data.rating) {
          setRatingData({ rating: data.rating, total: data.total || 20 });
        }
      } catch (err) {
        console.error("Failed to fetch fresh reviews", err);
        // High quality fallback data
        setRatingData({ rating: 5.0, total: 142 });
        setDynamicReviews([
          { name: "Bokh Crypto", rating: 5, text: "Na9ra t9oul fi darna", date: "il y a 4 jours", photo: null },
          { name: "Ben Ahmed Youssfi", rating: 5, text: "Espace jolie", date: "il y a 5 jours", photo: null },
          { name: "bouthayna amri", rating: 5, text: "يعطيكم الصحة", date: "il y a une semaine", photo: null },
          { name: "Essia Bouazizi", rating: 5, text: "Clean, comfortable, and well-equipped. Highly recommend !", date: "il y a une semaine", photo: null },
          { name: "Yesser Ajil", rating: 5, text: "Ahlaa w a9waa co fl mestiir w ahla sohayb ❤️", date: "il y a une semaine", photo: null }
        ]);
      } finally {
        setReviewsLoading(false);
      }
    }
    
    // Minimal delay for smooth reveal
    const timer = setTimeout(fetchReviews, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`min-h-screen bg-white selection:bg-gold/30 selection:text-navy ${t.font}`} dir={t.rtl ? 'rtl' : 'ltr'}>
      {/* 1. Header & Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-navy">
          <a href="#accueil" className="flex items-center gap-2 group">
             <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Image 
                  src="/assets/logosmart1.png" 
                  alt="Smart Study Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                  unoptimized
                />
             </div>
             <span className={`font-display text-2xl font-bold tracking-tight transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}>
                Smart <span className="text-gold">Study</span>
             </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 px-8 py-2 rounded-full bg-cream/30 border border-cream/50">
              {Object.entries(t.nav).map(([key, label], idx) => {
                const hrefMap: Record<string, string> = {
                  services: "#avantages",
                  spaces: "#espaces",
                  pricing: "#tarifs",
                  menu: "#menu",
                  contact: "#contact"
                };
                const href = hrefMap[key] || `#${key}`;
                return (
                  <a 
                    key={idx}
                    href={href} 
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-sm font-bold tracking-wide uppercase transition-all hover:text-gold relative group ${activePath === href.replace('#', '') ? 'text-gold' : (scrolled ? 'text-navy/70' : 'text-white/70')}`}
                  >
                    {label}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full ${activePath === href.replace('#', '') ? 'w-full' : ''}`} />
                  </a>
                );
              })}
            </div>

            {/* Language Switcher */}
            <div className={`flex p-1 rounded-full border transition-all ${scrolled ? 'bg-navy/5 border-navy/10' : 'bg-white/10 backdrop-blur-md border-white/20'}`}>
              <button 
                onClick={() => setLang('fr')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${lang === 'fr' ? 'bg-gold text-navy shadow-md' : (scrolled ? 'text-navy/50 hover:text-navy' : 'text-white/40 hover:text-white')}`}
              >
                FR
              </button>
              <button 
                onClick={() => setLang('tn')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${lang === 'tn' ? 'bg-gold text-navy shadow-md' : (scrolled ? 'text-navy/50 hover:text-navy' : 'text-white/40 hover:text-white')}`}
              >
                TN
              </button>
            </div>

            <a href="#contact" className="bg-navy text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-gold hover:text-navy transition-all shadow-xl hover:-translate-y-0.5">
              {t.contact.cta_reserver}
            </a>
          </div>

          <button className={`md:hidden p-2 bg-cream/50 rounded-xl ${scrolled ? 'text-navy' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay - Premium Design */}
        <div className={`fixed inset-0 bg-navy/98 backdrop-blur-2xl z-[60] flex flex-col transition-all duration-700 md:hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-teal to-gold" />
          
          <div className="flex justify-between items-center p-8 border-b border-white/5">
            <div className="flex items-center gap-2">
               <Image src="/assets/logosmart1.png" alt="Logo" width={32} height={32} unoptimized />
               <span className="font-display text-xl font-bold text-white tracking-tight">Smart <span className="text-gold">Study</span></span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="bg-white/5 p-3 rounded-2xl text-white hover:bg-gold hover:text-navy transition-all">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-grow flex flex-col justify-center px-8 py-12">
            <div className="flex flex-col gap-4">
              {[
                { key: 'services', label: t.nav.services, href: "#avantages", icon: <Star size={20} /> },
                { key: 'spaces', label: t.nav.spaces, href: "#espaces", icon: <Users size={20} /> },
                { key: 'pricing', label: t.nav.pricing, href: "#tarifs", icon: <CreditCard size={20} /> },
                { key: 'menu', label: t.nav.menu, href: "#menu", icon: <Coffee size={20} /> },
                { key: 'contact', label: t.nav.contact, href: "#contact", icon: <MapPin size={20} /> }
              ].map((item, idx) => (
                <a 
                  key={idx}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.body.style.overflow = 'unset';
                    setTimeout(() => {
                      const target = document.querySelector(item.href);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 300);
                  }}
                  className="flex items-center justify-between group p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 transform active:scale-95"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all shadow-sm">
                       {item.icon}
                    </div>
                    <span className="text-lg sm:text-xl font-display font-medium text-white/90 group-hover:text-gold transition-colors tracking-wide">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={20} className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          <div className="p-8 mt-auto border-t border-white/5 space-y-6">
            <div className="flex gap-4 justify-center">
               <button 
                 onClick={() => { setLang('fr'); setIsMenuOpen(false); }}
                 className={`flex-1 py-3.5 rounded-xl font-bold transition-all text-sm ${lang === 'fr' ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'}`}
               >
                 FR
               </button>
               <button 
                 onClick={() => { setLang('tn'); setIsMenuOpen(false); }}
                 className={`flex-1 py-3.5 rounded-xl font-bold transition-all text-sm ${lang === 'tn' ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'}`}
               >
                 TN
               </button>
            </div>

            <a 
              href="https://wa.me/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full bg-white text-navy hover:bg-gold py-4 rounded-xl font-bold text-base transition-all shadow-xl active:scale-95"
            >
              <WhatsappIcon size={20} /> {t.contact.cta_reserver}
            </a>
          </div>

          {/* Artistic background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,190,0,0.05)_0%,_transparent_70%)] pointer-events-none" />
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="accueil" className="relative w-full min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/smartstudy.png"
            alt="Smart Study Coworking Space"
            fill
            className="object-cover transition-transform duration-[20s] hover:scale-110 filter contrast-[1.05] brightness-[1.05]"
            priority
          />
          <div className="absolute inset-0 bg-navy/40 backdrop-blur-[4px] bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
          <div className="flex flex-col gap-8 max-w-2xl text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold font-semibold text-sm w-fit animate-fade-in group">
              <Star size={16} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
              <span>{t.hero.badge}</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-7xl leading-[1.1] text-white animate-slide-up">
              {t.hero.main}
            </h1>
            
            <p className="text-lg sm:text-2xl text-white/90 font-light leading-relaxed max-w-xl animate-fade-in delay-200">
               {t.hero.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mt-4">
              <a
                href="#espaces"
                className="group relative bg-gold hover:bg-yellow-500 text-navy px-10 py-5 rounded-full font-extrabold transition shadow-xl hover:shadow-gold/20 hover:-translate-y-1 text-center text-lg overflow-hidden"
              >
                <span className="relative z-10">{t.hero.cta_primary}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-10 py-5 rounded-full font-bold transition text-center text-lg shadow-lg"
              >
                {t.hero.cta_visit}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Bar */}
      <section id="stats-section" className="w-full bg-navy py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-cream divide-x divide-white/10 rtl:divide-x-reverse">
          <div className="flex flex-col items-center">
            <span className="font-display text-5xl text-gold mb-2">{stats.members}+</span>
            <span className="text-sm tracking-widest uppercase opacity-80 font-medium">{t.stats.members}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-5xl text-gold mb-2">{stats.hours}/7</span>
            <span className="text-sm tracking-widest uppercase opacity-80 font-medium">{t.stats.hours}</span>
          </div>
          <div className="flex flex-col items-center border-t md:border-t-0 border-white/10 pt-8 md:pt-0">
            <span className="font-display text-5xl text-gold mb-2">{stats.spaces}</span>
            <span className="text-sm tracking-widest uppercase opacity-80 font-medium">{t.stats.spaces}</span>
          </div>
          <div className="flex flex-col items-center border-t md:border-t-0 border-white/10 pt-8 md:pt-0">
            <span className="font-display text-5xl text-gold mb-2">{stats.wifi}%</span>
            <span className="text-sm tracking-widest uppercase opacity-80 font-medium">{t.stats.wifi}</span>
          </div>
        </div>
      </section>

      {/* 4. Video Section */}
      <section className="w-full bg-cream/30 py-16 overflow-hidden reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Animated Text Storytelling */}
            <div className="flex flex-col gap-8 order-2 lg:order-1 text-center lg:text-start items-center lg:items-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy text-gold font-bold text-[10px] w-fit tracking-[0.2em] uppercase">
                <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                {t.video.badge}
              </div>
              
              <h2 className="font-display text-5xl sm:text-7xl text-navy leading-[1.1]">
                {t.video.title[0]} <br />
                <span className="text-teal italic">{t.video.title[1]}</span> <br />
                {t.video.title[2]}
              </h2>
              
              <div className="w-20 h-1.5 bg-gold rounded-full" />
              
              <p className="text-xl text-navy/70 font-light leading-relaxed max-w-lg">
                {t.video.desc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 w-full">
                <div className="flex items-center gap-4 group justify-center lg:justify-start">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-teal shadow-md group-hover:bg-teal group-hover:text-white transition-all">
                    <CheckCircle size={24} />
                  </div>
                  <span className="font-bold text-navy">{t.video.feat_design}</span>
                </div>
                <div className="flex items-center gap-4 group justify-center lg:justify-start">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-teal shadow-md group-hover:bg-teal group-hover:text-white transition-all">
                    <CheckCircle size={24} />
                  </div>
                  <span className="font-bold text-navy">{t.video.feat_community}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Larger Cinematic Showcase */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end w-full">
              <div className="relative aspect-[3/4] w-full max-w-[470px] rounded-[3.5rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] bg-navy group/vid transition-all duration-500">
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
                       {t.video.cta}
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
                      {lang === 'fr' ? 'Votre navigateur ne supporte pas la lecture de vidéos.' : 'متصفحك مايدعمش تشغيل الفيديو.'}
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
      <section id="espaces" className="w-full bg-cream py-16 lg:py-32 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 text-navy font-bold text-[10px] w-fit tracking-[0.2em] uppercase mb-6">
               EXPLORER NOS ESPACES
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-navy mb-8">{t.spaces.title}</h2>
            <div className="w-24 h-1.5 bg-gold mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-600 leading-relaxed font-light">{t.spaces.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
            {/* 1. Open Hub - Large Featured */}
            <div className="md:col-span-3 lg:col-span-8 relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
               <Image 
                src="/assets/communautyStudy-4k.png" 
                alt={t.spaces.hub.title} 
                fill 
                className="object-cover transition-all duration-700 group-hover:scale-105 filter contrast-[1.05] brightness-[1.02]"
                priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)] pointer-events-none" />
               <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
                  <span className="bg-gold text-navy text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">{t.hero.badge}</span>
                  <h3 className="text-3xl sm:text-4xl font-display text-white mb-4 text-shadow-md">{t.spaces.hub.title}</h3>
                  <p className="text-white/80 text-lg font-light max-w-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">{t.spaces.hub.desc}</p>
               </div>
            </div>

            {/* 2. Focus Zone - Tall Vertical */}
            <div className="md:col-span-3 lg:col-span-4 relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
               <Image 
                src="/assets/externalSpace2.jpg" 
                alt={t.spaces.focus.title} 
                fill 
                className="object-cover transition-all duration-700 group-hover:scale-110 filter contrast-[1.1] saturate-[1.1]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-teal/95 via-teal/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none" />
               <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-4">
                     <Monitor size={20} />
                  </div>
                  <h3 className="text-2xl font-display text-white mb-2 text-shadow-md">{t.spaces.focus.title}</h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">{t.spaces.focus.desc}</p>
               </div>
            </div>

            {/* 3. Meeting Room - Medium Header */}
            <div className="md:col-span-3 lg:col-span-4 relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
               <Image 
                src="/assets/meetingRoom-4k.png" 
                alt={t.spaces.meeting.title} 
                fill 
                className="object-cover transition-all duration-700 group-hover:scale-110 filter contrast-[1.08] brightness-[1.05]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/10 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)] pointer-events-none" />
               <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-4">
                     <Users size={20} />
                  </div>
                  <h3 className="text-2xl font-display text-white mb-2 text-shadow-md">{t.spaces.meeting.title}</h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">{t.spaces.meeting.desc}</p>
               </div>
            </div>

            {/* 4. Training Room - Medium Header */}
            <div className="md:col-span-3 lg:col-span-4 relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
               <Image 
                src="/assets/space2Training.jpg" 
                alt={t.spaces.training.title} 
                fill 
                className="object-cover transition-all duration-700 group-hover:scale-110 filter contrast-[1.1] saturate-[1.1]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)] pointer-events-none" />
               <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-4">
                     <Presentation size={20} />
                  </div>
                  <h3 className="text-2xl font-display text-white mb-2 text-shadow-md">{t.spaces.training.title}</h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">{t.spaces.training.desc}</p>
               </div>
            </div>

            {/* 5. Collective Space - Medium Header */}
            <div className="md:col-span-3 lg:col-span-4 relative rounded-[2.5rem] overflow-hidden group shadow-2xl">
               <Image 
                src="/assets/externalSpace.jpg" 
                alt={t.spaces.collective.title} 
                fill 
                className="object-cover transition-all duration-700 group-hover:scale-110 filter contrast-[1.1] saturate-[1.1]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-teal/95 via-teal/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none" />
               <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-4">
                     <Plus size={20} />
                  </div>
                  <h3 className="text-2xl font-display text-white mb-2 text-shadow-md">{t.spaces.collective.title}</h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">{t.spaces.collective.desc}</p>
               </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
             <a href="#contact" className="inline-flex items-center gap-4 text-navy font-bold hover:text-gold transition-colors group">
                <span className="text-lg underline underline-offset-8 decoration-gold/30 group-hover:decoration-gold transition-all">{t.spaces.more}</span>
                <div className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all">
                   <ChevronRight size={20} className="rtl:rotate-180" />
                </div>
             </a>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section id="avantages" className="w-full bg-white py-16 lg:py-24 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-gray-100 space-y-16 lg:space-y-24">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-8">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/assets/Cooworking.jpeg" alt={t.advantages.row1.title} fill className="object-cover" unoptimized/>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
            <div>
              <h3 className="font-display text-4xl text-navy mb-6">{t.advantages.row1.title}</h3>
              <div className="w-12 h-1 bg-gold mb-6 rounded-full" />
              <p className="text-xl text-navy/80 font-light mb-8">{t.advantages.row1.desc}</p>
              <ul className="space-y-4">
                {t.advantages.row1.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-lg text-gray-700">
                    <CheckCircle className="text-teal flex-shrink-0" size={24} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-16 lg:pt-24 pb-8">
            <div className="order-2 lg:order-1">
              <h3 className="font-display text-4xl text-navy mb-6">{t.advantages.row2.title}</h3>
              <div className="w-12 h-1 bg-gold mb-6 rounded-full" />
              <p className="text-xl text-navy/80 font-light mb-8">{t.advantages.row2.desc}</p>
              <ul className="space-y-4">
                {t.advantages.row2.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-lg text-gray-700">
                    <CheckCircle className="text-teal flex-shrink-0" size={24} /> {item}
                  </li>
                ))}
              </ul>
            </div>
  <div className="order-1 lg:order-2 w-fit rounded-3xl overflow-hidden shadow-2xl group">
  <Image 
    src="/assets/bureaujdid.jpeg" 
    alt={t.advantages.row2.title} 
    width={0}
    height={0}
    sizes="(max-width: 120rem) 120rem, 120rem"
    className="w-full h-auto max-h-[420px] object-contain transition-all duration-700 group-hover:scale-105 filter contrast-[1.1] brightness-[1.05] saturate-[1.1]" 
    quality={100}
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-50" />
</div>
          </div>
        </div>
      </section>

      {/* 6.5. Coffee Section */}
      <section className="w-full bg-cream py-16 lg:py-24 relative overflow-hidden reveal">
        <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] rounded-full bg-navy/5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal shadow-md mb-8">
                    <Coffee size={32} />
                 </div>
                 <h2 className="font-display text-4xl sm:text-5xl text-navy mb-6">{t.coffee.title}</h2>
                 <div className="w-12 h-1 bg-gold mb-10 rounded-full" />
                 <p className="text-xl text-navy/80 font-light mb-8 leading-relaxed">
                   {t.coffee.desc}
                 </p>
                 
                 <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="bg-white/50 p-6 rounded-2xl border border-white/80">
                       <h4 className="font-bold text-navy mb-2 text-lg">{t.coffee.card_coffee.title}</h4>
                       <p className="text-gray-600 text-sm italic">{t.coffee.card_coffee.desc}</p>
                    </div>
                    <div className="bg-white/50 p-6 rounded-2xl border border-white/80">
                       <h4 className="font-bold text-navy mb-2 text-lg">{t.coffee.card_chill.title}</h4>
                       <p className="text-gray-600 text-sm italic">{t.coffee.card_chill.desc}</p>
                    </div>
                 </div>

                 <a href="https://www.instagram.com/reel/DVw0UirjD9E/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-teal hover:bg-teal/90 text-white px-8 py-4 rounded-full font-bold transition shadow-lg text-center">
                    {t.coffee.cta}
                 </a>
              </div>

              <div className="relative aspect-[9/16] w-full max-w-[450px] max-h-[750px] rounded-[2.5rem] overflow-hidden shadow-2xl group mx-auto lg:ml-auto">
                 <Image 
                    src="/assets/coffee-corner.jpg" 
                    alt={t.coffee.title} 
                    fill 
                    className="object-cover transition-all duration-700 group-hover:scale-105 filter contrast-[1.08] brightness-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={100}
                    priority
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)] pointer-events-none" />
                 <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-navy font-bold text-sm tracking-wide uppercase">{t.coffee.badge}</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section id="menu" className="w-full bg-white py-16 lg:py-32 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <span className="text-teal font-bold tracking-[0.3em] uppercase text-xs mb-4 block">{t.menu.badge}</span>
            <h2 className="font-display text-4xl sm:text-6xl text-navy mb-8">{t.menu.title}</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-8 rounded-full" />
            <p className="text-xl text-navy/60 leading-relaxed font-light">
              {t.menu.desc}
            </p>
          </div>

          {/* Category: Hot Drinks */}
          <div className="mb-16 lg:mb-28">
            <div className="flex items-center gap-4 mb-8 lg:mb-10 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy/80 rounded-2xl flex items-center justify-center text-gold shadow-xl">
                <Coffee size={28} />
              </div>
              <h3 className="font-display text-4xl text-navy font-bold">{t.menu.cat_hot}</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
              {[
                { name: "Americano", price: "2.500 / 3.000", desc: "Espresso allongé à l'eau chaude" },
                { name: "Cappuccino", price: "3.000 / 3.500", bestseller: true, desc: "Espresso, lait chaud et mousse de lait" },
                { name: "Cappuccino Plus", price: "3.500 / 4.000", desc: "Version généreuse du cappuccino" },
                { name: "Espresso", price: "2.200 / 2.700", desc: "Café court et intense" },
                { name: "Café Crème", price: "2.800 / 3.300", desc: "Double espresso et crème de lait" },
                { name: "Café au Chocolat", price: "3.000 / 3.500", desc: "L'alliance parfaite café et cacao" },
                { name: "Latte Macchiato", price: "3.500 / 4.000", desc: "Lait chaud délicatement taché par l'espresso" },
                { name: "Double Espresso", price: "3.000 / 3.500", desc: "Pour un boost d'énergie maximal" },
                { name: "Chocolat Chaud (Lait)", price: "3.500 / 4.000", desc: "Onctueux et réconfortant" },
                { name: "Chocolat Chaud (Sans Lait)", price: "3.300 / 3.800", desc: "Le goût pur du cacao" },
                { name: "Golden Coffee", price: "2.200", desc: "Spécialité maison" },
                { name: "Thé Kyufi", price: "1.800", desc: "Infusion de thé traditionnelle" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group p-5 -mx-5 rounded-3xl transition-all duration-300 hover:bg-cream/40 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-navy group-hover:text-teal transition-colors flex items-center gap-2">
                        {item.name}
                      </span>
                      {item.bestseller && (
                        <span className="text-[10px] bg-gradient-to-r from-gold to-yellow-500 text-white font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                          {t.menu.bestseller}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-navy/40 font-medium">{item.desc}</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 group-hover:border-teal/20 group-hover:shadow-md transition-all">
                    <span className="text-lg font-bold text-teal whitespace-nowrap">{item.price} <span className="text-xs uppercase opacity-70">{t.currency}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12 lg:gap-y-16">
            {/* Category: Snacks */}
            <div>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold shadow-sm">
                  <Star size={28} />
                </div>
                <h3 className="font-display text-4xl text-navy font-bold">{t.menu.cat_snacks}</h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Croissant Snapy", price: "1.500", desc: "Viennoiserie pur beurre" },
                  { name: "Browniz", price: "1.200", desc: "Chocolat et éclats de noix" },
                  { name: "Tigato", price: "2.200", desc: "Gâteau maison gourmand" },
                  { name: "D'croc", price: "2.200", desc: "Snack croustillant salé" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group p-5 -mx-5 rounded-3xl transition-all duration-300 hover:bg-gold/5 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-bold text-navy group-hover:text-gold transition-colors">{item.name}</span>
                      <span className="text-sm text-navy/40 font-medium">{item.desc}</span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 group-hover:border-gold/20 group-hover:shadow-md transition-all">
                      <span className="text-lg font-bold text-gold whitespace-nowrap">{item.price} <span className="text-xs uppercase opacity-70">{t.currency}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Refreshments */}
            <div>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center text-teal shadow-sm">
                  <Navigation size={28} />
                </div>
                <h3 className="font-display text-4xl text-navy font-bold">{t.menu.cat_refresh}</h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Eau Safia 1.5L", price: "1.500", desc: "Bouteille grand format" },
                  { name: "Eau Safia 0.5L", price: "0.800", desc: "Bouteille individuelle" },
                  { name: "Jus Oh!", price: "1.800", desc: "Jus de fruits varié" },
                  { name: "Tropico", price: "1.200", desc: "Boisson rafraîchissante" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group p-5 -mx-5 rounded-3xl transition-all duration-300 hover:bg-teal/5 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-bold text-navy group-hover:text-teal transition-colors">{item.name}</span>
                      <span className="text-sm text-navy/40 font-medium">{item.desc}</span>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 group-hover:border-teal/20 group-hover:shadow-md transition-all">
                      <span className="text-lg font-bold text-teal whitespace-nowrap">{item.price} <span className="text-xs uppercase opacity-70">{t.currency}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Reel Section */}
      <section className="w-full bg-navy py-16 lg:py-32 text-center relative overflow-hidden reveal">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/10 rounded-full blur-[120px] -ml-48 -mb-48" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-display text-4xl sm:text-6xl text-white mb-12 lg:mb-20 tracking-tight">{t.reel.title[0]} <span className="text-gold italic">{t.reel.title[1]}</span></h2>
          
          <div className="relative w-full h-full lg:w-4/5 mx-auto rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] aspect-[14/16] sm:aspect-[21/9] bg-black group border border-white/5">
            <Image 
              src="/assets/Cooworking1.jpeg" 
              alt="Reel Community" 
              fill 
              quality={100}
              className="object-cover object-center opacity-70 transition-transform duration-[6s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 text-center">
               <h3 className="font-display text-4xl sm:text-5xl text-white mb-10 text-shadow-md font-light leading-tight">
                 {t.reel.subtitle[0]} <br /> {t.reel.subtitle[1]} <br className="sm:hidden" />
                 <span className="font-bold underline decoration-gold underline-offset-8">{t.reel.subtitle[2]}</span>
               </h3>
               <a 
                 href="https://instagram.com/smart.study.tn" 
                 target="_blank" 
                 rel="noreferrer"
                 className="inline-flex items-center gap-3 bg-white text-navy hover:bg-gold hover:text-white px-6 py-4 sm:px-10 sm:py-5 rounded-full font-bold transition-all shadow-2xl hover:-translate-y-1 text-sm sm:text-base whitespace-nowrap"
               >
                 <Instagram size={22} className="sm:w-7 sm:h-7" /> {t.reel.cta}
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5. Pricing Section */}
      <section id="tarifs" className="w-full bg-white py-16 lg:py-32 reveal">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
              <span className="text-teal font-bold tracking-[0.2em] uppercase text-sm mb-4 block">{t.pricing.badge}</span>
              <h2 className="font-display text-4xl sm:text-6xl text-navy mb-8">{t.pricing.title}</h2>
              <div className="w-20 h-1 bg-gold mx-auto mb-8 rounded-full" />
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                 {t.pricing.desc[0]} <br />
                 {t.pricing.desc[1]}
              </p>
           </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {t.pricing.plans.map((plan: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`bg-cream/40 p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-4 transition-all duration-500 flex flex-col ${plan.highlight ? 'scale-105 border-4 border-gold bg-navy z-10' : 'border border-cream hover:border-gold'}`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 bg-gold text-navy font-bold text-xs py-2 px-8 uppercase rotate-45 transform translate-x-10 translate-y-4 shadow-xl">
                      {plan.oldPrice ? t.pricing.offer : t.pricing.popular}
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className={`font-display text-3xl mb-2 ${plan.highlight ? 'text-white' : 'text-navy font-light'} ${t.rtl ? 'text-xl' : ''}`}>{plan.name}</h3>
                    <p className={`text-xs ${plan.highlight ? 'text-white/50 italic' : 'text-gray-500'}`}>{plan.sub}</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    {plan.oldPrice && (
                      <span className={`text-lg line-through opacity-50 mr-2 ${plan.highlight ? 'text-white' : 'text-navy'}`}>
                        {plan.oldPrice}{t.currency}
                      </span>
                    )}
                    <span className={`text-5xl font-bold font-display ${plan.highlight ? 'text-gold' : 'text-navy'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xl font-bold ${plan.highlight ? 'text-gold' : 'text-navy'}`}>{t.currency}</span>
                  </div>
                  <div className="mb-8">
                    <span className={`text-sm ${plan.highlight ? 'text-white/50' : 'text-gray-500'}`}>
                      {plan.unit === 'hour' ? t.pricing.unit_hour : plan.unit === 'day' ? t.pricing.unit_day : plan.unit === 'week' ? t.pricing.unit_week : t.pricing.unit_month}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className={`flex items-center gap-3 ${plan.highlight ? 'text-white/90' : 'text-gray-700'}`}>
                        <CheckCircle size={18} className={plan.highlight ? 'text-gold' : 'text-teal flex-shrink-0'} /> <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`w-full py-4 rounded-2xl font-bold transition-all text-center text-sm ${plan.highlight ? 'bg-gold text-navy hover:bg-white shadow-xl' : 'border-2 border-navy text-navy hover:bg-navy hover:text-white'}`}>
                    {plan.highlight ? t.pricing.cta_featured : t.pricing.cta_plan}
                  </a>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* 8. Testimonials - Real Google Reviews Slider */}
      <section id="temoignages" className="w-full bg-white py-16 lg:py-32 reveal overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-2 mb-6 text-navy/40 font-bold uppercase tracking-[0.3em] text-[10px]">
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" width={60} height={20} className="opacity-70" />
              <span>{t.testimonials.badge}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-navy mb-6 leading-tight">{t.testimonials.title}</h2>
            <div className="flex items-center justify-center gap-4 text-gold mb-8 h-10">
              {ratingData ? (
                <>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star 
                        key={i} 
                        size={24} 
                        fill={i <= Math.round(ratingData.rating) ? "currentColor" : "none"} 
                        className={i <= Math.round(ratingData.rating) ? "text-gold" : "text-gray-200"}
                      />
                    ))}
                  </div>
                  <span className="text-navy font-bold text-lg">{ratingData.rating.toFixed(1)} <span className="text-navy/40 font-normal">/ 5</span></span>
                </>
              ) : (
                <div className="h-6 w-32 bg-navy/5 animate-pulse rounded-full" />
              )}
            </div>
            <p className="text-xl text-navy/60 font-light max-w-xl mx-auto min-h-[3.5rem]">
              {ratingData ? (
                lang === 'fr' 
                  ? `Découvrez pourquoi Smart Study est l'espace de coworking le mieux noté de Monastir (${ratingData.total} avis).` 
                  : `A3ref 3lech Smart Study hiya a7san blasa fi Monastir (${ratingData.total} avis).`
              ) : (
                <span className="inline-block w-4/5 h-4 bg-navy/5 animate-pulse rounded-full mt-2" />
              )}
            </p>
          </div>

          <div className="relative group/slider px-4 max-w-[1400px] mx-auto">
            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-10 pointer-events-none px-2 sm:px-0">
              <button 
                onClick={() => scrollSlider('left')}
                className={`w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-gray-100 flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-all pointer-events-auto -translate-x-4 md:-translate-x-6 hidden sm:flex ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scrollSlider('right')}
                className={`w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-gray-100 flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-all pointer-events-auto translate-x-4 md:translate-x-6 hidden sm:flex ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div 
              ref={sliderRef}
              onScroll={checkScroll}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 transition-all scroll-px-4"
            >
              {reviewsLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="min-w-[320px] sm:min-w-[400px] snap-center">
                    <div className="bg-cream/20 p-10 rounded-[3rem] border border-cream/30 h-full flex flex-col justify-between animate-pulse">
                      <div>
                        <div className="flex justify-between items-start mb-8">
                          <div className="flex gap-1 text-gold/20">
                            {[1, 2, 3, 4, 5].map((j) => (
                              <Star key={j} size={16} fill="currentColor" />
                            ))}
                          </div>
                          <div className="w-10 h-3 bg-navy/5 rounded" />
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 bg-navy/5 rounded w-full" />
                          <div className="h-4 bg-navy/5 rounded w-5/6" />
                          <div className="h-4 bg-navy/5 rounded w-4/6" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 border-t border-navy/5 pt-8">
                        <div className="w-14 h-14 rounded-2xl bg-navy/5" />
                        <div className="space-y-2">
                          <div className="h-4 bg-navy/5 rounded w-24" />
                          <div className="h-2 bg-navy/5 rounded w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                dynamicReviews.map((rev, idx) => (
                  <div key={idx} className="min-w-[320px] sm:min-w-[420px] snap-center py-10">
                    <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[3.5rem] border border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] h-full flex flex-col justify-between transition-all duration-500 hover:shadow-[0_40px_100px_-20px_rgba(255,190,0,0.15)] hover:-translate-y-3 hover:border-gold/30 group relative overflow-hidden">
                      {/* Decorative Background Quote Icon */}
                      <div className="absolute top-8 right-8 text-gold/5 pointer-events-none group-hover:text-gold/10 transition-colors">
                        <Quote size={120} />
                      </div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={18} 
                                fill={star <= rev.rating ? "currentColor" : "none"} 
                                className={star <= rev.rating ? "text-amber-400" : "text-gray-200"}
                              />
                            ))}
                          </div>
                          <div className="bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-gray-100 flex items-center gap-2 shadow-sm">
                             <img 
                                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                                alt="Google" 
                                width={36} 
                                height={12} 
                                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" 
                             />
                          </div>
                        </div>
                        <div className="relative mb-12">
                          <span className="absolute -top-6 -left-2 text-6xl text-gold/20 font-serif leading-none">&ldquo;</span>
                          <p className="text-navy/90 text-xl leading-relaxed italic font-display font-light line-clamp-4 relative z-10 pl-4">
                            {rev.text}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-5 border-t border-gray-100 pt-8 relative z-10">
                        <div className="relative">
                          {rev.photo ? (
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                              <img src={rev.photo} alt={rev.name} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy to-navy/80 text-gold flex items-center justify-center font-display text-2xl font-bold border-4 border-white shadow-xl">
                              {rev.name.charAt(0)}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-sm" />
                        </div>
                        <div>
                          <h4 className="font-bold text-navy text-lg truncate max-w-[180px]">{rev.name}</h4>
                          <div className="flex items-center gap-1.5 text-teal text-[11px] font-bold uppercase tracking-widest">
                            <CheckCircle size={12} /> {rev.role || "Verified Local Guide"}
                          </div>
                          <p className="text-navy/40 text-[10px] mt-1 font-medium">{rev.date} • Monastir</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

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
                  <h4 className="font-display text-2xl text-navy mb-2">{t.testimonials.cta_qr_title}</h4>
                  <p className="text-navy/60 text-sm font-medium mb-6" dangerouslySetInnerHTML={{ __html: t.testimonials.cta_qr_desc.replace('QR Code', 'QR Code <br />') }} />
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

              <div className="lg:col-span-2 text-left rtl:text-right">
                 <h3 className="font-display text-4xl text-navy mb-6">{t.location.title}</h3>
                 <div className="w-12 h-1 bg-gold mb-10 rounded-full" />
                 
                 <div className="flex gap-4 mb-8">
                    <MapPin className="text-gold flex-shrink-0" size={32} />
                    <div>
                      <h4 className="font-bold text-navy text-xl mb-1">{t.location.card_addr}</h4>
                      <p className="text-gray-600">{t.location.card_addr_desc[0]}<br/>{t.location.card_addr_desc[1]}</p>
                    </div>
                 </div>

                 <div className="flex gap-4 mb-10">
                    <Clock className="text-gold flex-shrink-0" size={32} />
                    <div>
                      <h4 className="font-bold text-navy text-xl mb-1">{t.location.card_hours}</h4>
                      <p className="text-teal font-semibold">{t.location.card_hours_desc}</p>
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
               <div className="lg:w-1/2 rtl:text-right text-left">
                  <h2 className="font-display text-4xl sm:text-6xl text-white mb-6 leading-tight font-bold">{t.contact.title[0]} <br /> {t.contact.title[1]} <span className="text-gold">{t.contact.title[2]}</span></h2>
                  <p className="text-white/80 text-xl font-light mb-10 leading-relaxed">
                    {t.contact.desc[0]} <br />
                    {t.contact.desc[1]}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 rtl:flex-row-reverse rtl:justify-end">
                    <a href="https://wa.me/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-gold hover:bg-yellow-500 text-navy px-10 py-5 rounded-2xl font-bold transition shadow-xl text-lg hover:-translate-y-1 w-full sm:w-auto">
                       <WhatsappIcon size={28} /> WhatsApp
                    </a>
                    <a href="https://instagram.com/smart.study.tn" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-10 py-5 rounded-2xl font-bold transition shadow-lg text-lg hover:-translate-y-1 w-full sm:w-auto">
                       <Instagram size={28} /> Instagram
                    </a>
                  </div>
               </div>

               <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full rtl:text-right text-left">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group pt-10">
                    <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-navy mb-6 group-hover:scale-110 transition-transform">
                      <WhatsappIcon size={32} />
                    </div>
                    <h4 className="text-white font-bold text-xl mb-2">{t.contact.card_whatsapp.title}</h4>
                    <p className="text-white/60 text-sm italic">{t.contact.card_whatsapp.desc}</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group pt-10">
                    <div className="w-14 h-14 bg-teal rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      <MapPin size={32} />
                    </div>
                    <h4 className="text-white font-bold text-xl mb-2">{t.contact.card_visit.title}</h4>
                    <p className="text-white/60 text-sm italic">{t.contact.card_visit.desc}</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group sm:col-span-2 text-center rtl:text-right">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start rtl:sm:items-start gap-6">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform flex-shrink-0">
                        <Star size={32} fill="currentColor" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xl mb-1 sm:mt-1">{t.contact.card_gift.title}</h4>
                        <p className="text-white/60 text-sm">{t.contact.card_gift.desc}</p>
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
              
              <div className="lg:col-span-2 rtl:text-right">
                 <a href="#" className="flex items-center rtl:flex-row-reverse rtl:justify-end gap-2 font-display text-2xl font-semibold text-white mb-6 w-fit group">
                    <div className="w-10 h-10 flex items-center justify-center text-navy group-hover:scale-110 transition-transform">
                      <Image src="/assets/logosmart1.png" alt="Logo" width={40} height={40} className="object-contain" unoptimized />
                    </div>
                    Smart Study
                 </a>
                 <p className="text-white/70 leading-relaxed pr-8 rtl:pr-0 rtl:pl-8">
                    {t.footer.about}
                 </p>
              </div>

              <div className="rtl:text-right">
                 <h4 className="font-bold text-lg mb-6 tracking-wide">{t.footer.nav_title}</h4>
                 <ul className="space-y-4 text-white/70">
                    <li><a href="#accueil" className="hover:text-gold transition-colors">{t.nav.services}</a></li>
                    <li><a href="#espaces" className="hover:text-gold transition-colors">{t.nav.spaces}</a></li>
                    <li><a href="#avantages" className="hover:text-gold transition-colors">{t.nav.menu}</a></li>
                 </ul>
              </div>

              <div className="rtl:text-right">
                 <h4 className="font-bold text-lg mb-6 tracking-wide">{t.footer.info_title}</h4>
                 <ul className="space-y-4 text-white/70">
                    <li><a href="#tarifs" className="hover:text-gold transition-colors">{t.nav.pricing}</a></li>
                    <li><a href="#temoignages" className="hover:text-gold transition-colors">{t.testimonials.badge}</a></li>
                    <li><a href="#contact" className="hover:text-gold transition-colors">{t.nav.contact}</a></li>
                 </ul>
              </div>

              <div className="rtl:text-right">
                 <h4 className="font-bold text-lg mb-6 tracking-wide">{t.footer.social_title}</h4>
                 <ul className="space-y-4 text-white/70">
                    <li className="flex items-center gap-3 rtl:flex-row-reverse rtl:justify-end">
                       <Instagram size={20} className="text-gold" />
                       <a href="https://instagram.com/smart.study.tn" target="_blank" rel="noreferrer" className="hover:text-white transition">@smart.study.tn</a>
                    </li>
                    <li className="flex items-center gap-3 space-y-0 rtl:flex-row-reverse rtl:justify-end">
                       <MapPin size={20} className="text-gold flex-shrink-0" />
                       <span>{t.location.card_addr_desc[1]}</span>
                    </li>
                 </ul>
              </div>

           </div>
           
           <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm font-medium">
              <p>&copy; 2026 {t.footer.rights}</p>
              <p className="flex items-center rtl:flex-row-reverse gap-1">{t.footer.passion} <Star size={14} fill="currentColor" className="text-gold"/></p>
           </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 rtl:left-8 rtl:right-auto bg-gold text-navy w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(255,190,0,0.4)] z-[100] transition-all duration-500 hover:-translate-y-2 hover:bg-white focus:outline-none ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={28} strokeWidth={2.5} />
      </button>
    </main>
  );
}
