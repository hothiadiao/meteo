import React, { useState } from "react";
import axios from "axios"

import './App.css'

function App() {

  const [weatherData, setweatherData] = useState([{}])
  const [city, setCity] = useState("")

  const apiKey = '3aa263dc7aed6fd46df00228680fb46b'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  async function getWeather(e) {
    e.preventDefault();

    try {
      const reponse = await axios.get(url);
        if (reponse.status === 200) {
          setweatherData(reponse.data);
          console.log(reponse.data);
        } else {
          console.log("Erreur!");
        }

      setCity("");
      console.log(reponse);
    } catch (e) {
      console.log(e)
    }
  }

return (
  <div className="container">

    <form onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        getWeather(e);
      }
    }}>
      <div>
        <input
         type="text"
         placeholder="Entrer votre ville"
         onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={(e) => getWeather(e)} type="submit">VALIDER</button>
      </div>
    </form>

    <div>
      <div>
        <p>{weatherData.name}</p>
      </div>
      <div>
        {weatherData.main ? <p>{Math.round(weatherData.main.temp)} °F</p> : null}
      </div>
      <div>
        {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
      </div>
    </div>

  </div>
)

} 
 
export default App 