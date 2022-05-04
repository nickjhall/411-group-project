import React, { useState, useEffect } from "react";
import PlansDisplay from "./PlansDisplay";
import axios from "axios";
import config from "../config";

const MyPlans = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get(`${config.backend_url}/getPlans?createdBy=` + sessionStorage.getItem("user_id"))
        .then((response) => {
            console.log(response);
            setPlans(response.data)
        });
    }, []);

    
    return (
        <div>
            <h1>My plans</h1>
            <PlansDisplay plans={plans} />
            <button><a href="/profile">Home</a></button>
        </div>
    )
}

export default MyPlans