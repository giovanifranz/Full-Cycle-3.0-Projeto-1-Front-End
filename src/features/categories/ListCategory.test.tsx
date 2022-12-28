import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { renderWithProviders, screen } from '../../utils/test-utils'
import { baseUrl } from '../api/apiSlice'
import { ListCategory } from './ListCategory'
import { categoryResults } from './mocks'

export const handlers = [
  rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.json(categoryResults), ctx.delay(150))
  }),
]

const server = setupServer(...handlers)

describe('ListCategory', () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<ListCategory />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render loading state', () => {
    renderWithProviders(<ListCategory />)
    const loading = screen.getByRole('progressbar')
    expect(loading).toBeInTheDocument()
  })
})
