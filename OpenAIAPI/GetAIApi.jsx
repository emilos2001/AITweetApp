import {Modal} from "antd";
import {useState} from "react";

const API_KEY = 'YOUR-API-KEY';
export function CallApi(props) {
    const [loading, setLoading] = useState(false)
    const [clicked, setClicked] = useState()
    const [error, setError] = useState('')

    const handleClick = () => {
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 10000)
    }

    const callApi = async () => {
        props.setSentiment('');
        setError(null);
        if (props.tweet.trim() === '') {
            setError('Please enter some text to analyze');
            return;
        }
        if (!API_KEY) {
            setError('API_KEY not found');
            return
        }
        setLoading(true);
        try {
            const prompt = `Analyze the sentiment of the following tweet and respond only with one word: 'Positive', 'Negative', or 'Neutral'.\n\nTweet: "${props.tweet}"`;
            const api_url = `https://api.groq.com/openai/v1/chat/completions`
            const payload = {
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    }
                ]
            }
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                if (response.status === 400) {
                    const errorData = await response.json();
                    const msg = ` API access denied. This might be due to regional restrictions in your current location`
                    setError(msg);
                    Modal.error({
                        className: 'ErrorModal',
                        title: errorData.message || 'Invalid Request',
                        content: errorData.errorDesc || '',
                    });
                    throw new Error(errorData.message || '400 Bad Request');
                } else {
                    throw new Error(`HTTP error: ${response.status}`);
                }
            }

            const result = await response.json();
            const content = result?.choices?.[0]?.message?.content?.trim();
            if (content) {
                const formattedText = content.charAt(0).toUpperCase() + content.slice(1).toLowerCase();
                props.setSentiment(formattedText);
            } else {
                throw new Error('Unexpected API response structure.');
            }
        } catch (err) {
            console.error('Error calling Groq AI API:', err);
            setError('An error occurred while analyzing sentiment. Please try again.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div>
                <button
                    onClick={() => {
                        callApi();
                        handleClick();
                    }}
                    className='get-btn'
                >
                    Get the tweet sentiment from Gemini API
                </button>
                {error && clicked && <h3 style={{color: 'red'}}>{error}</h3>}
                {props.sentiment !== '' && <h2 style={{color: 'white'}}>
                    This Tweet is: {props.sentiment}
                </h2>}
                {loading && <h3>Loading...</h3>}
            </div>
        </>
    )
}