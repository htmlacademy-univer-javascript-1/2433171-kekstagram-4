const pictureContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarpictureContainer = document.createDocumentFragment();

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  similarpictureContainer.appendChild(thumbnail);

  return thumbnail;
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
