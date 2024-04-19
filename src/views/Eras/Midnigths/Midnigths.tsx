import React, { useEffect, useState } from 'react';
import { useSpotifyApi } from '../../../utils/spotifyApi/spotifyApi';
import Card from '../../../components/card/Card';
import ArtistCard from '../../../components/ArtistCard/ArtistCard';
import { SongCountItem } from '../../../types/types';
import Loader from '../../../components/Loader/Loader';
const midnightsAlbumUrl = "https://i.scdn.co/image/ab67616d0000b273e0b60c608586d88252b8fbc0";
const spotifyAlbumLink = "https://open.spotify.com/album/3lS1y25WAhcqJDATJK70Mq";

const MidnightsPlayedCounts: React.FC = () => {
  const [midnightsCounts, setMidnightsCounts] = useState<SongCountItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const { getMidnightsConsolidatedCounts } = useSpotifyApi();

  useEffect(() => {
    const fetchMidnightsCounts = async () => {
      try {
        setIsLoading(true); // Start loading
        const counts = await getMidnightsConsolidatedCounts();
        setMidnightsCounts(counts && counts.length > 0 ? counts.slice(0, 5) : null);
      } catch (error) {
        console.error('Error fetching Midnights counts:', error);
        setMidnightsCounts(null);
      } finally {
        setIsLoading(false); // Stop loading regardless of the result
      }
    };

    fetchMidnightsCounts();
  }, [getMidnightsConsolidatedCounts]);

  if (isLoading) {
    // Show the loader while loading
    return <Loader />; // Adjust this to your actual loader component
  }


  // Verificamos si midnightsCounts es null para determinar qué componente renderizar
  return (
    <div className="card-container">
      <div className='card-title'>
        <h3>Top 5 The Tortured Poets Department</h3>
      </div>
      {midnightsCounts ? (
        midnightsCounts.map((count, index) => (
          <Card
            key={count.name}
            count={index + 1}
            image={count.albumUrl}
            name={count.name}
            artist={count.artists}
          />
        ))
      ) : (
        // Renderizamos ArtistCard si no hay datos
        <ArtistCard
          key="Midnights-no-en-tu-top"
          name="Midnights no está en tu top de álbumes"
          image={midnightsAlbumUrl}
          buttonText="Escucha Midnights en Spotify"
          onButtonClick={() => window.open(spotifyAlbumLink, '_blank')}
        />
      )}
    </div>
  );
};

export default MidnightsPlayedCounts;
