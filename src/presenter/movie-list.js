import SortingView from '../view/sorting.js';
import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import FilmsListContainerView from '../view/films-list-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmView from '../view/no-film.js';
import LoadingView from '../view/loading.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { CardCount } from '../const.js';
import { sortFilmByRating, sortFilmByDate } from '../utils/card-utils.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { filterMovie } from '../utils/filter.js';
import MovieCardPresenter from './movie.js';

export default class MovieList {
  constructor(mainPageContainer, moviesModel, filterModel) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._mainPageContainer = mainPageContainer;
    this._renderedCardCount = CardCount.PER_STEP;
    this._filterType = FilterType.ALL;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;

    this._movieCardPresenter = new Map();
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._loadingComponent = new LoadingView();

    this._noFilmComponent = null;
    this._sortingComponent = null;
    this._showMoreButtonComponent = null;

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderList();

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearList({resetRenderedTaskCount: true, resetSortType: true});

    remove(this._filmsContainerComponent);

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getMovies() {
    this._filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filtredMovies = filterMovie[this._filterType](movies);

    switch (this._currentSortType) {
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
      case UserAction.ADD_COMMENT:
        this._moviesModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._moviesModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._movieCardPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._movieCardPresenter.get(data.id).init(data);
        break;
      case UpdateType.MAJOR:
        this._clearList({resetRenderedCardCount: true, resetSortType: true});
        this._renderList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderList();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearList({resetRenderedTaskCount: true});
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

  _renderCard(container, card) {
    const movieCardPresenter = new MovieCardPresenter(container, this._handleViewAction, this._handleModeChange);
    movieCardPresenter.init(card);
    this._movieCardPresenter.set(card.id, movieCardPresenter);
  }

  _renderCards(containerComponent, cards) {
    cards.forEach((filmCard) => this._renderCard(containerComponent, filmCard));
  }

  _renderLoading() {
    render(this._mainPageContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    this._noFilmComponent = new NoFilmView(this._filterType);
    render(this._mainPageContainer, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const cardCount = this._getMovies().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardCount + CardCount.PER_STEP);
    const cards = this._getMovies().slice(this._renderedCardCount, newRenderedCardCount);

    this._renderCards(this._filmsListContainerComponent, cards);
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
    const cardCount = this._getMovies().length;
    const cards = this._getMovies().slice(0, Math.min(cardCount, CardCount.PER_STEP));

    this._renderCards(this._filmsListContainerComponent, cards);
    if (cardCount > CardCount.PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearList({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardCount = this._getMovies().length;

    this._movieCardPresenter.forEach((presenter) => presenter.destroy());
    this._movieCardPresenter.clear();

    remove(this._sortingComponent);
    remove(this._showMoreButtonComponent);

    if (this._noFilmComponent) {
      remove(this._noFilmComponent);
    }

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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const cards = this._getMovies();
    const cardCount = cards.length;

    if (cardCount === 0) {
      this._renderNoFilms();
    } else {
      this._renderSorting();

      this._renderFilmsContainer();
      this._renderFilmsList();
      this._renderFilmsListContainer();
      this._renderCards(this._filmsListContainerComponent, cards.slice(0, Math.min(cardCount, this._renderedCardCount)));
    }

    if (cardCount > this._renderedCardCount) {
      this._renderShowMoreButton();
    }
  }
}
