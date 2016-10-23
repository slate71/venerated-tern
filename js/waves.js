(function() {
  function showEffect(event, element) {
    var ripple;
    var rippleStyle;
    var pos;
    var relativeY;
    var relativeX;
    var scale;

    element = element || this;

    // Disable right click
    if (event.button === 2) {
        return false;
    }

    // Create a ripple
    ripple = document.createElement('div');
    ripple.className = "wave-ripple";
    element.appendChild(ripple);

    // Get click coordinate and element width
    box = element.getBoundingClientRect();
    relativeX = ('touches' in event)
      ? (event.touches[0].pageX - box.left)
      : (event.pageX - box.left);
    relativeY = ('touches' in event)
      ? (event.touches[0].pageY - box.top)
      : (event.pageY - box.top);
    scale = 'scale(' + (element.clientWidth / 10) + ')';

    ripple.setAttribute('data-hold', Date.now());
    ripple.setAttribute('data-scale', scale);
    ripple.setAttribute('data-x', relativeX);
    ripple.setAttribute('data-y', relativeY);

    rippleStyle = {
      'top': relativeY + 'px',
      'left': relativeX  + 'px',

      // Scale the ripple
      '-webkit-transform': scale,
      '-moz-transform': scale,
      '-ms-transform': scale,
      '-o-transform': scale,
      'transform': scale,
      'opacity': '1',

      '-webkit-transition-duration': '750ms',
      '-moz-transition-duration': '750ms',
      '-o-transition-duration': '750ms',
      'transition-duration': '750ms',

      '-webkit-transition-timing-function': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      '-moz-transition-timing-function': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      '-o-transition-timing-function': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      'transition-timing-function': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    };

    Object.keys(rippleStyle).forEach(function(key) {
      ripple.style[key] = rippleStyle[key];
    });
  }

  function hideEffect(event) {
    var el = this;
    var width = el.clientWidth * 1.4;

    var ripple = null;
    var ripples = el.getElementsByClassName('wave-ripple');
    if (ripples.length > 0) {
      ripple = ripples[ripples.length - 1];
    } else {
      return false;
    }

    var relativeX = ripple.getAttribute('data-x');
    var relativeY = ripple.getAttribute('data-y');
    var scale = ripple.getAttribute('data-scale');

    // Get delay between mousedown and mouse leave
    var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    var delay = 350 - diff;

    if (delay < 0) {
      delay = 0;
    }

    // Fade out riople after delay
    setTimeout(function() {
      var style = {
        'top': relativeY + 'px',
        'left': relativeX + 'px',
        'opacity': '0',

        // Duration
        '-webkit-transition-duration': '750ms',
        '-moz-transition-duration': '750ms',
        '-o-transition-duration': '750ms',
        'transition-duration': '750ms',
        '-webkit-transform': scale,
        '-moz-transform': scale,
        '-ms-transform': scale,
        '-o-transform': scale,
        'transform': scale,
      };

      Object.keys(style).forEach(function(key) {
        ripple.style[key] = style[key];
      });

      setTimeout(function() {
        try {
          document.querySelector('.wave-effect').removeChild(ripple);
        } catch(e) {
          return false;
        }
      }, 750);
    }, delay);
  }

  function handleWaveEffect(event) {
    var target = event.target;
    var element = null;

    while (target.parentElement) {
      if (target.className.indexOf('wave-effect') !== -1 ||
          target.classList.contains('wave-effect')) {
        element = target;
      }
      target = target.parentElement;
    }

    if (element == null) {
      return;
    }

    showEffect(event, element);

    if ('onTouchStart' in window) {
      element.addEventListener('touchend', hideEffect);
      element.addEventListener('touchcancel', hideEffect);
    }

    element.addEventListener('mouseup', hideEffect);
    element.addEventListener('mouseleave', hideEffect);
  }

  if ('onTouchStart' in window) {
    document.body.addEventListener('touchstart', handleWaveEffect);
  }

  document.body.addEventListener('mousedown', handleWaveEffect);
}());
