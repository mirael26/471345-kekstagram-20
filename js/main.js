'use strict';

var COMMENTS_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHOTO_DESCRIPTIONS = ['Чудесный день', 'Отличная прогулка', 'Хорошо погуляли', 'Всем привет!', 'Оцените фото', 'Я старался!'];
var COMMENTS_NAMES = ['Андрей', 'Коля', 'Настенька', 'Анна', 'Петр', 'Леха', 'Виктория', 'Леся', 'Боря', 'Азат'];

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomOfArray = function (array) {
  var randomSetup = array[getRandomInRange(0, array.length - 1)];
  return randomSetup;
};

var createOneComment = function () {
  var object = {};
  object.avatar = 'img/avatar-' + getRandomInRange(1, 6) + '.svg';
  object.message = getRandomOfArray(COMMENTS_MESSAGES);
  object.name = getRandomOfArray(COMMENTS_NAMES);
  return object;
};

var createComments = function (commentsAmount) {
  var array = [];
  for (var i = 0; i < commentsAmount; i++) {
    array.push(createOneComment());
  }
  return array;
};

var createOneUsersPhoto = function (photoNumber) {
  var object = {};
  object.url = 'photos/' + photoNumber + '.jpg';
  object.description = getRandomOfArray(PHOTO_DESCRIPTIONS);
  object.likes = getRandomInRange(15, 200);
  object.commentsAmount = getRandomInRange(1, 6);
  object.comments = createComments(object.commentsAmount);
  return object;
};

var usersPhotos = [];
for (var i = 0; i < 25; i++) {
  usersPhotos.push(createOneUsersPhoto(i + 1));
}

var usersPhotoTemplate = document.querySelector('#picture').content;

var renderUsersPhoto = function (photoProperty) {
  var photo = usersPhotoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = photoProperty.url;
  photo.querySelector('.picture__likes').textContent = photoProperty.likes;
  photo.querySelector('.picture__comments').textContent = photoProperty.commentsAmount;
  return photo;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < usersPhotos.length; j++) {
  fragment.appendChild(renderUsersPhoto(usersPhotos[j]));
}

document.querySelector('.pictures').appendChild(fragment);
