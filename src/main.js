import { CardCount, NavigationItem } from './const.js';

import { generateMovieCard } from './mock/card-mock.js';
import { remove, render, RenderPosition } from './utils/render.js';
import UserStatusView from './view/user-status.js';
import FilmsCountView from './view/films-count.js';
import StatisticsView from './view/statistics.js';
// import FilterView from './view/filter.js';
import NavigationView from './view/main-navigation.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';

import MovieListPresenter from './presenter/movie-list-presenter.js';
import FilterPresenter from './presenter/filter.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
let statisticsComponent = null;

const movieCards = new Array(CardCount.TOTAL).fill().map(generateMovieCard);

const moviesModel = new MoviesModel();
moviesModel.setMovies(movieCards);

const filterModel = new FilterModel();
const navigationComponent = new NavigationView();

render(headerElement, new UserStatusView(), RenderPosition.BEFOREEND);
// render(siteMainElement, new NavigationView(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FilmsCountView(), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
// const navigationElement = siteMainElement.querySelector('.main-navigation');

if (statisticsComponent === null) {
  movieListPresenter.destroy();
  statisticsComponent = new StatisticsView(moviesModel.getMovies());
  render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
  siteMainElement.querySelector('.main-navigation__additional').classList.add('main-navigation__item--active');
  siteMainElement.querySelectorAll('.main-navigation__item').forEach((item) => item.classList.remove('main-navigation__item--active'));
}

const handleNavigationClick = (menuItem) => {
  switch (menuItem) {
    case NavigationItem.WATCHLIST:
      remove(statisticsComponent);
      movieListPresenter.init();
      // Скрыть статистику
      break;
    case NavigationItem.STATISTICS:
      movieListPresenter.destroy();
      // Показать статистику
      break;
  }
};

navigationComponent.setNavigationClickHandler(handleNavigationClick);
