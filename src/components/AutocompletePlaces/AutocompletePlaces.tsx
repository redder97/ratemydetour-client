import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption } from "@reach/combobox";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";



export default ({panTo, inMap, ...props}: {panTo: any, inMap: boolean}) => {
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