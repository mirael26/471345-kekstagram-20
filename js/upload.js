'use strict';

var EFFECT_LINE_WIDTH = 453;

var uploadButton = document.querySelector('#upload-file');
var upload = document.querySelector('.img-upload__overlay');
var buttonClose = upload.querySelector('#upload-cancel');
var hashtagsInput = upload.querySelector('.text__hashtags');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && !hashtagsInput.matches(':focus')) {
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
var effectLevel;
var effectsButtons = document.querySelectorAll('.effects__radio');
var previewImage = document.querySelector('.img-upload__preview').querySelector('img');

var getEffectsArray = function (value) {
  var effects = [
    {
      imageClass: 'effects__preview-chrome',
      filter: 'grayscale(' + 1 * (value / EFFECT_LINE_WIDTH) + ')'
    },
    {
      imageClass: 'effects__preview-sepia',
      filter: 'sepia(' + 1 * (value / EFFECT_LINE_WIDTH) + ')'
    },
    {
      imageClass: 'effects__preview-marvin',
      filter: 'invert(' + 100 * (value / EFFECT_LINE_WIDTH) + '%)'
    },
    {
      imageClass: 'effects__preview-phobos',
      filter: 'blur(' + 3 * (value / EFFECT_LINE_WIDTH) + 'px)'
    },
    {
      imageClass: 'effects__preview-heat',
      filter: 'brightness(' + (2 * (value / EFFECT_LINE_WIDTH) + 1) + ')'
    },
    {
      imageClass: 'effects__preview-none',
      filter: 'none'
    }
  ];
  return effects;
}

var currentEffect;
effectFieldset.classList.add('hidden');
for (var effect of effectsButtons) {
  effect.addEventListener('change', function (evt) {
    previewImage.removeAttribute('class');
    effectLevel = effectFieldset.querySelector('.effect-level__value').value;
    var effectClassName = 'effects__preview-' + evt.target.value;
    var currentEffect = getEffectsArray(effectLevel).find(function(effectItem) {
      return effectItem.imageClass === effectClassName;
    })
    previewImage.style.filter = currentEffect.filter;

    previewImage.classList.add(effectClassName);
    if (previewImage.classList.contains('effects__preview-none')) {
      effectFieldset.classList.add('hidden');
    } else {
      effectFieldset.classList.remove('hidden');
    }
  });
}

effectPin.addEventListener('mouseup', function () {
  effectLevel = Math.round((effectPin.getBoundingClientRect().left - effectLine.getBoundingClientRect().left));
  currentEffect = getEffectsArray(effectLevel).find(function(effectItem) {
    return effectItem.imageClass === previewImage.className;
  })
  previewImage.style.filter = currentEffect.filter;
});

var scaleSmaller = document.querySelector('.scale__control--smaller');
var scaleBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');
var scaleValueNumber = parseInt(scaleValue.value.replace(/%/g, ''));

scaleSmaller.addEventListener('click', function () {
  if (scaleValueNumber > 49) {
    scaleValueNumber -= 25;
    scaleValue.value = scaleValueNumber + '%';
    previewImage.style.transform = 'scale(' + scaleValueNumber/100 + ')';
  }
});

scaleBigger.addEventListener('click', function () {
  if (scaleValueNumber < 76) {
    scaleValueNumber += 25;
    scaleValue.value = scaleValueNumber + '%';
    previewImage.style.transform = 'scale(' + scaleValueNumber/100 + ')';
  }
});

var form = document.querySelector('#upload-select-image');
// var hashtagTest = /^#[a-zA-Zа-яА-Я1-9]+$/;

var hasDublicates = function (array) {
  var newArray = array.filter((item, index) => array.indexOf(item) !== index);
  if (newArray.length > 0) {
    return true;
  } else {
    return false;
  }
}

function CustomValidation() {
  this.invalidities = [];
}

CustomValidation.prototype = {
  checkValidity: function(input) {
    var hashtagsArray = input.value.toLowerCase().trim().split(" ");
    if (hasDublicates(hashtagsArray)) {
      this.addInvalidity('Хэш-теги не должны повторяться');
    }
    if (hashtagsArray.length > 5) {
      this.addInvalidity('Допускается не более пяти хэш-тегов');
    }
    for (var hashtag of hashtagsArray) {
      if (!hashtag.match(/^#[a-zA-Zа-яА-Я1-9]+$/g) && hashtag.length>0) {
        this.addInvalidity('Хэш-тег должен начинаться с # и не должен содержать спец.символов');
      }
      if (hashtag.length > 20) {
        this.addInvalidity('Длина хэш-тега не должна превышать 20 символов');
      }
    }
  },
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },
  getInvalidities: function() {
    return this.invalidities.join('. \n');
  }
};

hashtagsInput.addEventListener('change', function (evt) {
  var hashtagCustomValidation = new CustomValidation();
  hashtagCustomValidation.checkValidity(hashtagsInput);
  var customValidityMessage = hashtagCustomValidation.getInvalidities();
  console.log(customValidityMessage);
  hashtagsInput.setCustomValidity(customValidityMessage);
});
