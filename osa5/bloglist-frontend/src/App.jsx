import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const CreateNew = ({ title, author, url, setTitle, setAuthor, setUrl, addNewBlog }) => {
  return (
    <form onSubmit={addNewBlog}>
      <div>
        <h1>Create new</h1>
        <div>
          title:
          <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
          author:
          <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
          url:
          <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}></input>
        </div>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user !== null) {
    return (
      <div>
        <div className='success'>{successMessage}</div>
        <div className='error'>{errorMessage}</div>
        Logged in as <b>{user.username}</b>
        <button onClick={handleLogout}>logout</button>
        <CreateNew title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} addNewBlog={addNewBlog} ></CreateNew>
        <h2>blogs</h2>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
    )
  } else {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='error'>{errorMessage}</div>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
}

export default App