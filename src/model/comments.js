import AbstractObserver from '../utils/abstract-observer.js';

export default class Comments extends AbstractObserver {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(userAction, update) {
    this._comments = [
      update,
      ...this._comments,
    ];

    this._notify(userAction, update);
  }

  deleteComment(userAction, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._notify(userAction);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
    );
    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
    );
    return adaptedComment;
  }
}
