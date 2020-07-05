'use strict';

window.form = (function () {
  var EFFECT_DEFAULT_POS = '20%';
  var effectFieldset = document.querySelector('.effect-level');
  var effectPin = effectFieldset.querySelector('.effect-level__pin');
  var effectLine = effectFieldset.querySelector('.effect-level__line');
  var effectLineDepth = effectFieldset.querySelector('.effect-level__depth');
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
      var effectValue = effectFieldset.querySelector('.effect-level__value').value;
      var effectLineWidth = effectFieldset.querySelector('.effect-level__line').clientWidth;
      var currentEffect = getEffectsArray(effectValue, effectLineWidth).find(function (effectItem) {
        return effectItem.imageClass === effectClassName;
      });
      previewImage.style.filter = currentEffect.filter;

      effectPin.style.left = EFFECT_DEFAULT_POS;
      effectLineDepth.style.width = EFFECT_DEFAULT_POS;
    });
  });

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var effectLineX = effectLine.getBoundingClientRect().x;
      var effectLineWidth = effectLine.getBoundingClientRect().width;
      if (moveEvt.clientX < effectLineX) {
        moveEvt.clientX = effectLineX;
      }
      if (moveEvt.clientX > (effectLineX + effectLineWidth)) {
        moveEvt.clientX = effectLineX + effectLineWidth;
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';

      var effectPinPosition = effectPin.getBoundingClientRect().left;
      var effectLinePosition = effectLine.getBoundingClientRect().left;
      var effectPinWidth = effectPin.clientWidth;
      var effectValue = effectFieldset.querySelector('.effect-level__value').value;
      var effectLevel = Math.round((effectPinPosition - effectLinePosition + (effectPinWidth / 2)));
      effectValue = effectLevel;
      var currentEffect = getEffectsArray(effectValue, effectLineWidth).find(function (effectItem) {
        return effectItem.imageClass === previewImage.className;
      });
      previewImage.style.filter = currentEffect.filter;
      effectLineDepth.style.width = (effectValue / effectLineWidth * 100) + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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

})();
