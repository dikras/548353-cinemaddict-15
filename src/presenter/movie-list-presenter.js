import SortingView from '../view/sorting-view.js';

import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsTopratedContainerView from '../view/films-list-toprated.js';
import FilmsMostcommentedContainerView from '../view/films-list-mostcommented.js';

import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmView from '../view/no-film.js';
import { render, RenderPosition, remove } from '../utils/render.js';
// import { CardCount, CardElementToSlice } from '../const.js';
import { CardCount } from '../const.js';
import { sortFilmByRating, sortFilmByDate } from '../utils/card-utils.js';
import { SortType } from '../const.js';

import MovieCardPresenter from './movie-card-presenter.js';

export default class MovieList {
  constructor(mainPageContainer, moviesModel) {
    this._moviesModel = moviesModel;
    this._mainPageContainer = mainPageContainer;
    this._sortingComponent = new SortingView();
    this._renderedCardCount = CardCount.PER_STEP;
    this._movieCardPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsTopratedContainerComponent = new FilmsTopratedContainerView();
    this._filmsMostcommentedContainerComponent = new FilmsMostcommentedContainerView();

    /* this._filmsTopratedListContainerComponent = new FilmsListContainerView();
    this._filmsMostcommentedListContainerComponent = new FilmsListContainerView(); */

    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {

    this._renderList();
    /* this._renderTopRatedList();
    this._renderMostCommentedList(); */
  }

  _getCards() {
    switch(this._currentSortType) {
      case SortType.BY_DATE:
        return this._moviesModel.getMovies().slice().sort(sortFilmByDate);
      case SortType.BY_RATING:
        return this._moviesModel.getMovies().slice().sort(sortFilmByRating);
    }

    return this._moviesModel.getMovies();
  }

  _handleModeChange() {
    this._movieCardPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._movieCardPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearCardsList();
    this._renderCardsList();
  }

  _renderSorting() {
    render(this._mainPageContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _renderCard(card) {
    const movieCardPresenter = new MovieCardPresenter(this._filmsListContainerComponent, this._handleFilmChange, this._handleModeChange);
    movieCardPresenter.init(card);
    this._movieCardPresenter.set(card.id, movieCardPresenter);
  }

  _renderCards(cards) {
    cards.forEach((card) => this._renderCard(card));
  }

  _renderNoFilms() {
    render(this._mainPageContainer, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const cardCount = this._getCards().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardCount + CardCount.PER_STEP);
    const cards = this._getCards().slice(this._renderedCardCount, newRenderedCardCount);

    this._renderCards(cards);
    this._renderedCardCount = newRenderedCardCount;

    if (this._renderedCardCount >= cardCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderCardsList() {
    const cardCount = this._getCards().length;
    const cards = this._getCards().slice(0, Math.min(cardCount, CardCount.PER_STEP));

    this._renderCards(cards);

    if (cardCount > CardCount.PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearCardsList() {
    this._movieCardPresenter.forEach((presenter) => presenter.destroy());
    this._movieCardPresenter.clear();
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

  /* _renderTopRatedList() {
    render(this._filmsContainerComponent, this._filmsTopratedContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsTopratedContainerComponent, this._filmsTopratedListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(this._filmsTopratedListContainerComponent,
      CardElementToSlice.FIRST_IN_TOPRATED_BLOCK,
      CardElementToSlice.LAST_IN_TOPRATED_BLOCK);
  }

  _renderMostCommentedList() {
    render(this._filmsContainerComponent, this._filmsMostcommentedContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsMostcommentedContainerComponent, this._filmsMostcommentedListContainerComponent, RenderPosition.BEFOREEND);

    this._renderCards(this._filmsMostcommentedListContainerComponent,
      CardElementToSlice.FIRST_IN_MOSTCOMMENTED_BLOCK,
      CardElementToSlice.LAST_IN_MOSTCOMMENTED_BLOCK);
  } */
}
