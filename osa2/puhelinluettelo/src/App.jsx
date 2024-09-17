import { useState, useEffect } from 'react'
import axios from 'axios'


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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:2001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
