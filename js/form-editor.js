'use strict';

window.formEditor = (function () {
  var EFFECT_DEFAULT_POS = '20%';
  var Scale = {
    MAX_VALUE: 100,
    MIN_VALUE: 25,
    STEP: 25
  };
  var effectFieldset = document.querySelector('.effect-level');
  var effectPin = effectFieldset.querySelector('.effect-level__pin');
  var effectLine = effectFieldset.querySelector('.effect-level__line');
  var effectLineDepth = effectFieldset.querySelector('.effect-level__depth');
  var effectsButtons = document.querySelectorAll('.effects__radio');

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
      window.previewImage.removeAttribute('class');
      var effectClassName = 'effects__preview-' + evt.target.value;
      window.previewImage.classList.add(effectClassName);
      if (window.previewImage.classList.contains('effects__preview-none')) {
        effectFieldset.classList.add('hidden');
      } else {
        effectFieldset.classList.remove('hidden');
      }
      var effectValue = effectFieldset.querySelector('.effect-level__value').value;
      var effectLineWidth = effectFieldset.querySelector('.effect-level__line').clientWidth;
      var currentEffect = getEffectsArray(effectValue, effectLineWidth).find(function (effectItem) {
        return effectItem.imageClass === effectClassName;
      });
      window.previewImage.style.filter = currentEffect.filter;

      effectPin.style.left = EFFECT_DEFAULT_POS;
      effectLineDepth.style.width = EFFECT_DEFAULT_POS;
    });
  });

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var effectLineWidth = effectLine.getBoundingClientRect().width;
      var shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      var newCoords = (effectPin.offsetLeft - shift);
      if (newCoords < (effectPin.clientWidth / 2)) {
        newCoords = (effectPin.clientWidth / 2);
      }
      if (newCoords > (effectLineWidth - (effectPin.clientWidth / 2))) {
        newCoords = (effectLineWidth - (effectPin.clientWidth / 2));
      }
      effectPin.style.left = newCoords + 'px';

      var effectPinPosition = effectPin.getBoundingClientRect().left;
      var effectLinePosition = effectLine.getBoundingClientRect().left;
      var effectPinWidth = effectPin.clientWidth;
      var effectValue = effectFieldset.querySelector('.effect-level__value');
      var effectLevel = Math.round((effectPinPosition - effectLinePosition + (effectPinWidth / 2)));
      effectValue.setAttribute('value', effectLevel);
      var currentEffect = getEffectsArray(effectLevel, effectLineWidth).find(function (effectItem) {
        return effectItem.imageClass === window.previewImage.className;
      });
      window.previewImage.style.filter = currentEffect.filter;
      effectLineDepth.style.width = (effectLevel / effectLineWidth * 100) + '%';
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
    if (scaleValueNumber >= (Scale.MIN_VALUE + Scale.STEP)) {
      scaleValueNumber -= Scale.STEP;
      scaleValue.value = scaleValueNumber + '%';
      window.previewImage.style.transform = 'scale(' + scaleValueNumber / 100 + ')';
    }
  });

  scaleBigger.addEventListener('click', function () {
    if (scaleValueNumber <= (Scale.MAX_VALUE - Scale.STEP)) {
      scaleValueNumber += Scale.STEP;
      scaleValue.value = scaleValueNumber + '%';
      window.previewImage.style.transform = 'scale(' + scaleValueNumber / 100 + ')';
    }
  });

  return {
    cleanFilter: function () {
      var originFilter = document.querySelector('#effect-none');
      originFilter.classList.add('checked');
      window.previewImage.style.filter = 'none';
      effectFieldset.classList.add('hidden');
      window.previewImage.style.transform = 'scale(1)';
    }
  };
})();
