import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({value, text}) => <div>{text} {value}</div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (str) => {
    switch(str) {
      case 'good':
        setGood(good + 1)
        break;
      case 'neutral':
        setNeutral(neutral + 1)
        break;
      case 'bad':
        setBad(bad + 1)
        break;
    }
  }

  return (
    <>
      <h1>give feedback</h1>
        <Button handleClick={() => handleClick('good')} text='good' />
        <Button handleClick={() => handleClick('neutral')} text='neutral' />
        <Button handleClick={() => handleClick('bad')} text='bad' />
      <h1>statistics</h1>
        <Display value={good} text='good'/>
        <Display value={neutral} text='neutral'/>
        <Display value={bad} text='bad'/>
    </>
  )
}

export default App