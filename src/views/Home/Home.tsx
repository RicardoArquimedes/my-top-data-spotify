import React, { useEffect, useState } from 'react';
import { useSpotifyApi } from '../../utils/spotifyApi/spotifyApi';
import HomeCard from '../../components/HomeCard/HomeCard';
import { Link } from 'react-router-dom';
import theErasTour from '../../assets/img/The_Eras_Tour.jpg'

const Home: React.FC = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const { getTopArtists, getTopSongs } = useSpotifyApi();

  useEffect(() => {
    async function fetchTopArtists() {
      const response = await getTopArtists();
      const counts = response.items // Llama a la función corregida
      if (response && response.items) {
        setArtists(counts.slice(0, 1));
      }
    }
    fetchTopArtists();
    async function fetchTopSongs() {
      const response = await getTopSongs(); // Ejecuta la función para obtener las canciones
      if (response) {
        const topSong = response.items
        setSongs(topSong.slice(0, 1));
        console.log("la response", response.items) // Asume que la respuesta es un objeto con un array 'items'
      }
    }
    fetchTopSongs();
  }, [getTopArtists, getTopSongs]);
  
  return (
    <div className='home-container'>
    <div className="home-card-container">
    
    <Link to="/midnights">

        <HomeCard
        title={"Top Eras | TS"}
        image={theErasTour}
        />

</Link>
    <Link to="/top-artists">
      {artists.map((artist) => (
        <HomeCard
        title={"Top Artists"}
        image={artist.images[0].url}
        />
      ))}
</Link>
<Link className="link-text" to="/top-songs">
{songs.map((song) => (
        <HomeCard
        title={"Top Songs"}
        image={song.album.images[0].url}
        />
      ))}

</Link>
    </div>

    </div>
  );
};

export default Home;
