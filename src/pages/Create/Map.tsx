import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import React, { useCallback, useRef } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import env from "../../config/config"
import './Map.scss';

import '@reach/combobox/styles.css'
import { destination } from "../../app.definition";

const libraries: ("drawing" | "geometry" | "localContext" | "places" | "visualization")[] = ["places"];

// USE THIS ONLY FOR CREATE PAGE. 


const mapContainerStyle = {
    width: "100%",
    height: "80%"
}

const center = {
    lat: 14.6255,
    lng: 121.1245
}

export const Map = ({ mapClick, destinations, searchInMap,...props }: { mapClick: any, destinations: destination[], searchInMap: boolean }) => {

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

    //TODO: Implement this
    const markerClick = (es: google.maps.MapMouseEvent) => {
        console.log(destinations);
        const destination = destinations.filter(el => el.lng == es.latLng?.lng() && el.lat == es.latLng?.lat())[0];
    }

    return (
        <div style={{height: '100%', width: '100%'}}>
            <Search inMap={searchInMap} panTo={panTo}></Search>
             
            <div style={{width: '100%', height: '70%'}}>
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
        </div>

    )
}

const Search = ({panTo, inMap, ...props}: {panTo: any, inMap: boolean}) => {
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
        <div className={inMap ? 'search' : 'search-outside'}>
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