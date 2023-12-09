const body =  document.body;
const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const commentLoader =  bigPicture.querySelector('.comments-loader');
const commentCounter =  bigPicture.querySelector('.social__comment-count');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');


const renderPictureDetails = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img').src = url;
  bigPicture.querySelector('.big-picture__img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentList.append(fragment);
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCounter.classList.add('hidden');
  commentLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);

  renderPictureDetails(data);
  renderComments(data.comments);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

cancelButton.addEventListener('click', onCancelButtonClick);

export {showBigPicture};
