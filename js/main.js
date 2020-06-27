'use strict';

var COMMENTS_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTO_DESCRIPTIONS = ['Чудесный день', 'Отличная прогулка', 'Хорошо погуляли', 'Всем привет!', 'Оцените фото', 'Я старался!'];
var COMMENTS_NAMES = ['Андрей', 'Коля', 'Настенька', 'Анна', 'Петр', 'Леха', 'Виктория', 'Леся', 'Боря', 'Азат'];
var USERS_PHOTOS_COUNT = 25;
var AVATARS_COUNT = 6;
var AVATAR_WIDTH = 35;
var AVATAR_HEIGHT = 35;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_COMMENTS_COUNT = 1;
var MAX_COMMENTS_COUNT = 8;

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomOfArray = function (array) {
  var randomSetup = array[getRandomInRange(0, array.length - 1)];
  return randomSetup;
};

var createComment = function () {
  var object = {};
  object.avatar = 'img/avatar-' + getRandomInRange(1, AVATARS_COUNT) + '.svg';
  object.message = getRandomOfArray(COMMENTS_MESSAGES);
  object.name = getRandomOfArray(COMMENTS_NAMES);
  return object;
};

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

var renderComments = function (commentsCount) {
  var comments = [];
  for (var i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }
  var commentsFragment = document.createDocumentFragment();
  for (var j = 0; j < comments.length; j++) {
    commentsFragment.appendChild(renderComment(comments[j]));
  }
  return commentsFragment;
};

var createUserPhoto = function (photoNumber) {
  var object = {};
  object.url = 'photos/' + photoNumber + '.jpg';
  object.description = getRandomOfArray(PHOTO_DESCRIPTIONS);
  object.likes = getRandomInRange(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
  object.commentsCount = getRandomInRange(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
  return object;
};

var usersPhotos = [];
for (var i = 0; i < USERS_PHOTOS_COUNT; i++) {
  usersPhotos.push(createUserPhoto(i + 1));
}

var usersPhotoTemplate = document.querySelector('#picture').content;

var renderUsersPhoto = function (photoProperty) {
  var photo = usersPhotoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = photoProperty.url;
  photo.querySelector('.picture__likes').textContent = photoProperty.likes;
  photo.querySelector('.picture__comments').textContent = photoProperty.commentsCount;
  return photo;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < usersPhotos.length; j++) {
  fragment.appendChild(renderUsersPhoto(usersPhotos[j]));
}

document.querySelector('.pictures').appendChild(fragment);

var bigPhoto = document.querySelector('.big-picture');
// bigPhoto.classList.remove('hidden');

var renderBigPhoto = function (photo) {
  bigPhoto.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.comments-count').textContent = photo.commentsCount;
  var commentsBlock = bigPhoto.querySelector('.social__comments');
  commentsBlock.innerHTML = '';
  commentsBlock.appendChild(renderComments(photo.commentsCount));
  bigPhoto.querySelector('.social__caption').textContent = photo.description;
  return bigPhoto;
};

bigPhoto.querySelector('.social__comment-count').classList.add('hidden');
bigPhoto.querySelector('.comments-loader').classList.add('hidden');

renderBigPhoto(usersPhotos[0]);
