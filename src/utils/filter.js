import { FilterType } from '../const';

export const filter = {
  [FilterType.ALL]: (movies) => movies.filter((movie) => !movie.userDetails.watchlist &&
  !movie.userDetails.alreadyWatched && !movie.userDetails.favorite),
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.watchlist),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.userDetails.favorite),
};
