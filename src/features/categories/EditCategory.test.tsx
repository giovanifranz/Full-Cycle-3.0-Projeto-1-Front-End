import { setupServer } from 'msw/node'
import { renderWithProviders } from '../../utils/test-utils'

import { EditCategory } from './EditCategory'

export const handlers = []

const server = setupServer(...handlers)

describe('EditCategory', () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<EditCategory />)
    expect(asFragment()).toMatchSnapshot()
  })
})
