import type { LucideIcon } from 'lucide-react';

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
}

export interface Project {
  title: string;
  slug: string;
  category: string;
  image: string;
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
