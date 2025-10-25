
export interface NavLink {
  name: string;
  path: string;
}

export interface GalleryItem {
  id: number;
  before: string;
  after: string;
  prompt: string;
}

export interface PricingPlan {
  title: string;
  price: string;
  frequency: string;
  features: string[];
  isFeatured: boolean;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  company: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
