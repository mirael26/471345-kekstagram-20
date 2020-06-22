'use strict';

var EFFECT_LINE_WIDTH = 453;

var uploadButton = document.querySelector('#upload-file');
var upload = document.querySelector('.img-upload__overlay');
var buttonClose = upload.querySelector('#upload-cancel');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    popupClose();
  }
};

var popupOpen = function () {
  upload.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  window.addEventListener('keydown', onPopupEscPress);
};

var popupClose = function () {
  upload.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  window.removeEventListener('keydown', onPopupEscPress);
  uploadButton.value = '';
};

uploadButton.addEventListener('change', function (evt) {
  evt.preventDefault();
  popupOpen();
});

buttonClose.addEventListener('click', function () {
  popupClose();
});

var effectFieldset = document.querySelector('.effect-level');
var effectPin = effectFieldset.querySelector('.effect-level__pin');
var effectLine = effectFieldset.querySelector('.effect-level__line');
var effectLevel = effectFieldset.querySelector('.effect-level__value').value;
var effectsButtons = document.querySelectorAll('.effects__radio');
var previewImage = document.querySelector('.img-upload__preview').querySelector('img');

var getEffectLevel = function () {
  effectLevel = Math.round((effectPin.getBoundingClientRect().left - effectLine.getBoundingClientRect().left));
};

var effects = [
  {
    imageClass: 'effects__preview-chrome',
    filter: 'grayscale(' + 1 * (effectLevel / EFFECT_LINE_WIDTH) + ')'
  },
  {
    imageClass: 'effects__preview-sepia',
    filter: 'sepia(' + 1 * (effectLevel / EFFECT_LINE_WIDTH) + ')'
  },
  {
    imageClass: 'effects__preview-marvin',
    filter: 'invert(' + 100 * (effectLevel / EFFECT_LINE_WIDTH) + '%)'
  },
  {
    imageClass: 'effects__preview-phobos',
    filter: 'blur(' + 3 * (effectLevel / EFFECT_LINE_WIDTH) + 'px)'
  },
  {
    imageClass: 'effects__preview-heat',
    filter: 'brightness(' + 2 * (effectLevel / EFFECT_LINE_WIDTH) + 1 + ')'
  },
  {
    imageClass: 'effects__preview-none',
    filter: 'none'
  }
];

for (let effect of effectsButtons) {
  effect.addEventListener('change', function () {
    previewImage.style.filter = 'none';
    previewImage.removeAttribute('class');
    previewImage.classList.add('effects__preview-' + effect.value);
    if (previewImage.classList.contains('effects__preview-none')) {
      effectFieldset.classList.add('hidden');
    } else {
      effectFieldset.classList.remove('hidden');
    }
  });
}

effectPin.addEventListener('mouseup', function () {
  // getEffectLevel();
  for (var i = 0; i > effects.length; i++) {
    if (previewImage.classList.contains(effects[i].imageClass)) {
      previewImage.style.filter = effects[i].filter;
    }
  }
});
