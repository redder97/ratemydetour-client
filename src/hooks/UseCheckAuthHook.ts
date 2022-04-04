import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import env from "../config/config";

export const useCheckAuth = () => {
    const token = localStorage.getItem('token');
    const [loggedIn, setLoggedIn] = useState(false); 

    useEffect(() => {
        if (token) {

            localStorage.setItem('token', token);
      
            fetch(`${env.api}/secure`, {
              headers: {
                'authorization': `Bearer ${token}`
              }
            }).then((res) => {
              setLoggedIn(true);
            })
        }
    }, [])

    

    return [
        loggedIn
    ]
}