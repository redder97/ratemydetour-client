import { useEffect, useState } from "react"
import { Map } from "../Map/Map";

import './SearchByFilter.scss';

interface LatLng {
    lat: number,
    lng: number,
}


export interface FilterState {
    coordinates: LatLng,
    maxDistance: number,
}



export default ({ filterSet, ...props }: { filterSet: (...e: any) => any }) => {
    const [filterState, setFilterState] = useState<FilterState>({
        coordinates: {
            lat: 0,
            lng: 0
        },
        maxDistance: 0
    })

    useEffect(() => {
        filterSet(filterState);
    }, [filterState])

    const handleMapClick = (lat: number, lng: number) => {
        setFilterState({ ...filterState, coordinates: { lat, lng } })
    }

    const onDistanceSlide = (e: any) => {
        const maxDistance = e.target.value;
        setFilterState({ ...filterState, maxDistance});
    }

    return (
        <>
            <div className="filters-card p-2 my-2">

                <div className='map-section'>
                    <Map destinations={[]} mapClick={handleMapClick}></Map>
                </div>

                <div className="special-filters-wrapper">
                    <input type="range" min="0" defaultValue={"0"} max='20' onChange={onDistanceSlide} className='slider' />
                </div>
            </div>

        </>

    )
}