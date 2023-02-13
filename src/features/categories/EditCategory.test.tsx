import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {
  screen,
  renderWithProviders,
  fireEvent,
  waitFor,
} from '../../utils/test-utils'

import { EditCategory } from './EditCategory'

import { baseUrl } from '../api/apiSlice'

const data = {
  id: '1',
  name: 'Violet',
  description: 'Non assumenda repellat consequatur non eligendi natus.',
  is_active: true,
  deleted_at: null,
  created_at: '2022-12-27T14:31:22+0000',
  updated_at: '2022-12-27T14:31:22+0000',
}

export const handlers = [
  rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json({ data }))
  }),

  rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200))
  }),
]

const server = setupServer(...handlers)

describe('EditCategory', () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<EditCategory />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle submit', async () => {
    renderWithProviders(<EditCategory />)

    const name = screen.getByTestId('name')
    const description = screen.getByTestId('description')
    const isActive = screen.getByTestId('is_active')

    await waitFor(() => {
      expect(name).toHaveValue('Violet')
    })

    await waitFor(() => {
      const submit = screen.getByText('Save')
      expect(submit).toBeInTheDocument()
    })

    const submit = screen.getByText('Save')
    fireEvent.change(name, { target: { value: 'New Violet' } })
    fireEvent.change(description, { target: { value: 'Description 2' } })
    fireEvent.click(isActive)
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText('Category updated successfully')
      expect(text).toBeInTheDocument()
    })
  })

  it('should handle submit error', async () => {
    server.use(
      rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(400))
      }),
    )

    renderWithProviders(<EditCategory />)

    const name = screen.getByTestId('name')
    const description = screen.getByTestId('description')
    const isActive = screen.getByTestId('is_active')

    await waitFor(() => {
      const submit = screen.getByText('Save')
      expect(submit).toBeInTheDocument()
    })

    const submit = screen.getByText('Save')
    fireEvent.change(name, { target: { value: 'New Violet' } })
    fireEvent.change(description, { target: { value: 'Description 2' } })
    fireEvent.click(isActive)
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText('Category not updated')
      expect(text).toBeInTheDocument()
    })
  })
})
