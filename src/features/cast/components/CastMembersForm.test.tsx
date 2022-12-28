import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CastMembersForm, CastMembersFormProps } from './CastMembersForm'

const props: CastMembersFormProps = {
  castMember: {
    id: 'f4e082b5-e565-4a91-9ffe-cd0ab8c2752b',
    name: 'Teste',
    type: 1,
    created_at: '2017-09-08T15:25:53Z',
    updated_at: '2017-09-08T15:25:53Z',
    deleted_at: '2017-09-08T15:25:53Z',
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
}

describe('CastMemberForm', () => {
  it('should render castMember form correctly', () => {
    const { asFragment } = render(<CastMembersForm {...props} />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render castMember form with loading state', () => {
    const { asFragment } = render(<CastMembersForm {...props} isLoading />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render castMember form with disabled state', () => {
    const { asFragment } = render(<CastMembersForm {...props} isDisabled />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render castMember form with disabled and isLoading state', () => {
    const { asFragment } = render(
      <CastMembersForm {...props} isDisabled isLoading />,
      {
        wrapper: BrowserRouter,
      },
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
