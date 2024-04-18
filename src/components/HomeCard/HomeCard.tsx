import React from 'react';
import { coverCardProps } from '../../types/types';
import './HomeCard.css'

// Definimos las propiedades que recibirá el componente ArtistCard
const HomeCard: React.FC<coverCardProps> = ({ image, name, title }) => {
  return (
    <div className="home-container">
    <div className="artist-card">
      <h2>{title}</h2>
      <img src={image} alt={name} className="home-image" />
    </div>
    </div>
  );
};

export default HomeCard;
