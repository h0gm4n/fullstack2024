import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateNew from './components/CreateNew'
import BlogWithInfo from './components/BlogWithInfo'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [viewedBlogs, setViewedBlogs] = useState({})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    blogs.map(blog => blog.view = false)
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
      console.log('MOI')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('MOI2')
      blogService.setToken(user.token)
      console.log('MOI3')
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
      url: url
    }
    blogService.create(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
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

  const newBlogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create</button>
        </div>
        <div style={showWhenVisible}>
          <CreateNew title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} addNewBlog={addNewBlog} ></CreateNew>
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleViewToggle = (id) => {
    setViewedBlogs(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  const singularBlogView = (event) => {
    return (
      <div>
        <div>
          {blogs.map(blog =>
            <div>
              <Blog
                key={blog.id}
                blog={blog}
                isViewed={viewedBlogs[blog.id]}
                onView={() => handleViewToggle(blog.id)} />
            </div>)}
        </div>
      </div>
    )
  }

  if (user !== null) {
    return (
      <div>
        <div className='success'>{successMessage}</div>
        <div className='error'>{errorMessage}</div>
        Logged in as <b>{user.username}</b>
        <button onClick={handleLogout}>logout</button>
        {newBlogForm()}
        <h2>blogs</h2>
        {singularBlogView()}
      </div>
    )
  } else {
    return (
      <div>
        <LoginForm handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} username={username} password={password}></LoginForm>
      </div>
    )
  }
}

export default App