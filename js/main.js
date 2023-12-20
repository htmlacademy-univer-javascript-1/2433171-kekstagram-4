import {renderGallery} from './pictures-gallery.js';
import  {getPictures, sendPictures} from './api.js';
import {setOnFormSubmit, hideModal} from './form.js';
import {showAlert} from './util.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
//import {createPhotosDescriptions} from './data.js';

//renderGallery(createPhotosDescriptions());
setOnFormSubmit (async (data) => {
  try{
    await sendPictures(data);
    hideModal();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  }
});

try {
  const data = getPictures();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}

