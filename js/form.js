import {resetScale} from './scale-picture.js';
import {initEffect, resetEffect} from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const REGEX_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const cancelButton = form.querySelector('.img-upload__cancel');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const showModal = () => {
  //resetScale();
  //resetEffect();
  initEffect();
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetEffect();
  resetScale();
  overlay.classList.add('hidden');
  pristine.reset();
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const normalizeTags =  (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const testTags = (value) => normalizeTags(value).every((tag) => REGEX_SYMBOLS.test(tag));

const validateTagsCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const validateTagUniqueness = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const onFileInputChange = () => {
  showModal();
};

const onCancalButtonClick = () => {
  hideModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};


function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancalButtonClick);
form.addEventListener('submit', onFormSubmit);

pristine.addValidator(
  hashtagField,
  validateTagsCount,
  `Число хэштегов не должно превышать ${MAX_HASHTAG_COUNT}`
);

pristine.addValidator(
  hashtagField,
  validateTagUniqueness,
  'Хэштеги должны быть уникальными'
);

pristine.addValidator(
  hashtagField,
  testTags,
  'Неправильный хэштег'
);
