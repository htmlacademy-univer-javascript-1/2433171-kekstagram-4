import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

const MIN_COMMENT = 0;
const MAX_COMMENT =30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const NUMBER_PHOTO_DESCRIPTIONS = 25;
const MIN_SENTENCES_IN_MESSAGE = 1;
const MAX_SENTENCES_IN_MESSAGE = 2;

const PHOTO_DESCRIPTION = [
  'И такое бывает!',
  'Посмотрите, что сегодня было',
  'Что за милота',
  'Эхх',
  'Мдаа уж...',
  'И не такое бывает!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from(
  {length: getRandomInteger(MIN_SENTENCES_IN_MESSAGE, MAX_SENTENCES_IN_MESSAGE)}, () =>
    getRandomArrayElement(COMMENTS),).join(' ');

const createComment = () =>({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR,MAX_AVATAR)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from( {length: getRandomInteger(MIN_COMMENT,MAX_COMMENT) },
    createComment),
});

const createPhotosDescriptions = () =>
  Array.from({length: NUMBER_PHOTO_DESCRIPTIONS})
    .map((_, index) => createPhotoDescription(index + 1));

export{createPhotosDescriptions};
