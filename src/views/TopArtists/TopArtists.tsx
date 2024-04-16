import React, { useEffect, useState } from 'react';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import { useSpotifyApi } from '../../utils/spotifyApi/spotifyApi';

const TopArtists: React.FC = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const { getTopArtists } = useSpotifyApi();

  useEffect(() => {
    async function fetchTopArtists() {
      const response = await getTopArtists(); // Llama a la función corregida
      if (response && response.items) {
        setArtists(response.items);
      }
    }
    fetchTopArtists();
  }, [getTopArtists]);

  return (
    <div>
      <div className='card-title'>
        <h2>Top Artists</h2>
      </div>
    <div className="artist-card-container">

      {artists.map((artist) => (
        <ArtistCard // Asegúrate de que este componente esté implementado para mostrar los datos de un artista
          key={artist.id} // Utiliza el ID del artista como clave
          image={artist.images[0].url}
          name={artist.name}
          spotifyUrl={artist.external_urls.spotify} // URL para abrir el artista en Spotify
        />
      ))}
    </div>
    </div>
  );
};

export default TopArtists;
