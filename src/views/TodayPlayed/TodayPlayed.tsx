import React, { useEffect, useState } from "react";
import { useSpotifyApi } from "../../utils/spotifyApi/spotifyApi";
// Definir tipo para los items de canción
interface TrackItem {
  track: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      images: Array<{ url: string }>;
    };
  };
  played_at: string;
}

const TodayPlayed: React.FC = () => {
  const [tracks, setTracks] = useState<TrackItem[]>([]);
  const { getRecentlyPlayed } = useSpotifyApi(); // Usar el hook para acceder a getRecentlyPlayed

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await getRecentlyPlayed(); // Llama a la función desde el hook
      if (response) {
        setTracks(response); // Asegúrate de que la respuesta sea directamente el array de tracks, si no, ajusta según el formato de respuesta
      }
    };

    fetchTracks();
  }, [getRecentlyPlayed]); // Incluye getRecentlyPlayed en las dependencias de useEffect

  return (
    <div className="card-container">
      <div className="card-title">
        <h2>Tracks Played Today</h2>
      </div>

      <div>
        {tracks.map((item, index) => (
          <div  className="card" key={index}>
            <div className="card-image">
              <img
                src={item.track.album.images[0].url}
                alt={item.track.name}
              />
            </div>
            <div className="card-info">
              <h3>{item.track.name}</h3>
              <p> {item.track.artists.map((artist) => artist.name)}
                </p>
              <p> 
              Played at: {new Date(item.played_at).toLocaleTimeString()}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayPlayed;
