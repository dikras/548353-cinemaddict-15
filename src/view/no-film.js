import AbstractView from './abstract.js';
import { FilterType } from '../const.js';

const NoMoviesTextType = {
  [FilterType.ALL]: 'There are no movies in database',
  [FilterType.WATCHLIST]: 'There are no movies to watch',
  [FilterType.HISTORY]: 'There are no watched movies',
  [FilterType.FAVORITES]: 'There are no favorite movies',
};

const createNoMoviesTemplate = (filterType) => {
  const noMoviesTextValue = NoMoviesTextType[filterType];

  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${noMoviesTextValue}</h2>
    </section>
  </section>`);
};

export default class NoFilm extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoMoviesTemplate(this._data);
  }
}
