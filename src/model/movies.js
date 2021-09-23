import AbstractObserver from '../utils/abstract-observer.js';

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    this._comments = [
      update,
      ...this._comments,
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const indexMovie = this._movies.findIndex((movie) => movie.id === update.id);

    const indexComment = this._movies[indexMovie].comments.findIndex((comment) => comment.id === update.comments.id);

    if (indexComment === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._movies[indexMovie].comments = [
      ...this._movies[indexMovie].comments.slice(0, indexComment),
      ...this._movies[indexMovie].comments.slice(indexComment + 1),
    ];

    this._notify(updateType, this._movies[indexMovie]);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        movieInfo:  {
          title: movie['film_info']['title'],
          alternativeTitle: movie['film_info']['alternative_title'],
          poster: movie['film_info']['poster'],
          runtime: movie['film_info']['runtime'],
          genre: movie['film_info']['genre'],
          totalRating: movie['film_info']['total_rating'],
          ageRating: movie['film_info']['age_rating'],
          director: movie['film_info']['director'],
          writers: movie['film_info']['writers'],
          actors: movie['film_info']['actors'],
          release: {
            date: movie['film_info']['release']['date'] !== null ? movie['film_info']['release']['date'] : new Date().toISOString(),
            releaseCountry: movie['film_info']['release']['release_country'],
          },
          description: movie['film_info']['description'],
        },
        userDetails: {
          watchlist: movie['user_details']['watchlist'],
          alreadyWatched: movie['user_details']['already_watched'],
          watchingDate: movie['user_details']['watching_date'] !== null ? movie['user_details']['watching_date'] : new Date().toISOString(),
          favorite: movie['user_details']['favorite'],
        },
      },
    );

    delete adaptedMovie['film_info'];
    delete adaptedMovie['user_details'];

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        'comments': movie.comments.every((comment) => typeof comment === 'string') ? movie.comments
          : movie.comments.map((comment) => comment.id),
        'film_info': {
          'title': movie.movieInfo.title,
          'alternative_title': movie.movieInfo.alternativeTitle,
          'poster': movie.movieInfo.poster,
          'runtime': movie.movieInfo.runtime,
          'genre': movie.movieInfo.genre,
          'total_rating': movie.movieInfo.totalRating,
          'age_rating': movie.movieInfo.ageRating,
          'director': movie.movieInfo.director,
          'writers': movie.movieInfo.writers,
          'actors': movie.movieInfo.actors,
          'release': {
            'date': movie.movieInfo.release.date,
            'release_country': movie.movieInfo.release.releaseCountry,
          },
          'description': movie.movieInfo.description,
        },
        'user_details': {
          'watchlist': movie.userDetails.watchlist,
          'already_watched': movie.userDetails.alreadyWatched,
          'watching_date': movie.userDetails.watchingDate,
          'favorite': movie.userDetails.favorite,
        },
      },
    );

    delete adaptedMovie.movieInfo;
    delete adaptedMovie.userDetails;

    return adaptedMovie;
  }
}
