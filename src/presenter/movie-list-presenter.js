import SortingView from '../view/sorting.js';

import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsTopratedContainerView from '../view/films-list-toprated.js';
import FilmsMostcommentedContainerView from '../view/films-list-mostcommented.js';

import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmView from '../view/no-film.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { CardCount } from '../const.js';

import MovieCardPresenter from './movie-card-presenter.js';

export default class MovieList {
  constructor(mainPageContainer) {
    this._mainPageContainer = mainPageContainer;
    this._sortingComponent = new SortingView();
    this._renderedCardCount = CardCount.PER_STEP;
    this._movieCardPresenter = new Map();

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsTopratedContainerComponent = new FilmsTopratedContainerView();
    this._filmsMostcommentedContainerComponent = new FilmsMostcommentedContainerView();

    this._filmsTopratedListContainerComponent = new FilmsListContainerView();
    this._filmsMostcommentedListContainerComponent = new FilmsListContainerView();

    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    this._renderList();
    this._renderTopratedList();
    this._renderMostcommentedList();
  }

  _handleModeChange() {
    this._movieCardPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._filmCards = updateItem(this._filmCards, updatedFilm);
    this._movieCardPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  _renderSorting() {
    render(this._mainPageContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsContainer() {
    render(this._mainPageContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsListContainer() {
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderCard(container, card) {
    const movieCardPresenter = new MovieCardPresenter(container, this._handleFilmChange, this._handleModeChange);
    movieCardPresenter.init(card);
    this._movieCardPresenter.set(card.id, movieCardPresenter);
  }

  _renderCards(containerComponent, from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((filmCard) => this._renderCard(containerComponent, filmCard));
  }

  _renderNoFilms() {
    render(this._mainPageContainer, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._filmsListContainerComponent, this._renderedCardCount, this._renderedCardCount + CardCount.PER_STEP);
    this._renderedCardCount += CardCount.PER_STEP;

    if (this._renderedCardCount >= this._filmCards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderCardsList() {
    this._renderCards(this._filmsListContainerComponent, 0, CardCount.MAIN_BLOCK);

    if (this._filmCards.length > CardCount.PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearCardsList() {
    this._movieCardPresenter.forEach((presenter) => presenter.destroy());
    this._movieCard.clear();
    this._renderedardCount = CardCount.PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderList() {
    if (CardCount.TOTAL === 0) {
      this._renderNoFilms();
    } else {
      this._renderSorting();
      this._renderFilmsContainer();
      this._renderFilmsList();
      this._renderFilmsListContainer();
      this._renderCardsList();
    }
  }

  _renderTopratedList() {
    render(this._filmsContainerComponent, this._filmsTopratedContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsTopratedContainerComponent, this._filmsTopratedListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(this._filmsTopratedListContainerComponent, 0, CardCount.ADD_BLOCK);
  }

  _renderMostcommentedList() {
    render(this._filmsContainerComponent, this._filmsMostcommentedContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsMostcommentedContainerComponent, this._filmsMostcommentedListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(this._filmsMostcommentedListContainerComponent, 0, CardCount.ADD_BLOCK);
  }
}
