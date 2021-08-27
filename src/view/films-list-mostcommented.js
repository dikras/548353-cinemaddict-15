import AbstractView from './abstract.js';

const createFilmsMostcommentedTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
  </section>`
);

export default class FilmsMostcommentedContainer extends AbstractView {
  getTemplate() {
    return createFilmsMostcommentedTemplate();
  }
}
