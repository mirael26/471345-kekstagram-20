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
          result.push(data[index]);
          result = result.filter(function (element, i, array) {
            return array.indexOf(element) === i;
          });
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
          } else {
            return 0;
          }
        });
        return result;
      }
    }
  ];


  filterButtons.forEach(function (button) {
    button.addEventListener('click', window.debounce(function () {
      useFilter(button);
    }));
    button.addEventListener('keydown', window.debounce(function (evt) {
      if (evt.key === 'Enter') {
        useFilter(button);
      }
    }));
  });

  var useFilter = function (button) {
    filterButtons.forEach(function (el) {
      el.classList.remove('img-filters__button--active');
    });
    button.classList.add('img-filters__button--active');
    var currentFilter = filters.find(function (obj) {
      return obj.filterType === button.id;
    });
    var currentFilterIndex = filters.indexOf(currentFilter);
    window.photoRender(filters[currentFilterIndex].findData(window.photoData));
  };
})();
