const MOVIE_TITLES = [
  'The Dance Of Life',
  'SagebrushTrail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Made For Each Other',
  'The Great Flamarion',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

const POSTER_URLS = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const MOVIE_GENRES = ['Musical', 'Western', 'Drama', 'Comedy', 'Cartoon', 'Mystery'];

const WRITERS = ['Takeshi Kitano', 'Matt Damon'];

const ACTORS = ['Bruce Willis', 'Willem Defoe', 'Robert Pattison'];

const movieRating = {
  MIN: 2,
  MAX: 10,
};

const releaseYears = {
  FROM: 1929,
  TO: 1964,
};

const CARD_MAINBLOCK_COUNT = 5;
const CARD_ADDBLOCK_COUNT = 2;
const MOVIE_CARDS_COUNT = 15;
const CARD_COUNT_PER_STEP = 5;

const MAX_LENGTH_DESCRIPTION = 140;

const COMMENT_EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

export { MOVIE_TITLES, DESCRIPTIONS, movieRating, POSTER_URLS, releaseYears,
  MOVIE_GENRES, CARD_MAINBLOCK_COUNT, CARD_ADDBLOCK_COUNT, WRITERS, ACTORS,
  MOVIE_CARDS_COUNT, CARD_COUNT_PER_STEP, MAX_LENGTH_DESCRIPTION, COMMENT_EMOTIONS };
