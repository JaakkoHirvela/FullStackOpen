import axios from 'axios'
import { useState, useEffect } from 'react'


const SingleCountryInfo = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <div>
        <p>
          capital {props.capital}<br></br>
          area {props.area}
        </p>
      </div>
      <b>languages:</b>
      <ul>
        {Object.values(props.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={props.flag.png} alt={props.flag.alt} />
    </div>
  )
}

const CountryInfoList = (props) => {
  if (props.countries !== null) {
    let countriesToShow = props.countries.filter(country => country.name.common.toLowerCase().includes(props.filter))
    let singleCountry = countriesToShow.filter(country => country.name.common.toLowerCase() === props.filter)

    if (singleCountry.length > 0) {
      countriesToShow = singleCountry
    }

    if (countriesToShow !== null && countriesToShow.length <= 10) {
      if (countriesToShow.length === 1) {
        const countryToShow = countriesToShow[0]
        return (
          <SingleCountryInfo name={countryToShow.name.common} flag={countryToShow.flags}
            languages={countryToShow.languages} capital={countryToShow.capital} area={countryToShow.area} />
        )
      }
      else {
        return (
          countriesToShow.map(country =>
            <div key={country.name.common} >{country.name.common}
              <button onClick={() => props.onClick(country.name.common)}>show</button></div>
          )
        )
      }
    }
    else if (countriesToShow.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
  }
}

function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [allCountries, setAllCountries] = useState(null)

  useEffect(() => {
    console.log('effect run, allCountries is now', allCountries);
    console.log('fetching countries..');
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => setCountryFilter(event.target.value.toLowerCase())

  return (
    <div>
      find countries <input value={countryFilter} onChange={handleCountryChange}></input>
      <CountryInfoList countries={allCountries} filter={countryFilter}
        onClick={(name) => setCountryFilter(name.toLowerCase())} />
    </div>
  );
}

export default App;
