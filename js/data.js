'use strict';

window.data = (function () {
  var COMMENTS_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var PHOTO_DESCRIPTIONS = ['Чудесный день', 'Отличная прогулка', 'Хорошо погуляли', 'Всем привет!', 'Оцените фото', 'Я старался!'];
  var COMMENTS_NAMES = ['Андрей', 'Коля', 'Настенька', 'Анна', 'Петр', 'Леха', 'Виктория', 'Леся', 'Боря', 'Азат'];
  var USERS_PHOTOS_COUNT = 25;
  var AVATARS_COUNT = 6;
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

  return {
    usersPhotos: usersPhotos,
    createComment: createComment
  };
})();
