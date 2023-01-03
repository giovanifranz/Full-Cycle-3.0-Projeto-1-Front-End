import { Results } from '../../../types/Category'

export const categoryResultsPage1: Results = {
  data: [
    {
      id: '9757b801-e049-45b8-99bb-49cff1ea0e7e',
      name: 'Violet',
      description: 'Non assumenda repellat consequatur non eligendi natus.',
      is_active: true,
      deleted_at: null,
      created_at: '2022-12-27T14:31:22+0000',
      updated_at: '2022-12-27T14:31:22+0000',
    },
    {
      id: '867a8dde-bc6f-46fe-ae58-5cc927cda8ed',
      name: 'LightSteelBlue',
      description: 'Qui quibusdam ea qui illum deserunt illo unde animi.',
      is_active: true,
      deleted_at: null,
      created_at: '2022-12-27T14:31:22+0000',
      updated_at: '2022-12-27T14:31:22+0000',
    },
  ],
  links: {
    first: 'http://localhost:8000/api/categories?page=1',
    last: 'http://localhost:8000/api/categories?page=7',
    prev: null,
    next: 'http://localhost:8000/api/categories?page=2',
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 7,
    path: 'http://localhost:8000/api/categories',
    per_page: 15,
    to: 15,
    total: 100,
  },
}

export const categoryResultsPage2: Results = {
  data: [
    {
      id: '8a67e65c-7ba1-4149-8a46-a737feb3139d',
      name: 'MediumPurple',
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: '2023-01-03T16:05:00+0000',
      updated_at: '2023-01-03T16:05:00+0000',
    },
    {
      id: '3c88ba07-f95f-4485-9771-70adeb0d9687',
      name: 'FloralWhite',
      description: null,
      is_active: true,
      deleted_at: null,
      created_at: '2023-01-03T16:05:00+0000',
      updated_at: '2023-01-03T16:05:00+0000',
    },
  ],
  links: {
    first: 'http://localhost:8000/api/categories?page=1',
    last: 'http://localhost:8000/api/categories?page=7',
    prev: 'http://localhost:8000/api/categories?page=1',
    next: 'http://localhost:8000/api/categories?page=3',
  },
  meta: {
    current_page: 2,
    from: 1,
    last_page: 7,
    path: 'http://localhost:8000/api/categories',
    per_page: 15,
    to: 15,
    total: 100,
  },
}
