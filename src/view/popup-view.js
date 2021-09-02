import dayjs from 'dayjs';
import SmartView from './smart.js';

const createCommentsListTemplate = (comments, isComments) => (
  `${isComments ? `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comments[0].emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comments[0].comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comments[0].author}</span>
          <span class="film-details__comment-day">${dayjs(comments[0].date).format('YYYY/MM/DD HH:MM')}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>` : ''}
    `
);

const createEmojiTemplate = (emojiType) => (
  `${emojiType ? `<img src="./images/emoji/${emojiType}.png" width="55" height="55" alt="emoji">
  </img>` : ''}`
);

const createPopupTemplate = (card) => {
  const { movieInfo, userDetails, comments, isComments, emojiType } = card;

  const setPopupControlsItemActive = (value) => value ? 'film-details__control-button--active' : '';

  const watchlistClassActive = setPopupControlsItemActive(userDetails.watchlist);

  const alreadyWatchedClassActive = setPopupControlsItemActive(userDetails.alreadyWatched);

  const favoriteClassActive = setPopupControlsItemActive(userDetails.favorite);

  const commentsListTemplate = createCommentsListTemplate(comments, isComments);

  const emojiTemplate = createEmojiTemplate(emojiType);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${movieInfo.poster}" alt="">
            <p class="film-details__age">${movieInfo.ageRating}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${movieInfo.title}</h3>
                <p class="film-details__title-original">${movieInfo.alternativeTitle}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${movieInfo.totalRating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${movieInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${movieInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${movieInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${dayjs(movieInfo.release.date).format('DD MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${dayjs(movieInfo.runtime).format()}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${movieInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${movieInfo.genre}</span>
                  <span class="film-details__genre">${movieInfo.genre}</span>
                  <span class="film-details__genre">${movieInfo.genre}</span></td>
              </tr>
            </table>
            <p class="film-details__film-description">
              ${movieInfo.description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistClassActive}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassActive}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClassActive}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list">${commentsListTemplate}</ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${emojiTemplate}</div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends SmartView {
  constructor(card) {
    super();
    this._data = Popup.parseCardToData(card);

    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setClosePopupClickHandler(this._callback.click);
    this.setPopupWatchlistClickHandler(this._callback.watchlistClick);
    this.setPopupWatchedClickHandler(this._callback.watchedClick);
    this.setPopupFavoriteClickHandler(this._callback.favoriteClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.film-details__emoji-item').forEach((emojiItem) =>
      emojiItem.addEventListener('click', this._emojiClickHandler));
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emojiType: evt.target.value,
    });
    this.getElement().querySelector('.film-details__comment-input').placeholder = '';
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      commentText: evt.target.value,
    }, true);
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();

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

  setClosePopupClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closePopupClickHandler);
  }

  removePopupClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().removeEventListener('click', this._clickHandler);
  }

  setPopupWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setPopupWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedClickHandler);
  }

  setPopupFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Popup.parseDataToCard(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  static parseCardToData(card) {
    return Object.assign(
      {},
      card,
      {
        isComments: card.comments.length !== 0,
      },
    );
  }

  static parseDataToCard(data) {
    data = Object.assign({}, data);

    delete data.emojiType;

    return data;
  }
}
