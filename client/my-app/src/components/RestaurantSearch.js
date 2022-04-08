import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantDisplay from "./RestaurantDisplay"

const RestaurantSearch = () => {
  const [state, setState] = useState({
    foodType: "",
    location: "",
  });
  const [restaurants, setRestaurants] = useState([]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:4000"

    axios.get(
      url + `/findRestaurants?foodType=${state.foodType}&location=${state.location}`)
      .then((response) => {
        console.log("Response from server is", response)
        setRestaurants(response.data.restaurants);

        console.log(restaurants)
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Food Type
          <input
            type="text"
            name="foodType"
            placeholder="Food Type"
            onChange={handleChange}
            value={state.value}
          />
        </label>
        <br />
        <label>
          Location
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            value={state.value}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <RestaurantDisplay restaurants={restaurants} />
      </form>
    </div>
  );
};

export default RestaurantSearch;
