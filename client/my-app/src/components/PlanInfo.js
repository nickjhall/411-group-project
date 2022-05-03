import React from "react";

const PlanInfo = (props) =>
{
    const plans = props.plans

    return (
        <div>
            {
                <div key={JSON.stringify(plans)}>
                    <h2>{plans.name}</h2>
                    <img src={plans.pic} height="40%" width="40%" alt={plans.restaurant}/>
                    <div>{plans.address}</div>
                    <div>{plans.date}</div>
                </div>
            }
        </div>
    )
}

export default PlanInfo