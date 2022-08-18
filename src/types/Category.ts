export interface Results {
  meta: Meta;
  data: Category[];
  links: Links;
}

export interface Result {
  data: Category;
  links: Links;
  meta: Meta;
}

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  description: null | string;
}

export interface Meta {
  to: number;
  from: number;
  path: string;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
}

interface Links {
  prev: null | string;
  next: null | string;
  last: null | string;
  first: null | string;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
