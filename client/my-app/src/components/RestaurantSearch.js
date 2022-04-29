import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantDisplay from "./RestaurantDisplay";
import WeatherDisplay from "./WeatherDisplay";
import config from "../config";

const RestaurantSearch = () => {
  const [state, setState] = useState({
    foodType: "",
    location: "",
  });
  const [restaurants, setRestaurants] = useState([]);

  const handleTest = (e) => {
        e.preventDefault();
        console.log("handleTest called");
        let body = {token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2MTY0OWU0NTAzMTUzODNmNmI5ZDUxMGI3Y2Q0ZTkyMjZjM2NkODgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDY2MDc2ODY1Mzc2LTFlOWhnanA2dmw5M3NuZHY1MXZlYTQ0dTc2ZmtudTIzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDY2MDc2ODY1Mzc2LTFlOWhnanA2dmw5M3NuZHY1MXZlYTQ0dTc2ZmtudTIzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExMDg3NzI2NDI0MTU4MzYyNzA5IiwiaGQiOiJidS5lZHUiLCJlbWFpbCI6Im5qaGFsbEBidS5lZHUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IllxTjdSeDhCdVNQS1daNnZzRkVBenciLCJuYW1lIjoiTmljaG9sYXMgSGFsbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp4aGV3aElkeDdIWVNoWkVITWw3VGlpNVBSRHc4UXIyNldvMzVSOT1zOTYtYyIsImdpdmVuX25hbWUiOiJOaWNob2xhcyIsImZhbWlseV9uYW1lIjoiSGFsbCIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjUxMjEyMDUyLCJleHAiOjE2NTEyMTU2NTIsImp0aSI6ImU0OTFlNTNhYjM3ZDk4Mjk0YWVhNGNiMzM2NGFkY2E4MjcyMmI5MGEifQ.N9MlRtNQU3xtoOLv60jj2SzCCslMDAigtns4JPrvWwDKwg6gYo3yQBzfdgSz5pqdsowJ4rtFPF2Qp6k7rdk_QfuP-sYud2eG-jHxGgRlzutbp2V2mtLiIgUZtcAg6Mu17nRBnIBK5ZUPuSIaEvnC177j--d8WWjK8P0PiPVnAOjXxgCRG_0su8aVid64iSVnc5tMcQ9SW7TwASFlS9ira88_P8HFK_ui_W3PAJrK1C2jqrLRYUyJQSwcPBd4fmvQLTjryNWB2sXGlmMy9FRCuRZCPzwbwTF4m7iWUy8KLCs199n6CvnUMSDxasp2PRPvkOVSPaZlTx6WNN6t0hD89g"}
        body = {test: "value"}
        axios.post(`${config.backend_url}/testPost`, {key: "12345"})
        .then((response) => {
            console.log(response.data)
        })
    }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(
      `${config.backend_url}/findRestaurants?foodType=${state.foodType}&location=${state.location}`)
      .then((response) => {
        console.log("Response from server is", response)
        setRestaurants(response.data.restaurants);

        console.log(restaurants)
    })
  };

  return (
    <div>
      <form onSubmit={handleTest}>
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
        <WeatherDisplay restaurants={restaurants} />
        <RestaurantDisplay restaurants={restaurants} />
      </form>
    </div>
  );
};

export default RestaurantSearch;
