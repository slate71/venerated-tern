window.addEventListener('scroll', function() {
  var scrollTop = document.body.scrollTop;
  var nav1 = document.querySelector('#nav1');
  var nav2 = document.querySelector('#nav2');
  var nav3 = document.querySelector('#nav3');
  var sec1 = document.querySelector('#section1');
  var sec2 = document.querySelector('#section2');
  var sec3 = document.querySelector('#section3');

  function top(sec) {
    return sec.getBoundingClientRect().top;
  }

  function background(sec) {
    return window.getComputedStyle(sec, null).getPropertyValue('background');
  }

  function defaultBackground() {
    return "#3c3c3c";
  }

  if (top(sec2) > 51.1875) {
    nav1.style.background = background(sec1);
    nav2.style.background = defaultBackground();
    nav3.style.background = defaultBackground();
  }

  if (top(sec2) <= 51.1875 && top(sec3) > 51.1875) {
    nav1.style.background = defaultBackground();
    nav2.style.background = background(sec2);
    nav3.style.background = defaultBackground();
  }

  if (top(sec3) <= 51.1875) {
    nav1.style.background = defaultBackground();
    nav2.style.background = defaultBackground();
    nav3.style.background = background(sec3);
  }
});
