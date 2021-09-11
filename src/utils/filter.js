<<<<<<< HEAD
import { FilterType } from '../const';

export const filter = {
  [FilterType.ALL]: (movies) => movies.filter((movie) => !movie.userDetails.watchlist &&
  !movie.userDetails.alreadyWatched && !movie.userDetails.favorite),
=======
import { FilterType } from '../const.js';

export const filterMovie = {
  [FilterType.ALL]: (movies) => movies.slice(),
>>>>>>> module7-task1.v2
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.watchlist),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.userDetails.favorite),
};
