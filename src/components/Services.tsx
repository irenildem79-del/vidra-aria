/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SERVICES_DATA } from '../data';
import { Check, ClipboardList } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  onServiceSelect: (serviceTitle: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="servicos" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase bg-cyan-400/5 px-3 py-1 rounded-full inline-block">
            Nossos Serviços Profissionais
          </h2>
          <p className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Excelência Vidreira em Cada Detalhe
          </p>
          <div className="h-1 w-16 bg-cyan-400 mx-auto rounded-full"></div>
          <p className="text-slate-400 font-sans">
            Combinamos materiais certificados, equipamentos de ponta e especialistas qualificados para entregar projetos de vidro seguros, impecáveis e sob medida.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group flex flex-col h-full bg-slate-850/60 rounded-2xl border border-slate-800 hover:border-cyan-400/30 overflow-hidden hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Service Cover Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                {/* Visual Glass Shine */}
                <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -skew-x-12 opacity-80 pointer-events-none"></div>
              </div>

              {/* Service content */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-xl text-white group-hover:text-cyan-400 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-sans font-normal h-16 overflow-hidden line-clamp-3">
                    {service.description}
                  </p>

                  {/* Bullet checklist features */}
                  <ul className="space-y-2.5 pt-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-300">
                        <Check className="h-4 w-4 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-sans leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit action */}
                <button
                  onClick={() => onServiceSelect(service.title)}
                  className="w-full py-3.5 px-4 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-slate-950 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:border-transparent font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm group-hover:border-slate-600"
                >
                  <ClipboardList className="h-4.5 w-4.5" />
                  <span>Solicitar Orçamento</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
