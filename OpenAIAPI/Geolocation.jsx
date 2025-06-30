import { useState, useEffect } from 'react';

export function useLocation() {
    const [locationInfo, setLocationInfo] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [isGeolocationFetching, setIsGeolocationFetching] = useState(true);

    useEffect(() => {
        setIsGeolocationFetching(true);

        if (!locationInfo && !locationError) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (res) => {
                        const coords = res.coords;
                        setLocationInfo(prev =>
                            prev &&
                            prev.latitude === coords.latitude &&
                            prev.longitude === coords.longitude
                                ? prev
                                : coords
                        );
                        setLocationError(null);
                        setIsGeolocationFetching(false);
                    },
                    (err) => {
                        setLocationError(err);
                        setLocationInfo(null);
                        setIsGeolocationFetching(false);
                    }
                );
            } else {
                setLocationError({ message: "Geolocation is not supported by this browser." });
                setIsGeolocationFetching(false);
            }
        }
    }, []);

    useEffect(() => {
        if (locationInfo && !locationError) {
            const { latitude, longitude } = locationInfo;
            const API_KEY = 'YOUR-API-KEY';
            const GEOCODING_API_URL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`;

            fetch(GEOCODING_API_URL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error, status ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        const country = data.results[0].components.country;
                        setCountryName(prev => (prev === country ? prev : country));
                    } else {
                        setCountryName(prev => (prev === "Country not found" ? prev : "Country not found"));
                    }
                })
                .catch(error => {
                    console.error("Error fetching country name:", error);
                    setLocationError({ message: `Could not get country name: ${error.message}` });
                });
        }
    }, [locationInfo, locationError]);

    return {locationInfo, locationError, isGeolocationFetching, countryName};
}
