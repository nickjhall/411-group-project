import React, { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import { useNavigate } from 'react-router'

const RestaurantInfo = (props) =>
{
    const restaurant = props.restaurant
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(Boolean);

    useEffect(() => {
        if(redirect === true){
            return navigate("/myPlans");
        }
    }, [navigate, redirect]);

    const handleSelect = (e) => {
        e.preventDefault();

        console.log("You have chosen " + restaurant.name)

        axios.post(`${config.backend_url}/selectPlan`, {
            createdBy: sessionStorage.getItem("user_id"),
            restaurant: restaurant.name,
            address: restaurant.address,
            pic: restaurant.image,
            date: "2022-05-03"
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
                <div key={JSON.stringify(restaurant)}>
                    <h2>{restaurant.name}</h2>
                    <img src={restaurant.image} height="300px" width="auto%" alt={restaurant.name}/>
                    <div>{restaurant.address}</div>
                    <div>Phone: {restaurant.phone}</div>
                    <div>Rating: {restaurant.rating}/5</div>
                    <button onClick={handleSelect}>Make plan</button>
                    <hr />
                </div>
            }
        </div>
    )
}

export default RestaurantInfo