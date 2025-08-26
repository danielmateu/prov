export function parseGooglePlace(place) {
    if (!place?.formatted_address) return null;

    const addressComponents = place.address_components || [];

    // Helper function to find component by type
    const findComponent = (type) =>
        addressComponents.find(component => component.types.includes(type))?.long_name || '';

    // Get coordinates
    const getCoordinates = () => {
        if (place.geometry?.location?.lat && place.geometry?.location?.lng) {
            // Handle if lat/lng are functions (from Maps API)
            return {
                lat: typeof place.geometry.location.lat === 'function'
                    ? place.geometry.location.lat()
                    : place.geometry.location.lat,
                lng: typeof place.geometry.location.lng === 'function'
                    ? place.geometry.location.lng()
                    : place.geometry.location.lng
            };
        }
        return { lat: null, lng: null };
    };

    const { lat, lng } = getCoordinates();

    return {
        street: findComponent('route'),
        number: findComponent('street_number'),
        city: findComponent('locality') || findComponent('administrative_area_level_2'),
        state: findComponent('administrative_area_level_1'),
        country: findComponent('country'),
        postalCode: findComponent('postal_code'),
        lat,
        lng,
        // Incluimos la dirección formateada por si es necesaria
        formattedAddress: place.formatted_address
    };
}