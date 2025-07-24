export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
  Genre?: string;
  Plot?: string;
  imdbRating?: string;
  Runtime?: string;
  Response?: string;
  Error?: string;
  Search?: Movie[];
}

export interface User {
  email: string;
  password: string;
}