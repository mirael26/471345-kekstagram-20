'use strict';

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
var effectsButtons = document.querySelectorAll('.effects__radio');
var previewImage = document.querySelector('.img-upload__preview').querySelector('img');

var getEffectsArray = function (value, lineWidth) {
  var effects = [
    {
      imageClass: 'effects__preview-chrome',
      filter: 'grayscale(' + 1 * (value / lineWidth) + ')'
    },
    {
      imageClass: 'effects__preview-sepia',
      filter: 'sepia(' + 1 * (value / lineWidth) + ')'
    },
    {
      imageClass: 'effects__preview-marvin',
      filter: 'invert(' + 100 * (value / lineWidth) + '%)'
    },
    {
      imageClass: 'effects__preview-phobos',
      filter: 'blur(' + 3 * (value / lineWidth) + 'px)'
    },
    {
      imageClass: 'effects__preview-heat',
      filter: 'brightness(' + (2 * (value / lineWidth) + 1) + ')'
    },
    {
      imageClass: 'effects__preview-none',
      filter: 'none'
    }
  ];
  return effects;
};

effectFieldset.classList.add('hidden');
effectsButtons.forEach(function (effect) {
  effect.addEventListener('change', function (evt) {
    previewImage.removeAttribute('class');
    var effectClassName = 'effects__preview-' + evt.target.value;
    previewImage.classList.add(effectClassName);
    if (previewImage.classList.contains('effects__preview-none')) {
      effectFieldset.classList.add('hidden');
    } else {
      effectFieldset.classList.remove('hidden');
    }
    var effectLevel = effectFieldset.querySelector('.effect-level__value').value;
    var effectLineWidth = effectFieldset.querySelector('.effect-level__line').clientWidth;
    var currentEffect = getEffectsArray(effectLevel, effectLineWidth).find(function (effectItem) {
      return effectItem.imageClass === effectClassName;
    });
    previewImage.style.filter = currentEffect.filter;
  });
});

effectPin.addEventListener('mouseup', function () {
  var effectPinPosition = effectPin.getBoundingClientRect().left;
  var effectLinePosition = effectLine.getBoundingClientRect().left;
  var effectLevel = Math.round((effectPinPosition - effectLinePosition));
  var currentEffect = getEffectsArray(effectLevel).find(function (effectItem) {
    return effectItem.imageClass === previewImage.className;
  });
  previewImage.style.filter = currentEffect.filter;
});

var scaleSmaller = document.querySelector('.scale__control--smaller');
var scaleBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');
var scaleValueNumber = parseInt(scaleValue.value.replace(/%/g, ''), 10);

scaleSmaller.addEventListener('click', function () {
  if (scaleValueNumber > 49) {
    scaleValueNumber -= 25;
    scaleValue.value = scaleValueNumber + '%';
    previewImage.style.transform = 'scale(' + scaleValueNumber / 100 + ')';
  }
});

scaleBigger.addEventListener('click', function () {
  if (scaleValueNumber < 76) {
    scaleValueNumber += 25;
    scaleValue.value = scaleValueNumber + '%';
    previewImage.style.transform = 'scale(' + scaleValueNumber / 100 + ')';
  }
});

var hasDublicates = function (array) {
  var newArray = array.filter(function (item, index) {
    return array.indexOf(item) !== index;
  });
  return newArray.length > 0;
};

function CustomValidation() {
  this.invalidities = [];
}

CustomValidation.prototype = {
  checkValidity: function (input) {
    var hashtagsArray = input.value.toLowerCase().trim().split(' ');
    if (hasDublicates(hashtagsArray)) {
      this.addInvalidity('Хэш-теги не должны повторяться');
    }
    if (hashtagsArray.length > 5) {
      this.addInvalidity('Допускается не более пяти хэш-тегов');
    }
    var that = this;
    hashtagsArray.forEach(function (hashtag) {
      if (!hashtag.match(/^#[a-zA-Zа-яА-Я1-9]+$/g) && hashtag.length > 0) {
        that.addInvalidity('Хэш-тег должен начинаться с # и не должен содержать спец.символов');
      }
      if (hashtag.length > 20) {
        that.addInvalidity('Длина хэш-тега не должна превышать 20 символов');
      }
    });
  },
  addInvalidity: function (message) {
    this.invalidities.push(message);
  },
  getInvalidities: function () {
    return this.invalidities.join('. \n');
  }
};

hashtagsInput.addEventListener('change', function () {
  var hashtagCustomValidation = new CustomValidation();
  hashtagCustomValidation.checkValidity(hashtagsInput);
  var customValidityMessage = hashtagCustomValidation.getInvalidities();
  hashtagsInput.setCustomValidity(customValidityMessage);
});
