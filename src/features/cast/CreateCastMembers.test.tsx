import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'

import {
  fireEvent,
  renderWithProviders,
  waitFor,
  screen,
} from '../../utils/test-utils'
import { CreateCastMembers } from './CreateCastMembers'

import { baseUrl } from '../api/apiSlice'

export const handlers = [
  rest.post(`${baseUrl}/cast_members`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201))
  }),
]

const server = setupServer(...handlers)

describe('CreateCastMembers', () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it('should CreateCastMembers render correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCastMembers />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle submit', async () => {
    renderWithProviders(<CreateCastMembers />)
    const name = screen.getByTestId('name')
    const submit = screen.getByText('Save')

    fireEvent.change(name, { target: { value: 'type' } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText('Cast member created successfully!')
      expect(text).toBeInTheDocument()
    })
  })

  it('should handle submit error', async () => {
    server.use(
      rest.post(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    renderWithProviders(<CreateCastMembers />)
    const name = screen.getByTestId('name')
    const submit = screen.getByText('Save')

    fireEvent.change(name, { target: { value: 'test' } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText('Cast member not created!')
      expect(text).toBeInTheDocument()
    })
  })
})
