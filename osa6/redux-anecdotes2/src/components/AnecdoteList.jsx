const AnecdoteList = ({ anecdotes, vote, filterWord }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filterWord.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList