// Common types and interfaces

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

export interface NavLink {
  label: string;
  href: string;
  submenu?: NavLink[];
}
