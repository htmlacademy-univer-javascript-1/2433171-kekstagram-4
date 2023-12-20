import {resetScale} from './scale-picture.js';
import {
  init as initEffect,
  reset as resetEffect
} from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const REGEX_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Число хэштегов не должно превышать ${MAX_HASHTAG_COUNT}`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю..',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const cancelButton = form.querySelector('.img-upload__cancel');
const submiteButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const showModal = () => {
  //initEffect();
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

const toogleSubmitButton = (isDisabled) => {
  submiteButton.disabled = isDisabled;
  submiteButton.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.IDLE;

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

const isErrorMessageShown = () => {
  Boolean(document.querySelector('.error'));
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape'
      && !isTextFieldFocused()
      && !isErrorMessageShown()) {
    evt.preventDefault();
    hideModal();
  }
}

const onFileInputChange = () => {
  showModal();
};

const onCancalButtonClick = () => {
  hideModal();
};

const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toogleSubmitButton(true);
      await callback(new FormData(form));
      toogleSubmitButton();
    }
  });
};

// const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// };

pristine.addValidator(
  hashtagField,
  validateTagsCount,
  ErrorText.INVALID_COUNT,
);

pristine.addValidator(
  hashtagField,
  validateTagUniqueness,
  ErrorText.NOT_UNIQUE,
);

pristine.addValidator(
  hashtagField,
  testTags,
  ErrorText.INVALID_PATTERN,
);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancalButtonClick);
initEffect();

export{setOnFormSubmit, hideModal};

