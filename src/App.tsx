/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import QuoteForm from './components/QuoteForm';
import Footer from './components/Footer';

export default function App() {
  // Cart state stored locally for pristine seamless persistence on cache reload
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vidracaria_coroata_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [prefilledService, setPrefilledService] = useState('');
  const [prefilledDesc, setPrefilledDesc] = useState('');

  // Persist shopping cart state
  useEffect(() => {
    try {
      localStorage.setItem('vidracaria_coroata_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to store cart state', e);
    }
  }, [cart]);

  // Smooth scroll helper matching iframe/browser capabilities
  const smoothScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add Item to Shopping cart
  const handleAddToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [...prev, { product, quantity: 1, selectedSize: size }];
      }
    });
  };

  // Update item counts
  const handleUpdateQuantity = (productId: string, size: string, change: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === productId && item.selectedSize === size
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        const newQty = copy[existingIdx].quantity + change;
        if (newQty <= 0) {
          return copy.filter((_, idx) => idx !== existingIdx);
        }
        copy[existingIdx].quantity = newQty;
        return copy;
      }
      return prev;
    });
  };

  // Fully delete row from shopping list
  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  // Carry cart products straight to the custom quote query details
  const handleCheckout = () => {
    if (cart.length === 0) return;

    let prefilledDesc = 'Olá! Gostaria de um orçamento detalhado de vidraçaria para os seguintes produtos selecionados em meu Carrinho:\n';
    let serviceCategory = 'Outro';

    cart.forEach((item, index) => {
      const isCustomSize = item.selectedSize === 'Sob Medida';
      const estimateText = isCustomSize ? 'Sob Consulta' : `R$ ${(item.product.priceEstimate * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
      prefilledDesc += `\n${index + 1}. *${item.product.name}* \n   - Medida: ${item.selectedSize}\n   - Quantidade: ${item.quantity}\n   - Estimativa: ${estimateText}\n`;
    });

    const totalPrice = cart.reduce((acc, item) => {
      const isCustomSize = item.selectedSize === 'Sob Medida';
      const priceUnit = isCustomSize ? item.product.priceEstimate * 1.15 : item.product.priceEstimate;
      return acc + priceUnit * item.quantity;
    }, 0);

    prefilledDesc += `\n*TOTAL ESTIMADO:* R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (Sujeito a refinamento)`;

    // Clever fallback classification matching form type options
    const firstItem = cart[0].product.id;
    if (firstItem === 'prod_porta') serviceCategory = 'Porta de Vidro';
    else if (firstItem === 'prod_janela') serviceCategory = 'Janela de Vidro';
    else if (firstItem === 'prod_box') serviceCategory = 'Box';
    else if (firstItem === 'prod_espelho') serviceCategory = 'Espelho';
    else if (firstItem === 'prod_guardacorpo' || firstItem === 'prod_sacada') serviceCategory = 'Guarda-Corpo';

    setPrefilledService(serviceCategory);
    setPrefilledDesc(prefilledDesc);

    // Scroll smoothly to quote form
    setTimeout(() => {
      smoothScrollTo('orcamento');
    }, 100);
  };

  // Direct service card clicks scroll and pre-select service types
  const handleServiceCardSelect = (serviceTitle: string) => {
    let serviceFormCategory = 'Outro';
    
    if (serviceTitle.includes('Porta')) serviceFormCategory = 'Porta de Vidro';
    else if (serviceTitle.includes('Janela')) serviceFormCategory = 'Janela de Vidro';
    else if (serviceTitle.includes('Box')) serviceFormCategory = 'Box';
    else if (serviceTitle.includes('Espelho')) serviceFormCategory = 'Espelho';
    else if (serviceTitle.includes('Fachada')) serviceFormCategory = 'Fachada';
    else if (serviceTitle.includes('Guarda-corpo') || serviceTitle.includes('Sacada') || serviceTitle.includes('Serviço')) serviceFormCategory = 'Guarda-Corpo';

    setPrefilledService(serviceFormCategory);
    setPrefilledDesc(`Olá! Vi as opções de "${serviceTitle}" no site e gostaria de desenhar um projeto com vocês.`);

    setTimeout(() => {
      smoothScrollTo('orcamento');
    }, 100);
  };

  // Clean form values on submission completion or manual reseter
  const handleFormReset = () => {
    setPrefilledService('');
    setPrefilledDesc('');
    setCart([]); // Clear cart as well
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Navigation Headers */}
      <Navbar onNavClick={smoothScrollTo} cartCount={totalCartCount} />

      {/* Main content body flow */}
      <main className="flex-grow">
        {/* Banner principal */}
        <Hero onCtaclick={smoothScrollTo} />

        {/* Nossos serviços */}
        <Services onServiceSelect={handleServiceCardSelect} />

        {/* Catálogo de produtos */}
        <Catalog onAddToCart={handleAddToCart} />

        {/* Carrinho de pedidos */}
        <Cart
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        {/* Formulário de orçamento */}
        <QuoteForm
          prefilledServiceType={prefilledService}
          prefilledDescription={prefilledDesc}
          cart={cart}
          onFormReset={handleFormReset}
        />
      </main>

      {/* Rodapé da empresa */}
      <Footer onNavClick={smoothScrollTo} />
    </div>
  );
}
