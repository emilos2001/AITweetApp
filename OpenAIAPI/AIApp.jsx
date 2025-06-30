import './Style.css';
import {useState} from 'react';
import reactLogo from './Assets/react.svg';
import {CallApi} from "./GetAIApi.jsx";
import {ShareOnSocialMedia} from "./ShareOnSocialMedia.jsx";
import {LocationOfUser} from "./Country.jsx"

export function AIApp() {
    const [tweet, setTweet] = useState('')
    const [sentiment, setSentiment] = useState('')
    const [coordinates, setCoordinates] = useState('')
    const [copy, setCopy] = useState(false)
    const handleTweet = (e) => {
        setTweet(e.target.value);
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(`${tweet}\n --${sentiment}\n${coordinates !== '' ? coordinates : ''}`)
            setCopy(true);
            setTimeout(() => setCopy(false), 5000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    return (
        <div className="App">
            <LocationOfUser setCoordinates={setCoordinates} />
            <div>
                <div className='top-container'>
                    <img src={reactLogo} className='reactLogo' alt="react-logo"/>
                    <h2 className='title'>AI Tweet</h2>
                </div>
                <textarea
                    onChange={handleTweet}
                    className='textarea'
                    placeholder="Enter your tweet"
                    cols={50}
                    rows={10}
                />
            </div>
            <CallApi tweet={tweet}
                     sentiment={sentiment}
                     setSentiment={setSentiment}
            />
            {copy === false ? <button
                    onClick={handleCopy}
                    className='copy-btn'
                    disabled={tweet.trim() === ''}
                >Copy!</button>
                : <button className='copy-btn' style={{
                    background: '#00ff66',
                    color: 'white',
                    boxShadow: '0 0 10px #00ff66'
                }}>Copied!</button>}
            <ShareOnSocialMedia tweet={tweet}
                                sentiment={sentiment}
                                coordinates={coordinates}
            />
        </div>
    );
}
