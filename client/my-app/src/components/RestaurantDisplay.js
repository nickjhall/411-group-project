import React from "react";

const RestaurantDisplay = (props) =>
{
  return (
    <div>
      {JSON.stringify(props.restaurants)}
    </div>
  )
}

export default RestaurantDisplay