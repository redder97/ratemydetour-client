import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import env from "../../config/config"
import { destination } from "./Create";
import './Map.scss';

import '@reach/combobox/styles.css'

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

    const { useState } = React;

    const [destinationSet, setDestinationSet] = useState<destination[]>([]);
    const mapRef = useRef<google.maps.Map>();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current?.panTo({lat, lng});
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

    const markerClick = (es: google.maps.MapMouseEvent) => {
        console.log(destinations);
        const destination = destinations.filter(el => el.lng == es.latLng?.lng() && el.lat == es.latLng?.lat())[0];
    }

    return (
        <div style={mapContainerStyle}>
            <Search panTo={panTo} />
            <GoogleMap mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                onClick={click}
                onLoad={onMapLoad}
            >
                {destinations.map((e, index) => {
                    return (
                        <Marker key={index}
                            position={{ lat: e.lat as number, lng: e.lng as number }} onClick={markerClick} />
                    )
                })}

            </GoogleMap>
        </div>

    )
}

const Search = ({panTo, ...props}: {panTo: any}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({});

    const handleLocationClick = async (place: any) => {
        try {
            const result = await getGeocode({ address: place });
            const { lat, lng } = await getLatLng(result[0]);
            panTo({ lat , lng});
        } catch (err) {
            console.log('Location click error occured');
        }
    }

    return (
        <div className="search">
               <Combobox
                onSelect={handleLocationClick}>
                    <ComboboxInput 

                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value, true)
                        }}
                        disabled={!ready}
                        placeholder="Where'd you go?"
                    />

                    <ComboboxPopover>
                        {status === "OK" &&  data.map(({place_id, description}) => {
                            return (
                                <ComboboxOption value={description} key={place_id} />
                            )
                        })}
                    </ComboboxPopover>
                </Combobox>
        </div>
    )
        

    
 
}