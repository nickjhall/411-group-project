import React from "react";
import RestaurantInfo from "./RestaurantInfo";

const RestaurantDisplay = (props) =>
{
    console.log(props.restaurants)
    return (
        <div>
            {
                ((props.restaurants).length <= 0) ? 
                "No search results currently": 
                props.restaurants.map((restaurant) => <RestaurantInfo restaurant={restaurant}/>
                )
            }
        </div>
    )
}

export default RestaurantDisplay