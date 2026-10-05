import React, { useState } from 'react';
import { TemplateConfig, Product } from '../types';
import { 
  ShoppingBag, 
  Palette, 
  Settings, 
  Layers, 
  Plus, 
  Trash2, 
  Info, 
  Link, 
  FileText, 
  Eye, 
  Edit3, 
  Check, 
  Image as ImageIcon,
  Sparkles,
  Shield,
  Scale
} from 'lucide-react';

interface ConfigPanelProps {
  config: TemplateConfig;
  setConfig: React.Dispatch<React.SetStateAction<TemplateConfig>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const PALETTE_SUGGESTIONS = [
  { name: 'Shopee Laranja', primary: '#EE4D2D', secondary: '#F53D2D', bg: '#F5F5F5' },
  { name: 'Azul Elegante', primary: '#1877F2', secondary: '#1056B3', bg: '#F0F2F5' },
  { name: 'Verde Mint', primary: '#00BFA6', secondary: '#009688', bg: '#F4FBF9' },
  { name: 'Rosa Pastel', primary: '#E1306C', secondary: '#C13584', bg: '#FAECEF' },
  { name: 'Moda Brutalista', primary: '#000000', secondary: '#333333', bg: '#F8F8F8' },
];

export default function ConfigPanel({ config, setConfig, products, setProducts }: ConfigPanelProps) {
  const [activeTab, setActiveTab] = useState<'geral' | 'estilo' | 'categorias' | 'produtos' | 'gerador'>('geral');
  const [newCategory, setNewCategory] = useState('');
  
  // State for product creator/editor
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // States for HTML post/article checkout code generator
  const [genTitle, setGenTitle] = useState('Super Oferta do Dia Shopee');
  const [genOldPrice, setGenOldPrice] = useState('79,90');
  const [genNewPrice, setGenNewPrice] = useState('39,90');
  const [genLink, setGenLink] = useState('https://shope.ee/exemplo');
  const [genBadge, setGenBadge] = useState('50% OFF');
  const [genCategory, setGenCategory] = useState('Geral');
  const [genDescription, setGenDescription] = useState('🔥 O queridinho da internet acabou de entrar em promoção!\n\n✅ Design moderno e compacto\n✅ Muito prático e fácil de limpar\n✅ Envio rápido para todo o Brasil');
  const [copiedCode, setCopiedCode] = useState(false);

  // States for AdSense Legal Policies Generator
  const [geradorSubTab, setGeradorSubTab] = useState<'checkout' | 'politica' | 'termos' | 'disclaimer'>('checkout');
  const [blogName, setBlogName] = useState('Achadinhos da Shopee');
  const [blogUrl, setBlogUrl] = useState('https://achadinhosdashopee.blogspot.com');
  const [contactEmail, setContactEmail] = useState('contato@achadinhosdashopee.com');
  const [copiedLegalCode, setCopiedLegalCode] = useState(false);

  const getPoliticaHtml = () => {
    return `<div class="legal-page-container" style="font-family:'Inter',sans-serif;max-width:800px;margin:20px auto;padding:24px;color:#334155;line-height:1.6;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);text-align:left;"><h1 style="color:#0f172a;font-size:24px;font-weight:800;border-bottom:2px solid #ee4d2d;padding-bottom:8px;margin-bottom:16px;margin-top:0;">Política de Privacidade</h1><p style="margin-bottom:12px;">No <strong>${blogName}</strong>, acessível em <a href="${blogUrl}" target="_blank" style="color:#ee4d2d;font-weight:600;text-decoration:none;">${blogUrl}</a>, uma de nossas principais prioridades é a privacidade de nossos visitantes. Este documento de Política de Privacidade contém tipos de informações que são coletadas e registradas pelo nosso blog e como as usamos.</p><p style="margin-bottom:16px;">Se você tiver perguntas adicionais ou precisar de mais informações sobre nossa Política de Privacidade, não hesite em nos contatar através do e-mail <strong>${contactEmail}</strong>.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">Compromisso do Usuário</h2><p style="margin-bottom:12px;">O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o blog oferece e com caráter enunciativo, mas não limitativo:</p><ul style="margin-left:20px;margin-bottom:16px;list-style-type:disc;"><li style="margin-bottom:6px;">Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li><li style="margin-bottom:6px;">Não causar danos aos sistemas físicos e lógicos do blog, de seus fornecedores ou terceiros.</li></ul><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">Google AdSense e o Cookie DoubleClick DART</h2><p style="margin-bottom:12px;">O Google é um dos fornecedores terceiros em nosso site. Ele também usa cookies, conhecidos como cookies DART, para veicular anúncios aos visitantes do nosso site com base em suas visitas a este e a outros sites na Internet.</p><p style="margin-bottom:16px;">Os visitantes podem optar por recusar o uso de cookies DART visitando a Política de Privacidade da rede de anúncios e conteúdo do Google no seguinte URL: <a href="https://policies.google.com/technologies/ads" target="_blank" style="color:#ee4d2d;text-decoration:underline;">https://policies.google.com/technologies/ads</a></p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">Nossos Parceiros de Publicidade</h2><p style="margin-bottom:16px;">Alguns dos anunciantes em nosso site podem usar cookies e web beacons. Nossos parceiros de publicidade incluem o <strong>Google AdSense</strong> e programas de afiliados como o <strong>Afiliados Shopee</strong>. Cada um de nossos parceiros de publicidade tem sua própria Política de Privacidade para suas políticas de dados do usuário.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">Políticas de Privacidade de Terceiros</h2><p style="margin-bottom:12px;">A Política de Privacidade do blog não se aplica a outros anunciantes ou sites. Portanto, aconselhamos que você consulte as respectivas Políticas de Privacidade desses servidores de anúncios de terceiros para obter informações mais detalhadas. Ela pode incluir suas práticas e instruções sobre como desativar certas opções.</p><p style="margin-bottom:16px;">Você pode optar por desativar os cookies por meio das opções individuais do seu navegador. Para saber informações mais detalhadas sobre o gerenciamento de cookies com navegadores específicos, visite os sites dos respectivos navegadores.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">Consentimento</h2><p style="margin-bottom:12px;">Ao utilizar nosso site, você consente com nossa Política de Privacidade e concorda com seus termos e condições.</p><p style="font-size:11px;color:#94a3b8;margin-top:24px;">Esta política é em vigor a partir de junho de 2026.</p></div>`;
  };

  const getTermosHtml = () => {
    return `<div class="legal-page-container" style="font-family:'Inter',sans-serif;max-width:800px;margin:20px auto;padding:24px;color:#334155;line-height:1.6;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);text-align:left;"><h1 style="color:#0f172a;font-size:24px;font-weight:800;border-bottom:2px solid #ee4d2d;padding-bottom:8px;margin-bottom:16px;margin-top:0;">Termos de Uso</h1><p style="margin-bottom:12px;">Bem-vindo ao <strong>${blogName}</strong>!</p><p style="margin-bottom:12px;">Ao acessar este blog, assumimos que você aceita estes termos e condições na íntegra. Não continue a usar o site se você não concordar com todos os termos e condições descritos nesta página.</p><p style="margin-bottom:16px;">A violação de qualquer termo resultará na rescisão do seu direito de uso dos serviços ofertados por nosso blog.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">1. Licença de Conteúdo</h2><p style="margin-bottom:12px;">Salvo indicação em contrário, o <strong>${blogName}</strong> e/ou seus licenciadores detêm os direitos de propriedade intelectual de todo o material publicado no blog. Todos os direitos de propriedade intelectual são reservados.</p><p style="margin-bottom:12px;">Você pode visualizar e/ou imprimir páginas de <a href="${blogUrl}" target="_blank" style="color:#ee4d2d;font-weight:600;text-decoration:none;">${blogUrl}</a> para seu uso pessoal, sujeito às restrições definidas nestes termos e condições.</p><p style="margin-bottom:16px;">Você não deve copiar, reproduzir, duplicar ou republicar material deste blog para fins comerciais sem consentimento expresso por escrito.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">2. Links para Outros Sites</h2><p style="margin-bottom:12px;">Nosso serviço contém links para sites externos, como a plataforma da <strong>Shopee Brasil</strong>, que não são operados por nós. Observe que não temos controle sobre o conteúdo e as práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p><p style="margin-bottom:16px;">É altamente recomendável que você leia os termos de serviço e a política de privacidade de qualquer site de terceiros que visitar por meio de nossos links promocionais.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">3. Limitação de Responsabilidade</h2><p style="margin-bottom:12px;">O blog <strong>${blogName}</strong> atua exclusivamente na divulgação e curadoria de ofertas de afiliados. Não vendemos produtos diretamente e não nos responsabilizamos pela entrega, garantia, defeitos ou qualquer problema pós-venda relativo às compras feitas na plataforma Shopee.</p><p style="margin-bottom:16px;">Qualquer reclamação ou dúvida sobre produtos comprados deve ser direcionada diretamente ao suporte ou vendedor oficial do produto dentro do site ou aplicativo da Shopee.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">4. Alterações nos Termos</h2><p style="margin-bottom:12px;">Reservamo-nos o direito de revisar estes termos a qualquer momento, sem aviso prévio. Ao continuar a usar este blog, você concorda em ficar vinculado à versão atual desses termos de serviço.</p><p style="margin-bottom:16px;">Dúvidas ou esclarecimentos podem ser enviados para <strong>${contactEmail}</strong>.</p></div>`;
  };

  const getDisclaimerHtml = () => {
    return `<div class="legal-page-container" style="font-family:'Inter',sans-serif;max-width:800px;margin:20px auto;padding:24px;color:#334155;line-height:1.6;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);text-align:left;"><h1 style="color:#0f172a;font-size:24px;font-weight:800;border-bottom:2px solid #ee4d2d;padding-bottom:8px;margin-bottom:16px;margin-top:0;">Aviso Legal e Divulgação de Afiliados</h1><p style="margin-bottom:12px;">Este blog, <strong>${blogName}</strong>, operando no endereço <a href="${blogUrl}" target="_blank" style="color:#ee4d2d;font-weight:600;text-decoration:none;">${blogUrl}</a>, é um portal de conteúdo focado na divulgação de descontos, ofertas de produtos e achados promocionais da plataforma <strong>Shopee Brasil</strong>.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">1. Relação de Afiliado</h2><p style="margin-bottom:12px;">Em conformidade com as diretrizes de transparência e regras de publicidade digital, esclarecemos que participamos do <strong>Programa de Afiliados da Shopee</strong>. Isso significa que, ao clicar nos links de produtos compartilhados em nossas publicações e concluir uma compra, nós podemos receber uma pequena comissão sobre a venda.</p><p style="margin-bottom:16px;"><strong>Importante:</strong> isso não acarreta nenhum custo adicional para você! O valor do produto é exatamente o mesmo que você pagaria acessando a Shopee diretamente. Essa comissão nos ajuda a manter o blog ativo e sempre atualizado.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">2. Isenção de Responsabilidade sobre Preços e Estoque</h2><p style="margin-bottom:12px;">A Shopee é uma plataforma dinâmica onde milhares de vendedores parceiros anunciam diariamente. Por esse motivo, os preços, cupons e a disponibilidade de estoque mostrados em nossas postagens são válidos estritamente no momento da publicação e podem sofrer alterações sem qualquer aviso prévio pelas lojas ou pela própria Shopee.</p><p style="margin-bottom:16px;">Não nos responsabilizamos se um produto não estiver mais disponível ou se o preço estiver diferente do anunciado quando você acessar o site parceiro.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">3. Isenção de Garantia dos Produtos</h2><p style="margin-bottom:12px;">O <strong>${blogName}</strong> atua exclusivamente de forma informativa e promocional. O blog não vende, não estoca, não entrega e não processa os pagamentos de nenhum dos produtos divulgados. Todos os produtos são de responsabilidade única e exclusiva de seus respectivos vendedores e da plataforma de e-commerce Shopee.</p><p style="margin-bottom:16px;">Quaisquer problemas relativos ao frete, devolução, garantia ou suporte técnico devem ser tratados diretamente na central de ajuda oficial da Shopee ou no chat com o vendedor responsável.</p><h2 style="color:#1e293b;font-size:18px;font-weight:700;margin-top:20px;margin-bottom:10px;">4. Contato</h2><p style="margin-bottom:12px;">Buscamos sempre manter a transparência e integridade do nosso trabalho. Caso tenha qualquer dúvida regulatória ou comercial, você pode entrar em contato conosco através do e-mail: <strong>${contactEmail}</strong>.</p></div>`;
  };

  const updateConfig = (key: keyof TemplateConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyPalette = (p: typeof PALETTE_SUGGESTIONS[0]) => {
    setConfig(prev => ({
      ...prev,
      primaryColor: p.primary,
      secondaryColor: p.secondary,
      backgroundColor: p.bg
    }));
  };

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !config.categories.includes(trimmed)) {
      const updated = [...config.categories, trimmed];
      updateConfig('categories', updated);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (catToRemove: string) => {
    const updated = config.categories.filter(c => c !== catToRemove);
    updateConfig('categories', updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingProduct) {
          setEditingProduct(p => ({ ...p, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerFileChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...config.carouselImages];
        updated[idx] = reader.result as string;
        updateConfig('carouselImages', updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = () => {
    if (!editingProduct.title || !editingProduct.discountedPrice) {
      alert('Por favor, preencha o título e o preço do produto!');
      return;
    }

    const finalProduct: Product = {
      id: editingProduct.id || Date.now().toString(),
      title: editingProduct.title,
      originalPrice: editingProduct.originalPrice || editingProduct.discountedPrice * 1.5,
      discountedPrice: editingProduct.discountedPrice,
      imageUrl: editingProduct.imageUrl || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500',
      affiliateUrl: editingProduct.affiliateUrl || config.shopeeAffiliateUrl,
      category: editingProduct.category || config.categories[0] || 'Geral',
      badge: editingProduct.badge || '',
      isFeatured: editingProduct.isFeatured || false
    };

    if (editingProduct.id) {
      // Edit
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? finalProduct : p));
    } else {
      // Create new
      setProducts(prev => [finalProduct, ...prev]);
    }

    setEditingProduct(null);
    setShowProductModal(false);
  };

  const handleStartAddProduct = () => {
    setEditingProduct({
      title: '',
      originalPrice: undefined,
      discountedPrice: undefined,
      imageUrl: '',
      affiliateUrl: '',
      category: config.categories[0] || 'Geral',
      badge: 'Super Oferta',
      isFeatured: false
    });
    setShowProductModal(true);
  };

  const handleStartEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden flex flex-col h-full" id="panel-root">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-100 bg-slate-50 p-1 gap-1">
        <button
          id="tab-btn-geral"
          onClick={() => setActiveTab('geral')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'geral' 
              ? 'bg-white text-slate-800 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          Geral
        </button>
        <button
          id="tab-btn-estilo"
          onClick={() => setActiveTab('estilo')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'estilo' 
              ? 'bg-white text-slate-800 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Aparência
        </button>
        <button
          id="tab-btn-categorias"
          onClick={() => setActiveTab('categorias')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'categorias' 
              ? 'bg-white text-slate-800 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Categorias
        </button>
        <button
          id="tab-btn-produtos"
          onClick={() => setActiveTab('produtos')}
          className={`flex-1 flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl text-[11px] font-semibold transition-all ${
            activeTab === 'produtos' 
              ? 'bg-white text-slate-800 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
          }`}
        >
          <ShoppingBag className="w-3 h-3" />
          Produtos
        </button>
        <button
          id="tab-btn-gerador"
          onClick={() => setActiveTab('gerador')}
          className={`flex-1 flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl text-[11px] font-semibold transition-all ${
            activeTab === 'gerador' 
              ? 'bg-white text-slate-800 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-3 h-3 text-orange-500" />
          Gerador HTML
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 overflow-y-auto flex-grow space-y-5 max-h-[calc(100vh-220px)]">
        {/* TAB 1: GERAL */}
        {activeTab === 'geral' && (
          <div className="space-y-4 animate-fade-in" id="panel-tab-geral">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Nome da Loja</label>
              <input
                id="input-shopName"
                type="text"
                value={config.shopName}
                onChange={e => updateConfig('shopName', e.target.value)}
                className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-100 transition-all text-slate-800 font-medium"
                placeholder="Ex: Minha Loja de Achados"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Descrição Curta</label>
              <textarea
                id="input-shopDescription"
                value={config.shopDescription}
                onChange={e => updateConfig('shopDescription', e.target.value)}
                rows={2}
                className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-100 transition-all text-slate-800"
                placeholder="Ex: Os melhores achados em promoção todos os dias na Shopee!"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Link de Afiliado Principal
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] p-2 rounded-lg w-56 hidden group-hover:block z-50 shadow-lg normal-case font-normal leading-relaxed">
                    Insira o seu link de afiliado geral (ou da sua loja de coleções na Shopee) para servir de fallback caso algum produto não possua link individual.
                  </div>
                </div>
              </label>
              <div className="relative">
                <Link className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="input-shopeeAffiliateUrl"
                  type="url"
                  value={config.shopeeAffiliateUrl}
                  onChange={e => updateConfig('shopeeAffiliateUrl', e.target.value)}
                  className="w-full text-sm pl-9 pr-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-100 transition-all text-slate-800 font-mono text-xs"
                  placeholder="https://shope.ee/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">WhatsApp de Suporte</label>
                <input
                  id="input-whatsappNumber"
                  type="text"
                  value={config.whatsappNumber}
                  onChange={e => updateConfig('whatsappNumber', e.target.value)}
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 transition-all text-slate-800"
                  placeholder="Ex: 5511999999999"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Apenas números com DDD</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Instagram (Nome)</label>
                <input
                  id="input-instagramUser"
                  type="text"
                  value={config.instagramUser}
                  onChange={e => updateConfig('instagramUser', e.target.value)}
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-100 transition-all text-slate-800"
                  placeholder="Ex: achados.shopee"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Sem o caractere @</span>
              </div>
            </div>

            <hr className="border-slate-100 my-4" />

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Texto de Direitos Autorais do Rodapé</label>
              <input
                id="input-footerText"
                type="text"
                value={config.footerText}
                onChange={e => updateConfig('footerText', e.target.value)}
                className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-100 transition-all text-slate-800"
                placeholder="Ex: Todos os direitos reservados."
              />
            </div>

            <hr className="border-slate-100 my-4" />

            {/* Configuração dos Links de Páginas no Rodapé */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-3">
              <span className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Links do Rodapé</span>
              <span className="text-[10px] text-slate-400 block -mt-2">Indique os links para as páginas obrigatórias de aprovação do AdSense.</span>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sobre Nós URL</label>
                  <input
                    id="input-footerAboutUrl"
                    type="text"
                    value={config.footerAboutUrl}
                    onChange={e => updateConfig('footerAboutUrl', e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none text-slate-800 font-mono bg-white"
                    placeholder="/p/sobre.html"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Contato URL</label>
                  <input
                    id="input-footerContactUrl"
                    type="text"
                    value={config.footerContactUrl}
                    onChange={e => updateConfig('footerContactUrl', e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none text-slate-800 font-mono bg-white"
                    placeholder="/p/contato.html"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Privacidade URL</label>
                  <input
                    id="input-footerPrivacyUrl"
                    type="text"
                    value={config.footerPrivacyUrl}
                    onChange={e => updateConfig('footerPrivacyUrl', e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none text-slate-800 font-mono bg-white"
                    placeholder="/p/politica-de-privacidade.html"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Termos de Uso URL</label>
                  <input
                    id="input-footerTermsUrl"
                    type="text"
                    value={config.footerTermsUrl}
                    onChange={e => updateConfig('footerTermsUrl', e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none text-slate-800 font-mono bg-white"
                    placeholder="/p/termos-de-uso.html"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100 my-4" />

            {/* Configuração de Google AdSense */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Google AdSense</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Ativa blocos de anúncios reais no template Blogger.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="checkbox-showAdSense"
                    type="checkbox"
                    checked={config.showAdSense}
                    onChange={e => updateConfig('showAdSense', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:width-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {config.showAdSense && (
                <div className="space-y-3 pt-1" id="adsense-inputs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Publisher ID (ID do Cliente)</label>
                    <input
                      id="input-adSenseClientId"
                      type="text"
                      value={config.adSenseClientId}
                      onChange={e => updateConfig('adSenseClientId', e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none text-slate-800 font-mono bg-white"
                      placeholder="ca-pub-1234567890123456"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Slot Topo</label>
                      <input
                        id="input-adSenseTopSlot"
                        type="text"
                        value={config.adSenseTopSlot}
                        onChange={e => updateConfig('adSenseTopSlot', e.target.value)}
                        className="w-full text-[10px] px-2 py-1.5 border border-slate-200 rounded-lg focus:outline-none text-slate-800 font-mono bg-white"
                        placeholder="1234567890"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Slot Meio</label>
                      <input
                        id="input-adSenseMiddleSlot"
                        type="text"
                        value={config.adSenseMiddleSlot}
                        onChange={e => updateConfig('adSenseMiddleSlot', e.target.value)}
                        className="w-full text-[10px] px-2 py-1.5 border border-slate-200 rounded-lg focus:outline-none text-slate-800 font-mono bg-white"
                        placeholder="2345678901"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Slot Rodapé</label>
                      <input
                        id="input-adSenseBottomSlot"
                        type="text"
                        value={config.adSenseBottomSlot}
                        onChange={e => updateConfig('adSenseBottomSlot', e.target.value)}
                        className="w-full text-[10px] px-2 py-1.5 border border-slate-200 rounded-lg focus:outline-none text-slate-800 font-mono bg-white"
                        placeholder="3456789012"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ESTILO & CORES */}
        {activeTab === 'estilo' && (
          <div className="space-y-4 animate-fade-in" id="panel-tab-estilo">
            <div>
              <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">Paletas Rápidas</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="palette-suggestions">
                {PALETTE_SUGGESTIONS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyPalette(p)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-150 hover:bg-slate-50 transition-all text-left group"
                  >
                    <div className="flex -space-x-1.5">
                      <div className="w-5 h-5 rounded-full border border-white z-10" style={{ backgroundColor: p.primary }} />
                      <div className="w-5 h-5 rounded-full border border-white z-0" style={{ backgroundColor: p.secondary }} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-700">{p.name}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{p.primary}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-100 my-4" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Cor Principal</label>
                <div className="flex gap-2">
                  <input
                    id="color-primary"
                    type="color"
                    value={config.primaryColor}
                    onChange={e => updateConfig('primaryColor', e.target.value)}
                    className="w-9 h-9 p-0 border-0 rounded-lg cursor-pointer bg-transparent"
                  />
                  <input
                    id="input-primaryColor-hex"
                    type="text"
                    value={config.primaryColor}
                    onChange={e => updateConfig('primaryColor', e.target.value)}
                    className="flex-1 text-xs font-mono text-center border border-slate-200 rounded-xl focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Cor do Destaque</label>
                <div className="flex gap-2">
                  <input
                    id="color-secondary"
                    type="color"
                    value={config.secondaryColor}
                    onChange={e => updateConfig('secondaryColor', e.target.value)}
                    className="w-9 h-9 p-0 border-0 rounded-lg cursor-pointer bg-transparent"
                  />
                  <input
                    id="input-secondaryColor-hex"
                    type="text"
                    value={config.secondaryColor}
                    onChange={e => updateConfig('secondaryColor', e.target.value)}
                    className="flex-1 text-xs font-mono text-center border border-slate-200 rounded-xl focus:outline-none uppercase"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Fundo do Blog</label>
              <div className="flex gap-2">
                <input
                  id="color-bg"
                  type="color"
                  value={config.backgroundColor}
                  onChange={e => updateConfig('backgroundColor', e.target.value)}
                  className="w-9 h-9 p-0 border-0 rounded-lg cursor-pointer bg-transparent"
                />
                <input
                  id="input-backgroundColor-hex"
                  type="text"
                  value={config.backgroundColor}
                  onChange={e => updateConfig('backgroundColor', e.target.value)}
                  className="flex-grow text-xs font-mono text-center border border-slate-200 rounded-xl focus:outline-none uppercase"
                />
              </div>
            </div>

            <hr className="border-slate-100 my-4" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Estilo dos Cards</label>
                <select
                  id="select-cardStyle"
                  value={config.cardStyle}
                  onChange={e => updateConfig('cardStyle', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl text-slate-700 bg-white"
                >
                  <option value="rounded">Super Arredondado</option>
                  <option value="flat">Plano Minimalista</option>
                  <option value="square">Quadrado Moderno</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Colunas do Grid</label>
                <select
                  id="select-gridColumns"
                  value={config.gridColumns}
                  onChange={e => updateConfig('gridColumns', parseInt(e.target.value))}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl text-slate-700 bg-white"
                >
                  <option value="2">2 Colunas (Compacto)</option>
                  <option value="3">3 Colunas (Padrão)</option>
                  <option value="4">4 Colunas (Completo)</option>
                </select>
              </div>
            </div>

            <hr className="border-slate-100 my-4" />

            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-slate-700">Carrossel de Banners</span>
                  <span className="text-[10px] text-slate-400">Ativa um banner animado no topo com ofertas em destaque.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="checkbox-showCarousel"
                    type="checkbox"
                    checked={config.showCarousel}
                    onChange={e => updateConfig('showCarousel', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:width-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {config.showCarousel && (
                <div className="mt-3 space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200" id="carousel-images-inputs">
                  <div className="flex items-start gap-2.5 bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-xs text-indigo-800 leading-normal">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-indigo-900 mb-0.5">📸 Imagens de Demonstração (Blogger)</strong>
                      <span className="block mt-0.5">As imagens do carrossel exibidas no simulador ao lado são apenas exemplos de demonstração.</span>
                      <span className="block mt-1 font-semibold text-indigo-900">Como alterar no seu site real:</span>
                      <span className="block mt-0.5 text-slate-600">Você não precisa alterar o código! No Blogger, basta acessar o menu <strong>Layout</strong>, localizar os gadgets do carrossel (<strong>Banner 1, Banner 2, Banner 3 e Banner 4</strong>) e fazer o upload de suas próprias imagens diretamente pelo painel oficial do Blogspot.</span>
                    </div>
                  </div>

                  <span className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Visualização dos Banners Ativos</span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {config.carouselImages.map((img, idx) => (
                      <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200 flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Banner #{idx + 1}</span>
                          <span className="text-[8px] bg-indigo-50 text-indigo-600 font-extrabold px-1 rounded">Demonstração</span>
                        </div>
                        <div className="aspect-[3/1] bg-slate-950 rounded border border-slate-150 flex items-center justify-center overflow-hidden h-12">
                          {img ? (
                            <img 
                              src={img} 
                              alt={`Banner ${idx + 1}`} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-300">
                              <ImageIcon className="w-3.5 h-3.5 stroke-1 mb-0.5" />
                              <span className="text-[8px] font-bold">Sem Banner</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIAS */}
        {activeTab === 'categorias' && (
          <div className="space-y-4 animate-fade-in" id="panel-tab-categorias">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-2.5 text-slate-600">
              <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                As categorias ajudam os visitantes a navegarem na sua loja. No Blogger, essas categorias correspondem aos <strong>Marcadores (Labels)</strong> que você coloca nos posts!
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Adicionar Categoria</label>
              <div className="flex gap-2">
                <input
                  id="input-newCategory"
                  type="text"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                  className="flex-grow text-sm px-3.5 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 text-slate-800"
                  placeholder="Ex: Decoração, Maquiagem..."
                />
                <button
                  id="btn-addCategory"
                  onClick={handleAddCategory}
                  className="bg-orange-500 text-white px-3.5 py-1.5 rounded-xl hover:bg-orange-600 transition-all font-semibold flex items-center gap-1 text-xs"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Categorias Ativas ({config.categories.length})</label>
              <div className="space-y-1.5" id="categories-list-container">
                {config.categories.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 px-3 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-all">
                    <span className="text-xs font-semibold text-slate-700">{cat}</span>
                    <button
                      onClick={() => handleRemoveCategory(cat)}
                      className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-all"
                      title="Excluir Categoria"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {config.categories.length === 0 && (
                  <div className="text-center py-6 text-slate-400 text-xs font-medium">Nenhuma categoria cadastrada. Crie uma acima!</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUTOS DE DEMONSTRAÇÃO */}
        {activeTab === 'produtos' && (
          <div className="space-y-4 animate-fade-in" id="panel-tab-produtos">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="block text-xs font-bold text-slate-700">Produtos de Teste ({products.length})</span>
                <span className="text-[10px] text-slate-500">Apenas para simulação visual no painel.</span>
              </div>
              <button
                id="btn-startAddProduct"
                onClick={handleStartAddProduct}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Criar Novo
              </button>
            </div>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1" id="demo-products-list">
              {products.map((p) => (
                <div key={p.id} className="flex gap-3 p-2.5 border border-slate-100 rounded-xl hover:border-slate-200 bg-white transition-all items-center">
                  <img src={p.imageUrl} alt={p.title} className="w-12 h-12 object-cover rounded-lg bg-slate-50" referrerPolicy="no-referrer" />
                  <div className="flex-grow min-w-0">
                    <span className="block text-xs font-semibold text-slate-700 truncate">{p.title}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-400 font-medium">{p.category}</span>
                      <span className="text-xs font-bold text-orange-500">R$ {p.discountedPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => handleStartEditProduct(p)}
                      className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg transition-all"
                      title="Editar"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-xs">Crie um produto para testar a simulação!</div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: GERADOR DE CÓDIGO HTML DE CHECKOUT E PÁGINAS LEGAIS */}
        {activeTab === 'gerador' && (
          <div className="space-y-4 animate-fade-in text-slate-800" id="panel-tab-gerador">
            
            {/* MINI NAV SUB-TABS */}
            <div className="flex bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setGeradorSubTab('checkout')}
                className={`flex-1 py-1.5 px-1.5 rounded-lg text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-all ${
                  geradorSubTab === 'checkout'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShoppingBag className="w-3 h-3 text-orange-500" />
                <span>Ofertas</span>
              </button>
              <button
                type="button"
                onClick={() => setGeradorSubTab('politica')}
                className={`flex-1 py-1.5 px-1.5 rounded-lg text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-all ${
                  geradorSubTab === 'politica'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Shield className="w-3 h-3 text-emerald-500" />
                <span>Privacidade</span>
              </button>
              <button
                type="button"
                onClick={() => setGeradorSubTab('termos')}
                className={`flex-1 py-1.5 px-1.5 rounded-lg text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-all ${
                  geradorSubTab === 'termos'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-3 h-3 text-blue-500" />
                <span>Termos</span>
              </button>
              <button
                type="button"
                onClick={() => setGeradorSubTab('disclaimer')}
                className={`flex-1 py-1.5 px-1.5 rounded-lg text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-all ${
                  geradorSubTab === 'disclaimer'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Scale className="w-3 h-3 text-amber-500" />
                <span>Aviso Legal</span>
              </button>
            </div>

            {/* SUB-TAB 1: PRODUCT CHECKOUT GENERATOR */}
            {geradorSubTab === 'checkout' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3">
                  <Sparkles className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-orange-950 uppercase mb-0.5">Gerador de Checkout HTML</h4>
                    <p className="text-[11px] text-orange-800 leading-normal">
                      Crie ofertas irresistíveis com checkout em formato de artigo para colar diretamente no editor do Blogger. 
                      Sua foto quadrada anexada no post será ajustada automaticamente na vitrine da loja!
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Título do Artigo / Produto</label>
                    <input
                      type="text"
                      value={genTitle}
                      onChange={e => setGenTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                      placeholder="Ex: Mini Processador Elétrico de Alimentos"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Preço Original (De) R$</label>
                      <input
                        type="text"
                        value={genOldPrice}
                        onChange={e => setGenOldPrice(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                        placeholder="Ex: 89,90"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Preço Oferta (Por) R$</label>
                      <input
                        type="text"
                        value={genNewPrice}
                        onChange={e => setGenNewPrice(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                        placeholder="Ex: 39,90"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Link de Afiliado (Shopee)</label>
                    <input
                      type="text"
                      value={genLink}
                      onChange={e => setGenLink(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                      placeholder="Ex: https://shope.ee/abcdef"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Badge / Tag de Desconto</label>
                      <input
                        type="text"
                        value={genBadge}
                        onChange={e => setGenBadge(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                        placeholder="Ex: 50% OFF"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Categoria (Marcar no Blogger)</label>
                      <select
                        value={genCategory}
                        onChange={e => setGenCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                      >
                        <option value="Geral">Selecione uma categoria...</option>
                        {config.categories.map((cat, idx) => (
                          <option key={idx} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Descrição / Detalhes Manuais do Produto</label>
                    <textarea
                      value={genDescription}
                      onChange={e => setGenDescription(e.target.value)}
                      rows={4}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                      placeholder="🔥 Insira texto ou especificações aqui. Cada linha virará um parágrafo formatado automaticamente!"
                    />
                  </div>
                </div>

                {/* PREVIEW DA OFERTA */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pré-visualização do Artigo</label>
                  <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 flex flex-col items-center">
                    <div className="w-full max-w-xs bg-white p-4 border border-slate-100 shadow-md rounded-2xl text-center">
                      {genBadge && (
                        <div className="inline-block bg-orange-100 text-orange-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                          {genBadge}
                        </div>
                      )}
                      <h5 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight mb-2">{genTitle}</h5>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        {genOldPrice && (
                          <span className="text-[10px] text-slate-400 line-through">De: R$ {genOldPrice}</span>
                        )}
                        <span className="text-sm font-black text-[#ff4222]">Por: R$ {genNewPrice}</span>
                      </div>

                      {/* Manual description formatted in preview */}
                      {genDescription && (
                        <div className="text-left border-t border-slate-100 pt-2.5 mt-2.5 mb-3 space-y-1 max-h-32 overflow-y-auto pr-1">
                          {genDescription.split('\n').filter(line => line.trim() !== '').map((line, idx) => (
                            <p key={idx} className="text-[11px] text-slate-600 leading-normal">{line}</p>
                          ))}
                        </div>
                      )}

                      <div className="bg-[#ff4222] text-white text-[11px] font-bold py-2 px-4 rounded-full shadow-md uppercase tracking-wider">
                        Ir Para Oferta na Shopee
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const priceNum = parseFloat(genNewPrice.replace(',', '.'));
                      const oldPriceNum = genOldPrice ? parseFloat(genOldPrice.replace(',', '.')) : undefined;
                      const finalProduct: Product = {
                        id: 'gen-' + Date.now().toString(),
                        title: genTitle,
                        originalPrice: oldPriceNum || (priceNum * 1.5),
                        discountedPrice: priceNum || 29.90,
                        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', // high quality default product image
                        affiliateUrl: genLink,
                        category: genCategory || 'Geral',
                        badge: genBadge,
                        isFeatured: false
                      };
                      setProducts(prev => [finalProduct, ...prev]);
                      alert('Sucesso! Este produto foi inserido na Vitrine de Simulação ao lado!');
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl transition-all"
                  >
                    Testar no Simulador
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const descLines = genDescription
                        .split('\n')
                        .filter(line => line.trim() !== '');
                      const formattedDescHtml = descLines.length > 0
                        ? `<div style="border-top: 1px solid #f1f5f9; padding-top: 10px; margin-top: 10px; margin-bottom: 10px;">` + descLines
                            .map(p => `<p style="margin: 0 0 6px 0; font-size: 13px; color: #475569; text-align: left; line-height: 1.4; font-family: inherit;">${p.replace(/"/g, '&quot;')}</p>`)
                            .join('') + `</div>`
                        : '';

                      // MINIFIED/COMPACT HTML TO PREVENT BLOGGER NEWLINE-TO-BR BUG
                      const htmlTemplate = `<!-- CÓDIGO DO PRODUTO GERADO - COPIE E COLE NO MODO HTML DO BLOGGER --><div class="product-article-checkout"><span style="display:none;">[preco-de]${genOldPrice || ''}[/preco-de][preco-por]${genNewPrice}[/preco-por][tag]${genBadge || ''}[/tag][shopee-link]${genLink}[/shopee-link]</span><div style="font-family:'Inter',sans-serif;max-width:440px;margin:8px auto;padding:16px;border:1.5px solid #f1f5f9;border-radius:14px;background-color:#ffffff;box-shadow:0 8px 24px rgba(0,0,0,0.03);text-align:center;">${genBadge ? `<div style="display:inline-block;background-color:#ffefe8;color:#ff4222;font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:30px;text-transform:uppercase;margin-bottom:8px;letter-spacing:0.5px;">${genBadge}</div>` : ''}<h3 style="font-size:16px;font-weight:700;color:#1e293b;margin:0 0 8px 0;line-height:1.4;">${genTitle}</h3><div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px;">${genOldPrice ? `<span style="font-size:12px;text-decoration:line-through;color:#94a3b8;font-weight:500;">De: R$ ${genOldPrice}</span>` : ''}<span style="font-size:18px;color:#ff4222;font-weight:800;">Por: R$ ${genNewPrice}</span></div>${formattedDescHtml}<div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:10.5px;color:#475569;font-weight:600;margin-bottom:14px;background:#f8fafc;padding:8px;border-radius:10px;border:1px solid #f1f5f9;"><svg style="width:14px;height:14px;color:#22c55e;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>Produto Verificado • Compra 100% Segura</div><a href="${genLink}" target="_blank" rel="noopener noreferrer" class="btn-checkout-pulsing" style="display:flex;align-items:center;justify-content:center;gap:8px;background-color:#ff4222;color:#ffffff!important;text-decoration:none!important;font-size:14px;font-weight:800;text-transform:uppercase;padding:12px 20px;border-radius:50px;box-shadow:0 4px 15px rgba(255,66,34,0.2);transition:all .2s ease-in-out;animation:checkoutPulse 2s infinite;"><svg style="width:16px;height:16px;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>Ir Para Oferta na Shopee</a></div></div><style>.product-article-checkout{display:block;clear:both;margin:12px auto}@keyframes checkoutPulse{0%{box-shadow:0 0 0 0 rgba(255,66,34,0.7)}70%{box-shadow:0 0 0 10px rgba(255, 66, 34, 0)}100%{box-shadow:0 0 0 0 rgba(255,66,34,0)}}</style>`;

                      navigator.clipboard.writeText(htmlTemplate);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                    {copiedCode ? 'Copiado!' : 'Copiar Código'}
                  </button>
                </div>

                {/* INSTUÇÕES DE USO */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <span className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Como Usar no Blogger:</span>
                  <ol className="text-[10px] text-slate-500 list-decimal pl-4 space-y-1">
                    <li>Abra o Blogger e clique em <b>Nova Postagem</b>.</li>
                    <li>No topo do editor, anexe a <b>imagem quadrada</b> do produto usando o botão de fotos.</li>
                    <li>Mude o editor de post de <i>Escrever</i> para <b>Visualização HTML</b> (ícone de lápis).</li>
                    <li>Cole o código copiado acima <b>no final</b> ou <b>logo abaixo</b> da sua imagem.</li>
                    <li>No painel lateral, adicione a etiqueta correspondente à <b>categoria</b> (ex: <code className="bg-slate-200 px-1 rounded">{genCategory}</code>).</li>
                    <li>Publique! A foto quadrada ficará perfeitamente ajustada na vitrine e o artigo terá o checkout profissional.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* SUB-TAB 2, 3, 4: LEGAL POLICIES GENERATORS */}
            {geradorSubTab !== 'checkout' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 uppercase mb-0.5">
                      {geradorSubTab === 'politica' && 'Gerador de Política de Privacidade (AdSense)'}
                      {geradorSubTab === 'termos' && 'Gerador de Termos de Uso (AdSense)'}
                      {geradorSubTab === 'disclaimer' && 'Gerador de Aviso Legal & Afiliados'}
                    </h4>
                    <p className="text-[11px] text-emerald-800 leading-normal">
                      Crie páginas obrigatórias exigidas pelo Google AdSense. Preencha os dados do seu blog abaixo e copie o código HTML gerado para colar diretamente nas "Páginas" do Blogger.
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nome do seu Blog</label>
                      <input
                        type="text"
                        value={blogName}
                        onChange={e => setBlogName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-800"
                        placeholder="Ex: Achadinhos Shopee"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">E-mail de Contato</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-800"
                        placeholder="Ex: contato@meublog.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Link Completo do seu Blog (Blogger)</label>
                    <input
                      type="url"
                      value={blogUrl}
                      onChange={e => setBlogUrl(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-800"
                      placeholder="Ex: https://meublog.blogspot.com"
                    />
                  </div>
                </div>

                {/* VISUAL PREVIEW OF LEGAL TEXT */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pré-visualização do Texto</label>
                  <div className="border border-slate-100 p-3 rounded-xl bg-slate-50 max-h-56 overflow-y-auto text-xs text-slate-600 space-y-2 border-l-4 border-l-emerald-500">
                    {geradorSubTab === 'politica' && (
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-slate-800 text-sm border-b border-slate-200 pb-1">Política de Privacidade</h4>
                        <p>No <strong>{blogName}</strong>, acessível em <a href={blogUrl} target="_blank" className="text-orange-500 font-bold underline">{blogUrl}</a>, uma de nossas principais prioridades é a privacidade de nossos visitantes. Este documento contém os tipos de informações coletadas e registradas pelo nosso blog...</p>
                        <p className="font-bold text-slate-700">Google AdSense e o Cookie DoubleClick DART</p>
                        <p>O Google utiliza cookies DART para veicular anúncios com base em visitas a este e outros sites. Visitantes podem desativar visitando as políticas oficiais do Google...</p>
                        <p className="font-bold text-slate-700">Afiliados Shopee</p>
                        <p>Nosso blog participa do Programa de Afiliados da Shopee e exibe anúncios automáticos em parceria com o Google AdSense.</p>
                      </div>
                    )}
                    {geradorSubTab === 'termos' && (
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-slate-800 text-sm border-b border-slate-200 pb-1">Termos de Uso</h4>
                        <p>Bem-vindo ao <strong>{blogName}</strong>!</p>
                        <p>Ao acessar este blog, assumimos que você aceita estes termos e condições na íntegra. Não continue se não concordar com todos os termos descritos...</p>
                        <p className="font-bold text-slate-700">Limitação de Responsabilidade</p>
                        <p>O blog {blogName} atua apenas na curadoria de ofertas de afiliados Shopee. Não vendemos produtos diretamente e não nos responsabilizamos pelo envio, garantia ou pós-venda.</p>
                      </div>
                    )}
                    {geradorSubTab === 'disclaimer' && (
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-slate-800 text-sm border-b border-slate-200 pb-1">Aviso Legal e Divulgação</h4>
                        <p>Este blog, <strong>{blogName}</strong>, foca na curadoria de descontos, ofertas de produtos e achados da Shopee Brasil.</p>
                        <p className="font-bold text-slate-700">Programa de Afiliados Shopee</p>
                        <p>Ao clicar nos links e realizar compras, recebemos uma pequena comissão sem qualquer custo extra para você! Isso ajuda a manter nosso blog ativo.</p>
                        <p className="font-bold text-slate-700">Preços e Estoques</p>
                        <p>Preços e cupons são válidos estritamente no momento do post e podem mudar a qualquer momento pela Shopee ou lojas.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      let htmlTemplate = '';
                      if (geradorSubTab === 'politica') htmlTemplate = getPoliticaHtml();
                      else if (geradorSubTab === 'termos') htmlTemplate = getTermosHtml();
                      else if (geradorSubTab === 'disclaimer') htmlTemplate = getDisclaimerHtml();

                      navigator.clipboard.writeText(htmlTemplate);
                      setCopiedLegalCode(true);
                      setTimeout(() => setCopiedLegalCode(false), 2000);
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    {copiedLegalCode ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    {copiedLegalCode ? 'HTML Copiado com Sucesso!' : 'Copiar Código HTML da Página'}
                  </button>
                </div>

                {/* INSTRUÇÕES */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <span className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Como Publicar no Blogger (Passo a Passo):</span>
                  <ol className="text-[10px] text-slate-500 list-decimal pl-4 space-y-1">
                    <li>No painel esquerdo do Blogger, clique em <b>Páginas</b> (NÃO clique em Postagens!).</li>
                    <li>Clique no botão <b>Nova Página</b> no topo.</li>
                    <li>No título da página, coloque: <code className="bg-slate-200 px-1 rounded">{geradorSubTab === 'politica' ? 'Política de Privacidade' : geradorSubTab === 'termos' ? 'Termos de Uso' : 'Aviso Legal'}</code>.</li>
                    <li>No editor de texto, clique no ícone de lápis no canto superior esquerdo e escolha <b>Visualização HTML</b>.</li>
                    <li>Apague qualquer texto que já esteja lá e <b>cole o código HTML copiado acima</b>.</li>
                    <li>No painel lateral direito, em <i>Opções</i>, selecione "Não permitir, ocultar existentes" para comentários (recomendado para páginas legais).</li>
                    <li>Clique em <b>Publicar</b> no topo direito!</li>
                  </ol>
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* FOOTER INFO */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0" />
        <span>A estrutura XML gerada suporta todas as tags oficiais do Blogger sem dar erro ao salvar.</span>
      </div>

      {/* Product Modal */}
      {showProductModal && editingProduct && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-fade-in" id="product-edit-modal">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm">
                {editingProduct.id ? 'Editar Produto de Simulação' : 'Adicionar Produto de Simulação'}
              </h3>
              <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">Simulação</span>
            </div>

            <div className="p-5 space-y-3.5 overflow-y-auto flex-grow">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Título do Produto</label>
                <input
                  id="modal-product-title"
                  type="text"
                  value={editingProduct.title || ''}
                  onChange={e => setEditingProduct(p => ({ ...p, title: e.target.value }))}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                  placeholder="Ex: Caixa de Som Bluetooth Pro"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Preço Sem Desconto (De)</label>
                  <input
                    id="modal-product-price-old"
                    type="number"
                    step="0.01"
                    value={editingProduct.originalPrice || ''}
                    onChange={e => setEditingProduct(p => ({ ...p, originalPrice: parseFloat(e.target.value) }))}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                    placeholder="Ex: 89.90"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Preço Com Desconto (Por)*</label>
                  <input
                    id="modal-product-price-new"
                    type="number"
                    step="0.01"
                    value={editingProduct.discountedPrice || ''}
                    onChange={e => setEditingProduct(p => ({ ...p, discountedPrice: parseFloat(e.target.value) }))}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                    placeholder="Ex: 39.90"
                  />
                </div>
              </div>

              <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-150">
                <span className="block text-[11px] font-bold text-slate-500 uppercase">Imagem do Produto</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    {/* File Attacher Button */}
                    <label className="border border-dashed border-slate-300 hover:border-orange-500 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white hover:bg-orange-50/10 min-h-[90px]">
                      <ImageIcon className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-[10px] text-slate-600 font-bold text-center leading-none">Anexar Foto</span>
                      <span className="text-[8px] text-slate-400 mt-1">Carregar arquivo</span>
                      <input
                        id="modal-product-file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    
                    <input
                      id="modal-product-image"
                      type="url"
                      value={editingProduct.imageUrl || ''}
                      onChange={e => setEditingProduct(p => ({ ...p, imageUrl: e.target.value }))}
                      className="w-full text-[10px] px-2 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800 font-mono"
                      placeholder="Ou cole o link do Blogspot..."
                    />
                  </div>
                  
                  {/* Square Aspect Ratio Preview Box */}
                  <div className="flex flex-col items-center justify-center border border-slate-200 bg-white rounded-xl p-2 text-center">
                    <span className="text-[8px] text-slate-400 font-bold uppercase mb-1">Preview 1:1</span>
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-150 bg-slate-50 relative aspect-square">
                      {editingProduct.imageUrl ? (
                        <img 
                          src={editingProduct.imageUrl} 
                          alt="Visualização" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                          <ImageIcon className="w-6 h-6 stroke-1" />
                        </div>
                      )}
                    </div>
                    <span className="text-[8px] text-slate-400 mt-1 leading-normal">
                      Renderização quadrada. Ideal para o grid mobile!
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Link de Afiliado Individual</label>
                <input
                  id="modal-product-affiliate"
                  type="url"
                  value={editingProduct.affiliateUrl || ''}
                  onChange={e => setEditingProduct(p => ({ ...p, affiliateUrl: e.target.value }))}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800 font-mono text-[10px]"
                  placeholder="https://shope.ee/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Categoria</label>
                  <select
                    id="modal-product-category"
                    value={editingProduct.category || ''}
                    onChange={e => setEditingProduct(p => ({ ...p, category: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg text-slate-700 bg-white"
                  >
                    {config.categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                    {config.categories.length === 0 && <option value="Geral">Geral</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tag Especial (Badge)</label>
                  <input
                    id="modal-product-badge"
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={e => setEditingProduct(p => ({ ...p, badge: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 text-slate-800"
                    placeholder="Ex: 50% OFF, Frete Grátis"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2 justify-end">
              <button
                id="modal-btn-cancel"
                onClick={() => {
                  setEditingProduct(null);
                  setShowProductModal(false);
                }}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-600 transition-all"
              >
                Cancelar
              </button>
              <button
                id="modal-btn-save"
                onClick={handleSaveProduct}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-semibold text-white transition-all flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
