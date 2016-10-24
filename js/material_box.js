(function() {
  function hideLightBox() {
    var isVisible = document.querySelector('.visible');

    if (isVisible) {
      document.querySelector('.lightbox').classList.add('hidden');
      setTimeout(function() {
        document.querySelector('.lightbox').classList.remove('hidden');
        document.querySelector('.lightbox').classList.remove('visible');
      }, 500);
    }
  }

  document.querySelector('.thumbnail').addEventListener('click', function() {
    document.querySelector('.lightbox').classList.add('visible');
  });

  document.querySelector('.lightbox').addEventListener('click', function() {
    hideLightBox();
  })

  window.addEventListener('scroll', function() {
    hideLightBox();
  });
})();
