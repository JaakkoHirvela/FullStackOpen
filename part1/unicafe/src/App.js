import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ value, text }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad, all }) => {

  const computeAvg = () => (good - bad) / all
  const computePositives = () => good / all

  if (all > 0) {
    return (
      <div>
        <Display value={good} text='good' />
        <Display value={neutral} text='neutral' />
        <Display value={bad} text='bad' />
        <Display value={all} text='all' />
        <Display value={computeAvg()} text={'average'} />
        <div>positive {computePositives() * 100} % </div>
      </div>
    )
  }
  else {
    return <div>No feedback given</div>
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClick = (str) => {
    switch (str) {
      case 'good':
        setGood(good + 1)
        break;
      case 'neutral':
        setNeutral(neutral + 1)
        break;
      case 'bad':
        setBad(bad + 1)
        break;
      default:
        console.log('Button not defined!')
        return;
    }
    setAll(all + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick('good')} text='good' />
      <Button handleClick={() => handleClick('neutral')} text='neutral' />
      <Button handleClick={() => handleClick('bad')} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </>
  )
}

export default App