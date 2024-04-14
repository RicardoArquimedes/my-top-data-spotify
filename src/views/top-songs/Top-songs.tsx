import React, { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { useSpotifyApi } from '../../utils/spotifyApi/spotifyApi';

const TopSongs: React.FC = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const { getTopSongs } = useSpotifyApi(); // Utiliza getTopSongs desde el hook

  useEffect(() => {
    async function fetchTopSongs() {
      const response = await getTopSongs(); // Ejecuta la función para obtener las canciones
      if (response) {
        setSongs(response.items); // Asume que la respuesta es un objeto con un array 'items'
      }
    }
    fetchTopSongs();
  }, [getTopSongs]); // Agrega getTopSongs a la lista de dependencias de useEffect

  return (
    <div>
      <h2>Top 10 Songs</h2>
      <div className="card-container">
        {songs.map((song, index) => (
          <Card 
            key={index}
            image={song.album.images[0].url}
            name={song.name}
            artist={song.artists.map((artist: any) => artist.name).join(', ')}
            spotifyUrl={song.external_urls.spotify}
            extraInfo={`Popularity: ${song.popularity}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TopSongs;
