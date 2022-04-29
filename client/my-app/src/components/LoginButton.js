import axios from "axios";
import React from "react";
import config from "../config"

import GoogleLogin from "react-google-login";

const LoginButton = () => {
    const handleLogin = async (googleData) => {
    
    // const configHeaders = { headers: { 'X-CSRFToken': csrftoken } }
    const body = {test: "value"}

    console.log("handle function called");
    console.log(googleData)
    const response = await axios.post(`${config.backend_url}/testPost`,
    body
    // configHeaders
    );
  }

  
  const handleTest = (e) => {
        // e.preventDefault();
        console.log("handleTest called");

        axios.post(`${config.backend_url}/testPost`, {key: "12345"})
        .then((response) => {
            console.log(response.data)
        })
    }


  return (
    <GoogleLogin
      clientId="466076865376-1e9hgjp6vl93sndv51vea44u76fknu23.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={handleLogin}
      onFailure={(response) => console.log(response)}
      // cookiePolicy="http://localhost:3000"
      // isSignedIn={true}
    />
  );
};

export default LoginButton;
