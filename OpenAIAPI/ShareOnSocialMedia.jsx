import {Mailto} from "./Mail.jsx";
import {useState} from "react";
import {useLocation} from "./Geolocation.jsx";
import './Style.css'

export function ShareOnSocialMedia(props) {
    const [share, setShare] = useState(false);
    const {locationInfo} = useLocation();

    const handleShare = () => {
        setShare(true)
        setTimeout(() => {
            setShare(false)
        }, 150000)
    }

    function getMapsLink() {
        const lat = locationInfo.latitude;
        const lng = locationInfo.longitude;
        if (!lat || !lng) {
            return null
        }
        return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    }


    function handlePostToLinkedIn() {
        const shareAPIApp = "Original Tweet Share API app"
        const shareTweet = props.tweet.trim()
        const shareUrl = encodeURIComponent(window.location.href)
        const linkedInURl = `
            }https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${encodeURIComponent(shareAPIApp)}&summary=${encodeURIComponent(shareTweet)}`
        window.open(linkedInURl, '_blank', 'width=600,height=600');
    }

    function handlePostToFacebook() {
        const encodedTweet = encodeURIComponent(prop.tweet.trim())
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedTweet}`
        window.open(facebookShareUrl, '_blank', 'width=600,height=600');

    }
     console.log(props.coordinates)

    function handlePostToX() {
        const tweetShareToX = `${props.tweet}\n- ${props.sentiment}\n${props.coordinates !== '' ? `View on map!\n${getMapsLink()}` : ''}`;
        const encodedText = encodeURIComponent(tweetShareToX)
        const xUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
        window.open(xUrl, '_blank', 'width=600,height=600')
    }

    return (
        <>
            <div className='tweet-share'>
                {share === false ? <button
                        onClick={handleShare}
                        className='share-btn'
                        disabled={props.tweet.trim() === ''}
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
                    <Mailto tweet={props.tweet.trim()} sentiment={props.sentiment} coordonates={props.coordonates} getMapsLink={getMapsLink()}/>

                </div>
            }
        </>
    )
}