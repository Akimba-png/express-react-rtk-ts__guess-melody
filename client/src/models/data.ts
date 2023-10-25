export type ArtistQuestion = {
  id: string;
  type: 'artist';
  answers: {
    picture: string;
    artist: string;
  }[];
  song: {
    artist: string;
    src: string;
  };
};

export type GenreQuestion = {
  id: string;
  type: 'genre';
  genre: string;
  answers: {
    src: string;
    genre: string;
  }[];
};

export type Questions = (ArtistQuestion | GenreQuestion)[];
