/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  availableSizes: string[];
  priceEstimate: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  neighborhood: string;
  address: string;
  serviceType: string;
  description: string;
  images: string[]; // Base64 or local paths
  estimatedDimensions: string;
  serviceMode: 'visita' | 'retirada' | 'instalacao';
}
