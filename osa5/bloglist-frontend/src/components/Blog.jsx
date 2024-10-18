import PropTypes from 'prop-types'

const Blog = ({ blog, onView, isViewed, likeBlog, deleteBlog, username }) => (
  <div>
    {blog.title} {blog.author} <button onClick={onView}>{isViewed ? 'hide' : 'view'}</button>
    {isViewed && (
      <div>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.user.name}</p>
        {blog.user.username === username && (
          <button onClick={deleteBlog}>delete</button>
        )}
      </div>
    )}
  </div>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
  isViewed: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog