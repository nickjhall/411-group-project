import React from "react";
import WeatherInfo from "./WeatherInfo";

const WeatherIntermediate = (props) =>
{
    console.log(props.weather)
    return (
        <div>
            {
                ((props.weather).length <= 0) ? 
                "": 
                props.weather.map((weathers) => <WeatherInfo weathers={weathers}/>
                )
            }
        </div>
    )
}

export default WeatherIntermediate