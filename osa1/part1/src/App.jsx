import { useState } from 'react'

const Statistics = (props) => {
  if (props.all > 0) {
    return (
      <div>
        <div>good {props.good}</div>
        <div>neutral {props.neutral}</div>
        <div>bad {props.bad}</div>
        <div>all {props.all}</div>
        <div>average {props.average}</div>
        <div>positive {props.positive} %</div>
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

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = 'give feedback'
  const statistics = 'statistics'
  const all = good + neutral + bad
  const average = ((1 * good) + (0 * neutral) + (-1 * bad)) / all
  const positive = good / (good + neutral + bad)

  const Header = (props) => {
    return (
      <div>
        <h2>{props.header}</h2>
      </div>
    )
  }

  return (
    <div>
      <Header header={feedback} />
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Header header={statistics} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />

    </div>
  )
}

export default App