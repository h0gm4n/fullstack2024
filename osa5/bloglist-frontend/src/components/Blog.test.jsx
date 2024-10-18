import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Test blog',
    author: 'Tester',
    url: 'test.com',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Test blog Tester')
  expect(element).toBeDefined()
})