import {nanoid} from 'nanoid';
import { MOVIE_TITLES, DESCRIPTIONS, POSTER_URLS,
  MOVIE_GENRES, MovieRating, MAX_LENGTH_DESCRIPTION, WRITERS, ACTORS } from '../const.js';
import { generateReleaseDate, getRandomFloat, getRandomItem,
  getRandomDescription } from '../utils/common.js';
import { generateComments } from './comment-mock.js';

const createDescription = () => {
  const description = getRandomDescription(DESCRIPTIONS).join('');

  if (description.length > MAX_LENGTH_DESCRIPTION) {
    return `${description.substring(0, MAX_LENGTH_DESCRIPTION - 1)}...`;
  }
  return description;
};

const generateMovieCard = () => ({
  id: nanoid(),
  comments: generateComments(),
  movieInfo: {
    title: getRandomItem(MOVIE_TITLES),
    alternativeTitle: 'Laziness Who Sold Themselves',
    poster: getRandomItem(POSTER_URLS),
    runtime: 77,
    genre: getRandomItem(MOVIE_GENRES),
    totalRating: getRandomFloat(MovieRating.MIN, MovieRating.MAX),
    ageRating: 0,
    director: 'Tom Ford',
    writers: WRITERS.join(', '),
    actors: ACTORS.join(', '),
    release: {
      date: generateReleaseDate(),
      releaseCountry: 'USA',
    },
    description: createDescription(),
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: false,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false,
  },
});

export { generateMovieCard };
