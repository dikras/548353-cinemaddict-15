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

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, api);

let statisticsComponent = null;

const handleNavigationClick = (menuItem) => {
  let count;
  switch (menuItem) {
    case FilterType.STATISTICS:
      movieListPresenter.destroy();
      statisticsComponent = new StatisticsView(moviesModel.getMovies());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
    case FilterType.ALL:
    case FilterType.WATCHLIST:
    case FilterType.HISTORY:
    case FilterType.FAVORITES:
      if (statisticsComponent !== null ) {
        count = 0;
        remove(statisticsComponent);
      }
      statisticsComponent = null;
      if (count === 0) {
        movieListPresenter.init();
      }
      count = count + 1;
      break;
  }
};

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel, handleNavigationClick);

render(headerElement, new UserStatusView(), RenderPosition.BEFOREEND);
filterPresenter.init();
movieListPresenter.init();

let totalMovies;

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
    totalMovies = movies.length;
    render(footerStatisticsElement, new FilmsCountView(totalMovies), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });

