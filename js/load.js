'use strict';

window.load = (function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';

  var onSuccess = function (data) {
    window.photoData = data;
    window.currentData = window.photoData;
    window.photoRender(data);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var options = {
    url: URL,
    method: 'GET',
    onSuccess: onSuccess,
    onError: onError,
    data: ''
  };
  window.request(options);
})();
