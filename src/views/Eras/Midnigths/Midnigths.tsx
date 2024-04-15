import React, { useEffect, useState } from 'react';
import { useSpotifyApi } from '../../../utils/spotifyApi/spotifyApi';
import Card from '../../../components/card/Card';
import { SongCountItem } from '../../../types/types';

const MidnightsPlayedCounts: React.FC = () => {
  const [midnightsCounts, setMidnightsCounts] = useState<SongCountItem[]>([]);
  const { getMidnightsPlayCounts } = useSpotifyApi();

  useEffect(() => {
    const fetchMidnightsCounts = async () => {
      const counts = await getMidnightsPlayCounts();
      setMidnightsCounts(counts);
    };

    fetchMidnightsCounts();
  }, [getMidnightsPlayCounts]);

  return (
    <div>
      {midnightsCounts.map((count, index) => (
        <Card
          key={index}
          image={count.albumUrl}
          name={count.name}
          artist={count.artists}
       />
      ))}
    </div>
  );
};

export default MidnightsPlayedCounts;
