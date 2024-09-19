import { useState, useEffect } from 'react'
import personService from './services/persons'


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
      .map(person =>
        <div key={person.name}>
          {person.name} {person.number} <button onClick={() => props.deletePerson(person.id)} type="submit">delete</button>
        </div>)}
  </div>

const Notification = ({ message }) => {

  if (message === null) {
    return null
  }
  return (
    <div className="alertMessage">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="errorMessage">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
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
      number: newNumber,
      id: String(persons.length + 1),
    }

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName)
      const changedPerson = { ...person, number: newNumber }
      updatePerson(persons.filter(person => person.name == newName)[0].id, changedPerson)
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          setAddedMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    alert(`Remove ${persons.filter(person => person.id == id)[0].name} from phone book?`)
    console.log(id)
    personService
      .deleteItem(id)
      .then(response => {
        setPersons(persons.filter(person => person.id != id))
        setAddedMessage(`Deleted ${persons.filter(person => person.id == id)[0].name}`)
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`${newObject.name} has already been removed`)
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const updatePerson = (id, newObject) => {
    console.log(id)
    console.log(newObject)
    personService
      .update(id, newObject)
      .then(response => {
        const updatedList = persons.map(person => {
          if (person.id == id) {
            return { ...person, number: newObject.number }
          }
          return person
        })
        setPersons(updatedList)
        setAddedMessage(`Updated ${newObject.name}`)
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`${newObject.name} not found from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={addedMessage}></Notification>
      <Error message={errorMessage}></Error>
      <Filter handleFilterChange={handleFilterChange} filter={filter}></Filter>
      <h2>Add new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></PersonForm>
      <div>
        <button onClick={addPerson} type="submit">add</button>
      </div>
      <h2>Numbers</h2>
      <AllPersons persons={persons} filter={filter} deletePerson={deletePerson}></AllPersons>
    </div>
  )

}

export default App
