/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  ShoppingBag, 
  MapPin, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  Instagram, 
  MessageCircle, 
  Navigation, 
  Map as MapIcon,
  Star,
  Music,
  Store,
  UtensilsCrossed,
  Plus,
  Heart,
  Cake,
  IceCream,
  Smartphone,
  Smartphone as AndroidIcon,
  Apple as AppleIcon
} from 'lucide-react';

type Screen = 'home' | 'menu' | 'vibe' | 'contact';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeScreen]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-pink-50/80 backdrop-blur-md border-b border-pink-100 shadow-pink">
        <div className="flex justify-between items-center px-6 h-16 max-w-7xl mx-auto">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveScreen('home')}
          >
            <Coffee className="text-primary w-6 h-6" />
            <h1 className="font-black text-2xl text-primary italic tracking-tight">Candy Coffee</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <NavButton 
              active={activeScreen === 'menu'} 
              onClick={() => setActiveScreen('menu')}
              label="Menu" 
            />
            <NavButton 
              active={activeScreen === 'vibe'} 
              onClick={() => setActiveScreen('vibe')}
              label="A Nossa Vibe" 
            />
            <NavButton 
              active={activeScreen === 'contact'} 
              onClick={() => setActiveScreen('contact')}
              label="Contato" 
            />
          </div>

          <button className="text-primary bouncy-spring relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-20 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-6"
          >
            {activeScreen === 'home' && <HomeScreen onNavigate={setActiveScreen} />}
            {activeScreen === 'menu' && <MenuScreen />}
            {activeScreen === 'vibe' && <VibeScreen />}
            {activeScreen === 'contact' && <ContactScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 w-full flex justify-center pb-8 z-40 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-lg w-[90%] max-w-md rounded-full shadow-pink-lg flex justify-around items-center px-4 py-2 pointer-events-auto border border-pink-50">
          <MobileNavButton 
            active={activeScreen === 'menu'} 
            onClick={() => setActiveScreen('menu')}
            icon={<UtensilsCrossed className="w-5 h-5" />}
            label="Menu"
          />
          <MobileNavButton 
            active={activeScreen === 'home'} 
            onClick={() => setActiveScreen('home')}
            icon={<Store className="w-5 h-5" />}
            label="Home"
            primary
          />
          <MobileNavButton 
            active={activeScreen === 'contact'} 
            onClick={() => setActiveScreen('contact')}
            icon={<MessageCircle className="w-5 h-5" />}
            label="Contato"
          />
        </div>
      </nav>
    </div>
  );
}

// --- Components ---

function NavButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`font-bold tracking-tight transition-all duration-300 bouncy-spring ${
        active ? 'text-primary border-b-4 border-primary rounded-full px-2 py-1' : 'text-on-surface-variant hover:text-primary'
      }`}
    >
      {label}
    </button>
  );
}

function MobileNavButton({ active, onClick, icon, label, primary }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, primary?: boolean }) {
  if (primary) {
    return (
      <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all bouncy-spring ${
          active ? 'bg-primary text-white shadow-pink' : 'bg-pink-50 text-primary'
        }`}
      >
        {icon}
        <span className="font-medium text-xs">{label}</span>
      </button>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center py-2 px-4 rounded-full transition-colors bouncy-spring ${
        active ? 'text-primary bg-pink-50' : 'text-zinc-400'
      }`}
    >
      {icon}
      <span className="font-medium text-xs mt-1">{label}</span>
    </button>
  );
}

// --- Screens ---

function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl bg-primary-fixed shadow-pink-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 lg:p-16 z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-white font-bold text-sm mb-6 shadow-pink">NOVIDADE</span>
            <h2 className="text-5xl lg:text-7xl font-black text-on-surface leading-none mb-6">Energia Doce para o seu Dia</h2>
            <p className="text-xl text-on-surface-variant mb-10 max-w-md">Experimente a fusão perfeita entre a doçura das cores e o aroma intenso do café artesanal.</p>
            <button 
              onClick={() => onNavigate('menu')}
              className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg shadow-pink hover:scale-105 transition-transform duration-300 flex items-center gap-3 bouncy-spring"
            >
              Ver Cardápio
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="relative h-96 lg:h-[600px] w-full">
            <img 
              alt="Candy Coffee Special" 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZnUP7Q34rMcKX_HkatgWQwwdecYZQ9LES3ZBMOlwvU2fGGpRUL8y2Tr79tRdn2i9mq9dKnHYHaMG9pdOOon0Dic-XOlUSho8AzHUEECO98aIHw3JmzePzg-YibQYS4Fq8qx3k67eQ3mYuqLdsXlXWyvjYoYn7eOGEiwAyGkZiPevrgb6p2TtfD-4IE8b-dYqGTOmSmQYVHWQbidrlc41JILOnkjR9jxuakwfyLUnkahDE6kfiXcCl4VkpsVtESqw7RL39GYXkVzg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-fixed via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-black text-on-surface">Favoritos da Casa</h3>
          <button 
            onClick={() => onNavigate('menu')}
            className="text-secondary font-bold flex items-center gap-2 hover:underline"
          >
            Explorar tudo <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard 
            title="Iced Candy Latte"
            description="Café espresso, leite vaporizado e calda secreta de frutas vermelhas."
            price="18,90"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDiQWkyBI6D0C95xW8r07RCTtYrErj2M2rbRvikiX1G1aOpZHBk7zjWC0t90GCfZ9FV-3gcMn2mH24L0Y7h0xbr_xtWDYbyiH6duAtQgHuiluCgWm16tFBGanuuhlm6OOpDezO4i3yemrgCZJgnLf2T0SsDxoYpkyiZ0Zupv3f8GyLECC0JH1Xy6ESoWG4FqdjNT_ggllA7rKhhl5csfzEH_TP2dQM8e0X33UMMPkT2D_Qr0_CKoT-MNbsKh9_B9F8CsHGoeMI4L8U"
            badge="POPULAR"
          />
          <ProductCard 
            title="Dreamy Donuts"
            description="Massa fofinha artesanal com coberturas vibrantes e recheios surpreendentes."
            price="12,50"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCxZ6cYgW-xouGAVk-neXRJmRpA6LBMpWN3yT2yPt5l9-T0iRBOM3FKXZduvAQSwsR99A-XBJN-syaFlH2W0CTU7Xjdtx55avVLxY_Xob68_VQAEhRH19-V3kevwHFGm0q2VvrW5gnoEwvbbOZERQpnszNlJ-ngA5re30H665yOUIlswD4kCewxPogEbysyFTseND1fM734FdXK5tyVXdHLSiO5AknNhem11-sLFWLFbH_v6lcRY-VJrX5NhCpCW4r0acIycfqwYAs"
            color="secondary"
          />
          <div className="grid grid-cols-1 gap-4">
            <FeatureSmallCard 
              icon={<Star className="w-8 h-8" />}
              title="Grãos Especiais"
              desc="Torra média selecionada para paladares doces."
              color="bg-secondary-fixed"
              textColor="text-secondary"
            />
            <FeatureSmallCard 
              icon={<ArrowRight className="w-8 h-8" />}
              title="Sustentável"
              desc="Embalagens biodegradáveis e produção consciente."
              color="bg-tertiary-fixed"
              textColor="text-tertiary"
            />
          </div>
        </div>
      </section>

      {/* App Promo */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-xl shadow-pink-lg border-2 border-dashed border-pink-200">
        <div className="order-2 md:order-1">
          <h3 className="text-4xl font-black text-primary mb-4 leading-tight">Baixe o App Candy Club</h3>
          <p className="text-on-surface-variant text-lg mb-8">Acumule "Sprinkles" em cada compra e troque por bebidas gratuitas. Sua primeira doçura é por nossa conta!</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-zinc-900 text-white px-6 py-3 rounded-full flex items-center gap-2 bouncy-spring">
              <AppleIcon className="w-5 h-5" />
              App Store
            </button>
            <button className="bg-zinc-900 text-white px-6 py-3 rounded-full flex items-center gap-2 bouncy-spring">
              <AndroidIcon className="w-5 h-5" />
              Google Play
            </button>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-pink-100 rounded-full blur-3xl opacity-60"></div>
            <img 
              alt="Mobile App" 
              className="relative z-10 w-64 md:w-80 rounded-3xl shadow-2xl rotate-3" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHOtNAFESc6C4Q7G1JyHOlJCa53VLcNxkvblrhe7VV7hZ7ARdlXZJHRoxkWLGnsJOoRUcYuQ_se5ZbPuTGBf9lwPAb-yHEPpOOz6r5jP3ihsq7wjCElejd8vXjHOBd4v2JScD5TdXlhqkt4HfK4pRZroyibfmGxxuahFwErny9_Tfq-5kkxx1OpR22hyO3BJO9fMsQ5kvtsKwyx_srfBQL2oLEW-eCpobHlzP2IOfwtR399Z0V70ZutPj0D6wyoC6Mc7VCJ0kErF8"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function MenuScreen() {
  return (
    <div className="space-y-16">
      <header className="text-center mb-12">
        <h2 className="text-5xl font-black text-primary mb-4">Nosso Cardápio</h2>
        <p className="text-on-surface-variant max-w-xl mx-auto">Uma seleção artesanal de cafés, doces e comidinhas para alegrar o seu dia.</p>
      </header>

      <section>
        <CategoryHeader icon={<Coffee />} title="Cafés Quentes" color="bg-primary-fixed" textColor="text-primary" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <MenuItem 
            title="Capuccino Nuvem"
            desc="Espuma ultra densa com toque de canela e cacau belga."
            price="14,00"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBdDqA3RB4S_YOOq3OWJjWrR4LxkPFFXZzKUQdBWr6J9qyrpv_bdV5nkmkM_gnkT-gkYNv_QYMQh7OxrIdz9O_efN1GDmDYSoV_qm229zyLTDUwdO1zG_rro5PucBYrR45M3Xs9wA1k1yqpMWsjPkIHZxhwSLA09lxdyvVkcIO64BLUXh49NkE7VC424XUd7Ct2rQPBxh82j2KwrIXVj38gDhG2OghWJWgD3uFww6QOSPYpUzoxDYkzupqXCIz1emrg4zDM6_eIt1o"
          />
          <MenuItem 
            title="Latte de Lavanda"
            desc="Café suave com xarope artesanal de lavanda e leite vaporizado."
            price="16,50"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCFa0EZv-MA18ulkAGeNYarZ0TrNZTKNt7vvhOshqTgJyzFhGw8i-Yvubj_5W5F-du_BUICoLb5_6JaaIq_mADiltyOcVE2tqwPkmjgQ6gUtHglkWBSv2gbVjMyMzTmzYcQQtvW6s3Atk1bAB8rkKVIqDcrCJxQ_zjoF5bX9GwqSlGw41Fmt4xNZDK7VxcfwxpOM-JlAbOc1aNJqb4tOP8rZjnkuLG0c103nra7Mn1DoMPspWzhprmcL24yowkUGQ5dLeUW8Yf4JDw"
          />
          <MenuItem 
            title="Espresso Candy"
            desc="Grãos selecionados com notas naturais de caramelo e frutas vermelhas."
            price="8,00"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDgeaB40Dn75e5DdlxUwtlRp_OnB4aKeJxrYCKZLDGPdNb6N5_DYVzHjQrAYkFDdERQLxXCWO92V7DzNvSWB2K89o94q8sQXfHczT2aEh7YyGUUrNj263PMUMnHOOcIrw_0uNAicCXZhP_F1nkx7vbjOJCpxOyyKmr_GFxqEFIgbrEiwc9_77sJw5pr0j3JLVXn_PSvGBPn4f4Rr3NEtxx305NP7_OxCrkIKs0RcToPsNGECmToaltatdlMVG8rwIEU8KpN-qIHLuA"
          />
        </div>
      </section>

      <section>
        <CategoryHeader icon={<Music />} title="Gelaaados" color="bg-tertiary-fixed" textColor="text-tertiary" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <MenuItem 
            title="Caramel Frappé"
            desc="Batido com gelo, muito caramelo e chantilly caseiro."
            price="21,00"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDdKKijnirNcNbfgwMiXpF6rEpu8g0R_GHAcTBPuuHu5QqzTdQrvtbHFFDZmOdN80ssolgmu7rVnErKtz8ad56s3niKDTkD43MpEK35Ftr3_SoVyrdTZ1AcaV0kz-C2UsNp74KJPlabGKe5MxhBEnIvGiP71EKJMu1Lbc-WRSFQj-K4KzEtSV-Mvya8SyTbEpOAMSULSo3wwaJBePISqgFJn_TIdEH8LVGkUUrtXmIRNXtu9ZqjvUYc-09o8R0-bSW3Sjy9W_Ma1To"
          />
          <MenuItem 
            title="Cold Brew Citric"
            desc="Extração a frio por 12h, finalizado com rodelas de limão siciliano."
            price="15,90"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDsnzaaGIFkhIXGt__QJvZGeGObV5ubz_jKy7nLc_p9mFuBvKZ1EbqwWgfLenIoGEuwLw8pO-6KTe1jvZNyMVmhk-LP2Zsq89okqCLlKbgDignQQvjhc-W2qW4KuAbR3P1-juK_3XE5UMQ95RVBpgIi3zXK3Ak9rYqGLd26qyeFCQZi_7tKGhhJ10jR3eZ032G_hGNM7H_PFBIcEVGGJBfrF7K_9Exd-_f2Wynw5kedaFSuyUG8rtMy2ze3PW0tx1cVvUK3OM0I9hc"
          />
        </div>
      </section>
    </div>
  );
}

function VibeScreen() {
  return (
    <div className="space-y-20">
      <section className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-fixed text-primary rounded-full text-sm font-bold mb-6 shadow-pink">
          <Star className="w-4 h-4 fill-primary" />
          BORN TO BE PINK
          <Star className="w-4 h-4 fill-primary" />
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-6 leading-[0.9]">
          MAIS QUE CAFÉ,<br/><span className="text-primary italic">UMA EXPERIÊNCIA</span>.
        </h2>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto font-medium">
          Um refúgio neon para quem ama cafeína, estética impecável e playlists que fazem o dia valer a pena.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-white shadow-pink-lg">
          <img 
            className="w-full h-[500px] object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWrI0r0f5EAsfXK2rZ_sJ60KU32wgPnHjkdvQWWksjfG6JyVEjlwXIYriSD2jrKPPyMASsHCehe0yboLO4iZlObH5a6qRWfR_I2TymXPOsYZFcmw1MeC0z5k0wF5qkVAAE-aTUjjkd5bjrCspEj5CArRNysd2i2JRRuvqI0WAR2pUeCoYceGhSCsr5RRy5xyT3U37eV_TgVput2REJSMT0CtXx87VXF-q7VhloUiTDSMy2Oz8oj9A6D2uMosl66C2Hued0coCdZ8g"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
            <h3 className="text-3xl font-bold text-white mb-2">Ambiente Instagramável</h3>
            <p className="text-pink-100 font-medium max-w-md">Cada canto foi pensado para o seu feed. Do letreiro neon às mesas de mármore rosa.</p>
          </div>
          <div className="absolute top-6 right-6">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
              <Heart className="w-6 h-6 fill-white" />
            </div>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="h-full p-8 bg-secondary-container rounded-xl shadow-purple flex flex-col justify-center relative overflow-hidden group">
            <Music className="text-secondary w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold text-secondary mb-2">Grãos Selecionados</h3>
            <p className="text-on-surface-variant font-medium">Curadoria de pequenos produtores com notas de caramelo e frutas vermelhas.</p>
          </div>
          <div className="h-full group relative overflow-hidden rounded-xl bg-white shadow-blue">
            <img 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr5kdRYr_hUk9mqAy6JaOTy-jOArULBoVeoVpbX9-3oN7fi1wF2pxBG6ZNzYJfGwrN93mgq2Io0oopd0Em4RyZ4RtgtwE86VI84Hia-9bmlyehq3DCdEcCJ8JxLfJjDFIJbcPEK4eIYPHC0DXUIbqd4KaIM6KV3PA01JzoiNP8G2FdDnAemQb5F0WdPSXvT_KZhXenf9I_0qGLbKo3Z002-nI8p4dVi4PWab2bvoxkG1pOYzEVlNBHnftcBCEEuuPmgnVz2XfyfYg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactScreen() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">Onde a Doçura Acontece</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">Venha nos visitar e transforme seu dia com um café especial e nossos doces artesanais.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 h-[450px] relative rounded-xl overflow-hidden shadow-pink-lg bg-surface-container border-4 border-white">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnozgiVWsdf8Akk38NP3hrggmSyyrnM__d_COiKmPSFrSUFpD1fmiZnbKeJ76cY7fYp4pV5YRRM1aa9OE67j8_Td7-Ho5WJy5mHdRlGQ2baDe2n9gCXU3AZmv54s1rw92mlPYCcek3tfjDf46I0U-Dtg5LTlnROaFYRCuMJaafeeCivnPhe_XW02lf3-T7k-x9eNyKXtW-qm7x-fPCbndsX-bpFrqsgYvJKy4jAFMNJdyu6-S9wHS-nlusilee3iicNlFxTborl7c')" }}
          ></div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg max-w-[240px]">
              <div className="flex items-center gap-2 text-primary font-bold mb-1">
                <MapPin className="w-4 h-4 fill-primary" />
                <span>Chegue Mais Perto</span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">Estamos no coração do Bairro das Flores, prontos para te receber.</p>
            </div>
            <button className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-pink bouncy-spring">
              <Navigation className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-xl shadow-purple border border-pink-50 relative overflow-hidden group">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              ABERTO AGORA
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Nosso Endereço</h3>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
              Rua dos Confeiteiros, 123<br/>
              Vila Doce, São Paulo - SP<br/>
              CEP 01234-567
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-primary text-white py-3 rounded-full font-bold shadow-pink bouncy-spring flex items-center justify-center gap-2">
                <MapIcon className="w-4 h-4" />
                Google Maps
              </button>
              <button className="flex-1 bg-tertiary text-white py-3 rounded-full font-bold shadow-blue bouncy-spring flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" />
                Waze
              </button>
            </div>
          </div>

          <div className="bg-secondary-container p-8 rounded-xl shadow-purple border border-secondary-fixed">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-secondary w-6 h-6" />
              <h3 className="text-xl font-bold text-secondary">Horários</h3>
            </div>
            <div className="space-y-3">
              <TimeRow label="Segunda a Sexta" time="08:00 — 20:00" />
              <TimeRow label="Sábados" time="09:00 — 21:00" />
              <TimeRow label="Domingos" time="10:00 — 18:00" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-10 text-white text-center relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-4">Dúvidas sobre o menu ou reservas?</h3>
          <p className="mb-8 text-white/90 text-lg">Nossa equipe está pronta para tornar seu momento mais doce.</p>
          <button className="bg-white text-primary px-10 py-4 rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform duration-300 bouncy-spring">
            Fale com a Gente
          </button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <Cake className="w-32 h-32 absolute -top-10 -left-10" />
          <IceCream className="w-24 h-24 absolute -bottom-10 -right-10" />
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function ProductCard({ title, description, price, image, badge, color = 'primary' }: any) {
  const colorClass = color === 'primary' ? 'text-primary' : 'text-secondary';
  const shadowClass = color === 'primary' ? 'shadow-pink' : 'shadow-purple';
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-pink hover:scale-[1.02] transition-transform duration-300">
      <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
        <img alt={title} className="w-full h-full object-cover" src={image} referrerPolicy="no-referrer" />
        {badge && (
          <div className="absolute top-4 right-4 bg-tertiary-fixed text-tertiary px-3 py-1 rounded-full text-xs font-black">
            {badge}
          </div>
        )}
      </div>
      <h4 className="text-2xl font-bold mb-2">{title}</h4>
      <p className="text-on-surface-variant mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className={`${colorClass} text-2xl font-black`}>R$ {price}</span>
        <button className={`bg-pink-50 p-3 rounded-full ${colorClass} bouncy-spring`}>
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function FeatureSmallCard({ icon, title, desc, color, textColor }: any) {
  return (
    <div className={`${color} p-4 rounded-xl flex flex-col items-center text-center`}>
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
        <div className={textColor}>{icon}</div>
      </div>
      <h5 className={`font-bold ${textColor}`}>{title}</h5>
      <p className="text-sm text-on-surface-variant">{desc}</p>
    </div>
  );
}

function CategoryHeader({ icon, title, color, textColor }: any) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`h-12 w-12 rounded-full ${color} flex items-center justify-center ${textColor}`}>
        {icon}
      </div>
      <h2 className="text-3xl font-black text-on-surface tracking-tight">{title}</h2>
    </div>
  );
}

function MenuItem({ title, desc, price, image }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-pink hover:translate-y-[-4px] transition-all duration-300 flex flex-col items-center text-center">
      <img className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-pink-50 shadow-md" src={image} referrerPolicy="no-referrer" />
      <h4 className="text-xl font-bold text-on-surface">{title}</h4>
      <p className="text-on-surface-variant text-sm mt-2 flex-grow">{desc}</p>
      <span className="mt-4 px-6 py-2 bg-pink-50 text-primary font-black rounded-full">R$ {price}</span>
    </div>
  );
}

function TimeRow({ label, time }: { label: string, time: string }) {
  return (
    <div className="flex justify-between items-center pb-2 border-b border-secondary/10">
      <span className="font-medium text-on-surface-variant">{label}</span>
      <span className="text-secondary font-bold">{time}</span>
    </div>
  );
}
