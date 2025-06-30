import './Style.css';
import {useState, memo} from "react";
import {useLocation} from "./Geolocation.jsx";

export const LocationOfUser = memo(({setCoordinates}) => {
    const [pasted, setPasted] = useState('')
    const [copied, setCopied] = useState('');
    const {locationInfo, locationError, countryName, isGeolocationFetching} = useLocation();

    async function handleCopyLocation() {
        try {
            const text = `Latitude: ${locationInfo.latitude}\nLongitude: ${locationInfo.longitude}\nCountry: ${countryName}`;
            await navigator.clipboard.writeText(text);
            setCopied(text)
            setTimeout(() => {
                setCopied('');
            }, 3000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    }

    async function handlePasteLocation() {
        try {
            const copiedText = await navigator.clipboard.readText();
            setPasted(copiedText);
            setCoordinates(copiedText);
        } catch (err) {
            console.error('Failed to read from clipboard:', err);
        }
    }

    if (isGeolocationFetching) {
        return <h1>{'\u{1F4CD}'} Locating...</h1>;
    }

    return (
        <div className="location">
            {copied !== '' ? (
                <button
                    style={{border: '1px solid black', borderRadius: '10px', padding: '8px 12px'}}
                >
                    Copied
                </button>
            ) : (
                <button
                    style={{border: '1px solid black', borderRadius: '10px', padding: '8px 12px'}}
                    onClick={async () => {
                        await handleCopyLocation();
                        await handlePasteLocation();
                    }}
                >
                    <span role="img" aria-label="location">📍</span>
                    {locationError ? locationError.message : countryName}
                </button>
            )}
        </div>
    );
});

