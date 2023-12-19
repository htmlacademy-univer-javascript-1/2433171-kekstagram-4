//import { picture } from './effects.js';
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;

const picture = document.querySelector('.img-upload__preview img');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

const scalePicture = (value) => {
  picture.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};


const changeScale = (sign) => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = Math.max(Math.min(currentValue + sign *  SCALE_STEP, SCALE_MAX), SCALE_MIN);
  scalePicture(newValue);
};

const onSmallerButtonClick = () => {
  changeScale(-1);
};

const onBiggerButtonClick = () => {
  changeScale(1);
};

const resetScale = () => {
  scalePicture(DEFAULT_SCALE);
};

smallerButton.addEventListener('click',  onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);


export{resetScale};
