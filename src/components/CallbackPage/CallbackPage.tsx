import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';

const CallbackPage: React.FC = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [isFetching, setIsFetching] = useState(false);
    const [tokenRequested, setTokenRequested] = useState(false); // Nuevo estado para controlar la solicitud

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const codeVerifier = localStorage.getItem('pkce_code_verifier');

        if (!code || !codeVerifier) {
            navigate('/login');
            return;
        }

        if (!tokenRequested && !isFetching) {
            setIsFetching(true);
            setTokenRequested(true); // Marcamos que la solicitud se está iniciando

            const fetchToken = async () => {
                const clientId = '1bedb5e5c8004a5fa25dbbf15d42e7f5';
                const redirectUri = 'https://my-top-data-spotify.vercel.app/callback';

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
                        setToken(data.access_token, data.refresh_token, data.expires_in);
                        window.history.pushState({}, document.title, "/callback"); // Limpia los parámetros de la URL
                        navigate('/home');
                    } else {
                        throw new Error(data.error_description || 'Failed to exchange code for token');
                    }
                } catch (error) {
                    console.error('Error exchanging code for token:', error);
                    navigate('/login');
                } finally {
                    setIsFetching(false);
                }
            };

            fetchToken();
        }
    }, [navigate, setToken, tokenRequested, isFetching]);

    return <div>Loading...</div>;
};

export default CallbackPage;
