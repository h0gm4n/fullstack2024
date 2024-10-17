const Blog = ({ blog, onView, isViewed, likeBlog, deleteBlog, username }) => (
  <div>
    {blog.title} {blog.author} <button onClick={onView}>{isViewed ? 'hide' : 'view'}</button>
    {isViewed && (
      <div>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.user.name}</p>
        {blog.user.username == username && (
          <button onClick={deleteBlog}>delete</button>
        )}
      </div>
    )}
  </div>
)

export default Blog