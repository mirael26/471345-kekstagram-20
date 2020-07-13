'use strict';

window.preview = (function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;

  var commentTemplate = document.querySelector('.social__comment').cloneNode(true);

  var renderComment = function (commentProperty) {
    var comment = commentTemplate.cloneNode(true);
    var picture = comment.querySelector('.social__picture');
    picture.src = commentProperty.avatar;
    picture.alt = commentProperty.name;
    picture.width = AVATAR_WIDTH;
    picture.height = AVATAR_HEIGHT;
    comment.querySelector('.social__text').textContent = commentProperty.message;
    return comment;
  };

  var renderComments = function (array) {
    var commentsFragment = document.createDocumentFragment();
    for (var j = 0; j < array.length; j++) {
      commentsFragment.appendChild(renderComment(array[j]));
    }
    return commentsFragment;
  };

  var bigPhoto = document.querySelector('.big-picture');

  var renderBigPhoto = function (photo) {
    bigPhoto.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.commentsCount;
    var commentsBlock = bigPhoto.querySelector('.social__comments');
    commentsBlock.innerHTML = '';
    commentsBlock.appendChild(renderComments(photo.comments));
    bigPhoto.querySelector('.social__caption').textContent = photo.description;
    return bigPhoto;
  };

  var onBigPhotoEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPhotoClose();
    }
  };

  var pictures = document.querySelector('.pictures');

  var bigPhotoOpen = function (target) {
    bigPhoto.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    var currentPhotos = pictures.querySelectorAll('.picture');
    var currentPhotoArray = [];
    currentPhotos.forEach(function (photo) {
      currentPhotoArray.push(photo);
    });
    var currentPhotoNumber = currentPhotoArray.indexOf(target);
    renderBigPhoto(window.photoData[currentPhotoNumber]);
    window.addEventListener('keydown', onBigPhotoEscPress);
  };

  var bigPhotoClose = function () {
    bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    window.removeEventListener('keydown', onBigPhotoEscPress);
  };

  bigPhoto.querySelector('.social__comment-count').classList.add('hidden');
  bigPhoto.querySelector('.comments-loader').classList.add('hidden');

  var bigPhotoButtonClose = bigPhoto.querySelector('.big-picture__cancel');

  pictures.addEventListener('click', function (evt) {
    if (
      evt.target
      && evt.target.matches('.picture__img')
    ) {
      evt.preventDefault();
      bigPhotoOpen(evt.target.parentElement);
    }
  });

  pictures.addEventListener('keydown', function (evt) {
    if (
      evt.key === 'Enter'
      && evt.target
      && evt.target.matches('.picture')
    ) {
      evt.preventDefault();
      bigPhotoOpen(evt.target);
    }
  });

  bigPhotoButtonClose.addEventListener('click', function () {
    bigPhotoClose();
  });
})();
