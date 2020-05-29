export interface MovieType  {
  id: string;
  adult?:boolean;
  backdrop_path?:string;
  video:boolean;
  title: string;
  original_title: string;
  vote_average: number;
  vote_count?: number;
  poster_path: string;
  release_date: string;
  overview: string;
  popularity?: number;
}
