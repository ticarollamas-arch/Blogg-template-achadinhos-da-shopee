import React, { useState } from 'react';
import { TemplateConfig, Product } from '../types';
import { generateBloggerTemplate } from './TemplateSkeleton';
import { 
  Copy, 
  Download, 
  Check, 
  FileCode, 
  BookOpen, 
  AlertTriangle, 
  Terminal, 
  ExternalLink,
  HelpCircle,
  HelpCircle as HelpIcon,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface TemplateExporterProps {
  config: TemplateConfig;
  products: Product[];
}

export default function TemplateExporter({ config, products }: TemplateExporterProps) {
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [expandedSection, setExpandedSection] = useState<string>('xml');
  const [blogLink, setBlogLink] = useState('https://achadinhos-da-shopee.blogspot.com');
  const [nicho, setNicho] = useState('Achadinhos da Shopee / Utilidades domésticas');
  const [promptCopied, setPromptCopied] = useState(false);

  const generatedXml = generateBloggerTemplate(config, products);

  const fallbackCopy = (text: string): boolean => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback copy failed', err);
      return false;
    }
  };

  const copyText = async (text: string): Promise<boolean> => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        return fallbackCopy(text);
      }
    } else {
      return fallbackCopy(text);
    }
  };

  const handleCopyCode = async () => {
    const success = await copyText(generatedXml);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      // Show alert if both fail
      alert("Falha ao copiar automaticamente. Por favor, selecione e copie o código na caixa de texto abaixo manualmente.");
    }
  };

  const handleDownloadXml = () => {
    const blob = new Blob([generatedXml], { type: 'text/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shopee-afiliados-${config.shopName.toLowerCase().replace(/\s+/g, '-') || 'template'}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const steps = [
    {
      title: 'Baixar o Template XML',
      desc: 'Clique no botão "Baixar Arquivo .xml" acima ou copie todo o código XML fornecido nesta caixa.'
    },
    {
      title: 'Acessar o Painel do Blogger',
      desc: 'Faça login no painel do Blogger (blogger.com), selecione seu blog e clique no menu lateral esquerdo em "Tema" (Theme).'
    },
    {
      title: 'Acessar o Editor de HTML',
      desc: 'Clique na seta para baixo ao lado do botão laranja "Personalizar" e selecione "Editar HTML" (Edit HTML).'
    },
    {
      title: 'Substituir Todo o Código',
      desc: 'Selecione todo o código existente (Ctrl+A), apague-o completamente, cole o código XML gerado por este aplicativo e clique no botão de Salvar (ícone de disquete no canto superior direito).'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden flex flex-col h-full" id="exporter-root">
      
      {/* EXPORT CONTROL BOX */}
      <div className="p-5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2 mb-3">
          <FileCode className="w-5 h-5 text-orange-500" />
          <h2 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Exportar Template do Blogger</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Gere o seu arquivo customizado com todas as cores, links e configurações que você editou neste painel. Prontinho para instalar.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            id="btn-copy-xml"
            onClick={handleCopyCode}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              copied 
                ? 'bg-emerald-500 text-white shadow-sm' 
                : 'bg-slate-800 hover:bg-slate-900 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 animate-scale-up" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Código XML
              </>
            )}
          </button>
          
          <button
            id="btn-download-xml"
            onClick={handleDownloadXml}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            Baixar Arquivo .xml
          </button>
        </div>
      </div>

      {/* DETAILED CONTENT ACCORDION */}
      <div className="p-5 overflow-y-auto flex-grow max-h-[calc(100vh-295px)] space-y-4">
        
        {/* SECTION 1: CODE PREVIEW */}
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <button
            id="accordion-toggle-xml"
            onClick={() => setExpandedSection(expandedSection === 'xml' ? 'xml' : 'xml')} // Keep interactive toggles
            className="w-full bg-slate-50 px-4 py-3 flex items-center justify-between text-left border-b border-slate-100"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700">Visualizar Código XML</span>
            </div>
            <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded">
              {generatedXml.split('\n').length} Linhas
            </span>
          </button>
          
          <div className="p-3 bg-slate-950 font-mono text-[10px] text-slate-300 h-44 scrollbar-thin">
            <textarea
              readOnly
              value={generatedXml}
              onClick={(e) => {
                (e.target as HTMLTextAreaElement).select();
              }}
              className="w-full h-full bg-transparent text-slate-300 font-mono text-[10px] resize-none focus:outline-none focus:ring-0 select-all border-none p-0"
              placeholder="Código do template gerado"
            />
          </div>
        </div>

        {/* SECTION 2: NO-ERROR INSTALLATION TUTORIAL */}
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <button
            id="accordion-toggle-tutorial"
            onClick={() => setExpandedSection(expandedSection === 'tutorial' ? 'xml' : 'tutorial')}
            className="w-full bg-slate-50 px-4 py-3 flex items-center justify-between text-left border-b border-slate-100"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-slate-700">Como Instalar no Blogger (Passo a Passo)</span>
            </div>
            {expandedSection === 'tutorial' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSection === 'tutorial' && (
            <div className="p-4 space-y-4 bg-white animate-slide-down">
              <div className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800">
                <AlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5 text-amber-600" />
                <p className="text-[11px] leading-relaxed">
                  <strong>IMPORTANTE:</strong> Para evitar erros ao salvar no Blogger, use exclusivamente a opção <strong>"Editar HTML"</strong>. Nunca tente colar o código usando as ferramentas de layout padrão do Blogger.
                </p>
              </div>

              {/* Steps indicators */}
              <div className="space-y-3.5">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-normal">{st.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: ADDING PRODUCTS GUIDE (SQUARE & SIMPLE) */}
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <button
            id="accordion-toggle-shortcodes"
            onClick={() => setExpandedSection(expandedSection === 'shortcodes' ? 'xml' : 'shortcodes')}
            className="w-full bg-slate-50 px-4 py-3 flex items-center justify-between text-left border-b border-slate-100"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-700">Como Adicionar os Seus Produtos</span>
            </div>
            {expandedSection === 'shortcodes' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSection === 'shortcodes' && (
            <div className="p-4 space-y-3 bg-white animate-slide-down text-left">
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada produto no seu blog será criado através de uma <strong>Postagem Comum</strong> do Blogger. O template foi otimizado para que você não precise de nenhuma tag ou código especial! Veja como criar:
              </p>

              <div className="space-y-3 text-[11px]">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="block font-bold text-slate-700 mb-1">1. Título da Postagem</span>
                  <p className="text-slate-500">Escreva o título do produto exatamente como quer que apareça no card da página inicial.</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="block font-bold text-slate-700 mb-1">2. Imagem Destacada (Automática)</span>
                  <p className="text-slate-500">Insira a imagem do produto no editor. O Blogger usará ela como imagem destacada e o template a exibirá perfeitamente no formato quadrado (1:1), idêntico aos cards originais da Shopee!</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="block font-bold text-slate-700 mb-1">3. Marcadores (Categorias)</span>
                  <p className="text-slate-500">Defina os marcadores (ex: "Moda", "Cozinha", "Eletrônicos") para que os produtos sejam organizados nos botões de filtros do menu do site.</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <span className="block font-bold text-slate-700 mb-1">4. Corpo da Postagem (100% Manual)</span>
                  <p className="text-slate-500 leading-relaxed">
                    Escreva o texto do seu post livremente. Você pode incluir o título, a descrição completa e inserir manualmente o seu botão de afiliado da Shopee (com o seu link comissionado). <br />
                    <strong className="text-slate-700 font-bold">Fluxo do Usuário:</strong> Quando o visitante clica no card ou no botão "Ver o Link" na página inicial, ele abre o artigo correspondente. Lá dentro, ele vê tudo o que você escreveu e clica no botão que você inseriu!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: GEMINI PBN PROMPT GENERATOR */}
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <button
            id="accordion-toggle-pbn"
            onClick={() => setExpandedSection(expandedSection === 'pbn' ? 'xml' : 'pbn')}
            className="w-full bg-slate-50 px-4 py-3 flex items-center justify-between text-left border-b border-slate-100"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-xs font-bold text-slate-700 text-left">Gerador de Prompt Gemini (Artigos PBN)</span>
            </div>
            {expandedSection === 'pbn' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSection === 'pbn' && (
            <div className="p-4 space-y-4 bg-white animate-slide-down text-left">
              <p className="text-xs text-slate-600 leading-relaxed">
                Crie artigos de PBN profissionais de forma automatizada usando o <strong>Gemini</strong>. Insira as informações abaixo para gerar o comando pronto personalizado para copiar e colar:
              </p>

              {/* INPUT FIELDS */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Link do Seu Blog:</label>
                  <input
                    type="text"
                    value={blogLink}
                    onChange={(e) => setBlogLink(e.target.value)}
                    placeholder="Ex: https://seublog.blogspot.com"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Nicho do Seu Site:</label>
                  <input
                    type="text"
                    value={nicho}
                    onChange={(e) => setNicho(e.target.value)}
                    placeholder="Ex: Achadinhos da Shopee / Utilidades domésticas"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* GENERATED PROMPT PREVIEW */}
              <div className="space-y-1.5">
                <span className="block text-[11px] font-bold text-slate-700">Comando Gerado para o Gemini:</span>
                <div className="relative bg-violet-950 text-violet-100 font-mono p-3 rounded-xl text-[10px] leading-relaxed">
                  <pre className="whitespace-pre-wrap">
{`Atue como um especialista em SEO e copy. Com base no link ${blogLink || '[SEU LINK DO BLOG]'} e no nicho ${nicho || '[NICHO DO SITE]'}, escreva um artigo curto (150-200 palavras) com uma estrutura de PBN. O texto deve soar natural, focado em resolver um problema do leitor, com o link do meu blog inserido de forma orgânica no meio do texto. Use um tom de voz de recomendação de um usuário em um fórum.`}
                  </pre>
                  <button
                    onClick={async () => {
                      const promptText = `Atue como um especialista em SEO e copy. Com base no link ${blogLink || '[SEU LINK DO BLOG]'} e no nicho ${nicho || '[NICHO DO SITE]'}, escreva um artigo curto (150-200 palavras) com uma estrutura de PBN. O texto deve soar natural, focado em resolver um problema do leitor, com o link do meu blog inserido de forma orgânica no meio do texto. Use um tom de voz de recomendação de um usuário em um fórum.`;
                      const success = await copyText(promptText);
                      if (success) {
                        setPromptCopied(true);
                        setTimeout(() => setPromptCopied(false), 2000);
                      } else {
                        alert("Não foi possível copiar automaticamente. Por favor, selecione o texto do prompt e copie manualmente.");
                      }
                    }}
                    className={`absolute right-2 bottom-2 ${promptCopied ? 'bg-emerald-600' : 'bg-violet-700 hover:bg-violet-650'} text-white text-[9px] px-2.5 py-1.5 rounded-lg font-bold transition-colors shadow-xs`}
                  >
                    {promptCopied ? 'Copiado!' : 'Copiar Prompt'}
                  </button>
                </div>
              </div>

              {/* BACKLINKS CHECKLIST */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Checklist de Backlinks de Autoridade</span>
                </div>
                
                <div className="space-y-2 text-[11px] leading-relaxed">
                  <div className="flex gap-2">
                    <span className="font-bold text-orange-500 shrink-0">Tier 1 (Base):</span>
                    <span className="text-slate-600">É o seu blog de achadinhos. O pilar central de toda a sua estratégia onde os usuários chegam para pegar os links dos produtos da Shopee.</span>
                  </div>
                  <div className="flex gap-2 border-t border-slate-200/50 pt-2">
                    <span className="font-bold text-violet-500 shrink-0">Tier 2 (PBN):</span>
                    <span className="text-slate-600">São os blogs e sites externos que você cria ou posta para publicar artigos que contêm backlinks apontando diretamente para o seu blog principal.</span>
                  </div>
                  <div className="flex gap-2 border-t border-indigo-200/50 pt-2 p-2 bg-indigo-50/50 rounded-lg">
                    <span className="font-bold text-indigo-700 shrink-0">Segurança Máxima:</span>
                    <span className="text-indigo-800 font-medium">Nunca aponte os links da PBN diretamente para a sua página de afiliado da Shopee. Aponte sempre para o post do seu próprio blog! Isso cria autoridade orgânica e protege seus domínios de punições do Google.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
