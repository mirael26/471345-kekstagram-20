'use strict';

window.photoRender = (function () {
  var usersPhotoTemplate = document.querySelector('#picture').content;

  var renderUsersPhoto = function (photoProperty) {
    var photo = usersPhotoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = photoProperty.url;
    photo.querySelector('.picture__likes').textContent = photoProperty.likes;
    photo.querySelector('.picture__comments').textContent = photoProperty.comments.length;
    return photo;
  };

  var pictures = document.querySelector('.pictures');

  return function (data) {
    var oldPhotos = pictures.querySelectorAll('.picture');
    oldPhotos.forEach(function (photo) {
      photo.remove();
    });
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderUsersPhoto(data[i]));
    }
    pictures.appendChild(fragment);
  };
})();
