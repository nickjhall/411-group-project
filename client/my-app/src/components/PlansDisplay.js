import React from "react";
import PlanInfo from "./PlanInfo";

const PlansDisplay = (props) =>
{
    return (
        <div>
            {
                ((props.plans).length <= 0) ? 
                    "No plans currently, go make": 
                    props.plans.map((plans) => <PlanInfo key={plans.name} plans={plans}/>
                )
            }
        </div>
    )
}

export default PlansDisplay