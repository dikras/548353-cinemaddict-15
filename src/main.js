import { createSortingTemplate } from './view/sorting.js';
import { createUserStatusTemplate } from './view/user-status.js';
import { createFilterTemplate } from './view/filters-view.js';
import { generateFilter } from './mock/filters-mock.js';
import { createFilmsCountTemplate } from './view/films-count.js';
import { createFilmsContainerTemplate } from './view/films-container.js';
import { createFilmCardTemplate } from './view/card-view.js';
import { createPopupTemplate } from './view/popup.js';
import { createShowmoreButtonTemplate } from './view/show-more-button.js';
import { CARD_ADDBLOCK_COUNT, CARD_MAINBLOCK_COUNT, MOVIE_CARDS_COUNT, CARD_COUNT_PER_STEP } from './const.js';
import { generateMovieCard } from './mock/card-mock.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const movieCards = new Array(MOVIE_CARDS_COUNT).fill().map(generateMovieCard);
const filters = generateFilter(movieCards);

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

render(siteMainElement, createFilterTemplate(filters), 'beforeend');
render(headerElement, createUserStatusTemplate(), 'beforeend');
render(siteMainElement, createSortingTemplate(), 'beforeend');
render(siteMainElement, createFilmsContainerTemplate(), 'beforeend');
render(footerStatisticsElement, createFilmsCountTemplate(), 'beforeend');

const filmsContainerElement = siteMainElement.querySelector('.films');
const filmsListElement = filmsContainerElement.querySelector('.films-list:nth-child(1)');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let index = 0; index < CARD_MAINBLOCK_COUNT; index++) {
  render(filmsListContainerElement, createFilmCardTemplate(movieCards[index]), 'beforeend');
}

if (movieCards.length > CARD_COUNT_PER_STEP) {
  let renderedCardCount = CARD_COUNT_PER_STEP;

  render(filmsListElement, createShowmoreButtonTemplate(), 'beforeend');

  const showMoreButton = filmsListElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movieCards
      .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((card) => render(filmsListContainerElement, createFilmCardTemplate(card), 'beforeend'));

    renderedCardCount += CARD_COUNT_PER_STEP;

    if (renderedCardCount >= movieCards.length) {
      showMoreButton.remove();
    }
  });
}

const filmsTopratedListElement = filmsContainerElement.querySelector('.films-list:nth-child(2)');
const filmsTopratedListContainerElement = filmsTopratedListElement.querySelector('.films-list__container');

for (let index = 0; index < CARD_ADDBLOCK_COUNT; index++) {
  render(filmsTopratedListContainerElement, createFilmCardTemplate(movieCards[index]), 'beforeend');
}

const filmsMostcommentedListElement = filmsContainerElement.querySelector('.films-list:nth-child(3)');
const filmsMostcommentedListContainerElement = filmsMostcommentedListElement.querySelector('.films-list__container');

for (let index = 0; index < CARD_ADDBLOCK_COUNT; index++) {
  render(filmsMostcommentedListContainerElement, createFilmCardTemplate(movieCards[index]), 'beforeend');
}

const filmCardPosters = filmsContainerElement.querySelectorAll('.film-card__poster');

const showPopup = () => {
  render(bodyElement, createPopupTemplate(movieCards[0]), 'beforeend');
};

filmCardPosters.forEach((poster) => poster.addEventListener('click', showPopup));

/* const popupElement = document.querySelector('.film-details');
const closePopupElement = popupElement.querySelector('.film-details__close-btn');

const closePopup = () => {
  popupElement.remove();
  filmCardPosters.forEach((poster) => poster.removeEventListener('click', showPopup));
};

closePopupElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
}); */
