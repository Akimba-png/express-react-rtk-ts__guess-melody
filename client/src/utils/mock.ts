import { faker } from '@faker-js/faker';
import { ArtistQuestion, GenreQuestion } from '../models/data';

export const generateGenreQuestion = (): GenreQuestion => ({
  id: faker.string.uuid(),
  type: 'genre',
  genre: 'reaggae',
  answers: [
    {
      src: faker.internet.url(),
      genre: 'reggae',
    },
    {
      src: faker.image.avatar(),
      genre: 'electronic',
    },
    {
      src: faker.image.avatar(),
      genre: 'electronic',
    },
    {
      src: faker.image.avatar(),
      genre: 'alternative',
    }
  ],
});


export const generateArtistQuestion = (): ArtistQuestion => ({
  'id': faker.string.uuid(),
  'type': 'artist',
  'answers': [
    {
      'picture': faker.image.avatar(),
      'artist': 'Ofshane'
    },
    {
      'picture': faker.image.avatar(),
      'artist': faker.person.fullName(),
    },
    {
      'picture': faker.image.avatar(),
      'artist': faker.person.fullName(),
    }
  ],
  'song': {
    'artist': 'Ofshane',
    'src': 'https://13.design.pages.academy/static/music/Meet_&_Fun.mp3'
  },
});
