import React from "react"
import { Card, CardBody, CardText } from "reactstrap"

const WeatherDisplay = (props) => {
  return (
    <Card>
      <CardBody>
        <CardText>
          {props.city}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default WeatherDisplay
