import React, { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import { useNavigate } from 'react-router'

const RestaurantInfo = (props) =>
{
    const restaurant = props.restaurant
    const plan = props.plan;
    console.log(plan)
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(Boolean);

    useEffect(() => {
        if(redirect === true){
            return navigate("/myPlans");
        }
    }, [navigate, redirect]);

    const handleSelect = (e) => {
        e.preventDefault();

        axios.post(`${config.backend_url}/selectPlan`, {
            createdBy: sessionStorage.getItem("user_id"),
            restaurant: plan.restaurant.name,
            address: plan.restaurant.address.join(', '),
            pic: plan.restaurant.image,
            date: plan.date
        }).then((response) => {
            console.log(response.data)
            console.log("Response was a success", response.data["Message"] === "Success")

            if (response.data["Message"] === "Success"){
                setRedirect(true);
            }
        });
    };

    return (
        <div>
            {
                <div key={JSON.stringify(plan)}>
                    <h2>{plan.restaurant.name}</h2>
                    <img src={plan.restaurant.image} height="300px" width="auto%" alt={plan.restaurant.name}/>
                    <div>{plan.restaurant.address.join(', ')}</div>
                    <div>Phone: {plan.restaurant.phone}</div>
                    <div>Rating: {plan.restaurant.rating}/5</div>
                    <div>Date: {plan.date}</div>
                    <div>Weather: {plan.weather}</div>
                    <button onClick={handleSelect}>Make plan</button>
                    <hr />
                </div>
            }
        </div>
    )
}

export default RestaurantInfo