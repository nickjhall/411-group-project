import React from "react";
import axios from "axios";
import config from "../config";
import { useNavigate } from 'react-router'

const PlanInfo = (props) =>{
    const plans = props.plans
    const navigate = useNavigate();

    const handleRemove = () => {
        axios.get(`${config.backend_url}/deletePlans?planId=` + plans._id)
        .then((response) => {
            console.log(response);

            return navigate("/profile")
        });
        }

    return (
        <div>
            {
                <div key={JSON.stringify(plans)}>
                    <h2>{plans.restaurant}</h2>
                    <img src={plans.pic} height="40%" width="40%" alt={plans.restaurant}/>
                    <div>{plans.address}</div>
                    <div>{plans.date}</div>
                    <button onClick={handleRemove}>Cancel Plan</button>
                </div>
            }
        </div>
    )
}

export default PlanInfo