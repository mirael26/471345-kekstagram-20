'use strict';

window.formOpen = (function () {
  var uploadButton = document.querySelector('#upload-file');
  var upload = document.querySelector('.img-upload__overlay');
  var buttonClose = upload.querySelector('#upload-cancel');
  var hashtagsInput = upload.querySelector('.text__hashtags');
  var commentsInput = upload.querySelector('.text__description');

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
    popupOpen();
  });

  buttonClose.addEventListener('click', function () {
    popupClose();
  });
})();
