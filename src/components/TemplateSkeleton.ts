import { TemplateConfig, Product } from '../types';

function escapeUrlForXml(url: string): string {
  if (!url) return '';
  return url.replace(/&/g, '&amp;');
}

function escapeXmlText(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateBloggerTemplate(config: TemplateConfig, demoProducts: Product[]): string {
  const sanitizedShopName = escapeXmlText(config.shopName || 'Achadinhos da Shopee');
  const sanitizedDescription = escapeXmlText(config.shopDescription || 'Sua dose diária de descontos incríveis!');
  const sanitizedFooterText = escapeXmlText(config.footerText || 'Os preços podem sofrer alterações conforme as ofertas oficiais.');
  
  const primaryColor = config.primaryColor || '#EE4D2D';
  const secondaryColor = config.secondaryColor || '#F53D2D';
  const backgroundColor = config.backgroundColor || '#F5F5F5';
  
  const borderRadius = config.cardStyle === 'rounded' ? '14px' : config.cardStyle === 'square' ? '0px' : '8px';
  const shadowStyle = config.cardStyle === 'flat' ? 'none' : '0 4px 12px rgba(0,0,0,0.06)';

  const whatsappCleanUrl = config.whatsappNumber 
    ? `https://api.whatsapp.com/send?phone=${config.whatsappNumber.replace(/\D/g, '')}` 
    : '';
  
  const instagramCleanUrl = config.instagramUser 
    ? `https://instagram.com/${config.instagramUser.replace(/@/g, '')}` 
    : '';

  return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' b:responsive='true' lang='pt-BR' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta content='width=device-width, initial-scale=1' name='viewport'/>
  <title><data:blog.pageTitle/></title>
  
  <link expr:href='data:blog.blogspotFaviconUrl' rel='icon' type='image/x-icon'/>
  <b:include data='blog' name='all-head-content'/>

  <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap' rel='stylesheet'/>
  
  <b:skin><![CDATA[
    /* === VARIÁVEIS DE DESIGN DINÂMICAS === */
    :root {
      --primary: ${primaryColor};
      --primary-dark: ${secondaryColor};
      --accent: #FF6B35;
      --bg: ${backgroundColor};
      --surface: #FFFFFF;
      --text: #1E293B;
      --text-soft: #64748B;
      --text-light: #94A3B8;
      --border: #E2E8F0;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
      --shadow: ${shadowStyle};
      --shadow-lg: 0 12px 28px rgba(0,0,0,0.08);
      --radius-sm: calc(${borderRadius} / 1.5);
      --radius: ${borderRadius};
      --radius-lg: calc(${borderRadius} * 1.5);
      --radius-full: 50px;
      --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; display: flex; flex-direction: column; min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    a { text-decoration: none; color: inherit; transition: var(--transition); }

    /* === HEADER === */
    .header-main { background: var(--surface); box-shadow: var(--shadow-sm); position: sticky; top: 0; z-index: 1000; border-bottom: 2px solid var(--primary); }
    .header-container { max-width: 1200px; margin: 0 auto; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
    .logo-container a { display: inline-flex; align-items: center; gap: 10px; }
    .logo-icons-wrapper { display: flex; align-items: center; gap: 6px; }
    .logo-icon { color: var(--primary); flex-shrink: 0; }
    .logo-container h1 { font-size: 22px; font-weight: 800; color: var(--primary); letter-spacing: -0.5px; text-transform: uppercase; margin:0; line-height: 1.2; }
    .logo-container p { font-size: 11px; color: var(--text-soft); margin:0; font-weight: 500; }

    /* Busca */
    .search-box { position: relative; width: 35%; max-width: 400px; }
    .search-box input { width: 100%; padding: 9px 16px 9px 40px; border: 1.5px solid var(--border); border-radius: var(--radius-full); font-size: 13px; outline: none; transition: var(--transition); background: var(--bg); }
    .search-box input:focus { border-color: var(--primary); background: var(--surface); box-shadow: 0 0 0 3px rgba(238,77,45,0.08); }
    .search-box .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-light); pointer-events: none; }

    /* Redes sociais no header */
    .header-socials { display: flex; gap: 10px; align-items: center; }
    .social-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; transition: var(--transition); background: var(--bg); }
    .social-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
    .btn-instagram { background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: white; }
    .btn-whatsapp-header { background: #25D366; color: white; }

    /* === MOBILE HEADER === */
    @media (max-width: 768px) {
      .header-container { flex-direction: column; gap: 12px; padding: 12px 16px; }
      .logo-container h1 { font-size: 20px; }
      .search-box { width: 100%; max-width: 100%; }
      .header-socials { display: none; }
    }

    /* ========== CARROSSEL CORRIGIDO ========== */
    .carousel-section-container {
      max-width: 1200px;
      margin: 24px auto;
      padding: 0 16px;
    }
    .carousel-outer-wrapper {
      position: relative;
      width: 100%;
      border-radius: var(--radius);
      overflow: hidden; /* ESSENCIAL para não mostrar slides vizinhos */
      aspect-ratio: 3 / 1;
      box-shadow: var(--shadow-lg);
      background: var(--surface);
    }
    @media (max-width: 768px) {
      .carousel-outer-wrapper {
        aspect-ratio: 3 / 1; /* AJUSTADO: Usa a proporção exata 3:1 no mobile para renderizar sem qualquer corte */
        border-radius: var(--radius-sm);
      }
    }
    
    /* Container que o Blogger preenche com widgets */
    .carousel-inner-container {
      display: flex !important;
      height: 100% !important;
      width: 100% !important;
      transition: transform 0.5s ease-in-out;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
    }
    
    /* Remove completamente títulos de widget */
    .carousel-inner-container .widget-title,
    .carousel-inner-container .title,
    .carousel-inner-container h2 {
      display: none !important;
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Cada widget vira um slide individual */
    .carousel-inner-container .widget,
    .carousel-inner-container > div,
    .carousel-inner-container > * {
      min-width: 100% !important;
      width: 100% !important;
      max-width: 100% !important;
      flex-shrink: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      display: block !important;
      height: 100% !important;
    }
    
    /* Conteúdo do widget */
    .carousel-inner-container .widget-content {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Link e imagem ocupando todo o slide */
    .carousel-slide-item {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      cursor: pointer;
      margin: 0 !important;
      padding: 0 !important;
    }
    .carousel-slide-item img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover;
      object-position: center; /* Centralização perfeita no mobile e desktop */
      display: block;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Botões */
    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.9);
      color: var(--text);
      border: none;
      width: 38px;
      height: 38px;
      cursor: pointer;
      font-size: 18px;
      border-radius: 50%;
      transition: var(--transition);
      z-index: 10;
      backdrop-filter: blur(8px);
      box-shadow: var(--shadow-sm);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .carousel-btn:hover { background: var(--surface); box-shadow: var(--shadow); }
    .carousel-btn.prev { left: 12px; }
    .carousel-btn.next { right: 12px; }
    @media (max-width: 768px) {
      .carousel-btn { width: 32px; height: 32px; font-size: 14px; }
    }

    /* Dots */
    .carousel-dots {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 6px;
      z-index: 10;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: rgba(255,255,255,0.5);
      border-radius: 50%;
      cursor: pointer;
      transition: var(--transition);
      border: 1px solid rgba(0,0,0,0.1);
    }
    .dot.active {
      background: var(--primary);
      border-color: var(--primary);
      width: 22px;
      border-radius: 10px;
    }

    /* === NUVEM DE CATEGORIAS === */
    .categories-wrapper { max-width: 1200px; margin: 20px auto 12px; padding: 0 16px; }
    .categories-container { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: none; }
    .categories-container::-webkit-scrollbar { display: none; }
    .category-tab { background: var(--surface); border: 1px solid var(--border); padding: 7px 16px; border-radius: var(--radius-full); font-size: 13px; font-weight: 600; white-space: nowrap; cursor: pointer; transition: var(--transition); color: var(--text-soft); }
    .category-tab:hover { border-color: var(--primary); color: var(--primary); }
    .category-tab.active { background: var(--primary); color: white !important; border-color: var(--primary); }
    .label-count { font-size: 10px; opacity: 0.7; margin-left: 2px; }

    /* === ADSENSE PLACEHOLDER === */
    .ads-box { width: 100%; background: var(--surface); border: 1.5px dashed var(--border); color: var(--text-light); text-align: center; padding: 16px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 700; margin: 16px 0; text-transform: uppercase; letter-spacing: 0.5px; min-height: 80px; display: flex; align-items: center; justify-content: center; }

    /* === GRID DE PRODUTOS === */
    .main-wrapper { max-width: 1200px; margin: 0 auto; padding: 0 20px 50px; flex: 1; width: 100%; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
    @media (max-width: 768px) { .products-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } .main-wrapper { padding: 0 12px 40px; } }
    #main .widget-title { display: none !important; }

    /* === CARD DE PRODUTO === */
    .product-card { background: var(--surface); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); display: flex; flex-direction: column; position: relative; transition: var(--transition); }
    .product-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .card-badge { position: absolute; top: 10px; left: 10px; background: var(--primary); color: white; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 5px; z-index: 2; text-transform: uppercase; letter-spacing: 0.5px; }
    
    .like-wrapper { position: absolute; top: 10px; right: 10px; z-index: 3; display: flex; align-items: center; background: rgba(255,255,255,0.95); padding: 4px 10px; border-radius: var(--radius-full); box-shadow: var(--shadow-sm); border: 1px solid var(--border); backdrop-filter: blur(4px); }
    .like-btn { border: none; background: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-light); transition: var(--transition); padding: 0; }
    .like-btn:hover { transform: scale(1.15); color: var(--primary); }
    .like-btn.liked { color: var(--primary); }
    .like-btn.liked svg { fill: var(--primary); stroke: var(--primary); animation: heartPop 0.3s ease; }
    @keyframes heartPop { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }
    .like-count { font-size: 12px; font-weight: 700; color: var(--text); margin-left: 5px; }

    .card-image-wrapper { position: relative; width: 100%; padding-top: 100%; overflow: hidden; background: #f1f5f9; }
    .card-image-wrapper img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
    .product-card:hover .card-image-wrapper img { transform: scale(1.06); }
    
    .card-info { padding: 14px; display: flex; flex-direction: column; flex-grow: 1; }
    @media (max-width: 768px) { .card-info { padding: 10px; } }
    .card-category { font-size: 10px; color: var(--text-soft); text-transform: uppercase; font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; }
    .card-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 38px; line-height: 19px; }
    @media (max-width: 768px) { .card-title { font-size: 12px; height: 34px; line-height: 17px; margin-bottom: 8px; } }
    
    .btn-buy-grid { display: flex; align-items: center; justify-content: center; gap: 6px; background: var(--primary); color: white !important; padding: 9px; border-radius: var(--radius-sm); font-weight: 600; font-size: 13px; border: none; cursor: pointer; transition: var(--transition); width: 100%; margin-top: auto; letter-spacing: 0.3px; }
    .btn-buy-grid:hover { background: var(--primary-dark); transform: translateY(-1px); }
    .btn-buy-grid svg { width: 16px; height: 16px; }

    /* === SINGLE ARTICLE === */
    .article-container { background: var(--surface); border-radius: var(--radius); box-shadow: var(--shadow); padding: 24px; margin: 20px auto; max-width: 860px; border: 1px solid var(--border); }
    @media (max-width: 768px) { .article-container { padding: 18px 12px; margin: 8px; } }
    .article-header { border-bottom: 1.5px solid var(--border); padding-bottom: 12px; margin-bottom: 16px; }
    .article-tags { margin-bottom: 10px; }
    .article-tags span { display: inline-block; background: #f1f5f9; color: var(--primary); padding: 4px 10px; border-radius: var(--radius-full); font-size: 11px; font-weight: 700; margin: 0 3px 4px 0; text-transform: uppercase; }
    .article-title { font-size: 26px; font-weight: 800; color: var(--text); line-height: 1.3; margin-bottom: 8px; }
    .article-meta { font-size: 11px; color: var(--text-soft); font-weight: 500; margin-bottom: 12px; }
    @media (max-width: 768px) { .article-title { font-size: 20px; } }
    
    .social-share-article { display: flex; align-items: center; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
    .social-share-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; border-radius: var(--radius-full); font-size: 11px; font-weight: 700; color: white !important; cursor: pointer; border: none; transition: var(--transition); }
    .social-share-btn:hover { transform: translateY(-1px); box-shadow: var(--shadow); }
    .btn-wa { background: #25D366; }
    .btn-fb { background: #1877F2; }
    
    .article-like { display: inline-flex; align-items: center; height: 32px; padding: 0 12px; border-radius: var(--radius-full); gap: 6px; font-weight: 700; font-size: 11px; border: 1px solid var(--border); background: var(--surface); cursor: pointer; transition: var(--transition); color: var(--text-soft); }
    .article-like.liked { background: #fff5f5; border-color: var(--primary); color: var(--primary); }
    .post-body-text { line-height: 1.7; color: var(--text); font-size: 15px; margin-bottom: 16px; }
    .post-body-text img { max-width: 100%; height: auto; border-radius: var(--radius-sm); margin: 8px auto; display: block; }
    .post-body-text h2, .post-body-text h3 { color: var(--text); margin: 20px 0 10px; font-weight: 700; }
    .post-body-text a { color: var(--primary); font-weight: 600; }
    .no-posts { grid-column: 1 / -1; background: var(--surface); border-radius: var(--radius); padding: 40px; text-align: center; box-shadow: var(--shadow-sm); color: var(--text-soft); }

    /* === WHATSAPP FLUTUANTE (LADO ESQUERDO) === */
    .whatsapp-float { position: fixed; bottom: 90px; left: 28px; z-index: 9999; display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .whatsapp-float-btn { display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: #25D366; border-radius: 50%; box-shadow: 0 4px 16px rgba(37,211,102,0.35); cursor: pointer; transition: var(--transition); position: relative; }
    .whatsapp-float-btn:hover { transform: scale(1.08); box-shadow: 0 6px 22px rgba(37,211,102,0.45); }
    .whatsapp-float-btn::after { content: ''; position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 2px solid #25D366; animation: pulseWhats 2s infinite; }
    @keyframes pulseWhats { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.5); opacity: 0; } }
    .whatsapp-float-label { font-size: 9px; font-weight: 700; color: #25D366; text-transform: uppercase; letter-spacing: 0.5px; }
    @media (max-width: 768px) { .whatsapp-float { bottom: 80px; left: 16px; } .whatsapp-float-btn { width: 44px; height: 44px; } }

    /* === NOTIFICAÇÃO DE VENDAS (LADO ESQUERDO) === */
    .sales-popup { position: fixed; bottom: 28px; left: -350px; background: var(--surface); border-radius: var(--radius-full); box-shadow: var(--shadow-lg); display: flex; align-items: center; padding: 8px 16px 8px 8px; z-index: 9998; transition: left 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); font-size: 12px; border: 1px solid var(--border); max-width: 280px; }
    .sales-popup.show { left: 24px; }
    @media (max-width: 768px) { .sales-popup.show { left: 12px; bottom: 20px; } .sales-popup { max-width: 240px; font-size: 11px; } }
    .sales-popup-img { width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0; color: #fff; }
    .sales-popup-text strong { color: var(--text); font-weight: 700; }

    /* === COOKIE BANNER === */
    .cookie-consent { position: fixed; bottom: 0; left: 0; right: 0; background: var(--surface); border-top: 1px solid var(--border); box-shadow: 0 -4px 20px rgba(0,0,0,0.08); z-index: 10001; padding: 14px 24px; display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; font-size: 13px; color: var(--text-soft); transform: translateY(100%); transition: transform 0.4s ease; }
    .cookie-consent.show { transform: translateY(0); }
    .cookie-consent p { margin: 0; flex: 1; min-width: 200px; line-height: 1.4; }
    .cookie-consent a { color: var(--primary); font-weight: 600; text-decoration: underline; }
    .cookie-btn { background: var(--primary); color: white; border: none; padding: 8px 20px; border-radius: var(--radius-full); font-weight: 700; font-size: 13px; cursor: pointer; transition: var(--transition); white-space: nowrap; }
    .cookie-btn:hover { background: var(--primary-dark); }
    @media (max-width: 768px) { .cookie-consent { flex-direction: column; text-align: center; padding: 12px 16px; gap: 10px; } }

    /* === FOOTER === */
    .footer-main { background: #0f172a; padding: 36px 20px; text-align: center; color: #cbd5e1; font-size: 13px; margin-top: auto; border-top: 4px solid var(--primary); }
    .footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 12px; }
    .footer-links a { color: #94a3b8 !important; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; transition: var(--transition); }
    .footer-links a:hover { color: white !important; }
  ]]></b:skin>
</head>

<body>

  <!-- HEADER -->
  <header class='header-main'>
    <div class='header-container'>
      <div class='logo-container'>
        <a expr:href='data:blog.homepageUrl'>
          <div class='logo-icons-wrapper'>
            <svg class='logo-icon' height='26' viewBox='0 0 24 24' width='26' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='9' cy='21' r='1'></circle><circle cx='20' cy='21' r='1'></circle><path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path></svg>
            <svg class='logo-icon' height='26' viewBox='0 0 24 24' width='26' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path><line x1='3' y1='6' x2='21' y2='6'></line><path d='M16 10a4 4 0 0 1-8 0'></path></svg>
          </div>
          <h1>${sanitizedShopName}</h1>
        </a>
        <p>${sanitizedDescription}</p>
      </div>

      <div class='search-box'>
        <svg class='search-icon' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' fill='currentColor'/></svg>
        <form action='/search' method='get'>
          <input name='q' placeholder='Buscar produtos...' type='text'/>
        </form>
      </div>

      <div class='header-socials'>
        ${whatsappCleanUrl ? `
        <a class='social-btn btn-whatsapp-header' href='${whatsappCleanUrl}' target='_blank' title='WhatsApp'>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.694 2.533 2.602-.682c.984.585 1.767.866 2.841.866 3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.586-5.766-5.768-5.766z"/></svg>
        </a>` : ''}
        ${instagramCleanUrl ? `
        <a class='social-btn btn-instagram' href='${instagramCleanUrl}' target='_blank' title='Instagram'>
          <svg height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' fill='white'/></svg>
        </a>` : ''}
      </div>
    </div>
  </header>

  <!-- CARROSSEL DE BANNERS (CORRIGIDO) -->
  <b:if cond='data:view.isHomepage'>
    ${config.showCarousel ? `
    <div class='carousel-section-container'>
      <div class='carousel-outer-wrapper' id='carouselOuterWrapper'>
        
        <b:section class='carousel-inner-container' id='banners-carrossel' maxwidgets='4' showaddelement='yes'>
          
          <b:widget id='Image1' locked='false' title='Banner 1' type='Image' version='2' visible='true'>
            <b:includable id='main'>
              <a class='carousel-slide-item' expr:href='data:link ? data:link : &quot;#&quot;' expr:title='data:title'>
                <b:if cond='data:sourceUrl'>
                  <img expr:alt='data:title' expr:src='data:sourceUrl'/>
                <b:else/>
                  <img alt='Banner 1' src='https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&amp;h=400&amp;fit=crop&amp;q=80'/>
                </b:if>
              </a>
            </b:includable>
          </b:widget>

          <b:widget id='Image2' locked='false' title='Banner 2' type='Image' version='2' visible='true'>
            <b:includable id='main'>
              <a class='carousel-slide-item' expr:href='data:link ? data:link : &quot;#&quot;' expr:title='data:title'>
                <b:if cond='data:sourceUrl'>
                  <img expr:alt='data:title' expr:src='data:sourceUrl'/>
                <b:else/>
                  <img alt='Banner 2' src='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&amp;h=400&amp;fit=crop&amp;q=80'/>
                </b:if>
              </a>
            </b:includable>
          </b:widget>

          <b:widget id='Image3' locked='false' title='Banner 3' type='Image' version='2' visible='true'>
            <b:includable id='main'>
              <a class='carousel-slide-item' expr:href='data:link ? data:link : &quot;#&quot;' expr:title='data:title'>
                <b:if cond='data:sourceUrl'>
                  <img expr:alt='data:title' expr:src='data:sourceUrl'/>
                <b:else/>
                  <img alt='Banner 3' src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&amp;h=400&amp;fit=crop&amp;q=80'/>
                </b:if>
              </a>
            </b:includable>
          </b:widget>

          <b:widget id='Image4' locked='false' title='Banner 4' type='Image' version='2' visible='true'>
            <b:includable id='main'>
              <a class='carousel-slide-item' expr:href='data:link ? data:link : &quot;#&quot;' expr:title='data:title'>
                <b:if cond='data:sourceUrl'>
                  <img expr:alt='data:title' expr:src='data:sourceUrl'/>
                <b:else/>
                  <img alt='Banner 4' src='https://images.unsplash.com/photo-1555529771-835f59bfc50c?w=1200&amp;h=400&amp;fit=crop&amp;q=80'/>
                </b:if>
              </a>
            </b:includable>
          </b:widget>

        </b:section>
        
        <button class='carousel-btn prev' onclick='moveSlide(-1)' aria-label='Anterior'>&#10094;</button>
        <button class='carousel-btn next' onclick='moveSlide(1)' aria-label='Próximo'>&#10095;</button>
        <div class='carousel-dots' id='carouselDots'></div>
      </div>
    </div>` : ''}
  </b:if>

  <!-- ADSENSE TOPO -->
  ${config.showAdSense ? `
  <div class='container' style='max-width: 1200px; margin: 0 auto; padding: 0 16px;'>
    <div class='ads-box-wrapper' style='margin: 16px 0;'>
      <script async='async' src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${escapeXmlText(config.adSenseClientId)}' crossorigin='anonymous'></script>
      <ins class='adsbygoogle'
           style='display:block'
           data-ad-client='${escapeXmlText(config.adSenseClientId)}'
           data-ad-slot='${escapeXmlText(config.adSenseTopSlot)}'
           data-ad-format='auto'
           data-full-width-responsive='true'></ins>
      <script>//<![CDATA[
           (adsbygoogle = window.adsbygoogle || []).push({});
      //]]></script>
    </div>
  </div>` : ''}

  <!-- CATEGORIAS -->
  <b:if cond='data:view.isMultipleItems'>
    <b:section id='categories-section' class='categories-wrapper' maxwidgets='1' showaddelement='yes'>
      <b:widget id='Label1' locked='false' title='Categorias' type='Label' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='sorting'>ALPHA</b:widget-setting>
          <b:widget-setting name='display'>LIST</b:widget-setting>
          <b:widget-setting name='showFreqNumbers'>true</b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <div class='categories-container' id='categoriesContainer'>
            <a class='category-tab' expr:href='data:blog.homepageUrl' id='tab-all'>Ver Tudo</a>
            <b:loop values='data:labels' var='label'>
              <a class='category-tab' expr:href='data:label.url'>
                <data:label.name/> <span class='label-count'>(<data:label.count/>)</span>
              </a>
            </b:loop>
          </div>
        </b:includable>
        <b:includable id='aboutPostAuthor'/><b:includable id='addComments'/><b:includable id='commentAuthorAvatar'/><b:includable id='commentDeleteIcon'/><b:includable id='commentFormIframeSrc'/><b:includable id='commentItem'/><b:includable id='commentList'/><b:includable id='commentsTitle'/><b:includable id='feedLinks'/><b:includable id='feedLinksBody'/><b:includable id='homePageLink'/><b:includable id='iframeComments'/><b:includable id='inlineAd'/><b:includable id='manageComments'/><b:includable id='post'/><b:includable id='postBody'/><b:includable id='postBodySnippet'/><b:includable id='postCommentsLink'/><b:includable id='postFooter'/><b:includable id='postFooterAuthorProfile'/><b:includable id='postHeader'/><b:includable id='postJumpLink'/><b:includable id='postMeta'/><b:includable id='postPagination'/><b:includable id='postTitle'/><b:includable id='previousPageLink'/><b:includable id='status-message'/>
      </b:widget>
    </b:section>
  </b:if>

  <!-- CONTEÚDO PRINCIPAL -->
  <main class='main-wrapper' id='produtos'>
    <b:section id='main' showaddelement='yes'>
      <b:widget id='Blog1' locked='true' title='Postagens' type='Blog' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='showDateHeader'>false</b:widget-setting>
          <b:widget-setting name='showShareButtons'>true</b:widget-setting>
          <b:widget-setting name='showCommentLink'>false</b:widget-setting>
          <b:widget-setting name='showAuthor'>true</b:widget-setting>
          <b:widget-setting name='showLabels'>true</b:widget-setting>
          <b:widget-setting name='showTimestamp'>true</b:widget-setting>
        </b:widget-settings>
        
        <b:includable id='main'>
          <b:if cond='data:view.isMultipleItems'>
            <div style='margin-bottom: 20px; padding-left: 4px;'>
              <h2 style='font-size: 22px; font-weight: 800; color: var(--text); margin: 0;'>Produtos em Destaque</h2>
            </div>
            <div class='products-grid'>
              <b:if cond='not data:posts.empty'>
                <b:loop values='data:posts' var='post'>
                  <article class='product-card'>
                    <div class='like-wrapper'>
                      <button aria-label='Curtir' class='like-btn' expr:data-post-id='data:post.id' onclick='toggleLike(this, event)'>
                        <svg fill='none' height='16' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='16'><path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/></svg>
                      </button>
                      <span class='like-count' expr:id='"like-count-" + data:post.id'>--</span>
                    </div>
                    <div class='card-badge' style='display:none;' expr:id='"badge-" + data:post.id'>% OFF</div>
                    <a class='card-image-link' expr:href='data:post.url'>
                      <div class='card-image-wrapper'>
                        <b:if cond='data:post.featuredImage'>
                          <img expr:alt='data:post.title' expr:src='data:post.featuredImage' loading='lazy'/>
                        <b:elseif cond='data:post.firstImageUrl'/>
                          <img expr:alt='data:post.title' expr:src='data:post.firstImageUrl' loading='lazy'/>
                        <b:elseif cond='data:post.thumbnailUrl'/>
                          <img expr:alt='data:post.title' expr:src='data:post.thumbnailUrl' loading='lazy'/>
                        <b:else/>
                          <img alt='Sem imagem' src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&amp;auto=format&amp;fit=crop&amp;q=80' loading='lazy'/>
                        </b:if>
                      </div>
                    </a>
                    <div class='card-info'>
                      <div class='card-category'>
                        <b:if cond='data:post.labels'>
                          <b:loop values='data:post.labels' var='label'><span class='post-tag-item' style='margin-right:4px;'><data:label.name/></span></b:loop>
                        <b:else/><span class='post-tag-item'>Geral</span></b:if>
                      </div>
                      <a expr:href='data:post.url'><h2 class='card-title'><data:post.title/></h2></a>
                      <a class='btn-buy-grid' expr:href='data:post.url'>
                        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'/><line x1='3' y1='6' x2='21' y2='6'/><path d='M16 10a4 4 0 0 1-8 0'/></svg>
                        Ver Oferta
                      </a>
                    </div>
                    <div expr:id='"raw-content-" + data:post.id' style='display:none;'><data:post.body/></div>
                  </article>
                </b:loop>
              <b:else/>
                <div class='no-posts'><h3>Nenhuma oferta encontrada!</h3><p style='margin-top:8px;'>Volte mais tarde ou escolha outra categoria.</p></div>
              </b:if>
            </div>
            <b:include name='nextPageLink'/>
          </b:if>

          <b:if cond='data:view.isSingleItem'>
            <b:loop values='data:posts' var='post'>
              <article class='article-container'>
                <header class='article-header'>
                  <div style='display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px;'>
                    <div class='article-tags'>
                      <b:if cond='data:post.labels'><b:loop values='data:post.labels' var='label'><span><data:label.name/></span></b:loop></b:if>
                    </div>
                    <button class='like-btn article-like' expr:data-post-id='data:post.id' onclick='toggleLike(this, event)'>
                      <svg fill='none' height='14' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24' width='14'><path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/></svg>
                      Curtir <span class='like-count' expr:id='"like-count-article-" + data:post.id'>--</span>
                    </button>
                  </div>
                  <h1 class='article-title'><data:post.title/></h1>
                  <div class='article-meta'>Publicado por <b:if cond='data:post.author'><data:post.author.name/></b:if> em <data:post.dateHeader/></div>
                  <div class='social-share-article'>
                    <a class='social-share-btn btn-wa' expr:href='&quot;https://api.whatsapp.com/send?text=Olha esse achadinho: &quot; + data:post.url' target='_blank'>WhatsApp</a>
                    <a class='social-share-btn btn-fb' expr:href='&quot;https://www.facebook.com/sharer.php?u=&quot; + data:post.url' target='_blank'>Facebook</a>
                  </div>
                </header>
                
                <!-- ADSENSE ARTIGO -->
                ${config.showAdSense ? `
                <div class='ads-box-wrapper' style='margin: 12px 0;'>
                  <script async='async' src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${escapeXmlText(config.adSenseClientId)}' crossorigin='anonymous'></script>
                  <ins class='adsbygoogle'
                       style='display:block'
                       data-ad-client='${escapeXmlText(config.adSenseClientId)}'
                       data-ad-slot='${escapeXmlText(config.adSenseMiddleSlot || config.adSenseTopSlot)}'
                       data-ad-format='auto'
                       data-full-width-responsive='true'></ins>
                  <script>//<![CDATA[
                       (adsbygoogle = window.adsbygoogle || []).push({});
                  //]]></script>
                </div>` : ''}

                <div class='post-body-text'><data:post.body/></div>
                
                <!-- ADSENSE FINAL -->
                ${config.showAdSense ? `
                <div class='ads-box-wrapper' style='margin: 12px 0;'>
                  <script async='async' src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${escapeXmlText(config.adSenseClientId)}' crossorigin='anonymous'></script>
                  <ins class='adsbygoogle'
                       style='display:block'
                       data-ad-client='${escapeXmlText(config.adSenseClientId)}'
                       data-ad-slot='${escapeXmlText(config.adSenseBottomSlot || config.adSenseTopSlot)}'
                       data-ad-format='auto'
                       data-full-width-responsive='true'></ins>
                  <script>//<![CDATA[
                       (adsbygoogle = window.adsbygoogle || []).push({});
                  //]]></script>
                </div>` : ''}
              </article>
            </b:loop>
          </b:if>
        </b:includable>

        <b:includable id='nextPageLink'>
          <div style='text-align:center;margin:36px 0;'>
            <b:if cond='data:newerPageUrl'><a class='btn-buy-grid' expr:href='data:newerPageUrl' style='display:inline-block;width:auto;padding:10px 24px;margin-right:8px;'>← Anterior</a></b:if>
            <b:if cond='data:olderPageUrl'><a class='btn-buy-grid' expr:href='data:olderPageUrl' style='display:inline-block;width:auto;padding:10px 24px;'>Próxima →</a></b:if>
          </div>
        </b:includable>
        <b:includable id='aboutPostAuthor'/><b:includable id='addComments'/><b:includable id='commentAuthorAvatar'/><b:includable id='commentDeleteIcon'/><b:includable id='commentFormIframeSrc'/><b:includable id='commentItem'/><b:includable id='commentList'/><b:includable id='commentsTitle'/><b:includable id='feedLinks'/><b:includable id='feedLinksBody'/><b:includable id='homePageLink'/><b:includable id='iframeComments'/><b:includable id='inlineAd'/><b:includable id='manageComments'/><b:includable id='post'/><b:includable id='postBody'/><b:includable id='postBodySnippet'/><b:includable id='postCommentsLink'/><b:includable id='postFooter'/><b:includable id='postFooterAuthorProfile'/><b:includable id='postHeader'/><b:includable id='postJumpLink'/><b:includable id='postMeta'/><b:includable id='postPagination'/><b:includable id='postTitle'/><b:includable id='previousPageLink'/><b:includable id='status-message'/>
      </b:widget>
    </b:section>
  </main>

  <!-- FOOTER -->
  <b:section id='footer' class='footer-section' maxwidgets='1' showaddelement='no'>
    <b:widget id='Text1' locked='true' title='Rodapé' type='Text' version='2' visible='true'>
      <b:includable id='main'>
        <footer class='footer-main'>
          <div style='font-weight:900;font-size:20px;margin-bottom:8px;color:var(--primary)'>${sanitizedShopName}</div>
          <div class='footer-links'>
            <a expr:href='data:blog.homepageUrl'>Home</a>
            <a href='${escapeUrlForXml(config.footerAboutUrl)}'>Sobre</a>
            <a href='${escapeUrlForXml(config.footerContactUrl)}'>Contato</a>
            <a href='${escapeUrlForXml(config.footerPrivacyUrl)}'>Privacidade</a>
            <a href='${escapeUrlForXml(config.footerTermsUrl)}'>Termos</a>
          </div>
          <div style='margin-top:14px;opacity:0.6;'>${sanitizedFooterText}</div>
          <div style='font-size:10px;margin-top:14px;'>&#169; <span id='year-placeholder'/> TODOS OS DIREITOS RESERVADOS.</div>
        </footer>
      </b:includable>
    </b:widget>
  </b:section>

  ${whatsappCleanUrl ? `
  <!-- WHATSAPP FLUTUANTE (LADO ESQUERDO) -->
  <div class='whatsapp-float'>
    <a class='whatsapp-float-btn' href='${whatsappCleanUrl}' target='_blank' title='Fale conosco no WhatsApp' aria-label='WhatsApp'>
      <svg viewBox='0 0 24 24' width='22' height='22' fill='white'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/>
      </svg>
    </a>
    <span class='whatsapp-float-label'>Ajuda</span>
  </div>` : ''}

  <!-- COOKIE CONSENT BANNER -->
  <div class='cookie-consent' id='cookieConsent'>
    <p>🍪 Utilizamos cookies para melhorar sua experiência, personalizar anúncios e analisar o tráfego, em conformidade com a <a href='/p/politica-de-privacidade.html'>Política de Privacidade</a>.</p>
    <button class='cookie-btn' onclick='acceptCookies()'>Aceitar</button>
  </div>

  <script>//<![CDATA[
    document.addEventListener("DOMContentLoaded", function() {
      // Data do Rodapé
      var yr = document.getElementById('year-placeholder');
      if (yr) yr.textContent = new Date().getFullYear();

      // Cookies
      if (!localStorage.getItem('cookies_accepted')) {
        document.getElementById('cookieConsent').classList.add('show');
      }
      window.acceptCookies = function() {
        localStorage.setItem('cookies_accepted', 'true');
        document.getElementById('cookieConsent').classList.remove('show');
      };

      // Limpeza de Hashtags nas Abas
      document.querySelectorAll('.category-tab').forEach(function(tab) {
        if(tab.id !== 'tab-all') {
          var childNodes = tab.childNodes;
          for(var i=0; i<childNodes.length; i++) {
            if(childNodes[i].nodeType === 3) { 
              var cleanText = childNodes[i].nodeValue.trim().replace(/^#+/, '').trim();
              if(cleanText) childNodes[i].nodeValue = '#' + cleanText + ' ';
            }
          }
        }
      });

      var currentUrl = window.location.href;
      if(currentUrl.indexOf('/search/label/') === -1) {
         var tabAll = document.getElementById('tab-all');
         if(tabAll) tabAll.classList.add('active');
      } else {
         document.querySelectorAll('.category-tab').forEach(function(tab) {
            if(currentUrl.indexOf(tab.getAttribute('href')) !== -1) tab.classList.add('active');
         });
      }

      // Extração de Badge OFF
      document.querySelectorAll('.product-card').forEach(function(card) {
        var tagSpans = card.querySelectorAll('.post-tag-item');
        tagSpans.forEach(function(span) {
          var tagText = span.textContent.trim().replace(/^#+/, '').trim();
          span.textContent = '#' + tagText;
        });
        var rawDiv = card.querySelector('[id^="raw-content-"]');
        if (!rawDiv) return;
        var postId = rawDiv.id.replace('raw-content-', '');
        var badgeEl = document.getElementById("badge-" + postId);
        var text = rawDiv.innerHTML || rawDiv.textContent;
        if (text) {
          var tagMatch = text.match(/\\\[tag\\\](.*?)\\\[\\/tag\\\]/);
          if (tagMatch && tagMatch[1] && badgeEl) {
            badgeEl.textContent = tagMatch[1].trim();
            badgeEl.style.display = "block";
          }
        }
      });

      // Curtidas
      var savedLikes = JSON.parse(localStorage.getItem('shopee_likes') || '{}');
      document.querySelectorAll('.like-btn').forEach(function(btn) {
          var pid = btn.getAttribute('data-post-id');
          var countGrid = document.getElementById('like-count-' + pid);
          var countArticle = document.getElementById('like-count-article-' + pid);
          var base = (parseInt(pid.substring(pid.length - 4)) % 300) + 42; 
          if (savedLikes[pid]) { btn.classList.add('liked'); base += 1; }
          if (countGrid) countGrid.textContent = base;
          if (countArticle) countArticle.textContent = base;
      });

      // Inicializa carrossel e popup
      initCarousel();
      initSalesPopup();
    });

    function toggleLike(btn, event) {
        event.preventDefault(); 
        var pid = btn.getAttribute('data-post-id');
        var savedLikes = JSON.parse(localStorage.getItem('shopee_likes') || '{}');
        var countGrid = document.getElementById('like-count-' + pid);
        var countArticle = document.getElementById('like-count-article-' + pid);
        var curr = parseInt(countGrid ? countGrid.textContent : (countArticle ? countArticle.textContent : "0"));
        if (savedLikes[pid]) {
            delete savedLikes[pid];
            document.querySelectorAll('.like-btn[data-post-id="'+pid+'"]').forEach(function(b){ b.classList.remove('liked'); });
            if(countGrid) countGrid.textContent = curr - 1;
            if(countArticle) countArticle.textContent = curr - 1;
        } else {
            savedLikes[pid] = true;
            document.querySelectorAll('.like-btn[data-post-id="'+pid+'"]').forEach(function(b){ b.classList.add('liked'); });
            if(countGrid) countGrid.textContent = curr + 1;
            if(countArticle) countArticle.textContent = curr + 1;
        }
        localStorage.setItem('shopee_likes', JSON.stringify(savedLikes));
    }

    // CARROSSEL (com correção extra para evitar sobreposição)
    var slideIndex = 0, slideElements = [], carouselInterval;

    function initCarousel() {
      var container = document.getElementById('banners-carrossel');
      if (!container) return;
      
      // Remove quaisquer títulos de widget residuais
      container.querySelectorAll('.widget-title, .title, h2').forEach(function(el) {
        el.style.display = 'none';
        el.style.height = '0';
        el.style.margin = '0';
        el.style.padding = '0';
      });

      slideElements = container.querySelectorAll('.widget');
      if (slideElements.length === 0) {
        var wrapper = document.getElementById('carouselOuterWrapper');
        if (wrapper) wrapper.style.display = 'none';
        return;
      }
      
      // Garante que cada widget ocupe 100% via JS
      slideElements.forEach(function(widget) {
        widget.style.minWidth = '100%';
        widget.style.width = '100%';
        widget.style.maxWidth = '100%';
        widget.style.flexShrink = '0';
        widget.style.margin = '0';
        widget.style.padding = '0';
        widget.style.display = 'block';
        widget.style.height = '100%';
        
        // Ajusta elementos internos
        var content = widget.querySelector('.widget-content');
        if (content) {
          content.style.height = '100%';
          content.style.margin = '0';
          content.style.padding = '0';
        }
        var link = widget.querySelector('a');
        if (link) {
          link.style.display = 'block';
          link.style.width = '100%';
          link.style.height = '100%';
        }
        var img = widget.querySelector('img');
        if (img) {
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          img.style.display = 'block';
        }
      });

      var dotsContainer = document.getElementById('carouselDots');
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slideElements.forEach(function(_, i) {
          var dot = document.createElement('span');
          dot.className = 'dot' + (i === 0 ? ' active' : '');
          dot.onclick = function() { currentSlide(i); };
          dotsContainer.appendChild(dot);
        });
      }

      // Posição inicial
      container.style.transform = 'translateX(0)';
      
      if (slideElements.length > 1) {
        carouselInterval = setInterval(function() { moveSlide(1); }, 6000);
      }
    }

    window.showSlide = function(index) {
      if (!slideElements.length) return;
      if (index >= slideElements.length) slideIndex = 0;
      else if (index < 0) slideIndex = slideElements.length - 1;
      else slideIndex = index;
      
      var container = document.getElementById('banners-carrossel');
      if (container) {
        container.style.transform = 'translateX(-' + (slideIndex * 100) + '%)';
      }
      
      document.querySelectorAll('.dot').forEach(function(d, i) { 
        d.classList.toggle('active', i === slideIndex); 
      });
    };

    window.moveSlide = function(n) {
      showSlide(slideIndex + n);
      clearInterval(carouselInterval);
      carouselInterval = setInterval(function() { moveSlide(1); }, 6000);
    };

    window.currentSlide = function(n) {
      showSlide(n);
      clearInterval(carouselInterval);
      carouselInterval = setInterval(function() { moveSlide(1); }, 6000);
    };

    // POPUP DE VENDAS (ESQUERDA)
    function initSalesPopup() {
        const names = ["Ana C.", "Maria S.", "João P.", "Lucas M.", "Juliana F.", "Carla T.", "Marcos R.", "Fernanda A.", "Aline B.", "Pedro H."];
        const actions = ["aproveitou a oferta!", "acabou de comprar!", "garantiu o desconto!"];
        const popup = document.createElement('div');
        popup.className = 'sales-popup';
        popup.innerHTML = '<div class="sales-popup-img"><svg width="16" height="16" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div><div class="sales-popup-text"><strong id="sales-name"></strong> <span id="sales-action"></span></div>';
        document.body.appendChild(popup);
        function showPopup() {
            var nameEl = document.getElementById('sales-name');
            var actionEl = document.getElementById('sales-action');
            if (nameEl) nameEl.textContent = names[Math.floor(Math.random() * names.length)];
            if (actionEl) actionEl.textContent = actions[Math.floor(Math.random() * actions.length)];
            popup.classList.add('show');
            setTimeout(function() { popup.classList.remove('show'); }, 4000);
        }
        setTimeout(function() {
            showPopup();
            setInterval(function() { setTimeout(showPopup, Math.random() * 8000); }, 14000);
        }, 5000);
    }
  //]]></script>
</body>
</html>`;
}
