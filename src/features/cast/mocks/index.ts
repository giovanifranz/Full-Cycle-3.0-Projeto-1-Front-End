import { Results } from '../../../types/CastMembers'

export const castMembersResultPage1: Results = {
  data: [
    {
      id: '19c27aa1-c500-4290-a121-ad0c64fb3717',
      name: 'Klocko',
      type: 1,
      deleted_at: null,
      created_at: '2023-02-15T02:37:43+0000',
      updated_at: '2023-02-15T02:37:43+0000',
    },
  ],
  links: {
    first: 'http://localhost:8000/api/cast_members?page=1',
    last: 'http://localhost:8000/api/cast_members?page=7',
    prev: null,
    next: 'http://localhost:8000/api/cast_members?page=2',
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 7,
    path: 'http://localhost:8000/api/cast_members',
    per_page: 15,
    to: 15,
    total: 100,
  },
}

export const castMembersResultPage2: Results = {
  data: [
    {
      id: '2f23c838-71f1-4def-a279-a8c7e01f1594',
      name: 'Bartoletti',
      type: 1,
      deleted_at: null,
      created_at: '2023-02-15T02:37:43+0000',
      updated_at: '2023-02-15T02:37:43+0000',
    },
    {
      id: 'ce08baec-960e-44cf-b38a-d70c865f600b',
      name: 'Kuhlman',
      type: 2,
      deleted_at: null,
      created_at: '2023-02-15T02:37:43+0000',
      updated_at: '2023-02-15T02:37:43+0000',
    },
  ],
  links: {
    first: 'http://localhost:8000/api/cast_members?page=2',
    last: 'http://localhost:8000/api/cast_members?page=7',
    prev: null,
    next: 'http://localhost:8000/api/cast_members?page=3',
  },
  meta: {
    current_page: 2,
    from: 2,
    last_page: 7,
    path: 'http://localhost:8000/api/cast_members',
    per_page: 15,
    to: 15,
    total: 100,
  },
}
