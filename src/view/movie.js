import AbstractView from './abstract.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const createFilmCardTemplate = (movie) => {
  const { comments, movieInfo, userDetails } = movie;

  const setCardControlsItemActive = (value) => value ? 'film-card__controls-item--active' : '';

  const watchlistClassActive = setCardControlsItemActive(userDetails.watchlist);

  const alreadyWatchedClassActive = setCardControlsItemActive(userDetails.alreadyWatched);

  const favoriteClassActive = setCardControlsItemActive(userDetails.favorite);

  return `<article class="film-card">
    <h3 class="film-card__title">${movieInfo.title}</h3>
    <p class="film-card__rating">${movieInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(movieInfo.release.date).format('YYYY')}</span>
      <span class="film-card__duration">${dayjs.duration(movieInfo.runtime, 'minutes').
    format('H')}h ${dayjs.duration(movieInfo.runtime, 'minutes').format('mm')}m</span>
      <span class="film-card__genre">${movieInfo.genre.join(' ')}</span>
    </p>
    <img src="${movieInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${movieInfo.description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassActive}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassActive}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassActive}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    if (evt.target.className === 'film-card__poster'||
    evt.target.className === 'film-card__title' ||
    evt.target.className === 'film-card__comments') {
      this._callback.click();
    }
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }
}
