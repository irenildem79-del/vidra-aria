/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data';
import { Product } from '../types';
import { Plus, Check, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CatalogProps {
  onAddToCart: (product: Product, size: string) => void;
}

export default function Catalog({ onAddToCart }: CatalogProps) {
  // Available filters
  const categories = [
    { label: 'Todos os Projetos', id: 'all' },
    { label: 'Portas', id: 'prod_porta' },
    { label: 'Janelas', id: 'prod_janela' },
    { label: 'Boxes', id: 'prod_box' },
    { label: 'Espelhos', id: 'prod_espelho' },
    { label: 'Guarda-Corpo/Sacadas', id: 'val_ext' },
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(() => {
    // Pick the first size as default for each product
    const initial: Record<string, string> = {};
    PRODUCTS_DATA.forEach((prod) => {
      initial[prod.id] = prod.availableSizes[0];
    });
    return initial;
  });

  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleAddToCartClick = (product: Product) => {
    const size = selectedSizes[product.id] || product.availableSizes[0];
    onAddToCart(product, size);

    // Trigger local animation feedback on button
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Filter logic
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'val_ext') {
      return product.id === 'prod_guardacorpo' || product.id === 'prod_sacada';
    }
    return product.id === activeFilter;
  });

  return (
    <section id="catalogo" className="py-24 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase bg-cyan-400/5 px-3 py-1 rounded-full inline-block">
            Nossa Galeria e Catálogo 2026
          </h2>
          <p className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Nossos Modelos e Valores Estimados
          </p>
          <div className="h-1 w-16 bg-cyan-400 mx-auto rounded-full"></div>
          <p className="text-slate-400 font-sans">
            Selecione as medidas desejadas de forma instantânea para montar sua estimativa preliminar. Você poderá finalizar o pedido e encaminhá-lo para o nosso WhatsApp.
          </p>
        </div>

        {/* Categories / Filter Swiper */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const currentSize = selectedSizes[product.id];
              const isCustomSize = currentSize === 'Sob Medida';
              const isAdded = addedItems[product.id];

              // If it is custom size, we show a beautiful notice or maintain estimate
              const calculatedPrice = isCustomSize
                ? product.priceEstimate * 1.15
                : product.priceEstimate;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={product.id}
                  className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-700/80 overflow-hidden flex flex-col justify-between h-full group"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-950">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    
                    {/* Floating Product Badge */}
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-cyan-400 flex items-center space-x-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Vidro de Segurança</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                    <div className="space-y-3.5">
                      <h3 className="font-sans font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans font-normal h-16 overflow-hidden line-clamp-3">
                        {product.description}
                      </p>

                      {/* Sizes selector / dropdown */}
                      <div className="space-y-1.5 pt-2">
                        <label className="block text-xs font-mono text-slate-400">
                          Medidas Disponíveis:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {product.availableSizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeChange(product.id, size)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                                selectedSizes[product.id] === size
                                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/30'
                                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing, info and Add To Cart button */}
                    <div className="space-y-4 pt-4 border-t border-slate-800/80">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                            Preço Médio Estimado
                          </p>
                          <p className="font-sans font-black text-2xl text-cyan-400">
                            {isCustomSize ? (
                              <span className="text-sm font-semibold block text-cyan-300">
                                Sob Consulta (Sob Medida)
                              </span>
                            ) : (
                              `R$ ${calculatedPrice.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                              })}`
                            )}
                          </p>
                        </div>
                        {isCustomSize && (
                          <div className="flex items-center space-x-1.5 bg-slate-950 px-2 py-1 rounded-md border border-slate-800 text-[10px] text-slate-300">
                            <Info className="h-3 w-3 text-cyan-400" />
                            <span>Orçamento sob demanda</span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleAddToCartClick(product)}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-gradient-to-r from-slate-900 to-slate-850 text-slate-200 border border-slate-800 hover:text-slate-950 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:border-transparent hover:shadow-lg'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="h-5 w-5" />
                            <span>Adicionado com sucesso!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-5 w-5 text-cyan-400 group-hover:text-slate-950" />
                            <span>Adicionar ao Carrinho</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
