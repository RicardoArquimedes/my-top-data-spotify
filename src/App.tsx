import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Card from './components/card/Card';
import { getTopSongs } from './utils/spotifyApi/spotifyApi';

const Home: React.FC = () => {
  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTopSongs() {
      const tracks = await getTopSongs();
      setSongs(tracks);
    }
    fetchTopSongs();
  }, []);

  return (
    <div>
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default Home;