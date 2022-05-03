import React from "react";
import config from "../config";
import axios from "axios";

const SelectPlan = () => {
    const handleSelect = () => {
        axios.post(`${config.backend_url}/selectPlan`, {
            createdBy: "111087726424158362709",
            restaurant: "Dumpling Xuan",
            address: "465 Cambridge St Cambridge, MA 02141",
            pic: "https://s3-media3.fl.yelpcdn.com/bphoto/rz4bIJL9VLtfRm-XGZNyHA/o.jpg",
            date: "2022-05-03"
        })
        .then((response) => {
            console.log(response)
        });
        // axios.post(${config.backend_url}/selectPlan, {"test": "data"})
    };

    const handleGetPlans = () => {
        axios.get(`${config.backend_url}/getPlans?createdBy=111087726424158362709`)
        .then((response) => {
            console.log(response);
        });
    }

  return (
    <div>
        <button onClick={handleSelect}>Select Plan</button>
        <button onClick={handleGetPlans}>Get Plans</button>
    </div>
  )

};

export default SelectPlan;