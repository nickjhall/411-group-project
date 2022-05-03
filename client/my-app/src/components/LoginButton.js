/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config"
import { Navigate, useNavigate } from 'react-router'
import { Redirect } from "react-router-dom";

import GoogleLogin from "react-google-login";

const LoginButton = () => {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(Boolean);
    console.log("Redirect value is ", redirect)

    useEffect(() => {
        console.log("Redirect value is ", redirect)

        if(redirect === true){
            return navigate("/profile");
        }
      }, [navigate, redirect]);

    const handleLogin = (googleData) => {
        axios.post(`${config.backend_url}/login`, {"token": googleData.tokenId})
        .then((response) => {
            console.log(response)

            if (response.status === 200){
                console.log("Log in succeeded")
                sessionStorage.setItem('user_id', response["data"]["_id"]);
                sessionStorage.setItem('user_name', response["data"]["name"]);

                setRedirect(true)
            }
            else{
                console.log("Log in failed, please try again")

                return <Navigate to={{ pathname: "/home"}} />
            }
        })
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
