'use strict';

window.formSubmit = (function () {
  var form = document.querySelector('#upload-select-image');

  var onMessageEscPress = function (message, evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      messageClose(message);
    }
  };

  var onMessageOutPress = function (message, evt) {
    if (!message.querySelector('div').contains(evt.target)) {
      evt.preventDefault();
      messageClose(message);
    }
  };

  var messageClose = function (message) {
    message.classList.add('hidden');
    window.removeEventListener('keydown', onMessageEscPress);
    window.removeEventListener('click', onMessageOutPress);
  };

  var addCloseListeners = function (button, message) {
    button.addEventListener('click', function () {
      messageClose(message);
    });
    window.addEventListener('keydown', onMessageEscPress.bind(null, message));
    window.addEventListener('click', onMessageOutPress.bind(null, message));
  };

  var successMessageTemplate = document.querySelector('#success').content;
  var successMessageFragment = successMessageTemplate.cloneNode(true);

  var showSuccessMessage = function () {
    document.querySelector('main').appendChild(successMessageFragment);
    var successMessage = document.querySelector('.success');
    successMessage.classList.remove('hidden');
    var closeButton = document.querySelector('.success__button');
    addCloseListeners(closeButton, successMessage);
  };

  var errorMessageTemplate = document.querySelector('#error').content;
  var errorMessageFragment = errorMessageTemplate.cloneNode(true);

  var showErrorMessage = function () {
    document.querySelector('main').appendChild(errorMessageFragment);
    var errorMessage = document.querySelector('.error');
    errorMessage.classList.remove('hidden');
    var closeButton = document.querySelector('.error__button');
    addCloseListeners(closeButton, errorMessage);
  };

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), showSuccessMessage, showErrorMessage);
    evt.preventDefault();
  });
})();
