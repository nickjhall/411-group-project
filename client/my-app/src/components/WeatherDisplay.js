import React, { useState, useEffect } from "react";
import WeatherIntermediate from "./WeatherIntermediate";
import axios from "axios";
import config from "../config";

const WeatherDisplay = (props) =>
{
    const [weather, setWeather] = useState([]);

    const restaurant = props.restaurants

    const handleClick = (e) => {
        e.preventDefault();

        axios.get(
            `${config.backend_url}/getWeather?lat=${restaurant[0].lat}&lon=${restaurant[0].lon}`)
            .then((response) => {
            console.log("Response from server is", response)
            setWeather(response.data.weather);
        })
    };

    
    return (
        <div>
            {
                ((props.restaurants).length <= 0) ? 
                "No weather to show": 
                <button onClick={handleClick}>Show Weather</button>
            }
            <WeatherIntermediate weather={weather} />
        </div>
    )
}

export default WeatherDisplay