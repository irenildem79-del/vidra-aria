/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, FileText, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, change: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export default function Cart({ cart, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  // Compute totals
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => {
    const isCustom = item.selectedSize === 'Sob Medida';
    // If Custom Size, calculate based on approximate price, else direct estimate
    const priceUnit = isCustom ? item.product.priceEstimate * 1.15 : item.product.priceEstimate;
    return acc + priceUnit * item.quantity;
  }, 0);

  const hasCustomSize = cart.some((item) => item.selectedSize === 'Sob Medida');

  return (
    <section id="carrinho" className="py-20 bg-slate-900 border-t border-slate-850">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <h2 className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase bg-cyan-400/5 px-3 py-1 rounded-full inline-block">
            Seu Carrinho de Atendimento
          </h2>
          <p className="font-sans font-extrabold text-3xl text-white tracking-tight">
            Itens Selecionados para Orçar
          </p>
          <div className="h-1 w-16 bg-cyan-400 mx-auto rounded-full"></div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center bg-slate-950/60 rounded-3xl border border-slate-800 p-12 max-w-lg mx-auto space-y-6">
            <div className="mx-auto h-16 w-16 bg-slate-900 border border-slate-750 flex items-center justify-center rounded-2xl text-slate-500">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-sans font-bold text-lg text-white">Seu carrinho está vazio</h3>
              <p className="text-sm text-slate-400">
                Explore nosso catálogo online de soluções em vidros temperados para adicionar seus produtos de interesse aqui.
              </p>
            </div>
            <a
              href="#catalogo"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide hover:shadow-cyan-400/10 hover:shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          /* Cart Listing */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List of checkout items */}
            <div className="lg:col-span-8 bg-slate-950/40 rounded-3xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
              {cart.map((item) => {
                const isCustom = item.selectedSize === 'Sob Medida';
                const priceUnit = isCustom ? item.product.priceEstimate * 1.15 : item.product.priceEstimate;
                const priceTotal = priceUnit * item.quantity;

                return (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-950/20 transition-colors">
                    {/* Thumbnail & names */}
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white">{item.product.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 flex items-center">
                          <span className="font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                            Medida: {item.selectedSize}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Quantity controls and row total */}
                    <div className="flex items-center justify-between w-full md:w-auto md:space-x-12">
                      {/* Quantity Modulator */}
                      <div className="flex items-center bg-slate-900 border border-slate-850 rounded-xl p-1.5 space-x-3.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          disabled={item.quantity <= 1}
                          className="h-7 w-7 text-xs text-slate-400 hover:text-white disabled:opacity-20 flex items-center justify-center rounded-lg hover:bg-slate-805"
                        >
                          <Minus className="h-4.5 w-4.5" />
                        </button>
                        <span className="font-sans font-bold text-sm text-slate-200">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="h-7 w-7 text-xs text-slate-400 hover:text-white flex items-center justify-center rounded-lg hover:bg-slate-805"
                        >
                          <Plus className="h-4.5 w-4.5" />
                        </button>
                      </div>

                      {/* Line Item pricing display */}
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-mono">Subtotal Estimado</p>
                        <p className="font-sans font-bold text-base text-cyan-400">
                          {isCustom ? (
                            <span className="text-xs text-cyan-300">Sob Consulta</span>
                          ) : (
                            `R$ ${priceTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                          )}
                        </p>
                      </div>

                      {/* Deletor */}
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                        className="text-slate-500 hover:text-rose-400 p-2.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Remover Item"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart checkout Summary panel */}
            <div className="lg:col-span-4 bg-slate-950/80 rounded-3xl border border-slate-800 p-6 space-y-6">
              <h3 className="font-sans font-bold text-lg text-white pb-4 border-b border-slate-800/80">
                Resumo da Estimativa
              </h3>

              <div className="space-y-4 text-sm font-sans text-slate-300">
                <div className="flex justify-between">
                  <span>Total de Itens</span>
                  <span className="font-bold text-white">{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span>Valor de Balcão Estimado</span>
                  <span className="font-bold text-white">
                    R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {hasCustomSize && (
                  <div className="p-3.5 rounded-xl bg-cyan-400/5 border border-cyan-400/20 text-xs text-cyan-300 leading-relaxed">
                    Você possui itens **Sob Medida** no carrinho. O valor final pode ser refinado por nosso projetista após a visita técnica.
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-400">Total Geral Estimado</span>
                  <span className="text-2xl font-sans font-black text-white">
                    R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold text-sm tracking-wide hover:shadow-cyan-400/15 hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <FileText className="h-5 w-5" />
                <span>Finalizar Pedido</span>
              </button>
              <p className="text-[10px] text-center text-slate-500 font-mono leading-normal">
                Ao clicar, as informações serão levadas automaticamente para o formulário de orçamento no próximo bloco.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
