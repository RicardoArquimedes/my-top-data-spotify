// src/views/LoginPage/LoginPage.tsx
import React, { useEffect, useState } from 'react';
import { generateCodeChallenge, generateCodeVerifier } from '../../utils/pkce';

const LoginPage: React.FC = () => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        const codeVerifier = generateCodeVerifier();
        localStorage.setItem('pkce_code_verifier', codeVerifier);
        generateCodeChallenge(codeVerifier).then(codeChallenge => {
            const clientId = import.meta.env.VITE_CLIENT_ID;
            const redirectUri = encodeURIComponent('http://localhost:5173/callback');
            const scopes = encodeURIComponent('user-top-read user-read-recently-played user-read-private user-read-email playlist-read-private user-library-read');
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${scopes}`;
            console.log("Authorization URL:", authUrl);
            setUrl(authUrl);
        });
    }, []);

    return (
        <div>
            <h1>Welcome to the Music App</h1>
            <button onClick={() => window.location.href = url} disabled={!url}>Log in with Spotify</button>
        </div>
    );
};

export default LoginPage;
