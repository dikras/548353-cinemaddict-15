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
import { SortType, UpdateType, UserAction } from '../const.js';
import { filter } from '../utils/filter.js';

import MovieCardPresenter from './movie-card-presenter.js';

export default class MovieList {
  constructor(mainPageContainer, moviesModel, filterModel) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._mainPageContainer = mainPageContainer;
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

    this._sortingComponent = null;
    this._showMoreButtonComponent = null;
    this._noFilmComponent = new NoFilmView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderList();
    /* this._renderTopRatedList();
    this._renderMostCommentedList(); */
  }

  _getCards() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filtredMovies = filter[filterType](movies);

    switch(this._currentSortType) {
      case SortType.BY_DATE:
        return filtredMovies.sort(sortFilmByDate);
      case SortType.BY_RATING:
        return filtredMovies.sort(sortFilmByRating);
    }

    return filtredMovies;
  }

  _handleModeChange() {
    this._movieCardPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_CARD:
        this._moviesModel.addMovie(updateType, update);
        break;
      case UserAction.DELETE_CARD:
        this._moviesModel.deleteMovie(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._movieCardPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearCardsList();
        this._renderList();
        break;
      case UpdateType.MAJOR:
        this._clearCardsList({resetRenderedCardCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearCardsList({resetRenderedCardCount: true});
    this._renderList();
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _renderCard(card) {
    const movieCardPresenter = new MovieCardPresenter(this._filmsListContainerComponent, this._handleViewAction, this._handleModeChange);
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
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderCardsList() {
    const cardCount = this._getCards().length;
    const cards = this._getCards().slice(0, Math.min(cardCount, CardCount.PER_STEP));

    this._renderCards(cards);

    if (cardCount > CardCount.PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearCardsList({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardCount = this._getCards().length;

    this._movieCardPresenter.forEach((presenter) => presenter.destroy());
    this._movieCardPresenter.clear();

    remove(this._sortingComponent);
    remove(this._noFilmComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedCardCount) {
      this._renderedCardCount = CardCount.PER_STEP;
    } else {
      this._renderedCardCount = Math.min(cardCount, this._renderedCardCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderList() {
    const cards = this._getCards();
    const cardCount = cards.length;

    if (cardCount === 0) {
      this._renderNoFilms();
    } else {
      this._renderSorting();

      this._renderFilmsContainer();
      this._renderFilmsList();
      this._renderFilmsListContainer();

      this._renderCards(cards.slice(0, Math.min(cardCount, this._renderedCardCount)));

      if (cardCount > this._renderedCardCount) {
        this._renderShowMoreButton();
      }
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
