import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {
  renderWithProviders,
  waitFor,
  screen,
  fireEvent,
} from '../../utils/test-utils'

import { baseUrl } from '../api/apiSlice'
import { EditCastMembers } from './EditCastMembers'

const data = {
  id: '19c27aa1-c500-4290-a121-ad0c64fb3717',
  name: 'Klocko',
  type: 1,
  deleted_at: null,
  created_at: '2023-02-15T02:37:43+0000',
  updated_at: '2023-02-15T02:37:43+0000',
}

export const handlers = [
  rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json({ data }))
  }),

  rest.put(
    `${baseUrl}/cast_members/19c27aa1-c500-4290-a121-ad0c64fb3717`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(201))
    },
  ),
]

const server = setupServer(...handlers)

describe('EditCastMember', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<EditCastMembers />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle submit', async () => {
    renderWithProviders(<EditCastMembers />)
    const name = screen.getByTestId('name')

    await waitFor(() => {
      expect(name).toHaveValue('Klocko')
    })

    await waitFor(() => {
      const submit = screen.getByText('Save')
      expect(submit).toBeInTheDocument()
    })

    const submit = screen.getByText('Save')

    fireEvent.change(name, { targe: { value: 'Teste' } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText('Cast member updated successfully!')
      expect(text).toBeInTheDocument()
    })
  })

  it('should handle submit error', async () => {
    server.use(
      rest.put(
        `${baseUrl}/cast_members/19c27aa1-c500-4290-a121-ad0c64fb3717`,
        (_, res, ctx) => {
          return res(ctx.delay(150), ctx.status(500))
        },
      ),
    )

    renderWithProviders(<EditCastMembers />)
    const name = screen.getByTestId('name')

    await waitFor(() => {
      expect(name).toHaveValue('Klocko')
    })

    await waitFor(() => {
      const submit = screen.getByText('Save')
      expect(submit).toBeInTheDocument()
    })

    const submit = screen.getByText('Save')

    fireEvent.change(name, { targe: { value: 'Teste' } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText('Cast member not updated!')
      expect(text).toBeInTheDocument()
    })
  })
})
