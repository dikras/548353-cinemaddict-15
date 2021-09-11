import AbstractObserver from '../utils/abstract-observer.js';

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies) {
    this._movies = movies.slice();
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
}
