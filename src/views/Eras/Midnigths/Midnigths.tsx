import React, { useEffect, useState } from 'react';
import { useSpotifyApi } from '../../../utils/spotifyApi/spotifyApi';
import Card from '../../../components/card/Card';
import { SongCountItem } from '../../../types/types';

const MidnightsPlayedCounts: React.FC = () => {
  const [midnightsCounts, setMidnightsCounts] = useState<SongCountItem[]>([]);
  const { getMidnightsConsolidatedCounts } = useSpotifyApi();

  useEffect(() => {
    const fetchMidnightsCounts = async () => {
      const counts = await getMidnightsConsolidatedCounts();
      setMidnightsCounts(counts.slice(0, 5)); // Toma solo las primeras 5 canciones
    };

    fetchMidnightsCounts();
  }, [getMidnightsConsolidatedCounts]);


  return (
    <div className="card-container">
          <div className='card-title'>
        <h2>Top 5 Midnights</h2>
        </div>
      {midnightsCounts.map((count, index) => (
        <Card
          key={count.name} // Es mejor usar el nombre ya que es la clave única en este caso
          count={index + 1} // Agrega la numeración
          image={count.albumUrl}
          name={count.name}
          artist={count.artists}
          // Asumiendo que el componente Card puede recibir y mostrar el número
        />
      ))}
    </div>
  );
};

export default MidnightsPlayedCounts;