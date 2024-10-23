const CreateNew = ({ title, author, url, setTitle, setAuthor, setUrl, addNewBlog }) => {
  return (
    <form onSubmit={addNewBlog}>
      <div>
        <h1 className='createNew'>Create new</h1>
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
      <button className='createButton' type="submit">create</button>
    </form>
  )
}

export default CreateNew