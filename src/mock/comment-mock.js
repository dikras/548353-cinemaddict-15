import { nanoid } from 'nanoid';

export const generateComments = () => {
  const comments = [
    {
      id: nanoid(),
      author: 'Tim Macoveev',
      comment: 'Interesting setting and a good cast',
      date: '2019-12-31T16:12:32.554Z',
      emotion: 'smile',
    },
    {
      id: nanoid(),
      author: 'John Doe',
      comment: 'Booooooooooring',
      date: '2021-09-01T11:09:17.554Z',
      emotion: 'sleeping',
    },
    {
      id: nanoid(),
      author: 'John Doe',
      comment: 'Very very old. Meh',
      date: '2021-09-01T17:24:08.554Z',
      emotion: 'puke',
    },
    {
      id: nanoid(),
      author: 'John Doe',
      comment: 'Almost two hours? Seriously?',
      date: '2019-05-11T17:17:17.554Z',
      emotion: 'angry',
    },
  ];
  return comments;
};
