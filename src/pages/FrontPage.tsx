import RmdNavBar from "../components/RmdNavBar";
import { BsSearch } from "react-icons/bs";
import './FrontPage.scss';
import { InputGroup, FormControl } from "react-bootstrap";
import env from "../config/config";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FrontPage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();


  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {

      localStorage.setItem('token', token);

      fetch(`${env.api}/secure`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }).then((res) => {
        navigate(`/explore`, {
          state: {
            loggedIn: true
          }
        });
      })
    }

  }, [])

  return (
    <div>
      <RmdNavBar></RmdNavBar>

      <div className="main-page-banner">
        <div className="container d-flex justify-content-center pt-5 flex-column">
          <div className="p-2 main-text text-center">Find a Detour</div>
          <div className="p-2 input-wrapper text-center">

            <InputGroup className="mb-3">
              <InputGroup.Text ><BsSearch></BsSearch></InputGroup.Text>
              <FormControl
                placeholder="Search"
                aria-label="SearchDetour"
                aria-describedby="detour-search-input"
              />
            </InputGroup>
          </div>

          <div className="p-2 sign-up-wrapper text-center">
            <button type='button' id="login-with-google-btn" onClick={handleGoogleLogin} >Login with Google</button>
          </div>
        </div>
      </div>


    </div>

  )
}


const handleGoogleLogin = () => {
  window.location.href = `${env.api}/api/v1/auth/google`;
}
