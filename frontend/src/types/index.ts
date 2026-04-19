export type BusinessStatus = 'pending' | 'approved' | 'rejected';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name
  children?: Category[];
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category?: Category;
  description: string;
  address: string;
  location?: string;
  location_city?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  logo_url?: string;
  logo_path?: string;
  images?: string[];
  status: BusinessStatus;
  is_featured: boolean;
  is_verified?: boolean;
  verification_status?: 'unverified' | 'verified' | 'premium' | 'featured';
  price_range?: 1 | 2 | 3 | 4;
  latitude?: number;
  longitude?: number;
  rating?: number;
  review_count?: number;
  expert_ids?: string[];
  created_at: string;
}

export interface Inquiry {
  id: string;
  business_id: string;
  customer_name: string;
  customer_phone: string;
  project_type?: string;
  budget?: string;
  notes: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

export interface RegistrationPayload extends Omit<Business, 'id' | 'status' | 'created_at' | 'slug'> {
  logo?: File;
  additional_images?: File[];
}

export interface InquiryPayload extends Omit<Inquiry, 'id' | 'status' | 'created_at'> {}
