import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { renderWithProviders, waitFor, screen } from '../../utils/test-utils'
import { ListCastMembers } from './ListCastMembers'

import { baseUrl } from '../api/apiSlice'
import { castMembersResultPage1 } from './mocks'

export const handlers = [
  rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
    return res(
      ctx.delay(150),
      ctx.status(200),
      ctx.json(castMembersResultPage1),
    )
  }),
]

const server = setupServer(...handlers)

describe('ListCastMembers', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<ListCastMembers />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render loading state', () => {
    renderWithProviders(<ListCastMembers />)
    const loading = screen.getByRole('progressbar')
    expect(loading).toBeInTheDocument()
  })

  it('should render success state', async () => {
    renderWithProviders(<ListCastMembers />)

    await waitFor(() => {
      const table = screen.getByText('Klocko')
      expect(table).toBeInTheDocument()
    })
  })

  it('should render error state', async () => {
    server.use(
      rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    renderWithProviders(<ListCastMembers />)
    await waitFor(() => {
      const error = screen.getByText('Error fetching cast members')
      expect(error).toBeInTheDocument()
    })
  })
})
