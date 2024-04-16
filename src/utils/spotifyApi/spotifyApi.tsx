import { useContext, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContexts'; // Verifica que la ruta sea correcta
import { PlayHistoryItem, SongCount, SongCountItem, TopSongsResponse } from '../../types/types';

export const useSpotifyApi = () => {
    const { token } = useContext(AuthContext);

    const fetchWebApi = useCallback(async (endpoint: string, method: string = 'GET', body: any = null) => {
        if (!token) {
            console.error('Token is not available');
            return null;
        }
        try {
            const res = await fetch(`https://api.spotify.com/${endpoint}`, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : null
            });
            if (!res.ok) {
                throw new Error(`Spotify API Error: ${res.status} (${res.statusText})`);
            }
            return await res.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }, [token]); // La dependencia aquí es 'token', que es el único valor externo que afecta el resultado de esta función

    const getTopSongs = useCallback(async (): Promise<TopSongsResponse> => {
        // Implementación de la llamada API, asumiendo que fetchWebApi ya está correctamente definido
        return fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=50');
    }, [fetchWebApi]);

    const getTopArtists = useCallback(async () => {
        // Implementación de la llamada API, asumiendo que fetchWebApi ya está correctamente definido
        return fetchWebApi('v1/me/top/artists?time_range=long_term&limit=10');
    }, [fetchWebApi]);

  const getRecentlyPlayed = useCallback(async () => {
    const now = new Date();
    // const midnightToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4, 0, 0, 0);
    const midnightToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const startTime = midnightToday.getTime(); // Convertir medianoche a tiempo Unix en milisegundos

    const response = await fetchWebApi(`v1/me/player/recently-played?limit=50&after=${startTime}`);
    return response.items || [];  // Devuelve un arreglo vacío si no hay datos
}, [fetchWebApi]);


  const getRecentlyPlayedCounts = useCallback(async () => {
      const items: PlayHistoryItem[] = await getRecentlyPlayed();
      const songCounts: SongCount = {};
      items.forEach(item => {
          const trackId = item.track.id;
          if (songCounts[trackId]) {
              songCounts[trackId].count += 1;
          } else {
              songCounts[trackId] = {
                  name: item.track.name,
                  artists: item.track.artists.map(artist => artist.name).join(", "),
                  albumUrl: item.track.album.images[0].url,
                  count: 1
              };
          }
      });
      return Object.values(songCounts);  // Devuelve un arreglo de objetos de conteo de canciones
  }, [getRecentlyPlayed]);

  const getMidnightsConsolidatedCounts = useCallback(async () => {
    const allRecentlyPlayed: PlayHistoryItem[] = await getRecentlyPlayed();
    const counts: { [key: string]: SongCountItem } = {};
  
    allRecentlyPlayed.forEach(item => {
      const { track } = item;
      if (track.album.name.toLowerCase().includes('midnights')) {
        const nameKey = track.name.toLowerCase(); // Usamos el nombre en minúsculas como clave para consolidar
        if (counts[nameKey]) {
          counts[nameKey].count += 1;
        } else {
          counts[nameKey] = {
            name: track.name,
            artists: track.artists.map(a => a.name).join(', '),
            albumUrl: track.album.images[0].url, // Escoge la portada del primer álbum encontrado
            count: 1
          };
        }
      }
    });
  
    const sortedCounts = Object.values(counts).sort((a, b) => b.count - a.count);
    return sortedCounts; // Retorna las canciones ordenadas por conteo de reproducciones consolidado por nombre
  }, [getRecentlyPlayed]);
  
    return { getTopSongs, getRecentlyPlayed, getRecentlyPlayedCounts, getMidnightsConsolidatedCounts, getTopArtists };
};
