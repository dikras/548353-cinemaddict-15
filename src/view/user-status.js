import Abstract from './abstract.js';

const createUserStatusTemplate = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class UserStatus extends Abstract {
  getTemplate() {
    return createUserStatusTemplate();
  }
}
