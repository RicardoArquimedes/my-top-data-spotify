import { PlayHistoryItem, SongCount, SongCountItem } from "../../types/types";

const token = import.meta.env.TOKEN;
const tokenAuth = import.meta.env.TOKEN_AUTH;

export async function fetchWebApi(endpoint: string, method: string, body?: any) {


    try {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        throw new Error('Error en la solicitud a la API de Spotify');
      }
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      return null; 
    }
  }

export async function getTopSongs() {
  try {
    const response = await fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=10', 'GET');
    console.log("THE RESPONSE", response)
    return response.items;
  } catch (error) {
    console.error('Error fetching top songs:', error);
    return null;
  }
}

// src/utils/spotifyApi.ts

export async function getRecentlyPlayed() {
 

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, -1);

  const startTime = startOfDay.getTime();
  const endTime = endOfDay.getTime();

  try {
    // Ajusta para usar `before` y no usar `after` juntos, porque ambos no pueden especificarse al mismo tiempo
    const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=50&before=${endTime}`, {
      headers: {
        'Authorization': `Bearer ${tokenAuth}`,
      },
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch recently played tracks: ${response.statusText}`);
    }
    const data = await response.json();
    return data.items;  // Devolver los items correctamente
  } catch (error) {
    console.error('Error fetching recently played songs:', error);
    return [];
  }
}



// En utils/spotifyApi.ts
export async function getRecentlyPlayedCounts(): Promise<SongCountItem[]> {
  const items: PlayHistoryItem[] = await getRecentlyPlayed(); // Asume que esta función ya devuelve las canciones reproducidas
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

  return Object.values(songCounts); // Devuelve un array de objetos con cada canción y su conteo
}
