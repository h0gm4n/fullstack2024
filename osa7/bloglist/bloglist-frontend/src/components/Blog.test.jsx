import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('renders title', () => {
  const blog = {
    title: 'Test blog',
    author: 'Tester',
    url: 'test.com',
    user: {
      name: 'Test McTest'
    }
  }

  render(<Blog blog={blog} isViewed={true} />)

  const url = screen.getByText('url: test.com')
  const likes = screen.getByText('likes:')
  const user = screen.getByText('Test McTest')
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(user).toBeDefined()
})

test('liking twice results to two event handler calls', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Tester',
    url: 'test.com',
    user: {
      name: 'Test McTest'
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} isViewed={true} likeBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')

  expect(button).toBeDefined()
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
}) 