import { CardCount, FilterType } from './const.js';
import { generateMovieCard } from './mock/card-mock.js';
import { remove, render, RenderPosition } from './utils/render.js';
import UserStatusView from './view/user-status.js';
import FilmsCountView from './view/films-count.js';
import StatisticsView from './view/statistics.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';

import MovieListPresenter from './presenter/movie-list-presenter.js';
import FilterPresenter from './presenter/filter.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const movieCards = new Array(CardCount.TOTAL).fill().map(generateMovieCard);

const moviesModel = new MoviesModel();
moviesModel.setMovies(movieCards);

const filterModel = new FilterModel();

render(headerElement, new UserStatusView(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FilmsCountView(), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel);

let statisticsComponent = null;

const handleNavigationClick = (menuItem) => {
  switch (menuItem) {
    case FilterType.STATISTICS:
      movieListPresenter.destroy();
      statisticsComponent = new StatisticsView(moviesModel.getMovies());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
    default:
      remove(statisticsComponent);
      movieListPresenter.init();
  }
};

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel, handleNavigationClick);

filterPresenter.init();
movieListPresenter.init();
