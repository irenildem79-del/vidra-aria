/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { QuoteFormData, CartItem } from '../types';
import { Send, CheckCircle, FileImage, ShieldCheck, Mail, Phone, MapPin, Sparkles, UploadCloud, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuoteFormProps {
  prefilledServiceType: string;
  prefilledDescription: string;
  cart: CartItem[];
  onFormReset?: () => void;
}

export default function QuoteForm({ prefilledServiceType, prefilledDescription, cart, onFormReset }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    neighborhood: '',
    address: '',
    serviceType: '',
    description: '',
    images: [],
    estimatedDimensions: '',
    serviceMode: 'visita',
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync pre-filled details from parent state (for example, when a service is clicked or cart is checked out)
  useEffect(() => {
    if (prefilledServiceType || prefilledDescription) {
      setFormData((prev) => ({
        ...prev,
        serviceType: prefilledServiceType || prev.serviceType,
        description: prefilledDescription || prev.description,
      }));
    }
  }, [prefilledServiceType, prefilledDescription]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceModeChange = (mode: 'visita' | 'retirada' | 'instalacao') => {
    setFormData((prev) => ({ ...prev, serviceMode: mode }));
  };

  // Modern robust async FileReader API process supporting parallel reading and zero-race-condition state capture
  const processFiles = async (files: FileList) => {
    const validImageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    
    if (validImageFiles.length === 0) return;

    // Create Promises for each image file reader
    const readPromises = validImageFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Formato de resultado do FileReader inválido.'));
          }
        };
        reader.onerror = () => reject(reader.error || new Error('Erro na leitura do arquivo.'));
        reader.readAsDataURL(file);
      });
    });

    try {
      // Read all images concurrently using Promise.all
      const base64Results = await Promise.all(readPromises);
      
      // Update form state with the base64 representations
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...base64Results].slice(0, 4), // Hold up to 4 images
      }));

      // Update files state with raw File objects
      setImageFiles((prev) => [...prev, ...validImageFiles].slice(0, 4));

    } catch (error) {
      console.error('FileReader failure:', error);
      alert('Houve um erro ao processar as fotos selecionadas. Certifique-se de escolher arquivos de imagem válidos.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Por favor, preencha os campos obrigatórios (Nome e Telefone).');
      return;
    }
    if (formData.images.length === 0) {
      alert('Por favor, anexe pelo menos 1 foto do seu ambiente ou local. A foto é obrigatória para que possamos realizar uma avaliação técnica exata do local!');
      return;
    }

    // Capture and demonstrate complete project submissions with raw File instances and base64 URLs
    console.group('=== SUBMISSÃO DE ORÇAMENTO COM ARQUIVOS ===');
    console.log('Informações do Cliente:', {
      nome: formData.name,
      telefone: formData.phone,
      email: formData.email,
      endereco: `${formData.address}, ${formData.neighborhood} - ${formData.city}`,
    });
    console.log('Especificações do Projeto:', {
      tipoServico: formData.serviceType,
      dimensoes: formData.estimatedDimensions,
      modoAtendimento: formData.serviceMode,
      descricao: formData.description,
    });
    console.log(`Fotos capturadas pelo FileReader (${formData.images.length} fotos carregadas):`);
    formData.images.forEach((base64, index) => {
      console.log(`Foto ${index + 1} (Base64 URL):`, base64.substring(0, 80) + '...');
    });
    console.log('Lista de Objetos File originais capturados:', imageFiles);
    console.groupEnd();

    setIsSubmitted(true);
  };

  // Generates the comprehensive prefilled WhatsApp URL with encoded message
  const getWhatsAppLink = () => {
    const number = '5599984545370'; // (99) 98454-5370
    
    // Construct cart list text if cart exists
    let cartDetails = '';
    if (cart.length > 0) {
      cartDetails = '\n\n🛒 *PRODUTOS DO CARRINHO:*';
      cart.forEach((item, index) => {
        const isCustom = item.selectedSize === 'Sob Medida';
        const priceText = isCustom ? 'Sob Consulta' : `R$ ${item.product.priceEstimate.toLocaleString('pt-BR')}`;
        cartDetails += `\n- *Item ${index + 1}:* ${item.product.name} (Qtd: ${item.quantity} | Medida: ${item.selectedSize} | Est: ${priceText})`;
      });
    }

    // Map service mode
    const modeLabels = {
      visita: 'Visita Técnica no Local',
      retirada: 'Retirada no Local da Vidraçaria',
      instalacao: 'Instalação Completa por Especialistas'
    };

    const imageStatus = formData.images.length > 0 
      ? `\n\n📷 *IMAGENS DO AMBIENTE:* Enviarei em anexo as ${formData.images.length} fotos do local que carreguei no sistema.`
      : `\n\n📷 *IMAGENS DO AMBIENTE:* Não anexadas no sistema.`;

    const text = `Olá, gostaria de solicitar um orçamento de vidraçaria. Seguem os dados do meu projeto.

👤 *DADOS DO CLIENTE:*
- *Nome:* ${formData.name}
- *WhatsApp:* ${formData.phone}
- *E-mail:* ${formData.email || 'Não informado'}

📍 *ENDEREÇO DE INSTALAÇÃO:*
- *Cidade:* ${formData.city || 'Não informado'}
- *Bairro:* ${formData.neighborhood || 'Não informado'}
- *Endereço:* ${formData.address || 'Não informado'}

📐 *ESPECIFICAÇÕES DO PROJETO:*
- *Tipo de Serviço:* ${formData.serviceType || 'Não informado'}
- *Dimensões Estimadas:* ${formData.estimatedDimensions || 'Não informadas'}
- *Forma de Atendimento:* ${modeLabels[formData.serviceMode]}
- *Descrição:* ${formData.description || 'Não especificada'} ${cartDetails}${imageStatus}`;

    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      neighborhood: '',
      address: '',
      serviceType: '',
      description: '',
      images: [],
      estimatedDimensions: '',
      serviceMode: 'visita',
    });
    setImageFiles([]);
    setIsSubmitted(false);
    if (onFormReset) onFormReset();
  };

  return (
    <section id="orcamento" className="py-24 bg-slate-950 text-slate-100 relative">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Contact information & Trust anchors */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <span className="text-xs font-bold font-mono tracking-widest text-cyan-400 bg-cyan-400/5 px-3 py-1 rounded-full inline-block">
                SOLICITAÇÃO SIMPLES & EXPRESSA
              </span>
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Solicite Seu Projeto
              </h2>
              <div className="h-1 w-12 bg-cyan-400 rounded-full"></div>
              <p className="font-sans text-slate-400 text-sm leading-relaxed">
                Preencha os dados do local e as medidas aproximadas da sua obra. Nossa equipe técnica de engenharia fará uma triagem preliminar de valores e entrará em contato para agendar ou validar o design.
              </p>
            </div>

            {/* Quick specifications / trust features */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="font-sans font-bold text-sm text-slate-300">Garantia Vidraçaria Coroatá</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-xs text-slate-400">
                  <ShieldCheck className="h-5 w-5 text-teal-400 mr-2.5 flex-shrink-0" />
                  <span>Vidros temperados rigorosamente em conformidade com as normas técnicas da ABNT.</span>
                </li>
                <li className="flex items-start text-xs text-slate-400">
                  <ShieldCheck className="h-5 w-5 text-teal-400 mr-2.5 flex-shrink-0" />
                  <span>Acessórios e ferragens premium inoxidáveis altamente resistentes.</span>
                </li>
                <li className="flex items-start text-xs text-slate-400">
                  <ShieldCheck className="h-5 w-5 text-teal-400 mr-2.5 flex-shrink-0" />
                  <span>Instaladores técnicos certificados com anos de experiência no mercado residencial e comercial.</span>
                </li>
              </ul>
            </div>

            {/* Practical Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
                <div className="h-10 w-10 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">WhatsApp Atendimento</h4>
                  <p className="font-sans text-xs font-bold text-slate-200">(99) 98454-5370</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3">
                <div className="h-10 w-10 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Fale Conosco</h4>
                  <p className="font-sans text-xs font-bold text-slate-200">contato@vidracariacoroata.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Form UI */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                /* The form itself */
                <motion.form
                  key="budget-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5Col">
                      <label className="block text-xs font-mono font-semibold text-slate-300">
                        Nome Completo <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: João da Silva"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300">
                        Telefone / WhatsApp <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: (99) 99999-9999"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* E-mail */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300">
                        E-mail (opcional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ex: seuemail@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Ex: Coroatá"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Neighborhood */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300">
                        Bairro
                      </label>
                      <input
                        type="text"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        placeholder="Ex: Centro"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>

                    {/* Address details */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300">
                        Endereço Completo
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Rua, número, complemento"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Service Category */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300">
                        Tipo de Serviço
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 transition appearance-none cursor-pointer"
                      >
                        <option value="">Selecione o serviço...</option>
                        <option value="Porta de Vidro">Porta de Vidro</option>
                        <option value="Janela de Vidro">Janela de Vidro</option>
                        <option value="Box">Box para Banheiro</option>
                        <option value="Espelho">Espelho</option>
                        <option value="Fachada">Fachada Comercial</option>
                        <option value="Guarda-Corpo">Guarda-Corpo / Sacada</option>
                        <option value="Outro">Outro de Vidro</option>
                      </select>
                    </div>

                    {/* Measurements */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300">
                        Medidas Aproximadas (opcional)
                      </label>
                      <input
                        type="text"
                        name="estimatedDimensions"
                        value={formData.estimatedDimensions}
                        onChange={handleInputChange}
                        placeholder="Ex: 2.10m x 1.40m"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                  </div>

                  {/* Project description */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300">
                      Descrição do Projeto
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Descreva as medidas, modelo desejado, local da instalação e demais informações relevantes para nossa equipe vidreira."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition resize-none leading-relaxed"
                    />
                  </div>

                  {/* Service Delivery Modes Radio Buttons */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-semibold text-slate-300">
                      Forma de Atendimento
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['visita', 'retirada', 'instalacao'] as const).map((mode) => {
                        const labels = {
                          visita: 'Visita Técnica',
                          retirada: 'Retirada no Local',
                          instalacao: 'Instalação Completa',
                        };
                        const active = formData.serviceMode === mode;
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => handleServiceModeChange(mode)}
                            className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                              active
                                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-sm'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {labels[mode]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* File upload mockup */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold text-slate-300">
                      Foto do Ambiente / Local para Avaliação <span className="text-cyan-400">*</span> (Máximo 4 fotos)
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 ${
                        dragActive
                          ? 'border-cyan-400 bg-cyan-400/5'
                          : 'border-slate-800 bg-slate-950/20 hover:border-slate-700 hover:bg-slate-950/45'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <UploadCloud className="h-8 w-8 text-slate-400" />
                      <div>
                        <p className="text-xs font-bold text-slate-200">
                          Clique ou arraste para enviar as Fotos de seu Ambiente / Obra
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono mt-1">
                          Essencial para validarmos as dimensões e o local de instalação (PNG, JPG, WEBP)
                        </p>
                      </div>
                    </div>

                    {/* Previews grid if uploaded */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-3 pt-2">
                        {formData.images.map((imgData, idx) => (
                          <div key={idx} className="relative h-16 w-full rounded-lg overflow-hidden border border-slate-800 group bg-slate-950">
                            <img src={imgData} alt="Preview" className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-slate-950/70 p-1 rounded-full text-slate-400 hover:text-rose-400"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-extrabold text-sm tracking-wide hover:shadow-cyan-400/10 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer"
                  >
                    <Send className="h-4.5 w-4.5" />
                    <span>ENVIAR ORÇAMENTO INTEGRADO</span>
                  </button>
                </motion.form>
              ) : (
                /* Success submit state */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 px-4 text-center space-y-6"
                >
                  <div className="mx-auto h-20 w-20 bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center rounded-3xl shadow-xl shadow-emerald-500/5">
                    <CheckCircle className="h-12 w-12" />
                  </div>

                  <div className="space-y-3 max-w-lg mx-auto">
                    <h3 className="font-sans font-black text-2xl text-white tracking-tight">
                      Orçamento Pronto para Enviar!
                    </h3>
                    <p className="font-sans text-sm text-slate-300 leading-relaxed">
                      Sua solicitação de orçamento foi gerada com sucesso com todos os itens inseridos.
                    </p>
                  </div>

                  {/* Informational banner about images */}
                  {formData.images.length > 0 && (
                    <div className="max-w-md mx-auto p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-left space-y-3">
                      <div className="flex items-start space-x-2.5">
                        <span className="text-amber-400 text-lg">⚠️</span>
                        <div>
                          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                            Como enviar as Fotos no WhatsApp:
                          </h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                            O WhatsApp não permite o envio automático de arquivos de fotos direto por links da internet. Por favor, faça o seguinte para enviar as fotos de seu ambiente:
                          </p>
                          <ol className="text-xs text-slate-400 mt-2 list-decimal list-inside space-y-1 font-sans">
                            <li>Toque no botão verde <strong className="text-emerald-400 font-bold">Enviar Pedido para WhatsApp</strong> abaixo.</li>
                            <li>Quando o seu WhatsApp abrir, toque no ícone de <strong className="text-slate-200 font-bold">clipe (anexo) 📎</strong> ou <strong className="text-slate-200 font-bold">câmera 📷</strong> no próprio aplicativo.</li>
                            <li>Selecione as fotos do local na sua galeria e envie diretamente para o nosso atendente!</li>
                          </ol>
                        </div>
                      </div>

                      {/* Displaying uploaded images for reference */}
                      <div className="pt-2 border-t border-slate-800">
                        <p className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400 mb-2">
                          Fotos anexadas no site ({formData.images.length}):
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {formData.images.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-lg border border-slate-700 overflow-hidden bg-slate-900 group">
                              <img
                                src={img}
                                alt={`Foto ${idx + 1}`}
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <a
                                href={img}
                                download={`foto-ambiente-${idx + 1}.png`}
                                title="Baixar foto para enviar"
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cyan-400"
                              >
                                <Download className="h-4 w-4" />
                              </a>
                            </div>
                          ))}
                        </div>
                        <p className="text-[9px] text-slate-500 font-mono mt-1 text-center">
                          (Dica: Toque na imagem acima para baixá-la caso precise salvar em seu aparelho)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Send to WhatsApp button */}
                  <div className="pt-2 max-w-sm mx-auto flex flex-col space-y-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        // Reset the form and return the main page to home so it looks complete!
                        setTimeout(() => {
                          handleResetForm();
                          const el = document.getElementById('inicio');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }, 500);
                      }}
                      className="inline-flex items-center justify-center space-x-2.5 w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-400/20 hover:scale-105 transition-all duration-300"
                    >
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.74.002-2.602-1.01-5.05-2.85-6.892C16.643 2.13 14.195 1.119 11.6 1.117c-5.447 0-9.873 4.372-9.877 9.744-.002 1.734.457 3.432 1.328 4.935L1.93 21.03l5.317-1.393zM16.83 14.18c-.285-.143-1.687-.833-1.947-.928-.26-.095-.45-.143-.64.143-.19.285-.736.928-.902 1.117-.167.19-.333.214-.618.071-.285-.143-1.205-.445-2.296-1.418-.849-.758-1.423-1.696-1.59-1.981-.167-.285-.018-.44.125-.581.127-.127.285-.333.428-.5.143-.166.19-.285.285-.476.096-.19.048-.357-.024-.5-.071-.143-.64-1.543-.876-2.11-.23-.553-.45-.477-.618-.485-.159-.008-.344-.008-.53-.008s-.488.071-.743.348c-.256.277-.977.955-.977 2.33 0 1.376 1.002 2.705 1.144 2.896.143.19 1.972 3.012 4.778 4.22.668.288 1.19.46 1.597.59.67.213 1.28.183 1.762.11.539-.08 1.688-.69 1.925-1.357.238-.667.238-1.238.167-1.357-.07-.11-.26-.15-.54-.295z" />
                      </svg>
                      <span>Enviar Pedido para WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="py-3 px-4 font-semibold text-slate-400 hover:text-white transition-colors text-xs"
                    >
                      Voltar e Corrigir Dados
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
