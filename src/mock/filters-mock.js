const taskToFilterMap = {
  watchlist: (movies) => movies.filter((movie) => movie.movieInfo.userDetails.watchlist).length,
  history: (movies) => movies.filter((movie) => movie.movieInfo.userDetails.alreadyWatched).length,
  favorites: (movies) => movies.filter((movie) => movie.movieInfo.userDetails.favorite).length,
};

const generateFilter = (movies) => Object.entries(taskToFilterMap).map(
  ([filterName, countMovies]) => ({
    name: filterName,
    count: countMovies(movies),
  }),
);

export { generateFilter };
