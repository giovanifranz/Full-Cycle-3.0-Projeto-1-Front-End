import { GridFilterModel } from '@mui/x-data-grid'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Results } from '../../../types/Category'
import { CategoriesTable, CategoriesTableProps } from './CategoryTable'

const mockData: Results = {
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
      id: '95dd89f4-0774-4645-b58e-add12806bc05',
      name: 'Magenta',
      description: 'Qui modi laborum consequatur dolor error neque quo.',
      is_active: true,
      deleted_at: null,
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

const props: CategoriesTableProps = {
  data: undefined,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 25, 50, 100],

  handleOnPageChange: (page: number) => {},
  handleFilterChange: (filterModel: GridFilterModel) => {},
  handleOnPageSizeChange: (perPage: number) => {},
  handleDelete: (id: string) => {},
}

describe('CategoriesTable', () => {
  it('should render castMember Table correctly', () => {
    const { asFragment } = render(<CategoriesTable {...props} />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render CategoriesTable with loading', () => {
    const { asFragment } = render(<CategoriesTable {...props} isFetching />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render CategoriesTable with data', () => {
    const { asFragment } = render(
      <CategoriesTable {...props} data={mockData} />,
      {
        wrapper: BrowserRouter,
      },
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render CategoriesTable with Inactive value', () => {
    const { asFragment } = render(
      <CategoriesTable
        {...props}
        data={{
          ...mockData,
          data: [{ ...mockData.data[0], is_active: false }],
        }}
      />,
      {
        wrapper: BrowserRouter,
      },
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
