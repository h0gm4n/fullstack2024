import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, url }) => (
  <div>
    <h2>{blog.title}</h2>
    <div>
      <div>{url}</div>
      <div>{blog.likes} <button onClick={likeBlog}>like</button></div>
      <div>added by {blog.user.name}</div>
    </div>
  </div>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
}

export default Blog