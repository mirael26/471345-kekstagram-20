'use strict';

window.renderComments = (function () {
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

  return function (array) {
    var commentsFragment = document.createDocumentFragment();
    array.forEach(function (element) {
      commentsFragment.appendChild(renderComment(element));
    });
    return commentsFragment;
  };
})();
