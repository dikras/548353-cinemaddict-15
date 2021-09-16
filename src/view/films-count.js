import AbstractView from './abstract.js';

const createFilmsCountTemplate = (totalMovies) => (`<p>${totalMovies} movies inside</p>`);

export default class FilmsCount extends AbstractView {
  constructor(totalMovies) {
    super();
    this._movies = totalMovies;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._movies);
  }
}
