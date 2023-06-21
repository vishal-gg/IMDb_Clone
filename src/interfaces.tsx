export interface optionsType {
  method: string;
  url: string;
  params?: {
    q?: string;
    tconst?: string;
  };
  headers: {
    "X-RapidAPI-Key": string;
    "X-RapidAPI-Host": string;
  };
}

interface MovieImage {
  height: number;
  imageUrl: string;
  width: number;
}

export interface Movie {
  i?: MovieImage;
  id: string;
  l: string;
  q?: string;
  qid?: string;
  rank: number;
  s?: string;
  y?: number;
  yr?: string;
}

export interface APIResponse {
  d: Movie[];
  q: string;
  v: number;
}

export interface MovieDetails {
  id: string;
  title: {
    "@type": string;
    id: string;
    image: {
      height: number;
      id: string;
      url: string;
      width: number;
    };
    runningTimeInMinutes: number;
    title: string;
    titleType: string;
    year: number;
  };
  certificates: {
    [country: string]: {
      certificate: string;
      certificateNumber: number;
      ratingReason: string;
      ratingsBody: string;
      country: string;
    }[];
  };
  ratings: {
    canRate: boolean;
    rating: number;
    ratingCount: number;
    topRank: number;
  };
  genres: string[];
  releaseDate: string;
  plotOutline: {
    id: string;
    text: string;
  };
  plotSummary: {
    author: string;
    id: string;
    text: string;
  };
}


interface Image {
  height: number;
  id: string;
  url: string;
  width: number;
}

interface Role {
  character: string;
}

interface CastMember {
  akas?: string[];
  id: string;
  legacyNameText?: string;
  name: string;
  category: string;
  characters?: string[];
  roles?: Role[];
  image?: Image;
}

interface CrewMember {
  disambiguation?: string;
  id: string;
  legacyNameText?: string;
  name: string;
  category: string;
  job?: string;
}

interface Base {
  id: string;
  title: string;
  titleType: string;
  year: number;
}

export interface Credits_API {
  id: string;
  base: Base;
  cast: CastMember[];
  crew: {
    director?: CrewMember[];
    producer?: CrewMember[];
    writer?: CrewMember[];
  };
}
