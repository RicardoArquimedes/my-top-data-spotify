// src/components/card/Card.tsx
import React from 'react';
import './Card.css'; // Asegúrate de importar el archivo CSS actualizado

interface CardProps {
  count?: number;
  image: string;
  name: string;
  artist?: string;
  spotifyUrl?: string;
  album?: string;
}

const Card: React.FC<CardProps> = ({ image, name, artist, spotifyUrl, album, count }) => {
  return (
    <div className="card">
            <div className="card-number">
        <p>{count}</p>
      </div>
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-info">
        <h3>{name}</h3>
        <p>{artist}</p>
        <p>{album}</p>
      </div>
      <div className="card-action">
        <img src="public/assets/spotify/Spotify_Icon_White.png" alt="Spotify" />
        <button className='noto-sans-semi-bold' onClick={() => window.open(spotifyUrl)}>Play on Spotify</button>
      </div>
    </div>
  );
};

export default Card;
