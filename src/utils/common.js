import dayjs from 'dayjs';
import { ESC_ALL_BROWSERS, ESC_IE } from '../const.js';

export const getRandomInteger = (firstNumber = 0, secondNumber = 1) => {
  const lower = Math.ceil(Math.min(firstNumber, secondNumber));
  const upper = Math.floor(Math.max(firstNumber, secondNumber));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (firstNumber, secondNumber, digits = 1) => {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

export const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

export const getRandomDescription = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);
  const randomDescription = items.slice(0, randomIndex + 1);
  return randomDescription;
};

export const formatReleaseDate = (releaseDate) => dayjs(releaseDate).format('DD MMMM YYYY'); // delete?

export const generateReleaseDate = () => dayjs().add(getRandomInteger(-100, 0), 'year').format('DD MMMM YYYY');

export const formatRuntime = (runtime) => `${Math.floor(runtime / 60)}h ${runtime % 60}m`;

export const isEscEvent = (evt) => evt.key === ESC_ALL_BROWSERS || evt.key === ESC_IE;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
