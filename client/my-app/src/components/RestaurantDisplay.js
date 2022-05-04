import React from "react";
import RestaurantInfo from "./RestaurantInfo";

const RestaurantDisplay = (props) =>
{
    return (
        <div>
            {
                ((props.plans).length <= 0) ? 
                    "No search results currently": 
                    props.plans.map((plan) => <RestaurantInfo key={plan} plan={plan}/>
                )
            }
        </div>
    )
}

export default RestaurantDisplay