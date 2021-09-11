import { render, RenderPosition, remove, replace } from '../utils/render.js';
import CardView from '../view/card-view.js';
import PopupView from '../view/popup-view.js';
import { isEscEvent } from '../utils/common.js';
import { UserAction, UpdateType } from '../const.js';

const bodyElement = document.querySelector('body');

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENING: 'OPENING',
};

export default class MovieCard {
  constructor(movieCardContainer, changeData, changeMode) {
    this._movieCardContainer = movieCardContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._movieCardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._onFilmCardElementClick = this._onFilmCardElementClick.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._onClosePopupElementClick = this._onClosePopupElementClick.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
  }

  init(card) {
    this._card = card;
    const prevMovieCardComponent = this._movieCardComponent;

    this._movieCardComponent = new CardView(card);

    this._movieCardComponent.setClickHandler(this._onFilmCardElementClick);
    this._movieCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._movieCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._movieCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    // this._movieCardComponent.setClickHandler(() => this._onFilmCardElementClick());

    if (prevMovieCardComponent === null) {
      render(this._movieCardContainer, this._movieCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._movieCardContainer.getElement().contains(prevMovieCardComponent.getElement())) {
      replace(this._movieCardComponent, prevMovieCardComponent);
    }

    remove(prevMovieCardComponent);
  }

  destroy() {
    remove(this._movieCardComponent);
  }

  _closePopup() {
    this._popupComponent.getElement().remove();
    bodyElement.classList.remove('hide-overflow');
    this._mode = Mode.DEFAULT;
  }

  _onEscKeydown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener('keydown', this._onEscKeydown);
    }
  }

  _onClosePopupElementClick() {
    this._closePopup();
    this._popupComponent.removePopupClickHandler();
  }

  renderPopup() {
    this._popupComponent = new PopupView(this._card);
    render(bodyElement, this._popupComponent, RenderPosition.BEFOREEND);

    this._popupComponent.setClosePopupClickHandler(this._onClosePopupElementClick);
    this._popupComponent.setWatchlistPopupClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedPopupClickHandler(this._handleWatchedClick);
    this._popupComponent.setFavoritePopupClickHandler(this._handleFavoriteClick);
    this._popupComponent.setCommentDeleteClickHandler(this._handleCommentDeleteClick);
    this._popupComponent.setCommentSubmitHandler(this._handleCommentSubmit);

    document.addEventListener('keydown', this._onEscKeydown);
    this._changeMode();
    this._mode = Mode.OPENING;
    bodyElement.classList.add('hide-overflow');
  }

  _onFilmCardElementClick() {
    this.renderPopup();
  }

  _handleCommentDeleteClick(card) {
    this._changeData(
      UpdateType.PATCH,
      UpdateType.MINOR,
      card,
    );
  }

  _handleCommentSubmit(card) {
    this._changeData(
      UpdateType.PATCH,
      UpdateType.MINOR,
      card,
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        this._card.userDetails.watchlist = !this._card.userDetails.watchlist,
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        this._card.userDetails.alreadyWatched = !this._card.userDetails.alreadyWatched,
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        this._card.userDetails.favorite = !this._card.userDetails.favorite,
      ),
    );
  }

  resetView() {
    if (this._mode === Mode.OPENING) {
      this._closePopup();
    }
  }
}
