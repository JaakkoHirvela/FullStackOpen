import { useState } from 'react'

const Contact = (props) => {
  if (props.filter === '' || props.name.toLowerCase().includes(props.filter.toLowerCase())) {
    return (
      <p>
        {props.name} {props.number}
      </p>
    )
  }
}

const FilterForm = (props) => {
  return (
    <div>
      filter shown with: <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

const ContactAddingForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.name} onChange={props.onNameChange} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Contacts = (props) => {
  return (
    props.persons.map(person => 
      <Contact key={person.name} name={person.name} number={person.number} filter={props.filter} />)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    }
    else if (persons.find(person => person.number === newNumber) !== undefined) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm value={newFilter} onChange={handleFilterChange} />

      <h2>Add a new contact</h2>
      <ContactAddingForm onSubmit={addName} name={newName} onNameChange={handleNameChange}
        number={newNumber} onNumberChange={handleNumberChange} />

      <h2>Contacts</h2>
      <Contacts persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App