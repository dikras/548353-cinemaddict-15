import { MOVIE_TITLES, DESCRIPTIONS, POSTER_URLS, releaseYears,
  MOVIE_GENRES, movieRating, MAX_LENGTH_DESCRIPTION, WRITERS, ACTORS } from '../const.js';
import { getRandomInteger, getRandomFloat, getRandomItem,
  getRandomDescription, formatRuntime } from '../utils.js';

const createDescription = () => {
  const description = getRandomDescription(DESCRIPTIONS).join('');

  if (description.length > MAX_LENGTH_DESCRIPTION) {
    return `${description.substring(0, MAX_LENGTH_DESCRIPTION - 1)}...`;
  }
  return description;
};

const generateMovieCard = () => ({
  id: '0',
  comments: [Comment.id, Comment.id],
  movieInfo: {
    title: getRandomItem(MOVIE_TITLES),
    alternativeTitle: 'Laziness Who Sold Themselves',
    poster: getRandomItem(POSTER_URLS),
    year: getRandomInteger(releaseYears.FROM, releaseYears.TO),
    runtime: formatRuntime(77),
    genre: getRandomItem(MOVIE_GENRES),
    totalRating: getRandomFloat(movieRating.MIN, movieRating.MAX),
    ageRating: 0,
    director: 'Tom Ford',
    writers: WRITERS.join(', '),
    actors: ACTORS.join(', '),
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'USA',
    },
    description: createDescription(),
    commentsCount: 2,
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  },
});

export { generateMovieCard };
