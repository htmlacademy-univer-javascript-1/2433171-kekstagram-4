const VISIBLE_NUMBER_OF_COMMETNS = 5;

const body =  document.body;
const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const commentLoader =  bigPicture.querySelector('.comments-loader');
const commentCounter =  bigPicture.querySelector('.social__comment-count');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');


let allComments= [];
let commentShown = 0;

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

const renderComments = () => {
  commentShown += VISIBLE_NUMBER_OF_COMMETNS;

  if (commentShown >= allComments.length){
    commentLoader.classList.add('hidden');
    commentShown = allComments.length;
  } else {
    commentLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentShown; i++){
    const comment = createComment(allComments[i]);
    fragment.append(comment);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCounter.textContent = `${commentShown} из ${allComments.length} комментариев`;
};

const setAllComments = (comments) => {
  allComments = comments;
  commentShown = 0;
  if (allComments.length > 0){
    renderComments();
  }
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);

  renderPictureDetails(data);
  setAllComments(data.comments);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  //commentShown = 0;
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


const onCommentLoaderClick = () => renderComments();

cancelButton.addEventListener('click', onCancelButtonClick);
commentLoader.addEventListener('click', onCommentLoaderClick);

export {showBigPicture};
