import React from "react";
import RestaurantInfo from "./RestaurantInfo";

const RestaurantDisplay = (props) =>
{
    return (
        <div>
            {
                ((props.restaurants).length <= 0) ? 
                    "No search results currently": 
                    props.restaurants.map((restaurant) => <RestaurantInfo key={restaurant} restaurant={restaurant}/>
                )
            }
        </div>
    )
}

export default RestaurantDisplay