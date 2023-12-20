const picture = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const levelValue = document.querySelector('.effect-level__value');
const effectsButton = document.querySelector('.effects__list');

const destroySlider = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
};

const createSlider = (config, updateCallback) => {
  noUiSlider.create(slider, config);
  slider.noUiSlider.on('update', () => {
    updateCallback(slider.noUiSlider.get());
  });
};

const reset = () => {
  destroySlider();
  picture.style.filter = '';
  levelValue.value = '';
};

const getSpecificSliderConfig = (effect) => {
  switch (effect) {
    case 'effect-chrome':
    case 'effect-sepia':
      return { range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      };
    case 'effect-marvin':
      return {
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
        connect: 'lower',
      };
    case 'effect-phobos':
    case 'effect-heat':
      return {
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
        connect: 'lower',
      };
    default:
      return { range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      };
  }
};

const applyEffect = (effectId, value) => {
  switch (effectId) {
    case 'effect-chrome':
      picture.style.filter = `grayscale(${value})`;
      break;
    case 'effect-sepia':
      picture.style.filter = `sepia(${value})`;
      break;
    case 'effect-marvin':
      picture.style.filter = `invert(${value}%)`;
      break;
    case 'effect-phobos':
      picture.style.filter = `blur(${value}px)`;
      break;
    case 'effect-heat':
      picture.style.filter = `brightness(${value})`;
      break;
    default:
      reset();
  }
  levelValue.value = value;
};

const init = () => {
  effectsButton.addEventListener('click', (evt) => {
    const effectButton = evt.target.closest('.effects__radio');

    if (effectButton) {
      destroySlider();

      const effectId = effectButton.id;
      if (effectId === 'effect-none') {
        reset();
      } else {
        const specificSliderConfig = getSpecificSliderConfig(effectId);
        createSlider(specificSliderConfig, (value) => {
          applyEffect(effectId, value);
        });
      }
    }
  });
};

export {init, reset};
