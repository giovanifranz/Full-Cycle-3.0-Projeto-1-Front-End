export interface Category {
  id: string
  name: string
  is_active: boolean
  created_at: string
  updated_at: string | null
  deleted_at: string | null
  description: string | null
}

export interface Links {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

export interface CategoryParams {
  page?: number
  perPage?: number
  search?: string
  isActive?: boolean
}

export interface Results {
  data: Category[]
  links: Links
  meta: Meta
}

export interface Result {
  data: Category
  links: Links
  meta: Meta
}
