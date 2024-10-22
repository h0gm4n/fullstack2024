import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import { filterChange } from './reducers/filterReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(addAnecdote(content))
  }

  const filterSelected = (event) => {
    event.preventDefault()
    dispatch(filterChange(event.target.value))
  }

  return (
    <div>
      <Filter filterSelected={filterSelected}></Filter>
      <AnecdoteList anecdotes={anecdotes} vote={vote} filterWord={filter}></AnecdoteList>
      <AnecdoteForm add={add}></AnecdoteForm>
    </div>
  )
}

export default App