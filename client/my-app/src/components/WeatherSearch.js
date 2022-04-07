import React, { useState, useEffect } from "react";
import WeatherDisplay from "./WeatherDisplay"

const SearchBar = () => {

  const [city, setCity] = useState("boston");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setCity(e.target.value);
    fetch("/weather", { city: city }).then(response => {
      setWeather(response.json());
      console.log(weather)
    }).then(error => {
      console.log(error);
    })
  }

return (
  
  <>
  <div>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      id="location-search"
      placeholder="Enter city"
      name="location-search"
    />
    <button type="submit">Check weather</button>
  </form>
  </div>
  <WeatherDisplay city={city} />  
  </>
)

}

export default SearchBar