import AbstractView from './abstract';
import dayjs from 'dayjs';

const createCommentsListTemplate = (card, isComments) => {
  const { comments } = card;

  return `${isComments ? `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comments[0].emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comments[0].comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comments[0].author}</span>
          <span class="film-details__comment-day">${dayjs(comments[0].date).format('YYYY/MM/DD HH:MM')}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>` : ''}
    `;
};

export default class CommentsList extends AbstractView {
  constructor(card) {
    super();
    this._data = CommentsList.parseCardToData(card);
  }

  getTemplate() {
    return createCommentsListTemplate(this._data, this._data.isComments);
  }

  static parseCardToData(card) {
    return Object.assign(
      {},
      card,
      {
        isComments: card.comments.length !== 0,
      },
    );
  }
}
