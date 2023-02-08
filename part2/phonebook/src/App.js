import { useState } from 'react'

const Number = (props) => {
  return (
    <p>
      {props.name} {props.number}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "1234"}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) != undefined){
      alert(`${newName} is already added to phonebook`)
    }
    else if (persons.find(person => person.number === newNumber) != undefined){
      alert(`${newNumber} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat({ name: newName, number: newNumber}))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Number key={person.name} name={person.name} number={person.number} />)}
    </div>
  )

}

export default App