'use strict';

window.upload = (function () {
  var URL = 'https://javascript.pages.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };
  var upload = document.querySelector('.img-upload__overlay');

  return function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      upload.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      window.formEditor.cleanFilter();
      window.formValidation.cleanInput();
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
