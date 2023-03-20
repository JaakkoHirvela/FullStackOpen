import axios from 'axios'
import { useState, useEffect } from 'react'
const API_KEY = process.env.REACT_APP_API_KEY

const WeatherDisplay = ({country, weather}) => {
  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}></img>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const SingleCountryInfo = ({ country }) => {

  const [weather, setWeather] = useState(null)
  const lat = country.capitalInfo.latlng[0]
  const lng = country.capitalInfo.latlng[1]
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
  
  useEffect(() => {
    console.log('fetching weather..');
    axios.get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  console.log('weather is now: ', weather);

  if (weather !== null){
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>
          <p>
            capital {country.capital}<br></br>
            area {country.area}
          </p>
        </div>
        <b>languages:</b>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <WeatherDisplay country={country} weather={weather}/>
      </div>
    )
  }
  else{
    return
  }
}

const CountryInfoList = ({ countries, func }) => {
  return (
    countries.map(country =>
      <div key={country.name.common} >{country.name.common}
        <button onClick={() => func(country.name.common)}>show</button></div>
    )
  )
}

const CountryInfoDisplay = (props) => {
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
          <SingleCountryInfo country={countryToShow} />
        )
      }
      else {
        return (
          <CountryInfoList countries={countriesToShow} func={props.onClick} />
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
    console.log('fetching countries..');
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])
  console.log('effect run, allCountries is now', allCountries);

  const handleCountryChange = (event) => setCountryFilter(event.target.value.toLowerCase())

  return (
    <div>
      find countries <input value={countryFilter} onChange={handleCountryChange}></input>
      <CountryInfoDisplay countries={allCountries} filter={countryFilter}
        onClick={(name) => setCountryFilter(name.toLowerCase())} />
    </div>
  );
}

export default App;
