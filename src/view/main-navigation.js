import AbstractView from './abstract.js';
import { NavigationItem } from '../const.js';

const createNavigationTemplate = () => {
  const statsItem = NavigationItem.STATISTICS[0].toUpperCase() + NavigationItem.STATISTICS.slice(1);

  return `<nav class="main-navigation">
            <a href="#stats" class="main-navigation__additional">${statsItem}</a>
          </nav>`;
};

export default class Navigation extends AbstractView {
  constructor() {
    super();
    this._navigationClickHandler = this._navigationClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate();
  }

  _navigationClickHandler(evt) {
    evt.preventDefault();
    this._callback.navigationClick(evt.target.href.split('#')[1]);
  }

  setNavigationClickHandler(callback) {
    this._callback.navigationClick = callback;
    this.getElement().addEventListener('click', this._navigationClickHandler);
  }
}
