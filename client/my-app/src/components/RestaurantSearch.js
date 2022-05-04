import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantDisplay from "./RestaurantDisplay";
import config from "../config";

const RestaurantSearch = () => {
    const [state, setState] = useState({ foodType: "", location: ""});
    const [restaurants, setRestaurants] = useState([]);
    const [plans, setPlans] = useState([])
    
    let today = new Date();
    let dates = []
    let dateStrings = []

    for(let i=1; i < 8; i++){
        let date = new Date(today.getFullYear(), today.getMonth(), today.getDate()+i);
        dates.push(date);
    }

    for(let i=0; i < dates.length; i ++){
        dateStrings.push(dates[i].toISOString().split('T')[0]);
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var options = document.getElementById('dates').selectedOptions;
        var values = Array.from(options).map(({ value }) => value);
        let chosenDates = values.join(",")
        console.log(chosenDates)

        axios.get(
            `${config.backend_url}/findPlans?foodType=${state.foodType}&location=${state.location}&created_by=${sessionStorage.getItem("user_id")}&dates=${chosenDates}`)
            .then((response) => {
                console.log("This response is from restaurantSearch", response)
                // setRestaurants(response.data.restaurants);
                setPlans(response.data)
        })
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <hr />
        <label>
          Food Type: 
          <input type="text" name="foodType" placeholder="Food Type" onChange={handleChange} value={state.value} />
        </label><br />
        <label>
          Location: 
          <input type="text" name="location" placeholder="Location" onChange={handleChange} value={state.value} />
        </label><br />
        <label for="dates">Choose a date for your plans: </label>
            <select name="dates" id="dates" multiple>
                <option value={dateStrings[0]}>{dateStrings[0]}</option>
                <option value={dateStrings[1]}>{dateStrings[1]}</option>
                <option value={dateStrings[2]}>{dateStrings[2]}</option>
                <option value={dateStrings[3]}>{dateStrings[3]}</option>
                <option value={dateStrings[4]}>{dateStrings[4]}</option>
                <option value={dateStrings[5]}>{dateStrings[5]}</option>
                <option value={dateStrings[6]}>{dateStrings[6]}</option>
            </select>
        <button type="submit">Submit</button>
        <hr />
        <RestaurantDisplay plans={plans} />
        <hr />
      </form>
    </div>
  );
};

export default RestaurantSearch;
