import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<a href="#${type}" class="main-navigation__item ${currentFilterType === type ? 'main-navigation__item--active' : ''}">${name}
    ${name === 'All movies' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
            <div class="main-navigation__items">
              ${filterItemsTemplate}
            </div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._statisticsElement = this.getElement().querySelector('.main-navigation__additional');

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._navigationClickHandler = this._navigationClickHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.href.split('#')[1]);
  }

  _navigationClickHandler(evt) {
    evt.preventDefault();
    const filters = this.getElement().querySelectorAll('.main-navigation__item');
    filters.forEach((filter) => filter.classList.remove('main-navigation__item--active'));
    this._statisticsElement.classList.add('main-navigation__item--active');
    this._callback.navigationClick(evt.target.href.split('#')[1]);

  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((navigationItem) => navigationItem.addEventListener('click', this._filterTypeChangeHandler));
  }

  setNavigationClickHandler(callback) {
    this._callback.navigationClick = callback;
    this.getElement().addEventListener('click', this._navigationClickHandler);
  }
}
