export type Favorite = {
  id: string;
  userId: string;
  movieId: number;
  title: string;
  posterUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FavoritePayload = {
  userId: string;
  movieId: number;
  title: string;
  posterUrl?: string | null;
};
