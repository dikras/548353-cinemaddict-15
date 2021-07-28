import { createSiteMenuTemplate } from './view/site-menu.js';
import { createUserStatusTemplate } from './view/user-status.js';
import { createFilmsCountTemplate } from './view/films-count.js';
import { createFilmsContainerTemplate } from './view/films-container.js';
import { createFilmCardTemplate } from './view/card.js';
import { createShowmoreButtonTemplate } from './view/show-more-button.js';

const CARD_MAINBLOCK_COUNT = 5;
const CARD_ADDBLOCK_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

render(headerElement, createUserStatusTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmsContainerTemplate(), 'beforeend');
render(footerStatisticsElement, createFilmsCountTemplate(), 'beforeend');

const filmsContainerElement = siteMainElement.querySelector('.films');
const filmsListElement = filmsContainerElement.querySelector('.films-list:nth-child(1)');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let index = 0; index < CARD_MAINBLOCK_COUNT; index++) {
  render(filmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(filmsListElement, createShowmoreButtonTemplate(), 'beforeend');

const filmsTopratedListElement = filmsContainerElement.querySelector('.films-list:nth-child(2)');
const filmsTopratedListContainerElement = filmsTopratedListElement.querySelector('.films-list__container');

for (let index = 0; index < CARD_ADDBLOCK_COUNT; index++) {
  render(filmsTopratedListContainerElement, createFilmCardTemplate(), 'beforeend');
}

const filmsMostcommentedListElement = filmsContainerElement.querySelector('.films-list:nth-child(3)');
const filmsMostcommentedListContainerElement = filmsMostcommentedListElement.querySelector('.films-list__container');

for (let index = 0; index < CARD_ADDBLOCK_COUNT; index++) {
  render(filmsMostcommentedListContainerElement, createFilmCardTemplate(), 'beforeend');
}
