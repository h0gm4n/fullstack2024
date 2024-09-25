import { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = (props) => {
  const languages = []
  if (props.countries.length == 1) {
    Object.values(props.countries[0].languages).forEach((element) => { languages.push(element) })
    var image = new Image()

    return (
      <div>
        <h2>{props.countries[0].name.common}</h2>
        <div>capital {props.countries[0].capital[0]}</div>
        <div>area {props.countries[0].area}</div>
        <b>languages:</b>
        <ul>
          {languages.map((l) => <li>{l}</li>)}
        </ul>
        <div>
          <img src={props.countries[0].flags.png} />
        </div>
      </div>
    )
  } else if (props.value.length > 0 && props.countries.length <= 10) {
    return (
      <div>
        {props.countries.map((country) => <div key={country.name.common}>{country.name.common}</div>)}
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

const App = () => {

  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState(null)

  const handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setValue(event.target.value)
    setSearch(value)
  }

  useEffect(() => {
    if (value.length > 0) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data
            .map((country) => country)
            .filter((country) => country.name.common.toLowerCase().includes(value.toLowerCase())))
        })
    } else {
      setCountries([])
    }
  }, [search])


  return (
    <div>
      find countries <input value={value} onChange={handleChange}></input>
      <div>
        <Countries countries={countries} value={value}></Countries>
      </div>
    </div>
  )
}

export default App