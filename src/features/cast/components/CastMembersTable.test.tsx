import { GridFilterModel } from '@mui/x-data-grid'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Results } from '../../../types/CastMembers'
import { CastMembersTable, CastMembersTableProps } from './CastMembersTable'

const mockData: Results = {
  data: [
    {
      id: 'f4e082b5-e565-4a91-9ffe-cd0ab8c2752b',
      name: 'Giovani',
      type: 1,
      deleted_at: '2022-12-27T16:53:16+0000',
      created_at: '2022-12-27T16:53:16+0000',
      updated_at: '2022-12-27T17:05:14+0000',
    },
    {
      id: 'f4e34448-748c-4261-9f2e-367aaf16927d',
      name: 'Franz',
      type: 2,
      deleted_at: '2022-12-27T16:53:16+0000',
      created_at: '2022-12-27T14:31:22+0000',
      updated_at: '2022-12-27T14:31:22+0000',
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

const props: CastMembersTableProps = {
  data: undefined,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 25, 50, 100],

  handleOnPageChange: (page: number) => {},
  handleFilterChange: (filterModel: GridFilterModel) => {},
  handleOnPageSizeChange: (perPage: number) => {},
  handleDelete: (id: string) => {},
}

describe('CastMembersTable', () => {
  it('should render castMember Table correctly', () => {
    const { asFragment } = render(<CastMembersTable {...props} />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render CastMembersTable with loading', () => {
    const { asFragment } = render(<CastMembersTable {...props} isFetching />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render CastMembersTable with data', () => {
    const { asFragment } = render(
      <CastMembersTable {...props} data={mockData} />,
      {
        wrapper: BrowserRouter,
      },
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
