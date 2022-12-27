import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CategoryForm, CategoryFormProps } from './CategoryForm'

const props: CategoryFormProps = {
  category: {
    id: 'f4e082b5-e565-4a91-9ffe-cd0ab8c2752b',
    name: 'teste',
    is_active: false,
    created_at: '2017-09-08T15:25:53Z',
    updated_at: '2017-09-08T15:25:53Z',
    deleted_at: '2017-09-08T15:25:53Z',
    description: 'teste',
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  handleToggle: jest.fn(),
}

describe('CategoryForm', () => {
  it('should render category form correctly', () => {
    const { asFragment } = render(<CategoryForm {...props} />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render category form with loading state', () => {
    const { asFragment } = render(<CategoryForm {...props} isLoading />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render category form with disabled state', () => {
    const { asFragment } = render(<CategoryForm {...props} isDisabled />, {
      wrapper: BrowserRouter,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render category form with disabled and isLoading state', () => {
    const { asFragment } = render(
      <CategoryForm {...props} isDisabled isLoading />,
      {
        wrapper: BrowserRouter,
      },
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
