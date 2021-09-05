import { CardCount } from './const.js';
import { generateMovieCard } from './mock/card-mock.js';
import { render, RenderPosition } from './utils/render.js';
import UserStatusView from './view/user-status.js';
import FilmsCountView from './view/films-count.js';
import FilterModel from './model/filter-model';
import MoviesModel from './model/movies-model';

import MovieListPresenter from './presenter/movie-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

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
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
movieListPresenter.init();
