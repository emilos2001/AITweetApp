import './Style.css';
import {useState} from 'react';
import reactLogo from './Assets/react.svg';
import {Mailto} from "./Mail.jsx";

const API_KEY = 'YOUR API_KEY';

export function AIApp() {
    const [tweet, setTweet] = useState('')
    const [sentiment, setSentiment] = useState('')
    const [loading, setLoading] = useState(false)
    const [share, setShare] = useState(false)
    const [visible, setVisible] = useState()
    const [error, setError] = useState(false)
    const [copy, setCopy] = useState(false)
    const handleTweet = (tweet) => {
        setTweet(tweet.target.value);
    }


    const handleShare = (sentiment) => {
        setShare(sentiment)
        setShare(true)
        setTimeout(() => {
            setShare(false)
        }, 150000);
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(`${tweet}\n --${sentiment}`);
            setCopy(true);
            setTimeout(() => setCopy(false), 5000);
            console.log(tweet);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }


    const callApi = async () => {
        setSentiment('')
        setError(null)
        tweet.trim() === '' ? setError('Please enter some text to analyze') : null
        setLoading(true)
        setVisible(true);
        setCopy(false)
        try {
            const prompt = `Analyze the sentiment of the following tweet and respond only with one word: 'Positive', 'Negative', or 'Neutral'.\n\nTweet: "${tweet}`
            let chatHistory = []
            chatHistory.push({role: 'user', parts: [{text: prompt}]})
            const payload = {contents: chatHistory}
            const api_url = `url ${API_KEY}`
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            })
            const result = await response.json()
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text
                const formatedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
                setSentiment(formatedText)
            } else {
                setError('Could not get sentiment from the API. Please try again.');
                console.error('Unexpected API response structure:', result);
            }
        } catch (err) {
            console.log('Error calling Gemini API', err)
            setError('Failed to get sentiment. Please check your network and try again.')
        } finally {
            setLoading(false)
        }
    }

    function handlePostToLinkedIn(){
        if (tweet.trim() !== '') {
            const shareAPIApp = "Original Tweet Share API app"
            const shareTweet = tweet.trim()
            const shareUrl = encodeURIComponent(window.location.href)
            const linkedInURl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${encodeURIComponent(shareAPIApp)}&summary=${encodeURIComponent(shareTweet)}`
            window.open(linkedInURl, '_blank', 'width=600,height=600');
        } else {
            setError("There is no tweet to share")
        }
    }

    function handlePostToFacebook(){
        if (tweet.trim() !== '') {
            const encodedTweet = encodeURIComponent(tweet.trim())
            const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedTweet}`
            window.open(facebookShareUrl, '_blank', 'width=600,height=600');
        } else {
            setError("There is no tweet to share")
        }
    }

    function handlePostToX() {
        if (tweet.trim() !== '') {
            const tweetShareToX = `${tweet} \n - ${sentiment} post`
            const encodedText = encodeURIComponent(tweetShareToX)
            const xUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
            window.open(xUrl, '_blank', 'width=600,height=600')
        } else {
            setError("There is no tweet to share")
        }
    }

    return (
        <div className="App">
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
            <div>

                <button
                    onClick={callApi}
                    className='get-btn'
                    disabled={tweet.trim() === ''}
                >
                    Get the tweet sentiment from Gemini API
                </button>

                {sentiment !== '' && <h2 style={{color: 'white'}}>
                    This Tweet is: {sentiment}
                </h2>}
                {loading && <h3>Loading...</h3>}
            </div>
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
            <div className='tweet-share'>
                {share === false ? <button
                        onClick={handleShare}
                        className='share-btn'
                        disabled={tweet.trim() === ''}
                    >Share!</button>
                    : <button
                        className='share-btn' style={{
                        background: '#00ff66',
                        color: 'white',
                        boxShadow: '0 0 10px #00ff66'
                    }}
                    >🔗</button>}
            </div>
            {share === true &&
                <div className='share'>
                    <button onClick={handlePostToFacebook} className='social-media-btn'>
                        <img
                            className='social-media'
                            src='https://cdn-icons-png.flaticon.com/512/13266/13266170.png'/>
                    </button>
                    <button
                        onClick={handlePostToX}
                        className='social-media-btn'
                        disabled={tweet.trim() === ''}
                    >
                        <img
                            className='social-media'
                            src='https://cdn-icons-png.flaticon.com/512/14417/14417460.png'/>
                    </button>
                    <button onClick={handlePostToLinkedIn} className='social-media-btn'>
                        <img
                            className='social-media'
                            src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png'/>
                    </button>
                    <Mailto tweet={tweet.trim()} sentiment={sentiment}/>
                </div>
            }
        </div>
    );
}


