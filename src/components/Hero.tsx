/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onCtaclick: (sectionId: string) => void;
}

export default function Hero({ onCtaclick }: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Realistic glass-related background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')`,
        }}
      />
      {/* Dark overlay gradients with cyan tint for high-end glass architectural depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Title & Slogan */}
          <div className="lg:col-span-8 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-mono text-xs tracking-wider"
            >
              <Sparkles className="h-4 w-4" />
              <span>DURABILIDADE, SEGURANÇA E ACABAMENTO LUXUOSO</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight"
            >
              Transformamos Seu Projeto em Realidade com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 drop-shadow-md">
                Vidros de Alta Qualidade
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal"
            >
              Portas, janelas, boxes, fachadas, espelhos e projetos personalizados com acabamento profissional para residências luxuosas e comércios modernos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={() => onCtaclick('catalogo')}
                className="group inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-slate-950 hover:shadow-lg hover:shadow-cyan-500/10 transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-300 cursor-pointer"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button
                onClick={() => onCtaclick('orcamento')}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl border border-slate-700 bg-slate-900/60 backdrop-blur-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-500 transition-colors duration-300 cursor-pointer"
              >
                <span>Solicitar Orçamento</span>
              </button>
            </motion.div>

            {/* Micro value badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-slate-800/60 max-w-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">100% Temperado</h4>
                  <p className="text-xs text-slate-400">Máxima segurança</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Alto Padrão</h4>
                  <p className="text-xs text-slate-400">Acabamento impecável</p>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Projetos Sob Medida</h4>
                  <p className="text-xs text-slate-400">Layout ideal</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Graphical Glass Showcase Ornament */}
          <div className="hidden lg:col-span-4 lg:flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-[280px] h-[340px] rounded-2xl relative border border-white/10 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-lg p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/25 rounded-full filter blur-2xl -z-10"></div>
              
              {/* Glass Reflection effect lines */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -skew-x-12 pointer-events-none rounded-2xl"></div>

              <div className="flex justify-between items-start">
                <div className="h-8 w-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-cyan-300">★</span>
                </div>
                <span className="font-mono text-xs tracking-widest text-slate-400">PREMIUM GLASS</span>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-cyan-300 font-mono font-semibold tracking-wider">VIDRO TEMPERADO</p>
                <h3 className="font-sans font-bold text-xl text-slate-200 leading-tight">Sofisticação & Durabilidade</h3>
                <div className="h-1 w-12 bg-cyan-400 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
