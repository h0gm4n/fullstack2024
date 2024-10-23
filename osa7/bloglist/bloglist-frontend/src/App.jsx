import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import CreateNew from './components/CreateNew'
import './index.css'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(user)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    let newBlog = {
      title: title,
      author: author,
      url: url,
      user: {
        name: user.name
      }
    }
    await blogService.create(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    blogs.user = {
      name: user.username
    }
    setBlogs(blogs.concat(newBlog))
    setSuccessMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    setBlogFormVisible(false)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleUsernameChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  const NewBlogForm = ({ blogFormVisible, setBlogFormVisible, title, author, url, setTitle, setAuthor, setUrl, addNewBlog }) => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button className="createButton" onClick={() => setBlogFormVisible(true)}>Create</button>
        </div>
        <div style={showWhenVisible}>
          <CreateNew title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} addNewBlog={addNewBlog} ></CreateNew>
          <button className='cancelNew' onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleBlogLike = async (blog) => {
    console.log('id:', blog.id)
    let updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updatedBlog.id = blog.id
    updatedBlog.user = blog.user
    blogService.update(blog.id, updatedBlog)
    const updatedBlogs = blogs.map(obj => {
      if (obj.id === blog.id) {
        return updatedBlog
      } else {
        return obj
      }
    })
    setBlogs(updatedBlogs)
    console.log(viewedBlogs)
  }

  const BlogView = () => {
    return (
      <div>
        <h1 className='blogTitle'>Blogs</h1>
        <NewBlogForm blogFormVisible={blogFormVisible}
          setBlogFormVisible={setBlogFormVisible}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          addNewBlog={addNewBlog} />
        <div>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <div key={blog.id} className='blogBorder'>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>)}
        </div>
      </div>
    )
  }

  const BlogsAddedByUser = () => {
    const id = useParams().id
    if (users.length > 0) {
      const userById = users.find(user => user.id === id)
      let userBlogArray = Object.values(userById.blogs)
      return (
        <div>
          <h2>{userById.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {userBlogArray.map(blog => <li key={blog.id}>{blog.title}</li>)}
          </ul>
        </div>
      )
    }
  }

  const countUsers = () => {
    let counter = {}
    if (blogs.length > 0) {
      const moi = blogs.map(blog => blog.user.name)
      moi.map(user => [counter[user] = 1 + (counter[user] || 0)])
    }
    console.log(counter)
    let counterArray = []
    for (let i = 0; i < Object.keys(counter).length; i++) {
      const userById = users.find(user => user.name === Object.keys(counter)[i])
      counterArray.push([Object.keys(counter)[i], Object.values(counter)[i], userById.id])
    }
    return counterArray
  }

  const Users = () => {
    if (blogs.length > 0) {
      const usersBlogAmounts = countUsers()
      console.log(usersBlogAmounts)
      return (
        <div>
          <h2 className='blogTitle'>Users</h2>
          <div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>blog posts</th>
                </tr>
              </thead>
              <tbody>
                {usersBlogAmounts.map(blog => (
                  <tr key={blog[2]}>
                    <td><Link to={`/users/${blog[2]}`}>{blog[0]}</Link></td>
                    <td>{blog[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }

  const SingularBlog = () => {
    const id = useParams().id
    if (blogs.length > 0) {
      const blogById = blogs.find(blog => blog.id === id)
      console.log(blogById)
      return (
        <div>
          <Blog
            key={blogById.id}
            blog={blogById}
            url={<Link to={blogById.url}>{blogById.url}</Link>}
            likeBlog={() => handleBlogLike(blogById)}
          />
        </div>
      )
    }
  }

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <a href='/' style={padding}>blogs</a>
        <a href='/users' style={padding}>users</a>
        Logged in as <b>{user.username}</b>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

  if (user !== null) {
    return (
      <div>

        <Router>
          <Menu />
          <div className='success'>{successMessage}</div>
          <div className='error'>{errorMessage}</div>
          <Routes>
            <Route path="/" element={<BlogView />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<BlogsAddedByUser />} />
            <Route path="/blogs/:id" element={<SingularBlog />} />
          </Routes>
        </Router>
      </div>
    )
  } else {
    return (
      <div>
        <div className='error'>{errorMessage}</div>
        <LoginForm handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} username={username} password={password}></LoginForm>
      </div>
    )
  }
}

export default App