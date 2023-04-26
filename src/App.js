import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a536ef7dc755ed3b746a58f56bd1608d
  `
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(apiUrl).then(res => {
        setData(res.data)
        console.log(res.data)
      })
      searchLocation('')
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input placeholder='Enter Location' type="text" value={location} onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation} />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            {data.sys ? <small>{data.sys.country}</small> : null}
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)} °C</h1> : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name != null &&
          <div className="buttom">
            <div className="feels">
              {data.main ? <p className='bold'>{Math.round(data.main.feels_like)} °C</p> : null}
              <p>Real Feel</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{(data.main.humidity)} %</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{Math.round(data.wind.speed)} MPH</p> : null}
              <p>Winds</p>
            </div>
          </div>}
      </div>
    </div>
  );
}

export default App;
