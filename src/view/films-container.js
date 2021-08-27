import AbstractView from './abstract.js';

export const createFilmsContainerTemplate = () => (
  `<section class="films">
  </section>`
);

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
