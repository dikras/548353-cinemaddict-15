import { generateFilter } from './mock/filters-mock.js';
import { CardCount } from './const.js';
import { generateMovieCard } from './mock/card-mock.js';
import { render, RenderPosition } from './utils/render.js';
import { isEscEvent } from './utils/common.js';
import SortingView from './view/sorting.js';
import UserStatusView from './view/user-status.js';
import FilmsCountView from './view/films-count.js';
import FilterView from './view/filters-view.js';
import FilmsContainerView from './view/films-container.js';
import CardView from './view/card-view.js';
import ShowMoreButtonView from './view/show-more-button.js';
import PopupView from './view/popup.js';
import NoFilmView from './view/no-film.js';

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const movieCards = new Array(CardCount.TOTAL).fill().map(generateMovieCard);
const filters = generateFilter(movieCards);

const renderPage = () => {
  const popupComponent = new PopupView(movieCards[0]);

  const closePopup = () => {
    bodyElement.removeChild(popupComponent.getElement());
    bodyElement.classList.remove('hide-overflow');
  };

  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  const onClosePopupElementClick = () => {
    closePopup();
    popupComponent.removeClickHandler();
  };

  const onFilmCardElementClick = () => {
    bodyElement.appendChild(popupComponent.getElement());
    bodyElement.classList.add('hide-overflow');
    popupComponent.setClickHandler(() => onClosePopupElementClick());
    document.addEventListener('keydown', onEscKeydown);
  };

  render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);
  render(headerElement, new UserStatusView(), RenderPosition.BEFOREEND);
  render(siteMainElement, new SortingView(), RenderPosition.BEFOREEND);
  render(siteMainElement, new FilmsContainerView(), RenderPosition.BEFOREEND);
  render(footerStatisticsElement, new FilmsCountView(), RenderPosition.BEFOREEND);

  const filmsContainerElement = siteMainElement.querySelector('.films');
  const filmsListElement = filmsContainerElement.querySelector('.films-list:nth-child(1)');
  const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

  const renderCard = (cardsContainerElement, card) => {
    const cardComponent = new CardView(card);

    render(cardsContainerElement, cardComponent, RenderPosition.BEFOREEND);

    cardComponent.setClickHandler(() => onFilmCardElementClick());
  };

  for (let index = 0; index < CardCount.MAIN_BLOCK; index++) {
    renderCard(filmsListContainerElement, movieCards[index]);
  }

  if (movieCards.length > CardCount.PER_STEP) {
    let renderedCardCount = CardCount.PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();

    render(filmsListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      movieCards
        .slice(renderedCardCount, renderedCardCount + CardCount.PER_STEP)
        .forEach((card) => renderCard(filmsListContainerElement, card));

      renderedCardCount += CardCount.PER_STEP;

      if (renderedCardCount >= movieCards.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  const filmsTopratedListElement = filmsContainerElement.querySelector('.films-list:nth-child(2)');
  const filmsTopratedListContainerElement = filmsTopratedListElement.querySelector('.films-list__container');

  for (let index = 0; index < CardCount.ADD_BLOCK; index++) {
    renderCard(filmsTopratedListContainerElement, movieCards[index]);
  }

  const filmsMostcommentedListElement = filmsContainerElement.querySelector('.films-list:nth-child(3)');
  const filmsMostcommentedListContainerElement = filmsMostcommentedListElement.querySelector('.films-list__container');

  for (let index = 0; index < CardCount.ADD_BLOCK; index++) {
    renderCard(filmsMostcommentedListContainerElement, movieCards[index]);
  }
};

if (CardCount.TOTAL === 0) {
  render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);
  render(siteMainElement, new NoFilmView(), RenderPosition.BEFOREEND);
  render(footerStatisticsElement, new FilmsCountView(), RenderPosition.BEFOREEND);
} else {
  renderPage();
}


