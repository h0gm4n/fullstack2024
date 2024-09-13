import { useState } from 'react'

const Statistics = (props) => {
  if (props.all > 0) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <StatisticLine text="good"></StatisticLine>
              </td>
              <td>
                <StatisticLine value={props.good}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="neutral"></StatisticLine>
              </td>
              <td>
                <StatisticLine value={props.neutral}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="bad"></StatisticLine>
              </td>
              <td>
                <StatisticLine value={props.bad}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="all"></StatisticLine>
              </td>
              <td>
                <StatisticLine value={props.all}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="average"></StatisticLine>
              </td>
              <td>
                <StatisticLine value={props.average}></StatisticLine>
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="positive"></StatisticLine>
              </td>
              <td>
                <StatisticLine value={props.positive} text2={"%"}></StatisticLine>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <div>{props.text} {props.value} {props.text2}</div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = 'give feedback'
  const statistics = 'statistics'
  const all = good + neutral + bad
  const average = ((1 * good) + (0 * neutral) + (-1 * bad)) / all
  const positive = (good / (good + neutral + bad)) * 100
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const Header = (props) => {
    return (
      <div>
        <h2>{props.header}</h2>
      </div>
    )
  }

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleAnecdote = () => {
    setSelected(anecdotes[Math.floor(Math.random() * anecdotes.length)])
  }

  return (
    <div>
      <Header header={feedback} />
      <Button handleClick={handleGoodClick} text={"good"}></Button>
      <Button handleClick={handleNeutralClick} text={"neutral"}></Button>
      <Button handleClick={handleBadClick} text={"bad"}></Button>
      <Header header={statistics} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
      <div>
        <p>
          {selected}
        </p>
      </div>
      <Button handleClick={handleAnecdote} text={"next anecdote"}></Button>
    </div>
  )
}

export default App