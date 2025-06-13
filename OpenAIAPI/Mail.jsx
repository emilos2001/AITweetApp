import { useEffect, useState } from 'react';

export function Mailto(props) {
    const [emailAddress, setEmailAddress] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [body, setBody] = useState(props.tweet || '');
    const [error, setError] = useState('');
    const [click, setClick] = useState(false);
    const handleClick = () => {
        if (!click) {
            setClick(true);
            return;
        }
        const trimmedEmail = emailAddress.trim();
        if (trimmedEmail === '') {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        const encodedTo = encodeURIComponent(trimmedEmail);
        const encodedSubject = encodeURIComponent(emailSubject);
        const encodedBody = encodeURIComponent(`${body.trim()}\n--${props.sentiment}`)
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;
        window.open(gmailUrl, '_blank', 'width=800,height=600,noopener,noreferrer');
    };

    return (
        <div>
            {click ? (
                <div>
                    <input
                        type="email"
                        style={{ marginTop: 10, backgroundColor: '#fff' }}
                        placeholder="Email address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <br />
                    <input
                        type="text"
                        style={{ marginTop: 10, backgroundColor: '#fff' }}
                        placeholder="Subject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                    />
                    <br />
                    <textarea
                        placeholder="Body"
                        style={{ marginTop: 10, backgroundColor: '#fff' }}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={5}
                        cols={40}
                    />
                    <br />
                    {error && <p style={{ backGroundColor:'#fff', color: 'red' }}>{error}</p>}
                    <button className="social-media-btn" onClick={handleClick}>
                        <img
                            className="social-media"
                            src="https://cdn-icons-png.flaticon.com/512/6834/6834556.png"
                            alt="Send"
                        />
                    </button>
                </div>
            ) : (
                <button onClick={handleClick} style={{background: '#fff'}} className="social-media-btn">
                    <img
                        className="social-media"
                        src="https://cdn-icons-png.flaticon.com/512/6834/6834556.png"
                        alt="Mail Icon"
                    />
                </button>
            )}
        </div>
    );
}
