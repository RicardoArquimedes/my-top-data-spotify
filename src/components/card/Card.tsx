// src/components/card/Card.tsx
import React from 'react';
import './Card.css'; // Importa el archivo CSS de estilos si no lo has hecho aún

interface CardProps {
  image: string;
  name: string;
  artist: string;
  spotifyUrl: string;
  extraInfo: string;
}

const Card: React.FC<CardProps> = ({ image, name, artist, spotifyUrl, extraInfo }) => {
  return (
    <div className="card">
      <div className="row">
        <div className="column">
          <img src={image} alt={name} />
        </div>
        <div className="column">
          <h3>{name}</h3>
          <p>Artist: {artist}</p>
          <p>Extra Info: {extraInfo}</p>
        </div>
        <div className="column">
          <button onClick={() => window.open(spotifyUrl)}>Play on Spotify</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
