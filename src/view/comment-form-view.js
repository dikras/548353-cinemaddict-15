import SmartView from './smart.js';

const createEmojiTemplate = (emojiType) => (
  `${emojiType ? `<img src="./images/emoji/${emojiType}.png" width="55" height="55" alt="emoji">
  </img>` : ''}`
);

const createCommentTemplate = (card) => {
  const { comments, emojiType } = card;
  const emojiTemplate = createEmojiTemplate(emojiType);

  return `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
      </ul>

      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label">
          ${emojiTemplate}
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>`;
};

export default class CommentForm extends SmartView {
  constructor(card) {
    super();
    this._data = CommentForm.parseCardToData(card);

    this._emojiIconClickHandler = this._emojiIconClickHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createCommentTemplate(this._card);
  }

  static parseCardToData(card) {
    return Object.assign(
      {},
      card,
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.emojiType;

    return data;
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.film-details__emoji-item').forEach((emojiItem) =>
      emojiItem.addEventListener('click', this._emojiIconClickHandler));
  }

  _emojiIconClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emojiType: evt.target.value,
    });
  }
}
