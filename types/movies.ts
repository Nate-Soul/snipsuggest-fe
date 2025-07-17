export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface LandingMovie {
  top_rated_movies: Movie[],
  upcoming_movies: Movie[],
  featured_movies: Movie[],
  popular_movies: Movie[],
};

// Interfaces for nested objects in the TMDB Movie Details response
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null; // Can be null
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string; // e.g., "US", "GB"
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string; // e.g., "en", "fr"
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// Main Interface for the TMDB Movie Details response
export interface TmdbMovieDetail {
  adult: boolean;
  backdrop_path: string | null; // Can be null
  belongs_to_collection: BelongsToCollection | null; // Can be null
  budget: number;
  genres: Genre[];
  homepage: string | null; // Can be null
  id: number;
  imdb_id: string | null; // Can be null, e.g., "tt0137523"
  original_language: string;
  original_title: string;
  overview: string | null; // Can be null
  popularity: number;
  poster_path: string | null; // Can be null
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string; // YYYY-MM-DD format
  revenue: number;
  runtime: number | null; // Can be null
  spoken_languages: SpokenLanguage[];
  status: string; // e.g., "Released", "Rumored", "Post Production"
  tagline: string | null; // Can be null
  title: string;
  video: boolean; // Indicates if there's a video (trailer) available
  vote_average: number;
  vote_count: number;
}

export interface MovieGenre {
  id: number
  name: string
}

export interface MovieCastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface MovieCrewMember {
  id: number
  name: string
}

export interface MovieCredits {
  directors: MovieCrewMember[]
  writers: MovieCrewMember[]
  composers: MovieCrewMember[]
  cast: MovieCastMember[]
}

export interface MovieDetailResponse {
  movie: TmdbMovieDetail
  credits: MovieCredits
  mpaa_rating: string
}

export interface StoredMovie {
  title: string;
  poster_path: string | null;
  runtime: number;
  mpaa_rating: string;
  imdb_rating: number;
  release_date: string;
  id: number;
  genres: Genre[]
}