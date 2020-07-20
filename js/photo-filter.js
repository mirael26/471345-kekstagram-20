'use strict';

window.photoFilter = (function () {
  var RANDOM_PHOTO_COUNT = 10;
  var filterBar = document.querySelector('.img-filters');
  var filterButtons = filterBar.querySelectorAll('.img-filters__button');

  var filters = [
    {
      filterType: 'filter-default',
      findData: function (data) {
        return data;
      }
    },
    {
      filterType: 'filter-random',
      findData: function (data) {
        var result = [];

        var getRandom = function (max) {
          return Math.floor(Math.random() * max);
        };

        while (result.length < RANDOM_PHOTO_COUNT) {
          var index = getRandom(data.length);

          if (!result.find(function (element) {
            return element === data[index];
          })) {
            result.push(data[index]);
          }
        }

        return result;
      }
    },
    {
      filterType: 'filter-discussed',
      findData: function (data) {
        var result = data.slice().sort(function (first, second) {
          if (first.comments.length < second.comments.length) {
            return 1;
          } else if (first.comments.length > second.comments.length) {
            return -1;
          } return 0;
        });
        return result;
      }
    }
  ];


  filterButtons.forEach(function (button) {
    button.addEventListener('click', window.debounce(function () {
      filterButtons.forEach(function (el) {
        if (el.classList.contains('img-filters__button--active')) {
          el.classList.remove('img-filters__button--active');
        }
      });
      button.classList.add('img-filters__button--active');
      var currentFilter = filters.find(function (obj) {
        return obj.filterType === button.id;
      });
      window.photoRender(currentFilter.findData(window.photoData));
    }));
  });
})();
