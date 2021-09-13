import { CardCount, NavigationItem } from './const.js';
import { generateMovieCard } from './mock/card-mock.js';
import { render, RenderPosition } from './utils/render.js';
import UserStatusView from './view/user-status.js';
import FilmsCountView from './view/films-count.js';
import StatisticsView from './view/statistics.js';
import NavigationView from './view/main-navigation.js';
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
const navigationComponent = new NavigationView();

const handleNavigationClick = (navItem) => {
  switch (navItem) {
    case NavigationItem.ALL:
      // Показать доску
      // Скрыть статистику
      break;
    case NavigationItem.STATISTICS:
      // Скрыть доску
      // Показать статистику
      break;
  }
};

render(headerElement, new UserStatusView(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationView(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FilmsCountView(), RenderPosition.BEFOREEND);

const navigationElement = siteMainElement.querySelector('.main-navigation');

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(navigationElement, filterModel, moviesModel);

navigationComponent.setNavigationClickHandler(handleNavigationClick);

filterPresenter.init();
movieListPresenter.init();
render(siteMainElement, new StatisticsView(moviesModel.getMovies()), RenderPosition.BEFOREEND);
