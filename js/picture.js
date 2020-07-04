'use strict';

window.picture = (function () {
  var usersPhotoTemplate = document.querySelector('#picture').content;

  var renderUsersPhoto = function (photoProperty) {
    var photo = usersPhotoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = photoProperty.url;
    photo.querySelector('.picture__likes').textContent = photoProperty.likes;
    photo.querySelector('.picture__comments').textContent = photoProperty.commentsCount;
    return photo;
  };

  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < window.data.usersPhotos.length; j++) {
    fragment.appendChild(renderUsersPhoto(window.data.usersPhotos[j]));
  }

  pictures.appendChild(fragment);
})();
