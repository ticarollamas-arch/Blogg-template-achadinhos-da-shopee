import React, { useState, useEffect } from 'react';
import { TemplateConfig, Product } from '../types';
import { 
  Monitor, 
  Smartphone, 
  Search, 
  ShoppingBag, 
  Instagram, 
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShoppingCart
} from 'lucide-react';

interface LiveSimulatorProps {
  config: TemplateConfig;
  products: Product[];
}

export default function LiveSimulator({ config, products }: LiveSimulatorProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Dialog state for buy button click
  const [clickedProduct, setClickedProduct] = useState<Product | null>(null);

  // Filter out any empty banner images to prevent blank slides
  const activeBanners = config.carouselImages.filter(img => img && img.trim() !== '');

  // Auto slide effect (passing every 6 seconds to match the Blogger template exactly)
  useEffect(() => {
    if (config.showCarousel && activeBanners.length > 1) {
      const timer = setInterval(() => {
        setActiveSlide(prev => (prev + 1) % activeBanners.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [config.showCarousel, activeBanners.length]);

  // Filter products based on search and category
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (p: Product, e: React.MouseEvent) => {
    e.preventDefault();
    setClickedProduct(p);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden" id="simulator-root">
      {/* Device Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-[11px] font-mono text-slate-400 ml-2">SIMULADOR DO BLOGGER/BLOGSPOT</span>
        </div>

        {/* Device Switcher */}
        <div className="flex bg-slate-850 p-0.5 rounded-lg border border-slate-750">
          <button
            id="btn-device-desktop"
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
              device === 'desktop' 
                ? 'bg-orange-500 text-white' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button
            id="btn-device-mobile"
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
              device === 'mobile' 
                ? 'bg-orange-500 text-white' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>
      </div>

      {/* Simulator Viewport Area */}
      <div className="flex-grow bg-slate-900 p-4 flex justify-center items-start overflow-y-auto max-h-[calc(100vh-220px)]">
        <div 
          className={`bg-white text-slate-800 transition-all shadow-2xl duration-300 relative flex flex-col ${
            device === 'mobile' 
              ? 'w-[375px] rounded-[32px] border-[10px] border-slate-950 h-[680px] overflow-y-auto scrollbar-thin' 
              : 'w-full max-w-full rounded-lg min-h-[550px]'
          }`}
          style={{ backgroundColor: config.backgroundColor }}
        >
          {/* BLOGGER HEADER */}
          <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30">
            <div className={`mx-auto px-4 py-3.5 flex ${device === 'mobile' ? 'flex-col gap-3' : 'justify-between items-center'} gap-2`}>
              <div className={`${device === 'mobile' ? 'flex flex-col items-center text-center' : 'flex flex-col'}`}>
                <div className={`flex items-center gap-2 ${device === 'mobile' ? 'justify-center' : ''}`}>
                  <div className="flex items-center gap-1.5" style={{ color: config.primaryColor }}>
                    <svg className="flex-shrink-0" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <svg className="flex-shrink-0" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" x2="21" y1="6" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </div>
                  <h1 className="text-lg font-black uppercase tracking-tight" style={{ color: config.primaryColor }}>
                    {config.shopName || 'Achadinhos da Shopee'}
                  </h1>
                </div>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {config.shopDescription || 'Sua dose diária de descontos e produtos incríveis da Shopee Brasil!'}
                </p>
              </div>

              {/* Header Search Box */}
              <div className={`relative ${device === 'mobile' ? 'w-full' : 'w-64'}`}>
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="simulator-search-input"
                  type="text"
                  placeholder="Pesquisar produto..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8.5 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-orange-500 transition-all text-slate-800"
                />
              </div>

              {/* Social Channels */}
              <div className={`flex items-center gap-2 ${device === 'mobile' ? 'justify-center' : ''}`}>
                {config.whatsappNumber && (
                  <a 
                    href={`https://api.whatsapp.com/send?phone=${config.whatsappNumber}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-105 transition-all shadow-sm"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                )}
                {config.instagramUser && (
                  <a 
                    href={`https://instagram.com/${config.instagramUser}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center text-white hover:scale-105 transition-all shadow-sm"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* BANNER CAROUSEL SIMULATOR */}
          {config.showCarousel && activeBanners.length > 0 && (
            <div className={`relative overflow-hidden ${device === 'mobile' ? 'm-2 rounded-xl' : 'm-4 rounded-xl'} aspect-[3/1] w-auto shadow-sm`}>
              <div 
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${(activeSlide * 100) / activeBanners.length}%)`,
                  width: `${activeBanners.length * 100}%` 
                }}
              >
                {activeBanners.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="h-full bg-cover bg-no-repeat bg-center bg-transparent relative shrink-0"
                    style={{ 
                      backgroundImage: `url(${img})`,
                      width: `${100 / activeBanners.length}%`
                    }}
                  />
                ))}
              </div>

              {/* Carousel Buttons */}
              {activeBanners.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveSlide(prev => (prev - 1 + activeBanners.length) % activeBanners.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xs transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveSlide(prev => (prev + 1) % activeBanners.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xs transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {/* Indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {activeBanners.map((_, idx) => (
                      <span 
                        key={idx} 
                        onClick={() => setActiveSlide(idx)}
                        className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${activeSlide === idx ? 'bg-white w-3' : 'bg-white/40'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* SIMULATED ADSENSE BANNER */}
          {config.showAdSense && (
            <div className="mx-4 mt-2 p-3 bg-amber-50/80 border border-dashed border-amber-200 rounded-lg text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[60px] animate-fade-in shadow-2xs">
              <span className="absolute top-1 right-2 text-[8px] bg-amber-200/50 text-amber-800 font-extrabold px-1.5 py-0.25 rounded">Anúncio Google AdSense</span>
              <span className="text-[10px] font-mono font-bold text-amber-700 tracking-wider">PUB: {config.adSenseClientId || 'ca-pub-xxxxxxxx'}</span>
              <span className="text-[9px] text-slate-500 font-semibold mt-1">Slot ID: {config.adSenseTopSlot || 'xxxxxxxx'} (Banner Superior Automático)</span>
            </div>
          )}

          {/* CATEGORIES NAVIGATION */}
          {config.categories.length > 0 && (
            <div className="px-4 py-2 mt-2">
              <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                <button
                  id="simulator-cat-all"
                  onClick={() => setSelectedCategory('all')}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all shrink-0 ${
                    selectedCategory === 'all'
                      ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-orange-500'
                  }`}
                  style={selectedCategory === 'all' ? { backgroundColor: config.primaryColor, borderColor: config.primaryColor } : {}}
                >
                  #VerTudo
                </button>
                {config.categories.map((cat, idx) => (
                  <button
                    key={idx}
                    id={`simulator-cat-${idx}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-orange-500'
                    }`}
                    style={selectedCategory === cat ? { backgroundColor: config.primaryColor, borderColor: config.primaryColor } : {}}
                  >
                    #{cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRODUCTS LIST GRID */}
          <div className="p-4 flex-grow" id="products-sim-grid">
            <div 
              className={`grid gap-3 ${
                device === 'mobile' 
                  ? 'grid-cols-2' 
                  : config.gridColumns === 2 
                    ? 'grid-cols-2' 
                    : config.gridColumns === 3 
                      ? 'grid-cols-3' 
                      : 'grid-cols-4'
              }`}
            >
              {filteredProducts.map(p => (
                <div 
                  key={p.id}
                  className="bg-white border border-slate-100 flex flex-col relative group hover:shadow-md transition-all duration-350"
                  style={{ 
                    borderRadius: config.cardStyle === 'rounded' ? '12px' : config.cardStyle === 'square' ? '0px' : '6px',
                    boxShadow: config.cardStyle === 'flat' ? 'none' : '0 4px 10px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  {/* Floating Tag */}
                  {p.badge && (
                    <span className="absolute top-2 left-2 z-10 bg-[#EE4D2D] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                      {p.badge}
                    </span>
                  )}

                  {/* Product Thumbnail */}
                  <div className="aspect-square bg-white overflow-hidden relative" style={{ borderTopLeftRadius: config.cardStyle === 'rounded' ? '12px' : '0px', borderTopRightRadius: config.cardStyle === 'rounded' ? '12px' : '0px' }}>
                    <img 
                      src={p.imageUrl} 
                      alt={p.title} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-all duration-350 bg-white" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Product Specs */}
                  <div className="p-2.5 flex flex-col flex-grow">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{p.category}</span>
                    <h4 className="text-xs font-semibold text-slate-700 line-clamp-2 leading-tight h-8 mb-2">
                      {p.title}
                    </h4>

                    {/* Affiliate Button */}
                    <button
                      onClick={(e) => handleProductClick(p, e)}
                      className="w-full text-white text-[11px] font-extrabold py-2 px-1 rounded-md flex items-center justify-center gap-1 hover:brightness-105 transition-all shadow-xs mt-auto"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Ver o Link
                    </button>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-400 text-xs font-medium bg-white rounded-xl border border-dashed border-slate-200 m-2">
                  Nenhum produto correspondente encontrado na simulação.
                </div>
              )}
            </div>
          </div>

          {/* BLOGGER SIMULATOR FOOTER */}
          <footer className="bg-white border-t border-slate-100 p-4 text-center mt-6">
            <span className="text-sm font-extrabold block mb-2" style={{ color: config.primaryColor }}>
              {config.shopName}
            </span>
            
            {/* Footer Links (Sobre, Contato, etc.) */}
            <div className="flex flex-wrap justify-center gap-3 mb-3 text-[10px] uppercase font-bold text-slate-400">
              <a href={config.footerAboutUrl} target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">Sobre Nós</a>
              <span>•</span>
              <a href={config.footerContactUrl} target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">Contato</a>
              <span>•</span>
              <a href={config.footerPrivacyUrl} target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">Privacidade</a>
              <span>•</span>
              <a href={config.footerTermsUrl} target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">Termos</a>
            </div>

            <span className="text-[10px] text-slate-400 font-medium block">
              &copy; {new Date().getFullYear()} {config.shopName}
            </span>
            <span className="text-[9px] text-slate-400 block mt-1.5 opacity-80 leading-relaxed">
              {config.footerText}
            </span>
          </footer>
        </div>
      </div>

      {/* MODAL SIMULATOR FOR COMMISSION EXPLANATION */}
      {clickedProduct && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-50 animate-fade-in" id="buy-simulator-modal">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative border border-slate-100">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-white mx-auto mb-4 animate-bounce shadow-md"
              style={{ backgroundColor: config.primaryColor }}
            >
              <ShoppingBag className="w-7 h-7" />
            </div>

            <h3 className="text-base font-extrabold text-slate-800">Simulador do Fluxo de Artigo</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Você clicou em "Ver o Link" para o produto: <br />
              <strong className="text-slate-700 font-bold">"{clickedProduct.title}"</strong>
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 my-4 text-left space-y-2">
              <div className="flex gap-2 items-start">
                <span className="text-xs bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded shrink-0">Blogger Post URL</span>
                <span className="text-[10px] font-mono text-slate-600 break-all leading-relaxed">
                  https://seublog.blogspot.com/p/{clickedProduct.id || 'exemplo'}.html
                </span>
              </div>
              <div className="flex gap-1.5 items-center text-[10px] text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>O usuário lê o artigo e clica em comprar no botão interno do post!</span>
              </div>
            </div>

            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 text-[11px] text-orange-800 text-left leading-relaxed">
              💡 <strong>Como funciona o Artigo no Blogspot?</strong> 
              No grid principal, o visitante clica no card ou no botão <strong>Ver o Link</strong> e é redirecionado para a página do próprio artigo (Post) no seu Blogger. 
              Lá na página do artigo, ele verá o texto completo e o botão de compras que você colocou manualmente!
            </div>

            <button
              onClick={() => setClickedProduct(null)}
              className="mt-4 w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl transition-all"
            >
              Fechar Simulação
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
