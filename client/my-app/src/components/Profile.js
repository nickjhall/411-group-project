import React, { useState } from "react";
import RestaurantSearch from './RestaurantSearch';
import MyPlans from "./MyPlans";

const Profile = () => {
    const name = sessionStorage.getItem("user_name")

    return (
        <div>
            <h1>Welcome to your homepage {name}</h1>
            <RestaurantSearch />
        </div>
    );
  };

export default Profile;