import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Detour from '../../components/Detour/Detour';
import { LoggedInRmdNavBar } from '../../components/LoggedInRmdNavBar/LoggedInRmdNavBar';
import RmdNavBar from '../../components/RmdNavBar';
import SearchByFitler, { FilterState } from '../../components/SearchByFitler/SearchByFitler';
import { useCheckAuth } from '../../hooks/UseCheckAuthHook';
import { DetourPost } from "../../app.definition"
import './Home.scss';
import env from '../../config/config';

const Home = (props: any) => {

    const { state }: { [key: string]: any } = useLocation();

    const [loggedIn, setLoggedIn] = useState(state?.loggedIn);
    const [loggedInFromToken] = useCheckAuth();
    const [detourPosts, setDetourPosts] = useState<DetourPost[]>([]);

    useEffect(() => {
        if (loggedIn) return;

        else if (loggedInFromToken) {
            setLoggedIn(true);
            return;
        }

    }, [])

    const testDetours = [
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        },
        {
            _id: 'id',
            title: 'title1',
            postedBy: 'this guy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
        }
    ]

    useEffect(() => {
        if (loggedIn) {
            setDetourPosts(testDetours)
        }

    }, [])

    const handleFilterSet = (e: FilterState) => {
        console.log(e);
        fetch(`${env.api}/api/v1/detour`, {
            body: JSON.stringify({ criteria: e }),
            method: 'post',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then((res : any) => res.json()).then((res) => {
            
            console.log(res)
            setDetourPosts(res.data || []);
            
        })
    }



    return (
        <div>
            {loggedIn || loggedInFromToken ? <LoggedInRmdNavBar /> : <RmdNavBar />}
            <div className="page-wrapper">
                <div className="container">

                    <div className="row">
                        <div className="col-12 col-sm-3">
                            <div className="filter-wrapper p-2">
                                <SearchByFitler filterSet={handleFilterSet} ></SearchByFitler>
                            </div>
                        </div>
                        <div className="col-12 col-sm-9">
                            <div className='p-2'>
                                {detourPosts.map((p, index) => {
                                    return (
                                        <Detour key={index} data={p}></Detour>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

Home.propTypes = {}

export default Home
