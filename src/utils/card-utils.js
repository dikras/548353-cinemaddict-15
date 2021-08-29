import dayjs from 'dayjs';

export const sortFilmByRating = ((filmA, filmB) => filmB.movieInfo.totalRating - filmA.movieInfo.totalRating);

export const sortFilmByDate = ((filmA, filmB) => dayjs(filmB.movieInfo.release.date).diff(dayjs(filmA.movieInfo.release.date)));
