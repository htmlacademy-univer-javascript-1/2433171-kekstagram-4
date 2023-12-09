import {showBigPicture} from './big-picture.js';
import {renderThumbnails} from './thumbnails.js';

const pictureContainer = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail){
      return;
    }
    evt.preventDefault();
    const thumbnailId = parseInt(thumbnail.dataset.thumbnailId, 10);
    const picture = pictures.find((item) =>item.id === thumbnailId);
    showBigPicture(picture);
  });

  renderThumbnails(pictures, pictureContainer);
};

export {renderGallery};
