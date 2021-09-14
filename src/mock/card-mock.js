import {nanoid} from 'nanoid';
import { MOVIE_TITLES, MOVIE_GENRES, DESCRIPTIONS, POSTER_URLS,
  MovieRating, MAX_LENGTH_DESCRIPTION, WRITERS, ACTORS, ReleaseYear } from '../const.js';
import { getRandomInteger, getRandomFloat, getRandomItem,
  getRandomDescription, getRandomArrayElements } from '../utils/common.js';
import { generateComments } from './comments-mock.js';

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
    genres: getRandomArrayElements(MOVIE_GENRES),
    totalRating: getRandomFloat(MovieRating.MIN, MovieRating.MAX),
    ageRating: 0,
    director: 'Tom Ford',
    writers: WRITERS.join(', '),
    actors: ACTORS.join(', '),
    release: {
      date: `${getRandomInteger(ReleaseYear.from, ReleaseYear.to)}-05-11T00:00:00.000Z`,
      releaseCountry: 'USA',
    },
    description: createDescription(),
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: `${getRandomInteger(2019, 2021)}-${getRandomInteger(10, 12)}-${getRandomInteger(10, 31)}T16:12:32.554Z}`,
    favorite: Boolean(getRandomInteger(0, 1)),
  },
});

export { generateMovieCard };
