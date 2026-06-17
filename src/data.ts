/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Product } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'portas',
    title: 'Portas de Vidro',
    description: 'Portas de vidro temperado sob medida que conferem elegância, claridade e inteligibilidade espacial ao ambiente, tanto social quanto corporativo.',
    features: [
      'Portas de correr com trilhos embutidos ou aparentes',
      'Portas pivotantes luxuosas com fechaduras e puxadores premium',
      'Portas temperadas de segurança (8mm e 10mm)',
      'Portas sob medida para estabelecimentos comerciais'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'janelas',
    title: 'Janelas de Vidro',
    description: 'Integração perfeita entre iluminação natural e proteção termoacústica com nossa linha refinada de janelas residenciais e corporativas.',
    features: [
      'Janelas residenciais de correr, verticais ou horizontais',
      'Janelas comerciais com fechamentos herméticos',
      'Instalações sob medida com perfis de alumínio anodizado',
      'Vedação de altíssima eficiência contra chuvas e ventos'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'box',
    title: 'Box para Banheiro',
    description: 'Transforme seu banheiro em um verdadeiro spa com boxes robustos, de funcionamento suave e vedação impecável.',
    features: [
      'Box de correr tradicional com roldanas aparentes de alta performance',
      'Box articulado (flex) ideal para otimização de pequenos vãos',
      'Box personalizado até o teto para efeito sauna a vapor',
      'Vidros temperados com película protetora de segurança'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b6979a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'espelhos',
    title: 'Espelhos Sob Medida',
    description: 'Amplie a sensação de espaço e traga requinte estético com projetos de espelhos lapidados, bisotados ou com retroiluminação LED inteligente.',
    features: [
      'Espelhos decorativos para salas de jantar, halls e quartos',
      'Espelhos de grande porte com alta resistência para academias e estúdios',
      'Espelhos com acabamento bisotê ou molduras contemporâneas',
      'Espelhos camarim e projetos exclusivos com iluminação embutida'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fachadas',
    title: 'Fachadas Comerciais',
    description: 'Garanta máxima visibilidade para sua marca com fachadas corporativas elegantes e de altíssima resistência estrutural.',
    features: [
      'Fachadas em pele de vidro (Structural Glazing)',
      'Fachadas em vidro temperado com fixadores de aço inoxidável',
      'Projetos arquitetônicos para vitrines de shopping e lojas de rua',
      'Vidros laminados de segurança com controle de calor solar'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'outros',
    title: 'Outros Serviços',
    description: 'Projetos sob medida de engenharia vidreira para valorização, lazer e segurança de sua família ou equipe comercial.',
    features: [
      'Guarda-corpo estrutural em vidro para escadas, rampas e mezaninos',
      'Fechamento total de sacadas (cortina de vidro retrátil)',
      'Coberturas de vidro laminado com proteção contra raios UV',
      'Divisórias acústicas em vidro para escritórios corporativos modernos'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod_porta',
    name: 'Porta de Vidro Temperado Slide',
    description: 'Porta de correr robusta em vidro temperado de 10mm de espessura. Ideal para salas de estar, escritórios, divisórias de varanda ou acessos comerciais. Acompanha kit de trilho polido de alumínio e fechadura premium.',
    availableSizes: ['2.10m x 1.60m', '2.10m x 1.80m', 'Sob Medida'],
    priceEstimate: 1850.00,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod_janela',
    name: 'Janela de Vidro Temperado Pivot',
    description: 'Janela pivotante ou de correr com estrutura de vidro temperado de 8mm e perfis resistentes. Excelente isolamento acústico e controle absoluto de entrada de ar. Perfeita para quartos, cozinhas e escritórios.',
    availableSizes: ['1.00m x 1.20m', '1.20m x 1.50m', 'Sob Medida'],
    priceEstimate: 890.00,
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod_box',
    name: 'Box para Banheiro Premium',
    description: 'Box de correr Luxor com estrutura em aço inox ou alumínio cromado brilhante. Vidro de segurança de 8mm com tratamento tecnológico anti-manchas, garantindo limpeza facilitada e brilho prolongado.',
    availableSizes: ['1.90m x 1.00m', '1.90m x 1.20m', 'Sob Medida'],
    priceEstimate: 750.00,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod_espelho',
    name: 'Espelho Decorativo Lapidado',
    description: 'Espelho de cristal legítimo (proporciona reflexão perfeita sem distorções) com bordas polidas lapidadas eletronicamente. Ideal para banheiros modernos, cabeceiras, bancadas de maquiagem ou recepções.',
    availableSizes: ['1.00m x 0.80m', '1.20m x 1.00m', 'Sob Medida'],
    priceEstimate: 420.00,
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod_guardacorpo',
    name: 'Guarda-Corpo de Vidro e Inox',
    description: 'Guarda-corpo seguro fabricado em vidro laminado temperado, fixado elegantemente com colunas flutuantes de aço inox 304. Garante proteção absoluta contra quedas sem prejudicar a paisagem natural.',
    availableSizes: ['Metro Linear (Por medida)', 'Sob Medida'],
    priceEstimate: 1650.00, // Metro linear de inox + vidro
    imageUrl: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod_sacada',
    name: 'Fechamento de Sacada Retrátil',
    description: 'Sistema inovador europeu (Balcony Glass) com trilhos de alumínio anodizado que permitem recolher 100% dos painéis de vidro nas laterais, propiciando total integração com o ambiente externo e silêncio termoacústico.',
    availableSizes: ['Metro Linear (Por medida)', 'Sob Medida'],
    priceEstimate: 1200.00,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
  }
];
