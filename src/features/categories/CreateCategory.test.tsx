import { renderWithProviders } from '../../utils/test-utils'
import { CreateCategory } from './CreateCategory'

describe('CreateCategory', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCategory />)
    expect(asFragment()).toMatchSnapshot()
  })
})
