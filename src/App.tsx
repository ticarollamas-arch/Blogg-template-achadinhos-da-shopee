import { useState } from 'react';
import { TemplateConfig, Product } from './types';
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS, CAROUSEL_DEFAULT_IMAGES } from './components/SampleProducts';
import ConfigPanel from './components/ConfigPanel';
import LiveSimulator from './components/LiveSimulator';
import TemplateExporter from './components/TemplateExporter';
import { 
  Sparkles, 
  ShoppingBag, 
  Sliders, 
  Download, 
  Layers,
  HelpCircle,
  TrendingUp,
  Tag
} from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<TemplateConfig>({
    shopName: 'Achadinhos da Shopee',
    shopDescription: 'Sua dose diária de descontos e produtos incríveis da Shopee Brasil!',
    shopeeAffiliateUrl: 'https://shope.ee/exemplo-afiliado',
    whatsappNumber: '',
    instagramUser: '',
    primaryColor: '#EE4D2D', // Shopee Orange
    secondaryColor: '#F53D2D',
    backgroundColor: '#F5F5F5',
    cardStyle: 'rounded',
    gridColumns: 3,
    showCarousel: true,
    carouselImages: [...CAROUSEL_DEFAULT_IMAGES],
    categories: [...DEFAULT_CATEGORIES],
    footerText: 'Os preços mostrados podem sofrer alteração conforme as ofertas oficiais da Shopee Brasil.',
    footerAboutUrl: '/p/sobre.html',
    footerContactUrl: '/p/contato.html',
    footerPrivacyUrl: '/p/politica-de-privacidade.html',
    footerTermsUrl: '/p/termos-de-uso.html',
    showAdSense: true,
    adSenseClientId: 'ca-pub-1234567890123456',
    adSenseTopSlot: '1234567890',
    adSenseMiddleSlot: '2345678901',
    adSenseBottomSlot: '3456789012',
  });

  const [products, setProducts] = useState<Product[]>([...DEFAULT_PRODUCTS]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white antialiased">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-xs px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-200 shrink-0">
            <ShoppingBag className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-orange-100 text-orange-600 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Lançamento</span>
            </div>
            <h1 className="text-base font-extrabold text-slate-800 tracking-tight mt-0.5">
              Gerador de Template Blogger Shopee Afiliado
            </h1>
          </div>
        </div>

        {/* Stats indicators */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <Tag className="w-4 h-4 text-orange-500" />
            <div className="text-left">
              <span className="block text-[9px] text-slate-400 font-bold uppercase leading-none">Cores do Tema</span>
              <div className="flex gap-1 mt-1 items-center">
                <span className="w-2.5 h-2.5 rounded-full inline-block border border-white shadow-xs" style={{ backgroundColor: config.primaryColor }} />
                <span className="text-[10px] text-slate-600 font-mono font-semibold">{config.primaryColor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <Sliders className="w-4 h-4 text-indigo-500" />
            <div className="text-left">
              <span className="block text-[9px] text-slate-400 font-bold uppercase leading-none">Categorias</span>
              <span className="text-[11px] font-extrabold text-slate-700 block mt-0.5">{config.categories.length} Ativas</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <div className="text-left">
              <span className="block text-[9px] text-slate-400 font-bold uppercase leading-none">Simulador</span>
              <span className="text-[11px] font-extrabold text-slate-700 block mt-0.5">{products.length} Produtos</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch h-full">
          
          {/* 1. Configuration Panel (Left Section) */}
          <section className="xl:col-span-4 lg:col-span-5 flex flex-col h-full min-h-[550px]" aria-label="Painel de Configuração">
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">1. Configurar Loja</span>
            </div>
            <div className="flex-grow h-full">
              <ConfigPanel 
                config={config} 
                setConfig={setConfig} 
                products={products} 
                setProducts={setProducts} 
              />
            </div>
          </section>

          {/* 2. Interactive Live Simulator (Center Section) */}
          <section className="xl:col-span-4 lg:col-span-7 flex flex-col h-full min-h-[550px]" aria-label="Simulador do Blogger">
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">2. Simulação em Tempo Real</span>
            </div>
            <div className="flex-grow h-full">
              <LiveSimulator 
                config={config} 
                products={products} 
              />
            </div>
          </section>

          {/* 3. Code Exporter and Installation Guide (Right Section) */}
          <section className="xl:col-span-4 lg:col-span-12 flex flex-col h-full min-h-[550px]" aria-label="Código e Exportação">
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">3. Código XML &amp; Instalação</span>
            </div>
            <div className="flex-grow h-full">
              <TemplateExporter 
                config={config} 
                products={products} 
              />
            </div>
          </section>

        </div>
      </main>

      {/* Workspace Status Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-3.5 px-6 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
          <span>Estrutura esqueleto Blogger testada. Compatível com os servidores do Blogspot.</span>
        </div>
        <div>
          <span>Desenvolvido com todo o rigor de validação XML para evitar erros ao salvar.</span>
        </div>
      </footer>
    </div>
  );
}
