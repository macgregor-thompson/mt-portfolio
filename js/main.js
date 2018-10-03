(function () {
  'use strict';

  scrollToRelativeLinks();
  toggleBackToTop();
  fixIEScrollCrap();


  function scrollToRelativeLinks() {
    $('a').on('click', function (e) {
      console.log('link clicked:', e);
      if (e.target.hash.indexOf('#') === 0) {
        let pos = $(e.target.hash).offset().top;
        console.log('relative link, pos:', pos);
        $('html, body').animate({
            scrollTop: pos - 50
          }, pos / 5,    // this is the animation time
          function () {
          console.log('returning false');
            return false;
          }    // what to do after the animation
        );
      }
    });
  }

  function toggleBackToTop() {
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 0) {
        $('.back-to-top').show();
      } else {
        $('.back-to-top').hide();
      }
    });
  }

  function fixIEScrollCrap() {
    if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
      $('body').on("mousewheel", function () {
        // remove default behavior
        event.preventDefault();

        //scroll without smoothing
        let wheelDelta = event.wheelDelta;
        let currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
      });
    }
  }

})();