// src/views/LoginPage/LoginPage.tsx
import React, { useEffect, useState } from "react";
import { generateCodeChallenge, generateCodeVerifier } from "../../utils/pkce";
import "./LoginPage.css";
import imgLogoWhite from "../../assets/img/play-title.svg";
import spotifyLogoWhite from "../../assets/spotify/Spotify_Icon_White.png";

const LoginPage: React.FC = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem("pkce_code_verifier", codeVerifier);
    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const redirectUri = 
        "https://my-top-data-spotify.vercel.app/callback"
    
      const scopes =
       "user-top-read user-read-recently-played user-read-private user-read-email playlist-read-private user-library-read"
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${scopes}`;
      console.log("Authorization URL:", authUrl);
      setUrl(authUrl);
    });
  }, []);

  return (
    <div className="home-container">
      <div className="login-container">
        <div>
          <h2>My Top Spotify Data</h2>
          <img className="logo-app" src={imgLogoWhite} />
        </div>

        <button
          className="login-btn noto-sans-bold"
          onClick={() => (window.location.href = url)}
          disabled={!url}
        >
          <img src={spotifyLogoWhite} />
          Log in with Spotify
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
