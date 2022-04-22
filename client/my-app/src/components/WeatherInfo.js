import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const WeatherInfo = (props) =>
{
    const weathers = props.weathers

    return (
        <div>
            {
                <div key={JSON.stringify(weathers)}>
                    <div>{weathers.weather.toUpperCase()}</div>
                    <div>Max Temp: {weathers.max}</div>
                    <div>Min Temp: {weathers.min}</div>
                </div>
            }
        </div>
    )
}

export default WeatherInfo