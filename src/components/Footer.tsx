/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Instagram, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-slate-950 border-t border-slate-850 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo & Bio Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onNavClick('inicio')}>
              <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 text-white shadow-md shadow-cyan-500/20">
                <span className="font-extrabold text-sm tracking-widest">VC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-base tracking-wider text-white">
                  VIDRAÇARIA
                </span>
                <span className="font-mono text-[10px] font-semibold tracking-widest text-slate-400 uppercase leading-none">
                  Coroatá
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              **Vidraçaria Premium** - Especialistas em soluções modernas em vidro temperado, laminado, boxes customizados, espelhos ornamentais e projetos sob medida de alto padrão para Coroatá e região.
            </p>

            <div className="flex items-center space-x-2 text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg w-max">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Qualidade Certificada</span>
            </div>
          </div>

          {/* Quick links map column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase border-b border-slate-850 pb-2">
              Navegação Rápida
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavClick('inicio')}
                className="text-left py-1 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Início
              </button>
              <button
                onClick={() => onNavClick('servicos')}
                className="text-left py-1 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Serviços
              </button>
              <button
                onClick={() => onNavClick('catalogo')}
                className="text-left py-1 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Catálogo
              </button>
              <button
                onClick={() => onNavClick('orcamento')}
                className="text-left py-1 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Orçamento
              </button>
              <button
                onClick={() => onNavClick('carrinho')}
                className="text-left py-1 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Carrinho
              </button>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase border-b border-slate-850 pb-2">
              Contatos Diretos
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-center space-x-3.5">
                <MapPin className="h-4.5 w-4.5 text-cyan-400 flex-shrink-0" />
                <span>Coroatá - MA, Brasil (Atendimento Regional)</span>
              </li>
              <li className="flex items-center space-x-3.5">
                <Phone className="h-4.5 w-4.5 text-cyan-400 flex-shrink-0" />
                <a
                  href="https://wa.me/5599984545370"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors font-bold"
                >
                  (99) 98454-5370
                </a>
              </li>
              <li className="flex items-center space-x-3.5">
                <Instagram className="h-4.5 w-4.5 text-cyan-400 flex-shrink-0" />
                <a
                  href="https://instagram.com/sebastian_ar4uj0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors font-semibold"
                >
                  @sebastian_ar4uj0
                </a>
              </li>
            </ul>
          </div>

          {/* Business Schedule hours Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase border-b border-slate-850 pb-2">
              Horários de Atendimento
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-3 text-slate-400">
                <Clock className="h-4.5 w-4.5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-300">Segunda a Sexta-Feira</p>
                  <p className="text-[11px] text-slate-500 font-mono">08:00 às 18:00 (Instalações & Visitas)</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-slate-400">
                <Clock className="h-4.5 w-4.5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-300">Sábado</p>
                  <p className="text-[11px] text-slate-500 font-mono">08:00 às 12:00 (Apenas Orçamentos)</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Closing copyright row */}
        <div className="mt-12 pt-8 border-t border-slate-900/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>
            &copy; {currentYear} Vidraçaria Coroatá. Todos os direitos reservados.
          </p>
          <p className="flex items-center space-x-1 font-sans">
            <span>Desenvolvido com</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
            <span>para nossa comunidade.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
