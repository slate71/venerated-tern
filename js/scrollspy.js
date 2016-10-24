(function() {
  function scrollSpy() {
    var navHeight = document.querySelector('nav').getBoundingClientRect().height;

    // Get all scroll sections
    var scrollSections = [].slice.call(
      document.querySelectorAll('.scroll-section')
    );

    var currentSectionIndex = scrollSections
      .map(sec => sec.getBoundingClientRect().bottom)
      .findIndex(bottom => bottom >= navHeight + 2);

    var currentSectionBackground = scrollSections
      .map(sec => getBackground(sec))
      [currentSectionIndex];

    var scrollNavs = document.querySelectorAll('.scroll-nav')

    scrollSections.forEach((sec, idx) => {
      scrollNavs[idx].style.background = defaultBackground();
    });

    scrollNavs[currentSectionIndex].style.background = currentSectionBackground;

    function getBackground(sec) {
      return window.getComputedStyle(sec, null).getPropertyValue('background');
    }

    function defaultBackground() {
      var sec = document.querySelector('nav');
      return window.getComputedStyle(sec, null).getPropertyValue('background');
    }
  }

  scrollSpy();
  window.addEventListener('scroll', scrollSpy);
})();
