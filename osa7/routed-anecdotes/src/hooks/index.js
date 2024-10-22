import { useState } from 'react'

export const useField = (type) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const onChange = (event) => {
    if (event.target.name === 'content') {
      setContent(event.target.value)
    } else if (event.target.name === 'author') {
      setAuthor(event.target.value)
    } else if (event.target.name === 'info') {
      setInfo(event.target.value)
    }
  }

  return {
    type,
    content,
    author,
    info,
    onChange
  }
}