// export interface Movie {
//     id: number;
//     title: string;
//     poster_path: string | null;
//     overview: string;
//     backdrop_path: string | null;
// };

export interface FAQ {
    id: number;
    question: string;
    answer: string;
};

export interface AppFeature {
    id: number;
    title: string;
    iconUrl: string;
    description: string;
}

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