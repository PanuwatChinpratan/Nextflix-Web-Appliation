import { createMovieRepository } from "../data/movie-repository";
import { createMovieUseCases } from "../domain/movies";

const movieRepository = createMovieRepository();

export const movieUseCases = createMovieUseCases(movieRepository);
