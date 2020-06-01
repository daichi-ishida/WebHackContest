'use strict';

var words = document.getElementsByTagName('span');

window.onload = function animate() {
  var maxDelay = 0;
  var maxDuration = 0;

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var duration = word.dataset.duration;
    var delay = word.dataset.delay;
    var blur = word.dataset.blur;

    maxDelay = Math.max(delay, maxDelay);
    maxDuration = Math.max(duration, maxDuration);

    TweenLite.set(word, {
      'webkitFilter': 'blur(' + blur + 'px)'
    });
    TweenLite.set(word, {
      className: "+=animate",
      transition: 'all ' + duration + 's ease-in ' + delay + 's'
    });
  }

};