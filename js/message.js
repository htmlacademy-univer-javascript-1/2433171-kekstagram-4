const body = document.querySelector('.body');
const successMessage = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorMessage = document
  .querySelector('#error')
  .content.querySelector('.error');

const hideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
};

function onBodyClick (evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (message, closeButtonClass) => {
  body.append(message);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
  message
    .querySelector(closeButtonClass)
    .addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export {showErrorMessage, showSuccessMessage};
