import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
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

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user !== null) {
    return (
      <div>
        Logged in as <b>{user.username}</b>
        <button onClick={handleLogout}>logout</button>

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