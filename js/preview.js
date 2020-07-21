'use strict';

window.preview = (function () {
  var COMMENTS_COUNT = 5;
  var COMMENTS_STEP = 5;
  var bigPhoto = document.querySelector('.big-picture');
  var commentsLoader = document.querySelector('.comments-loader');
  var commentsBlock = bigPhoto.querySelector('.social__comments');
  var onCommentsLoaderClick;

  var renderBigPhoto = function (photo) {
    bigPhoto.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.commentsCount;
    commentsBlock.innerHTML = '';
    commentsBlock.appendChild(window.renderComments(photo.comments.slice(0, COMMENTS_COUNT)));

    onCommentsLoaderClick = showMoreComments.bind(null, photo);
    commentsLoader.addEventListener('click', onCommentsLoaderClick);

    bigPhoto.querySelector('.social__caption').textContent = photo.description;
    return bigPhoto;
  };


  var showMoreComments = function (photo) {
    var currentCount = document.querySelectorAll('.social__comment').length;
    commentsBlock.appendChild(window.renderComments(photo.comments.slice(currentCount, currentCount + COMMENTS_STEP)));
    currentCount = document.querySelectorAll('.social__comment').length;
    if (photo.comments.length <= currentCount) {
      commentsLoader.classList.add('hidden');
    }
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

    if (window.photoData[currentPhotoNumber].comments.length <= COMMENTS_COUNT) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');

    }

    window.addEventListener('keydown', onBigPhotoEscPress);
  };

  var bigPhotoClose = function () {
    bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    window.removeEventListener('keydown', onBigPhotoEscPress);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  };

  bigPhoto.querySelector('.social__comment-count').classList.add('hidden');

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
