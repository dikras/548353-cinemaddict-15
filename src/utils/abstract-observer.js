export default class AbstractObserver {
  constructor() {
    this._observers = new Set();
  }

  addObserver(observer) {
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.delete(observer);
  }

  _notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }

  showElement() {
    if (this._element) {
      this._element.classList.remove('visually-hidden');
    }
  }

  hideElement() {
    if (this._element) {
      this._element.classList.add('visually-hidden');
    }
  }
}
