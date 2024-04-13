import React, { useEffect, useState } from 'react';
import { getRecentlyPlayed } from '../../utils/spotifyApi/spotifyApi';

// Definir tipo para los items de canción
interface TrackItem {
    track: {
        name: string;
        artists: Array<{ name: string }>;
        album: {
            images: Array<{ url: string }>;
        };
    };
    played_at: string;
}

const TodayPlayed: React.FC = () => {
    const [tracks, setTracks] = useState<TrackItem[]>([]);

    useEffect(() => {
        const fetchTracks = async () => {
            const items = await getRecentlyPlayed();
            if (items) {
                setTracks(items);
            }
        };

        fetchTracks();
    }, []);

    return (
        <div>
            <h2>Tracks Played Today</h2>
            <ul>
                {tracks.map((item, index) => (
                    <li key={index}>
                        <img src={item.track.album.images[0].url} alt={item.track.name} style={{ width: '50px', height: '50px' }} />
                        <strong>{item.track.name}</strong> - {item.track.artists.map(artist => artist.name).join(', ')}
                        <br />
                        Played at: {new Date(item.played_at).toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodayPlayed;
