import AbstractView from './abstract.js';

const createFilmsTopratedTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
  </section`
);

export default class FilmsTopratedContainer extends AbstractView {
  getTemplate() {
    return createFilmsTopratedTemplate();
  }
}
