import { COMMENT_EMOTIONS } from '../const.js';
import { getRandomItem } from '../utils/common.js';

export const generateComment = () => ({
  id: '42',
  author: 'Ilya O\'Reilly',
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  date: '2019-05-11T16:12:32.554Z',
  emotion: getRandomItem(COMMENT_EMOTIONS),
});
