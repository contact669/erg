import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  heroImageId: string;
  longDescription: string;
  benefits: {
    title: string;
    description: string;
  }[];
  relatedProjectSlugs: string[];
  process?: {
    step: number;
    title: string;
    description: string;
  }[];
  whyUs?: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  zones?: {
    description: string;
    list: string;
  };
  faq?: {
    question: string;
    answer: string;
  }[];
}


export interface Project {
  title: string;
  slug: string;
  category: string;
  images: {
    before: string;
    after: string;
  };
  description: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  avatar: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description:string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  featuredImageId: string;
  tags: string[];
  content: ReactNode;
}
