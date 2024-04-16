export interface Track {
    id: string;
    name: string;
    artists: Artist[];
    album: {
      images: Image[];
      name: string;
    };
  }
  
  export interface Artist {
    name: string;
  }
  
  export interface Image {
    url: string;
  }
  
  export interface PlayHistoryItem {
    track: Track;
  }
  
 export  interface SongCount {
    [key: string]: {
      name: string;
      artists: string;
      albumUrl: string;
      count: number;
    };
  }
  
  export interface SongCountItem {
    name: string;
    artists: string;
    albumUrl: string;
    count: number;
  }
  
  export interface SongForAlbum {
    album: {
        name: string;
        images: Array<{ url: string; height: number; width: number; }>;
    };
    artists: Array<{
        name: string;
    }>;
    name: string;
    external_urls: {
        spotify: string;
    };
}


export interface TopSongsResponse {
  items: SongForAlbum[];
}

export interface ArtistCardProps {
  image: string;
  name: string;
  popularity?: number;
  spotifyUrl: string;
}

// Definir las interfaces para las propiedades de los componentes
export interface TrackCardProps {
  image: string;
  title: string;
  spotifyUrl: string;
}

