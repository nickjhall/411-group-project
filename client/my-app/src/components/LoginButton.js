import axios from "axios";
import React from "react";
import config from "../config"

import GoogleLogin from "react-google-login";

const LoginButton = () => {
    const handleLogin = (googleData) => {
    axios.post(`${config.backend_url}/login`, {"token": googleData.tokenId})
  }

  
  return (
    <GoogleLogin
      clientId={config.google_client_id}
      buttonText="Login"
      onSuccess={handleLogin}
      onFailure={(response) => console.log(response)}
      // cookiePolicy="http://localhost:3000"
      // isSignedIn={true}
    />
  );
};

export default LoginButton;
