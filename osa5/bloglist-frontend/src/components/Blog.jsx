const Blog = ({ blog, onView, isViewed, likeBlog }) => (
  <div>
    {blog.title} {blog.author}
    {isViewed && (
      <div>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    )}
    <button onClick={onView}>{isViewed ? 'hide' : 'view'}</button>
  </div>
)

export default Blog