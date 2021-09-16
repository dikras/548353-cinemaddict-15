import { FilterType, UpdateType, END_POINT, AUTHORIZATION } from './const.js';
import { remove, render, RenderPosition } from './utils/render.js';

import UserStatusView from './view/user-status.js';
import FilmsCountView from './view/films-count.js';
import StatisticsView from './view/statistics.js';

import MovieListPresenter from './presenter/movie-list.js';
import FilterPresenter from './presenter/filter.js';

import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';

import Api from './api.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

// const totalMovies = moviesModel.getMovies();

render(headerElement, new UserStatusView(), RenderPosition.BEFOREEND);

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


api.getMovies().then((movies) => {
  moviesModel.setMovies(UpdateType.INIT, movies);
  render(footerStatisticsElement, new FilmsCountView(moviesModel.getMovies().length), RenderPosition.BEFOREEND);
})
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });
