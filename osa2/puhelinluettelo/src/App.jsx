import { useState } from 'react'


const Filter = (props) =>
  <div>
    filter shown with <input value={props.filter} onChange={props.handleFilterChange} />
  </div>

const PersonForm = (props) =>
  <div>
    name: <input value={props.newName} onChange={props.handleNameChange} />
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
  </div>

const AllPersons = (props) =>
  <div>
    {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
      .map(person => <div key={person.name}>{person.name} {person.number}</div>)}
  </div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} filter={filter}></Filter>
      <h2>Add new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></PersonForm>
      <div>
        <button onClick={addPerson} type="submit">add</button>
      </div>
      <h2>Numbers</h2>
      <AllPersons persons={persons} filter={filter}></AllPersons>
    </div>
  )

}

export default App
