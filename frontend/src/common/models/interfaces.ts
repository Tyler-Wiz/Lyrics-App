export interface ISong {
  album: string;
  artistName: string;
  artwork: string;
  category: string;
  id: string;
  __id__: string;
  lyrics: string;
  playlist: string;
  tag: string;
  trackName: string;
  youtube: string;
  duration: string;
  itemQuantity: number;
  updatedAt: any;
}

export interface IArtists {
  id: string;
  name: string;
  tag: string;
  url: string;
  __id__: string;
  updatedAt: any;
}

export interface IPlaylist {
  artwork: string;
  name: string;
  _id: string;
  imageUrl: string;
}

export interface IAlbum {
  albumName: string;
  artistName: string;
  artwork: string;
  tag: string;
  __id__: string;
  updatedAt: any;
}

export interface IAlbumContent {
  albumName: string;
  artistName: string;
  artwork: string;
  tag: string;
  id: string;
  songs: [ISong];
}
