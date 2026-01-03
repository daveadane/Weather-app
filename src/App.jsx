import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    try {
      setError('')
      const response = await fetch(url)
      if (!response.ok) throw new Error('City not found')
      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
      setWeather(null)
    }
  }

  return (
    <div className="app-container" style={{ 
  background: weather?.main.temp > 20 ? 'orange' : 'skyblue' 
}}>
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Enter city name..." 
          value={city}
          onChange={(e) => setCity(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {weather && (
        <div className="weather-card">
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="description">{weather.weather[0].main}</div>
          <div className="details">
            <div className="col">
              <p>Humidity</p>
              <p><strong>{weather.main.humidity}%</strong></p>
            </div>
            <div className="col">
              <p>Wind Speed</p>
              <p><strong>{weather.wind.speed} m/s</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App