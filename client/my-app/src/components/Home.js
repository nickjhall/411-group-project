import React from "react";
import LoginButton from "./LoginButton";

const Home = () => {
    let today = new Date();
    let dates = []

    for(let i=1; i < 8; i++){
        let date = new Date(today.getFullYear(), today.getMonth(), today.getDate()+i);
        dates.push(date);
    }

    for(let i=0; i < dates.length; i ++){
        console.log(dates[i].toISOString().split('T')[0]);
    }

    return (
        <div>
            <div>Welcome to restaurant search, please log in to begin</div>
            <br />
            <LoginButton />
        </div>
    )
}

export default Home