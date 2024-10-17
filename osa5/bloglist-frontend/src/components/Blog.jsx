const Blog = ({ blog, onView, isViewed }) => (
  <div>
    {blog.title} {blog.author}
    {isViewed && (
      <div>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes}</p>
      </div>
    )}
    <button onClick={onView}>{isViewed ? 'hide' : 'view'}</button>
  </div>
)

export default Blog