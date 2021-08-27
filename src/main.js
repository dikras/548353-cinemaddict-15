import { generateFilter } from './mock/filters-mock.js';
import { CardCount } from './const.js';
import { generateMovieCard } from './mock/card-mock.js';
import { render, RenderPosition } from './utils/render.js';
import UserStatusView from './view/user-status.js';
import FilmsCountView from './view/films-count.js';
import FilterView from './view/filters-view.js';

import MovieListPresenter from './presenter/movie-list-presenter.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const movieCards = new Array(CardCount.TOTAL).fill().map(generateMovieCard);
const filters = generateFilter(movieCards);

const movieListPresenter = new MovieListPresenter(siteMainElement);

render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(headerElement, new UserStatusView(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FilmsCountView(), RenderPosition.BEFOREEND);

movieListPresenter.init(movieCards);
