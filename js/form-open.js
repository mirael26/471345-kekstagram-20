'use strict';

window.formOpen = (function () {
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
    preview.innerHTML = '';
    var selectedFile = document.createElement('img');
    selectedFile.id = 'loadedPreview';
    selectedFile.file = uploadButton.files[0];
    preview.appendChild(selectedFile);

    var reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
        var previewIcons = document.querySelectorAll('.effects__preview');
        previewIcons.forEach(function (icon) {
          icon.style.backgroundImage = 'url(' + aImg.src + ')';
        });
      };
    })(selectedFile);
    reader.readAsDataURL(selectedFile.file);
    popupOpen();
    window.previewImage = selectedFile;
  });

  buttonClose.addEventListener('click', function () {
    popupClose();
  });
})();
