import { renderWithProviders } from '../../utils/test-utils'
import { CreateCastMembers } from './CreateCastMembers'

describe('CreateCastMembers', () => {
  it('should CreateCastMembers render correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCastMembers />)
    expect(asFragment()).toMatchSnapshot()
  })
})
