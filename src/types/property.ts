export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency: 'USD' | 'ARS';
  operation: 'Venta' | 'Alquiler';
  type: 'Casa' | 'Depto' | 'Lote' | 'Local';
  location: {
    city: string;
    address: string;
    coordinates?: string; // Para lotes o terrenos
  };
  features: {
    m2_total: number;
    rooms: number;
    bathrooms: number;
    garage: boolean;
    dimensions?: {
      front: number;
      depth: number;
    };
  };
  images: string[]; // Cloudinary Secure URLs
  public_ids: string[]; // Para borrar assets
  status: 'available' | 'sold' | 'archived';
  featured: boolean;
  createdAt: any;
}
