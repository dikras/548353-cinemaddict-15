import { MOVIE_TITLES, DESCRIPTIONS, POSTER_URLS, ReleaseYear,
  MOVIE_GENRES, MovieRating, MAX_LENGTH_DESCRIPTION, WRITERS, ACTORS } from '../const.js';
import { getRandomInteger, getRandomFloat, getRandomItem,
  getRandomDescription } from '../utils.js';
import { generateComment } from './comment-mock.js';

const createDescription = () => {
  const description = getRandomDescription(DESCRIPTIONS).join('');

  if (description.length > MAX_LENGTH_DESCRIPTION) {
    return `${description.substring(0, MAX_LENGTH_DESCRIPTION - 1)}...`;
  }
  return description;
};

const generateMovieCard = () => ({
  id: '0',
  comments: generateComment().comment,
  movieInfo: {
    title: getRandomItem(MOVIE_TITLES),
    alternativeTitle: 'Laziness Who Sold Themselves',
    poster: getRandomItem(POSTER_URLS),
    year: getRandomInteger(ReleaseYear.FROM, ReleaseYear.TO),
    runtime: 77,
    genre: getRandomItem(MOVIE_GENRES),
    totalRating: getRandomFloat(MovieRating.MIN, MovieRating.MAX),
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
