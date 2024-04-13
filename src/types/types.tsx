export interface Track {
    id: string;
    name: string;
    artists: Artist[];
    album: {
      images: Image[];
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
  