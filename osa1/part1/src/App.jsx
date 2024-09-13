import { useState } from 'react'

const Statistics = (props) => {
  if (props.all > 0) {
    return (
      <div>
        <StatisticLine text="good" value={props.good}></StatisticLine>
        <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
        <StatisticLine text="bad" value={props.bad}></StatisticLine>
        <StatisticLine text="all" value={props.all}></StatisticLine>
        <StatisticLine text="average" value={props.average}></StatisticLine>
        <StatisticLine text="positive" value={props.positive} text2="%"></StatisticLine>
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

  return (
    <div>
      <Header header={feedback} />
      <Button handleClick={handleGoodClick} text={"good"}></Button>
      <Button handleClick={handleNeutralClick} text={"neutral"}>neutral</Button>
      <Button handleClick={handleBadClick} text={"bad"}>bad</Button>
      <Header header={statistics} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />

    </div>
  )
}

export default App