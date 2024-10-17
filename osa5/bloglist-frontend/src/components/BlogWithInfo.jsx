const BlogWithInfo = ({ blog }) => (
    <div>
        {blog.title} {blog.author}
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes}</div>
    </div>
)

export default BlogWithInfo