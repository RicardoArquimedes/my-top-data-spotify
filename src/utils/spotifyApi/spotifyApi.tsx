import { useContext, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContexts'; // Verifica que la ruta sea correcta
import { PlayHistoryItem, SongCount } from '../../types/types';

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

    const getTopSongs = useCallback(async () => {
        return await fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=10');
    }, [fetchWebApi]); // 'fetchWebApi' se incluye como dependencia ya que esta función es utilizada aquí


  const getRecentlyPlayed = useCallback(async () => {
    const now = new Date();
    const midnightToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); // medianoche de hoy
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

    return { getTopSongs, getRecentlyPlayed, getRecentlyPlayedCounts };
};
