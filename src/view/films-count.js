import { CardCount } from '../const.js';
import AbstractView from './abstract.js';

const createFilmsCountTemplate = () => (`<p>${CardCount.TOTAL} movies inside</p>`);

export default class FilmsCount extends AbstractView {
  getTemplate() {
    return createFilmsCountTemplate();
  }
}
