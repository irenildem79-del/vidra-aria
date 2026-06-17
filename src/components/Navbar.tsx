/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  cartCount: number;
}

export default function Navbar({ onNavClick, cartCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', id: 'inicio' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Catálogo', id: 'catalogo' },
    { label: 'Solicitar Orçamento', id: 'orcamento' },
    { label: 'Contato', id: 'contato' },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-nav"
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-lg bg-slate-900/90 border-b border-slate-850 shadow-lg text-slate-100'
          : 'backdrop-blur-md bg-slate-900/80 border-b border-slate-800 text-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleItemClick('inicio')}>
            <div className="relative group flex items-center space-x-2.5">
              <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                {/* Visual Glass reflection representation */}
                <div className="absolute inset-0 bg-white/25 transform -skew-x-12 rounded-xl filter blur-sm"></div>
                <span className="font-extrabold text-lg tracking-wider">VC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-lg leading-tight tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400">
                  VIDRAÇARIA
                </span>
                <span className="font-mono text-xs font-semibold tracking-widest text-slate-400 uppercase">
                  Coroatá
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="relative font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 cursor-pointer text-sm tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => handleItemClick('carrinho')}
              className="relative p-2.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-all duration-200"
              title="Ver Carrinho"
            >
              <ShoppingCart className="h-5.5 w-5.5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs h-5 w-5 flex items-center justify-center rounded-full border-2 border-slate-900 shadow-md"
                  >
                    {cartCount}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* CTA action button */}
            <button
              onClick={() => handleItemClick('orcamento')}
              className="relative overflow-hidden group px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-slate-950 hover:shadow-cyan-500/20 hover:shadow-lg transition-all duration-300 cursor-pointer text-sm"
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <Sparkles className="h-4 w-4" />
                <span>Solicitar Projeto Agora</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Cart Button on Mobile */}
            <button
              onClick={() => handleItemClick('carrinho')}
              className="relative p-2 rounded-lg text-slate-300 hover:text-cyan-400"
            >
              <ShoppingCart className="h-5.5 w-5.5" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-cyan-400 text-slate-950 font-bold text-[10px] h-4.5 w-4.5 flex items-center justify-center rounded-full border border-slate-900">
                  {cartCount}
                </div>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-3.5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => handleItemClick('orcamento')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold hover:shadow-lg transition-all"
              >
                <Sparkles className="h-5 w-5" />
                <span>Solicitar Projeto Agora</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
