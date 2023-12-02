import {getRandomInteger, getRandomArrayElement, createRandomId} from './util.js';

/* eslint-disable no-unused-vars */
const MIN_COMMENT = 0;
const MAX_COMMENT =30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const NUMBER_PHOTO_DESCRIPTIONS = 25;

const PHOTO_DESCRIPTION = [
  'И такое бывает!',
  'Посмотрите, что сегодня было',
  'Что за милота',
  'Эхх',
  'Мдаа уж...',
  'И не такое бывает!',
];

const AUTHORS_COMMENTS_NAMES = [
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

const getRandomPhotoDescriptionId = createRandomId(1, NUMBER_PHOTO_DESCRIPTIONS);
const getRandomCommentsId = createRandomId(1, 1000);

const createComment = () =>({
  id: getRandomCommentsId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR,MAX_AVATAR)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(AUTHORS_COMMENTS_NAMES),
});

const createPhotoDescription = () => {
  const currentId = getRandomPhotoDescriptionId();
  return {
    id: currentId,
    url: `photos/${currentId}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTION),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomInteger(MIN_COMMENT,MAX_COMMENT)}, createComment),
  };
};

const createPhotosDescriptions = () =>
  Array.from({length: NUMBER_PHOTO_DESCRIPTIONS}, createPhotoDescription);

export{createPhotosDescriptions};
