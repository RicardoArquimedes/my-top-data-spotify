import { useEffect, useState } from 'react';
import { useSpotifyApi } from '../../utils/spotifyApi/spotifyApi'; // Asegúrate de que la ruta es correcta
import { SongCountItem } from '../../types/types';

const PlayedCountsComponent = () => {
  const [tracks, setTracks] = useState<SongCountItem[]>([]);
  const { getRecentlyPlayedCounts } = useSpotifyApi(); // Usar el hook para acceder a getRecentlyPlayedCounts

  useEffect(() => {
    const fetchTrackCounts = async () => {
      const trackCounts = await getRecentlyPlayedCounts(); // Llama a la función desde el hook

      // Ordenamos por count descendente antes de establecer el estado
      trackCounts.sort((a, b) => b.count - a.count);

      // Nos quedamos solo con los primeros 10
      setTracks(trackCounts.slice(0, 10));
    };

    fetchTrackCounts();
  }, [getRecentlyPlayedCounts]); // Incluye getRecentlyPlayedCounts en las dependencias de useEffect

  return (
    <div className="card-container">
      <div className="card-title">
        <h2>Top Daily Songs</h2>
      </div>

      <div>
        {tracks.map((track, index) => (
          <div className="card" key={index}>
            <div>
              <div
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                {index + 1}
              </div>
            </div>
            <div className="card-image">
              <img src={track.albumUrl} alt={track.name} />
            </div>
            <div className="card-info">
              <h3>{track.name}</h3>
              <p>Artists: {track.artists}</p>
              <p>Times Played: {track.count}</p>
            </div>
            <div className="card-action">
              <img
                src="/assets/spotify/Spotify_Icon_White.png"
                alt="Spotify"
              />
              <button
                className="noto-sans-semi-bold"
                onClick={() => window.open("")}
              >
                Play on Spotify
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayedCountsComponent;
