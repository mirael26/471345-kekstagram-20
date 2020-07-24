'use strict';

window.photoFilter = (function () {
  var RANDOM_PHOTO_COUNT = 10;
  var filterBar = document.querySelector('.img-filters');
  var filterButtons = filterBar.querySelectorAll('.img-filters__button');

  var idToFilter = {
    'filter-default': function (data) {
      return data;
    },
    'filter-random': function (data) {
      var results = [];

      var getRandom = function (max) {
        return Math.floor(Math.random() * max);
      };

      while (results.length < RANDOM_PHOTO_COUNT) {
        var index = getRandom(data.length);

        if (!results.find(function (element) {
          return element === data[index];
        })) {
          results.push(data[index]);
        }
      }

      return results;
    },
    'filter-discussed': function (data) {
      var results = data.slice().sort(function (first, second) {
        if (first.comments.length < second.comments.length) {
          return 1;
        } else if (first.comments.length > second.comments.length) {
          return -1;
        } return 0;
      });
      return results;
    }
  };

  filterButtons.forEach(function (button) {
    button.addEventListener('click', window.debounce(function () {
      filterButtons.forEach(function (el) {
        if (el.classList.contains('img-filters__button--active')) {
          el.classList.remove('img-filters__button--active');
        }
      });
      button.classList.add('img-filters__button--active');
      var currentFilter = idToFilter[button.id];
      window.currentData = currentFilter(window.photoData);
      window.photoRender(window.currentData);
    }));
  });
})();
