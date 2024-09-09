import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = 'give feedback'
  const statistics = 'statistics'
  const all = good + neutral + bad

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
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {((1 * good) + (0 * neutral) + (-1 * bad)) / all}</div>
      <div>positive {good / (good + neutral + bad)} %</div>

    </div>
  )
}

export default App