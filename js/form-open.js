'use strict';

window.formOpen = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadButton = document.querySelector('#upload-file');
  var upload = document.querySelector('.img-upload__overlay');
  var buttonClose = upload.querySelector('#upload-cancel');
  var hashtagsInput = upload.querySelector('.text__hashtags');
  var commentsInput = upload.querySelector('.text__description');
  var preview = document.querySelector('.img-upload__preview');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape'
      && !hashtagsInput.matches(':focus')
      && !commentsInput.matches(':focus')) {
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
    window.formEditor.cleanFilter();
    window.formValidation.cleanInput();

    window.removeEventListener('keydown', onPopupEscPress);
    uploadButton.value = '';
  };

  uploadButton.addEventListener('change', function (evt) {
    evt.preventDefault();
    var file = uploadButton.files[0];
    var fileName = file.name.toLowerCase();

    var match = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (match) {
      preview.innerHTML = '';
      var imageElement = document.createElement('img');
      imageElement.id = 'loadedPreview';
      preview.appendChild(imageElement);

      var reader = new FileReader();
      reader.addEventListener('load', function (e) {
        imageElement.src = e.target.result;
        var previewIcons = document.querySelectorAll('.effects__preview');
        previewIcons.forEach(function (icon) {
          icon.style.backgroundImage = 'url(' + imageElement.src + ')';
        });
      });

      reader.readAsDataURL(file);
      popupOpen();
      window.previewImage = imageElement;
    } else {
      evt.preventDefault();
    }
  });

  buttonClose.addEventListener('click', function () {
    popupClose();
  });

  return {
    popupClose: popupClose
  };
})();
