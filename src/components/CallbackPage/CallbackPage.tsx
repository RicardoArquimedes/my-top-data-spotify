// src/views/CallbackPage/CallbackPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';

const CallbackPage: React.FC = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const codeVerifier = localStorage.getItem('pkce_code_verifier');

        async function fetchToken() {
            const clientId = '1bedb5e5c8004a5fa25dbbf15d42e7f5';  // Tu Client ID de Spotify
            const redirectUri = 'http://localhost:5173/callback';  // Tu URI de redirección registrada en Spotify

            if (code && codeVerifier) {
                try {
                    const response = await fetch('https://accounts.spotify.com/api/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            client_id: clientId,
                            grant_type: 'authorization_code',
                            code: code,
                            redirect_uri: redirectUri,
                            code_verifier: codeVerifier
                        })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setToken(data.access_token);
                        console.log("la data.access", data.access_token)
                        navigate('/home');
                    } else {
                        throw new Error(data.error_description || 'Failed to exchange code for token');
                    }
                } catch (error) {
                    console.error('Error exchanging code for token:', error);
                    navigate('/login');
                }
            } else {
                navigate('/login'); // Redirigir a login si no hay código
            }
        }

        fetchToken();
    }, [navigate, setToken]);

    return <div>Loading...</div>;
};

export default CallbackPage;
