import { CardCount } from '../const.js';
import { createElement } from '../utils.js';

const createFilmsCountTemplate = () => (`<p>${CardCount.TOTAL} movies inside</p>`);

export default class FilmsCount {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsCountTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
