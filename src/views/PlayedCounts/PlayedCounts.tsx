import { useEffect, useState } from 'react';
import { getRecentlyPlayedCounts } from '../../utils/spotifyApi/spotifyApi';
import { SongCountItem } from '../../types/types';

const PlayedCountsComponent = () => {
  const [tracks, setTracks] = useState<SongCountItem[]>([]);

  useEffect(() => {
    const fetchTrackCounts = async () => {
      const trackCounts = await getRecentlyPlayedCounts();
      setTracks(trackCounts);
    };

    fetchTrackCounts();
  }, []);

  return (
    <div>
      <h2>Tracks Played Counts</h2>
      <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {tracks.map((track, index) => (
          <div key={index} style={{ width: '300px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <img src={track.albumUrl} alt={track.name} style={{ width: '100%', borderRadius: '8px' }} />
            <h3>{track.name}</h3>
            <p>Artists: {track.artists}</p>
            <p>Times Played: {track.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayedCountsComponent;
