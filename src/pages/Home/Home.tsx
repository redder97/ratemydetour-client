import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LoggedInRmdNavBar } from '../../components/LoggedInRmdNavBar/LoggedInRmdNavBar';
import RmdNavBar from '../../components/RmdNavBar';


const Home = (props: any) => {

    const { useState } = React;
    const { state }: {[key: string]: any} = useLocation();

    const [loggedIn, setLoggedIn] = useState(state?.loggedIn);

    return (
        <div>
            {loggedIn ? <LoggedInRmdNavBar/> : <RmdNavBar /> }
            <div className="container">
            </div>
        </div>
    )
}


Home.propTypes = {}

export default Home
