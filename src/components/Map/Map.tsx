import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import React, { useCallback, useRef } from "react";
import env from "../../config/config"

import '@reach/combobox/styles.css'
import { destination } from "../../app.definition";

const libraries: ("drawing" | "geometry" | "localContext" | "places" | "visualization")[] = ["places"];


const mapContainerStyle = {
    width: "100%",
    height: "100%"
}

const center = {
    lat: 14.6255,
    lng: 121.1245
}

export const Map = ({ mapClick, destinations, ...props }: { mapClick: any, destinations: destination[] }) => {

    const mapRef = useRef<google.maps.Map>();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current?.panTo({ lat, lng });
        mapRef.current?.setZoom(14);
    }, [])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: env.googleMapsApiKey,
        libraries: libraries,
    });


    if (loadError) return (<div>Error loading Maps</div>);
    if (!isLoaded) return (<div>Loading Maps</div>);

    const click = (e: google.maps.MapMouseEvent) => {
        mapClick(e.latLng?.lat(), e.latLng?.lng());
    }



    return (
        <GoogleMap mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
            onClick={click}
            onLoad={onMapLoad}
        >
            {destinations.map((e, index) => {
                return (
                    <Marker key={index}
                        position={{ lat: e.lat as number, lng: e.lng as number }} />
                )
            })}
        </GoogleMap>


    )
}

