export interface CastMember {
  id: string
  name: string
  type: number
  created_at: string
  updated_at: string | null
  deleted_at: string | null
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

export interface CastMemberParams {
  page?: number
  perPage?: number
  search?: string
  type?: number
}

export interface Results {
  data: CastMember[]
  links: Links
  meta: Meta
}

export interface Result {
  data: CastMember
  links: Links
  meta: Meta
}
