'use strict';

window.formValidation = (function () {
  var hashtagsInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

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
      // hashtagsInput.style.borderColor = 'red';
      return this.invalidities.join('. \n');
    }
  };

  hashtagsInput.addEventListener('change', function () {
    var hashtagCustomValidation = new CustomValidation();
    hashtagCustomValidation.checkValidity(hashtagsInput);
    var customValidityMessage = hashtagCustomValidation.getInvalidities();
    hashtagsInput.setCustomValidity(customValidityMessage);
  });

  return {
    cleanInput: function () {
      hashtagsInput.textContent = '';
      commentInput.textContent = '';
    }
  };
})();
