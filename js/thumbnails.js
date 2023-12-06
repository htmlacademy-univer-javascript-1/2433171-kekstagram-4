const pictureContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarpictureContainer = document.createDocumentFragment();

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  similarpictureContainer.appendChild(thumbnailElement);

  return thumbnailElement;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  pictureContainer.append(fragment);
};

export{renderThumbnails};
