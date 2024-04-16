import React from 'react';
import { ArtistCardProps } from '../../types/types';
import './ArtistCard.css'

// Definimos las propiedades que recibirá el componente ArtistCard
const ArtistCard: React.FC<ArtistCardProps> = ({ image, name, spotifyUrl }) => {
  return (
    <div className="artist-card">
      <img src={image} alt={name} className="artist-image" />
      <div className="artist-info">
        <p className="main-text noto-sans.bold">{name}</p> 
        <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="spotify-link">
        <img className="logo-icon" src="src/assets/spotify/Spotify_Icon_White.png" alt="Spotify" />
          Play on Spotify
        </a>
      </div>

    </div>
  );
};

export default ArtistCard;
