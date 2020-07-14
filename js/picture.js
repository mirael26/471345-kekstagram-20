'use strict';

window.picture = (function () {
  var usersPhotoTemplate = document.querySelector('#picture').content;

  var renderUsersPhoto = function (photoProperty) {
    var photo = usersPhotoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = photoProperty.url;
    photo.querySelector('.picture__likes').textContent = photoProperty.likes;
    photo.querySelector('.picture__comments').textContent = photoProperty.comments.length;
    return photo;
  };

  var pictures = document.querySelector('.pictures');

  var onSuccess = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderUsersPhoto(data[i]));
    }
    pictures.appendChild(fragment);
    window.photoData = data;
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

  window.load(onSuccess, onError);

})();
