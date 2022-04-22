import React from "react";

const RestaurantInfo = (props) =>
{
    const restaurant = props.restaurant

    return (
        <div>
            {
                <div key={JSON.stringify(restaurant)}>
                    <h2>{restaurant.name}</h2>
                    <img src={restaurant.image} height="40%" width="40%" alt={restaurant.name}/>
                    <div>{restaurant.address}</div>
                    <div>Phone: {restaurant.phone}</div>
                    <div>Rating: {restaurant.rating}/5</div>
                    <div>Latitude: {restaurant.lat}</div>
                    <div>Longitude: {restaurant.lon}</div>
                </div>
            }
        </div>
    )
}

export default RestaurantInfo