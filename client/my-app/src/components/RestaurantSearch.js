import React, { useState, useEffect } from "react";

const RestaurantSearch = () => {
  const [state, setState] = useState({
    foodType: "",
    location: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
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
      </form>
    </div>
  );
};

export default RestaurantSearch;
