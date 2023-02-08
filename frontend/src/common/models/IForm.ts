export interface IFormInput {
  album: string;
  artistName: string;
  artwork: string;
  category: ICategory;
  id: string;
  lyrics: string;
  playlist: IPlaylist;
  tag: ITag;
  trackName: string;
  youtube: string;
  duration: string;
}

export interface ICategory {
  new: "new";
}

export interface ITag {
  trending: "trending";
}

export interface IPlaylist {
  Bedroom: "Bedroom";
  Workout: "Workout";
  Street: "Street";
  Choplife: "Choplife";
  Piano: "Piano";
  office: "office";
  female: "female";
  Motivational: "Motivational";
  Drive: "Drive";
  Reggae: "Reggae";
}

export interface IArtistForm {
  tag: IArtistTag;
  id: string;
  url: string;
  name: string;
}

export interface IArtistTag {
  trending: "trending";
}
