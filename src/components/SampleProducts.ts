import { Product } from '../types';

export const DEFAULT_CATEGORIES = [
  'Eletrônicos',
  'Moda & Calçados',
  'Acessórios',
  'Casa & Cozinha',
  'Beleza & Cuidados'
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Fone de Ouvido Bluetooth Sem Fio AirPro TWS Estéreo',
    originalPrice: 89.90,
    discountedPrice: 39.90,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    affiliateUrl: 'https://shope.ee/example1',
    category: 'Eletrônicos',
    badge: 'Mais Vendido',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Relógio Inteligente Smartwatch Sport Amoled Impermeável',
    originalPrice: 249.90,
    discountedPrice: 119.90,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    affiliateUrl: 'https://shope.ee/example2',
    category: 'Eletrônicos',
    badge: 'Frete Grátis',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Tênis Esportivo Casual Run Conforto Unissex',
    originalPrice: 199.90,
    discountedPrice: 89.90,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
    affiliateUrl: 'https://shope.ee/example3',
    category: 'Moda & Calçados',
    badge: '50% OFF',
    isFeatured: true
  },
  {
    id: '4',
    title: 'Mochila Impermeável Antifurto USB Notebook Viagem',
    originalPrice: 159.90,
    discountedPrice: 74.90,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60',
    affiliateUrl: 'https://shope.ee/example4',
    category: 'Acessórios',
    badge: 'Super Oferta',
    isFeatured: false
  },
  {
    id: '5',
    title: 'Kit Organizador de Gavetas com 3 Peças Multiuso',
    originalPrice: 45.00,
    discountedPrice: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&auto=format&fit=crop&q=60',
    affiliateUrl: 'https://shope.ee/example5',
    category: 'Casa & Cozinha',
    badge: 'Oferta Relâmpago',
    isFeatured: false
  },
  {
    id: '6',
    title: 'Massageador Facial de Quartzo Rosa Rolo Natural',
    originalPrice: 59.90,
    discountedPrice: 24.90,
    imageUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&auto=format&fit=crop&q=60',
    affiliateUrl: 'https://shope.ee/example6',
    category: 'Beleza & Cuidados',
    badge: 'Tendência',
    isFeatured: false
  }
];

export const CAROUSEL_DEFAULT_IMAGES = [
  'https://blogger.googleusercontent.com/img/a/AVvXsEgs2cHAYDAd7zkU1nOmaT7DFiKOTbIc_FhCqffCv2O1OCUVwUXKYN5sn6Tq_zT-KONlkJfmMG9MrIHV-ckMw92ftZw3bmcMLh2s6yEs6FYjcmu1rr5fM38BQS87bG2ezGACrBCybxY7CcuJKQhOpy-y4LmOhEV3lFFyjuAVgD0z4cf6CUbu9waaROPSVMrd=s1600',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjqDT0uInHhFzrrkDmyS-zrIx0uBFUD9OLeos2KucCNekkv1os8_VD5j31U9gTvoIMqYAaBinP8HGiwaAr_Yz-ZRfWNMVMQKAfl2qk1CcwGibw6Ar1P_DYXuuRB-rIprvrFs66--BG8uPwo4pct8SIQ73PFdDEPSOEL43mLcAYi8KDI334qm-Lo-bquAUqb=s1600',
  'https://blogger.googleusercontent.com/img/a/AVvXsEjASlmxVyrnLUSWvV61HOZrGqNiSQsXlhODNxqa-TDy8PG12mXyS_hN6B5cVO5pTY3EtdAKai8DDnp8oqAifYpYXhdKuTY3y_xUZTKdcTbS01iM_usVUkJuZH8aSJ93nGawyVjsxhvqQOKwr6hR8LWIiVI1LCci6w5-UW_4_Sss2lpnw0VzHVKhN-OXEtKE=s1600',
  'https://blogger.googleusercontent.com/img/a/AVvXsEgkgS3LIVrbiuWbzuaS4AmBZbg6XJ1HHHYZpbOwYPulmFtlLxyk2603tOUFvu_RM9oDuCBLuUW5gsCoyfJ5JhNbzLOV4su8wMlhp8edXL1o1TNOObEHPjjxaAUWsL0EleDWS9clSe5elonle1gO4Jsy9kvkvjnxntQajSrh2QRFRK7TnivEKM6JqrueT_E4=s1600'
];
