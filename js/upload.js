'use strict';

var uploadButton = document.querySelector('#upload-file');
var upload = document.querySelector('.img-upload__overlay');
var buttonClose = upload.querySelector('#upload-cancel');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    popupClose();
  }
};

var popupOpen = function () {
  upload.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  window.addEventListener('keydown', onPopupEscPress);
};

var popupClose = function () {
  upload.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  window.removeEventListener('keydown', onPopupEscPress);
  uploadButton.value = '';
};

uploadButton.addEventListener('change', function (evt) {
  evt.preventDefault();
  popupOpen();
});

buttonClose.addEventListener('click', function () {
  popupClose();
});

// var effects = document.querySelectorAll('.effects__radio');
var pin = document.querySelector('.effect-level__pin');
// var effectLevel = document.querySelector('.effect-level__value').value / 100;
// var previewImage = document.querySelector('.img-upload__preview').querySelector('img');

// console.log(pin.offsetLeft);

pin.addEventListener('mouseup', function (evt) {
  console.log(evt.clientX);
});

var parent = document.querySelector('.effect-level__line');
console.log(parent.getBoundingClientRect());

// // for (const effect of effects) {
// //   effect.addEventListener('change', function () {
// //     previewImage.removeAttribute('class');
// //     previewImage.classList.add('effects__preview-' + effect.value);
// //   });
// // }

// // for (var i=0; i>length; i++) {
// //   if previewImage.classList.contains(class[0]) {
// //     previewImage.styles.filter = filter[0] * effectLevel;
// //   }
// }
